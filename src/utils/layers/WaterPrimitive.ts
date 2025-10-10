import {
  BoundingRectangle,
  Camera,
  Cartesian3,
  Cartesian4,
  Cartographic,
  Color,
  defined,
  Ellipsoid,
  GeometryInstance,
  Material,
  MaterialAppearance,
  Matrix4,
  PerspectiveFrustum,
  PixelDatatype,
  PixelFormat,
  Plane,
  PolygonGeometry,
  PolygonHierarchy,
  Primitive,
  Scene,
  SunLight,
  TextureMagnificationFilter,
  TextureMinificationFilter,
  Transforms,
  VertexFormat,
  Math as CesiumMath,
} from "cesium"
//@ts-ignore
import { Texture, Sampler, TextureWrap, MipmapHint, Framebuffer } from "cesium"
//@ts-ignore
import { Cesium3DTilePass, Cesium3DTilePassState, UniformState } from "cesium"
import { Viewer } from "src/core"
import waterImg from "src/static/water-img"
import defaultValue from "../DefaultValue"

// 水面材质的 GLSL 片元着色器源码，模拟水面反射、波纹、光照等视觉效果。
const WaterMaterialSource = `
uniform sampler2D image;
uniform sampler2D normalTexture;
uniform float time;
uniform mat4 fixedFrameToEnu;
in vec4 v_worldPosition;
in vec4 v_uv;
uniform float size;
uniform vec4 waterColor;
uniform float waterAlpha;
uniform float rf0;
uniform vec3 lightDirection;
uniform float sunShiny;
uniform float distortionScale;
vec3 sunColor = vec3( 1.0 );
vec4 getNoise(sampler2D normalMap, vec2 uv) {
  float t = mod(time, 10.0); // 让 t 在 0~100 之间循环
  // 添加多个频率的噪声来生成自然的水面波纹效果
  vec2 uv0 = (uv / 103.0) + vec2(t / 17.0, t / 29.0);
  vec2 uv1 = uv / 107.0 - vec2(t / -19.0, t / 31.0);
  vec2 uv2 = uv / vec2(8907.0, 9803.0) + vec2(t / 101.0, t / 97.0);
  vec2 uv3 = uv / vec2(1091.0, 1027.0) - vec2(t / 109.0, t / -113.0);
  // 使用更多的噪声叠加，以产生更丰富的波纹效果
  vec4 noise = texture(normalMap, uv0) * 0.5 + texture(normalMap, uv1) * 0.3 + texture(normalMap, uv2) * 0.1 + texture(normalMap, uv3) * 0.1;
  return noise * 0.5 - 1.0;  // 归一化到 [-1, 1] 区间
}
void sunLight(const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor, inout vec3 sunDirection) {
  vec3 reflection = normalize(reflect(-sunDirection, surfaceNormal));
  float direction = max(0.0, dot(eyeDirection, reflection)); // 计算视角与反射光的角度
  specularColor += pow(direction, shiny) * sunColor * spec;  // 高光效果
  diffuseColor += max(dot(sunDirection, surfaceNormal), 0.0) * sunColor * diffuse;  // 漫反射效果
}
czm_material czm_getMaterial(czm_materialInput materialInput) {
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 transformedSt = materialInput.st * 2.0 - 1.0;
  vec4 noise = getNoise(normalTexture, transformedSt * size);
  vec3 surfaceNormal = normalize(noise.xzy);
  vec3 diffuseLight = vec3(0.0);
  vec3 specularLight = vec3(0.0);
  vec3 eye = (czm_inverseView * vec4(vec3(0.0), 1.0)).xyz;
  eye = (fixedFrameToEnu * vec4(eye, 1.0)).xyz;
  vec3 world = (fixedFrameToEnu * vec4(v_worldPosition.xyz, 1.0)).xyz;
  vec3 worldToEye = eye - world;
  worldToEye = vec3(worldToEye.x, worldToEye.z, -worldToEye.y);
  vec3 eyeDirection = normalize(worldToEye);
  vec3 sunDirection = normalize(lightDirection);
  float shiny = sunShiny;
  float spec = 2.0;
  float diffuse = 0.5;
  sunLight(surfaceNormal, eyeDirection, shiny, spec, diffuse, diffuseLight, specularLight, sunDirection);
  float distance = length(worldToEye);
  float distortionScale = distortionScale;
  float attenuation = clamp(1.0 / (distance * 0.5 + 1.0), 0.6, 1.0);
  vec2 uvDistorted = (v_uv.xy / v_uv.w) * 0.5 + 0.5 + surfaceNormal.xz * distortionScale * 0.02 * attenuation;
  vec3 reflectionSample = vec3(texture(image, uvDistorted));
  float theta = max(dot(eyeDirection, surfaceNormal), 0.0);
  float reflectance = mix(rf0, 1.0, pow(1.0 - theta, 5.0));
  vec3 waterColor = waterColor.rgb;
  vec3 scatter = max(0.0, dot(surfaceNormal, eyeDirection)) * waterColor;
  // 混合散射光与反射光
  vec3 albedo = mix(
    sunColor * diffuseLight * 0.3 + scatter,
    vec3(0.1) + reflectionSample * 0.9 + reflectionSample * specularLight,
    reflectance
  );
  material.diffuse = albedo.rgb;
  material.alpha = waterAlpha;
  return material;
}

`
// 水面顶点着色器源码，计算水面顶点的反射坐标和世界坐标
const WaterAppearanceVS = `
in vec3 position3DHigh;
in vec3 position3DLow;
in vec3 normal;
in vec2 st;
in float batchId;
out vec3 v_positionEC;
out vec3 v_normalEC;
out vec2 v_st;
uniform mat4 reflectorProjectionMatrix;
uniform mat4 reflectorViewMatrix;
uniform mat4 reflectMatrix;
out vec4 v_worldPosition;
out vec4 v_uv;
void main() {
  vec4 p = czm_computePosition();
  v_positionEC = (czm_modelViewRelativeToEye * p).xyz;
  v_normalEC = czm_normal * normal;
  v_st = st;
  mat4 modelView = reflectorViewMatrix * reflectMatrix * czm_model;
  modelView[3][0] = 0.0;
  modelView[3][1] = 0.0;
  modelView[3][2] = 0.0;
  v_uv = reflectorProjectionMatrix * modelView * p;
  vec4 positionMC = vec4( position3DHigh + position3DLow, 1.0 );
  v_worldPosition = czm_model * positionMC;
  gl_Position = czm_modelViewProjectionRelativeToEye * p;
}
`
/**
 * @description 创建一个占位纹理（1x1红色像素），用于初始化材质，防止纹理未加载时出错。
 * @param {any} context Cesium 渲染上下文
 * @returns {Texture} 占位纹理对象
 */
function createPlaceHolderTexture(context: any) {
  const placeholderTexture = new Texture({
    context,
    source: {
      width: 1,
      height: 1,
      arrayBufferView: new Uint8Array([255, 0, 0, 255]),
    },
    sampler: new Sampler({
      wrapS: TextureWrap.REPEAT,
      wrapT: TextureWrap.REPEAT,
      minificationFilter: TextureMinificationFilter.LINEAR,
      magnificationFilter: TextureMinificationFilter.LINEAR,
    }),
  })
  placeholderTexture.type = "sampler2D"
  return placeholderTexture
}

/**
 * @description 计算反射向量，用于模拟光线在水面上的反射效果。
 * @param {Cartesian3} view 视线向量
 * @param {Cartesian3} normal 法向量
 * @returns {Cartesian3} 反射后的向量
 */
function reflect(view: Cartesian3, normal: Cartesian3) {
  const scaledNormal = normal.clone()
  const reflect = view.clone()
  const scalar = 2 * Cartesian3.dot(view, normal)
  Cartesian3.multiplyByScalar(normal, scalar, scaledNormal)
  return Cartesian3.subtract(view, scaledNormal, reflect)
}
/**
 * @description 判断一个数是否为2的幂，用于判断纹理是否支持生成 mipmap。
 * @param {number} value 数值
 * @returns {boolean} 是否为2的幂
 */
function isPowerOfTwo(value: number) {
  return (value & (value - 1)) === 0 && value !== 0
}

/**
 * @description 给材质添加纹理 Uniform，支持异步加载图片并生成 Cesium 纹理对象。
 * @param {object} options 配置项
 * @property {any} context Cesium 渲染上下文
 * @property {Material} material 材质对象
 * @property {string} uniformName Uniform 名称
 * @property {string} imgSrc 图片地址
 * @property {TextureWrap} [wrapS] 水平方向包裹方式
 * @property {TextureWrap} [wrapT] 垂直方向包裹方式
 * @property {TextureMinificationFilter} [minificationFilter] 缩小过滤方式
 * @property {TextureMagnificationFilter} [magnificationFilter] 放大过滤方式
 */
function addTextureUniform(options: any) {
  const { context, material, uniformName, imgSrc, wrapS, wrapT } = options
  const ws = wrapS || TextureWrap.REPEAT
  const wt = wrapT || TextureWrap.REPEAT
  const miniF = options.minificationFilter || TextureMinificationFilter.LINEAR
  const magF = options.magnificationFilter || TextureMagnificationFilter.LINEAR

  const source = new Image()
  source.src = imgSrc
  source.addEventListener("load", () => {
    const sampler = new Sampler({ ws, wt, miniF, magF })
    const texture = new Texture({ context, source, sampler })
    texture.type = "sampler2D"
    if (isPowerOfTwo(source.width) && isPowerOfTwo(source.height)) {
      texture.generateMipmap(MipmapHint.NICEST)
    }
    material.uniforms[uniformName] = texture
  })
}
/**
 * @constant
 * @description Cesium 3D Tiles 渲染 Pass 状态，用于场景渲染流程控制。
 */
const renderTilesetPassState = new Cesium3DTilePassState({
  pass: Cesium3DTilePass.RENDER,
})

/**
 * @constant
 * @description 用于场景背景色的临时变量。
 */
const scratchBackgroundColor = new Color()

/**
 * @function render
 * @description 渲染场景到帧缓冲区，用于生成水面反射的场景纹理。
 * @param {any} scene Cesium 场景对象
 * @param {any} passStateFramebuffer 帧缓冲区对象
 */
function render(scene: any, passStateFramebuffer: any) {
  const frameState = scene._frameState
  const context = scene.context
  const us = context.uniformState
  const view = scene._defaultView
  scene._view = view
  scene.updateFrameState()
  frameState.passes.render = true
  frameState.passes.postProcess = scene.postProcessStages.hasSelected
  frameState.tilesetPassState = renderTilesetPassState
  let backgroundColor = defaultValue(scene.backgroundColor, Color.BLUE)
  if (scene._hdr) {
    backgroundColor = Color.clone(backgroundColor, scratchBackgroundColor)
    backgroundColor.red = Math.pow(backgroundColor.red, scene.gamma)
    backgroundColor.green = Math.pow(backgroundColor.green, scene.gamma)
    backgroundColor.blue = Math.pow(backgroundColor.blue, scene.gamma)
  }
  frameState.backgroundColor = backgroundColor
  scene.fog.update(frameState)
  us.update(frameState)
  const { shadowMap } = scene
  if (defined(shadowMap) && shadowMap.enabled) {
    if (!defined(scene.light) || scene.light instanceof SunLight) {
      Cartesian3.negate(us.sunDirectionWC, scene._shadowMapCamera.direction)
    } else {
      Cartesian3.clone(scene.light.direction, scene._shadowMapCamera.direction)
    }
    frameState.shadowMaps.push(shadowMap)
  }
  scene._computeCommandList.length = 0
  scene._overlayCommandList.length = 0
  const viewport = view.viewport
  viewport.x = 0
  viewport.y = 0
  viewport.width = context.drawingBufferWidth
  viewport.height = context.drawingBufferHeight
  const passState = view.passState
  passState.framebuffer = passStateFramebuffer
  passState.blendingEnabled = undefined
  passState.scissorTest = undefined
  passState.viewport = BoundingRectangle.clone(viewport, passState.viewport)
  const { globe } = scene
  defined(globe) && globe.beginFrame(frameState)
  scene.updateEnvironment()
  scene.updateAndExecuteCommands(passState, backgroundColor)
  scene.resolveFramebuffers(passState)
  if (defined(globe)) {
    globe.endFrame(frameState)
    if (!globe.tilesLoaded) {
      scene._renderRequested = true
    }
  }
  context.endFrame()
}

const clipBias = 0 //水面反射裁剪偏移量，用于调整反射效果

/**
 * @interface WaterReflectionOption
 * @property {number} height 水面高度
 * @property {number} flowDegrees 水面旋转角度
 * @property {Cartographic[]} positions 水面顶点坐标集合
 * @property {string} normalMapUrl 法线贴图地址
 * @property {number} rippleSize 波纹大小
 * @property {number} waterAlpha 水面透明度
 * @property {Color} waterColor 水面颜色
 * @property {number} reflectivity 水面反射率
 * @property {Cartesian3} lightDirection 光照方向
 * @property {number} sunShiny 太阳高光强度
 * @property {number} distortionScale 水面扭曲强度
 */
export interface WaterReflectionOption {
  height: number
  flowDegrees: number
  positions: Cartographic[]
  normalMapUrl: string
  rippleSize: number
  waterAlpha: number
  waterColor: Color
  reflectivity: number
  lightDirection: Cartesian3
  sunShiny: number
  distortionScale: number
}
class WaterPrimitive {
  private _normal: Cartesian3
  private _rwPos: Cartesian3
  private _height: number
  private _flowDegrees: number
  private _positions: Cartesian3[]
  private _originRWPos: Cartesian3
  private _waterPlane: Plane
  private _scene: Scene
  private _reflectMatrix: Matrix4
  private _reflectorViewMatrix: Matrix4
  private _reflectorProjectionMatrix: Matrix4
  private _primitive: Primitive | undefined
  private _material: any
  private _initUniforms: any
  private _virtualCamera: any
  private _colorFramebuffer: any
  private _colorTexture: any
  private _hdr: boolean = false
  private _depthStencilTexture: any
  /**
   * @classdesc 水面 Primitive 类，负责创建和管理水面反射和波纹效果。
   * 构造后会自动将水面添加到 Cesium 场景中，并实现反射、波纹等视觉效果
   * @param {Viewer} viewer Cesium Viewer 实例
   * @param {WaterReflectionOption} options 水面反射参数选项
   * @description 初始化水面反射相关参数和资源，并将水面添加到场景。
   */
  constructor(viewer: Viewer, options: WaterReflectionOption) {
    this._scene = viewer.scene
    this._height = options.height
    this._flowDegrees = defaultValue(options.flowDegrees, 0)
    const positions = options.positions
    const total = positions.length
    let _x = 0
    let _y = 0
    let _z = 0
    this._positions = []
    positions.forEach((p) => {
      const { latitude, longitude } = p
      _x += Math.cos(latitude) * Math.cos(longitude)
      _y += Math.cos(latitude) * Math.sin(longitude)
      _z += Math.sin(latitude)
      this._positions.push(
        Cartesian3.fromRadians(longitude, latitude, this._height)
      )
    })
    _x /= total
    _y /= total
    _z /= total
    const cX = Math.atan2(_y, _x)
    const hyp = Math.sqrt(_x * _x + _y * _y)
    const cY = Math.atan2(_z, hyp)
    this._rwPos = Cartesian3.fromRadians(cX, cY, this._height)
    this._originRWPos = this._rwPos.clone()
    this._normal = Ellipsoid.WGS84.geodeticSurfaceNormal(this._rwPos)
    this._waterPlane = Plane.fromPointNormal(this._rwPos, this._normal)
    const { normal, distance } = this._waterPlane
    const { x, y, z } = normal
    this._reflectMatrix = new Matrix4(
      -2 * x * x + 1,
      -2 * x * y,
      -2 * x * z,
      -2 * x * distance,
      -2 * y * x,
      -2 * y * y + 1,
      -2 * y * z,
      -2 * y * distance,
      -2 * z * x,
      -2 * z * y,
      -2 * z * z + 1,
      -2 * z * distance,
      0,
      0,
      0,
      1
    )

    this._reflectorViewMatrix = Matrix4.IDENTITY.clone()
    this._reflectorProjectionMatrix = Matrix4.IDENTITY.clone()
    this._initUniforms = {
      normalMapUrl: defaultValue(options.normalMapUrl, waterImg),
      size: defaultValue(options.rippleSize, 50.0),
      waterColor: defaultValue(
        options.waterColor,
        Color.fromCssColorString("#00aeff")
      ),
      waterAlpha: defaultValue(options.waterAlpha, 0.9),
      rf0: defaultValue(options.reflectivity, 0.3),
      lightDirection: defaultValue(
        options.lightDirection,
        new Cartesian3(0, 0, 1)
      ),
      sunShiny: defaultValue(options.sunShiny, 100.0),
      distortionScale: defaultValue(options.distortionScale, 3.7),
    }
    const context = (this._scene as any).context
    this._createFramebuffer(
      context,
      context.drawingBufferWidth,
      context.drawingBufferHeight,
      this._scene.highDynamicRange
    )
    this._primitive = this._createPrimitive(
      this._positions,
      this._height,
      this._flowDegrees
    )
    this._scene.primitives.add(this._primitive)
    this.preRender = this.preRender.bind(this)
    this._scene.preRender.addEventListener(this.preRender)
    UniformState.prototype.updateFrustum = function (frustum: any) {
      Matrix4.clone(
        defaultValue(frustum.customProjectionMatrix, frustum.projectionMatrix),
        this._projection
      )
      this._inverseProjectionDirty = true
      this._viewProjectionDirty = true
      this._inverseViewProjectionDirty = true
      this._modelViewProjectionDirty = true
      this._modelViewProjectionRelativeToEyeDirty = true
      if (defined(frustum.infiniteProjectionMatrix)) {
        Matrix4.clone(
          frustum.infiniteProjectionMatrix,
          this._infiniteProjection
        )
        this._modelViewInfiniteProjectionDirty = true
      }
      this._currentFrustum.x = frustum.near
      this._currentFrustum.y = frustum.far
      this._farDepthFromNearPlusOne = frustum.far - frustum.near + 1.0
      this._log2FarDepthFromNearPlusOne = Math.log2(
        this._farDepthFromNearPlusOne
      )
      this._oneOverLog2FarDepthFromNearPlusOne =
        1.0 / this._log2FarDepthFromNearPlusOne
      if (defined(frustum._offCenterFrustum)) {
        frustum = frustum._offCenterFrustum
      }

      this._frustumPlanes.x = frustum.top
      this._frustumPlanes.y = frustum.bottom
      this._frustumPlanes.z = frustum.left
      this._frustumPlanes.w = frustum.right
    }

    PerspectiveFrustum.prototype.clone = function (result: any) {
      if (!defined(result)) {
        result = new PerspectiveFrustum()
      }

      result.aspectRatio = this.aspectRatio
      result.fov = this.fov
      result.near = this.near
      result.far = this.far

      result._aspectRatio = undefined
      result._fov = undefined
      result._near = undefined
      result._far = undefined
      //@ts-ignore
      this._offCenterFrustum.clone(result._offCenterFrustum)
      //@ts-ignore
      result.customProjectionMatrix = this.customProjectionMatrix

      return result
    }
  }

  /**
   * @member {number} rippleSize
   * @description 水面波纹大小
   */
  get rippleSize() {
    return this._material.uniforms.size
  }
  set rippleSize(value) {
    this._material.uniforms.size = value
  }

  /**
   * @member {number} waterAlpha
   * @description 水面透明度
   */
  get waterAlpha() {
    return this._material.uniforms.waterAlpha
  }
  set waterAlpha(value) {
    this._material.uniforms.waterAlpha = value
  }

  /**
   * @member {number} reflectivity
   * @description 水面反射率
   */
  get reflectivity() {
    return this._material.uniforms.rf0
  }
  set reflectivity(value) {
    this._material.uniforms.rf0 = value
  }
  /**
   * @member {number} distortionScale
   * @description 水面扭曲强度
   */
  get distortionScale() {
    return this._material.uniforms.distortionScale
  }
  set distortionScale(value) {
    this._material.uniforms.distortionScale = value
  }
  /**
   * @member {number} height
   * @description 水面高度
   */
  get height() {
    return this._height
  }
  set height(value) {
    this._height = value

    const rwpCa = Cartographic.fromCartesian(this._originRWPos)
    const newRwpCa = Cartesian3.fromRadians(
      rwpCa.longitude,
      rwpCa.latitude,
      this._height
    )
    const move = Cartesian3.subtract(
      newRwpCa,
      this._originRWPos,
      new Cartesian3()
    )
    const moveMatrix4 = Matrix4.fromTranslation(move)
    this._primitive!.modelMatrix = moveMatrix4

    this._rwPos = newRwpCa
    this._normal = Ellipsoid.WGS84.geodeticSurfaceNormal(this._rwPos)
    this._waterPlane = Plane.fromPointNormal(this._rwPos, this._normal)

    this._reflectMatrix = new Matrix4(
      -2 * this._waterPlane.normal.x * this._waterPlane.normal.x + 1,
      -2 * this._waterPlane.normal.x * this._waterPlane.normal.y,
      -2 * this._waterPlane.normal.x * this._waterPlane.normal.z,
      -2 * this._waterPlane.normal.x * this._waterPlane.distance,
      -2 * this._waterPlane.normal.y * this._waterPlane.normal.x,
      -2 * this._waterPlane.normal.y * this._waterPlane.normal.y + 1,
      -2 * this._waterPlane.normal.y * this._waterPlane.normal.z,
      -2 * this._waterPlane.normal.y * this._waterPlane.distance,
      -2 * this._waterPlane.normal.z * this._waterPlane.normal.x,
      -2 * this._waterPlane.normal.z * this._waterPlane.normal.y,
      -2 * this._waterPlane.normal.z * this._waterPlane.normal.z + 1,
      -2 * this._waterPlane.normal.z * this._waterPlane.distance,
      0,
      0,
      0,
      1
    )
  }
  /**
   * @member {number} sunShiny
   * @description 太阳高光强度
   */
  get sunShiny() {
    return this._material.uniforms.sunShiny
  }
  set sunShiny(value) {
    this._material.uniforms.sunShiny = value
  }

  /**
   * @member {Cartesian3} lightDirection
   * @description 光照方向
   */
  get lightDirection() {
    return this._material.uniforms.lightDirection
  }
  set lightDirection(value) {
    this._material.uniforms.lightDirection = value
  }

  /**
   * @member {string} waterColor
   * @description 水面颜色
   */
  get waterColor() {
    return this._material.uniforms.waterColor.toCssHexString()
  }
  set waterColor(value) {
    this._material.uniforms.waterColor = Color.fromCssColorString(value)
  }

  /**
   * @description 创建水面反射材质，包含反射场景纹理和法线贴图。
   * @returns {Material} 水面材质对象
   */
  _createReflectionWaterMaterial() {
    const context = (this._scene as any).context

    const placeholderTexture = createPlaceHolderTexture(context)
    const {
      normalMapUrl,
      size,
      waterColor,
      waterAlpha,
      rf0,
      lightDirection,
      sunShiny,
      distortionScale,
    } = this._initUniforms

    const texture = Texture.fromFramebuffer({
      context,
      framebuffer: this._colorFramebuffer,
    })
    texture.type = "sampler2D"

    const initUniforms = {
      size: size,
      waterColor: waterColor,
      waterAlpha: waterAlpha,
      rf0: rf0,
      lightDirection: lightDirection,
      sunShiny: sunShiny,
      distortionScale: distortionScale,
      normalTexture: placeholderTexture,
      image: texture,
      time: 0,
      fixedFrameToEnu: Matrix4.toArray(
        this._getFixedFrameToEastNorthUpTransformFromWorldMatrix()
      ),
    }
    const material = new Material({
      fabric: {
        type: "ReflectionWater",
        uniforms: initUniforms,
        source: WaterMaterialSource,
      },
      translucent: false,
      minificationFilter: TextureMinificationFilter.LINEAR,
      magnificationFilter: TextureMagnificationFilter.LINEAR,
    })

    addTextureUniform({
      context,
      material,
      uniformName: "normalTexture",
      imgSrc: normalMapUrl,
    })
    return material
  }
  /**
   * @description 更新虚拟相机参数，用于生成水面反射效果。
   * @param {Camera} camera 当前场景相机
   * @returns {boolean} 是否成功更新
   */
  _updateVirtualCamera(camera: Camera) {
    let lookAtPosition = new Cartesian3(0, 0, -1)
    let target = new Cartesian3()

    //@ts-ignore
    this._virtualCamera = Camera.clone(camera, this._virtualCamera)

    const cameraWorldPosition = camera.positionWC.clone()

    let view = Cartesian3.subtract(
      this._rwPos,
      cameraWorldPosition,
      new Cartesian3()
    )

    if (Cartesian3.dot(view, this._normal) > 0) {
      return false
    }

    view = reflect(view, this._normal)
    Cartesian3.negate(view, view)

    Cartesian3.add(view, this._rwPos, view)
    this._virtualCamera.position = view.clone()

    Cartesian3.add(camera.directionWC, cameraWorldPosition, lookAtPosition)

    Cartesian3.subtract(this._rwPos, lookAtPosition, target)
    target = reflect(target, this._normal)
    Cartesian3.negate(target, target)
    Cartesian3.add(target, this._rwPos, target)

    this._virtualCamera.direction = Cartesian3.subtract(
      target,
      this._virtualCamera.position,
      new Cartesian3()
    )
    Cartesian3.normalize(
      this._virtualCamera.direction,
      this._virtualCamera.direction
    )

    Cartesian3.add(camera.upWC, cameraWorldPosition, lookAtPosition)

    Cartesian3.subtract(this._rwPos, lookAtPosition, target)
    target = reflect(target, this._normal)
    Cartesian3.negate(target, target)
    Cartesian3.add(target, this._rwPos, target)

    this._virtualCamera.up = Cartesian3.subtract(
      target,
      this._virtualCamera.position,
      new Cartesian3()
    )
    Cartesian3.normalize(this._virtualCamera.up, this._virtualCamera.up)

    this._reflectorProjectionMatrix =
      this._virtualCamera.frustum.projectionMatrix
    this._reflectorViewMatrix = this._virtualCamera.viewMatrix

    const reflectorPlane = Plane.fromPointNormal(this._rwPos, this._normal)
    Plane.transform(
      reflectorPlane,
      this._virtualCamera.viewMatrix,
      reflectorPlane
    )

    const clipPlane = new Cartesian4(
      reflectorPlane.normal.x,
      reflectorPlane.normal.y,
      reflectorPlane.normal.z,
      reflectorPlane.distance
    )

    const projectionMatrix: any = Matrix4.clone(
      this._virtualCamera.frustum.projectionMatrix
    )

    const q = new Cartesian4(
      (Math.sign(clipPlane.x) + projectionMatrix[8]) / projectionMatrix[0],
      (Math.sign(clipPlane.y) + projectionMatrix[9]) / projectionMatrix[5],
      -1,
      (1.0 + projectionMatrix[10]) / projectionMatrix[14]
    )

    Cartesian4.multiplyByScalar(
      clipPlane,
      2.0 / Cartesian4.dot(clipPlane, q),
      clipPlane
    )

    projectionMatrix[2] = clipPlane.x
    projectionMatrix[6] = clipPlane.y
    projectionMatrix[10] = clipPlane.z + 1.0 - clipBias
    projectionMatrix[14] = clipPlane.w

    this._virtualCamera.frustum.customProjectionMatrix =
      Matrix4.clone(projectionMatrix)

    return true
  }
  /**
   * @description preRender事件处理，渲染水面反射。每帧调用，更新水面反射纹理。
   * @param {any} scene Cesium 场景对象
   */
  preRender(scene: any) {
    if (!defined(this._primitive)) return
    const curDefaultViewCamera = scene._defaultView.camera
    const currentShadowMap = scene.shadowMap
    const currentGlobe = scene.globe.show
    const currentShowSkirts = scene.globe.showSkirts

    if (!this._updateVirtualCamera(scene._defaultView.camera)) {
      this._primitive.show = false
      return
    }

    this._primitive.show = false
    scene._defaultView.camera = this._virtualCamera
    scene.shadowMap = undefined
    scene.globe.show = false
    scene.globe.showSkirts = false

    const context = scene.context
    const width = context.drawingBufferWidth
    const height = context.drawingBufferHeight
    const hdr = scene.highDynamicRange
    this._createFramebuffer(context, width, height, hdr)

    render(scene, this._colorFramebuffer)

    const appearance: any = this._primitive.appearance

    const texture = Texture.fromFramebuffer({
      context,
      framebuffer: this._colorFramebuffer,
    })
    texture.type = "sampler2D"

    this._material.uniforms.image = texture
    this._material.uniforms.time = performance.now() / 1000.0
    this._material.uniforms.fixedFrameToEnu = Matrix4.toArray(
      this._getFixedFrameToEastNorthUpTransformFromWorldMatrix()
    )
    appearance.uniforms.reflectMatrix = Matrix4.toArray(this._reflectMatrix)
    appearance.uniforms.reflectorProjectionMatrix = Matrix4.toArray(
      this._reflectorProjectionMatrix
    )
    appearance.uniforms.reflectorViewMatrix = Matrix4.toArray(
      this._reflectorViewMatrix
    )

    this._primitive.show = true
    scene._defaultView.camera = curDefaultViewCamera
    scene.shadowMap = currentShadowMap
    scene.globe.show = currentGlobe
    scene.globe.showSkirts = currentShowSkirts
  }

  /**
   * @description 创建水面 Primitive（几何体和材质），并设置反射相关 Uniform。
   * @param {Cartesian3[]} positions 水面顶点坐标
   * @param {number} extrudedHeight 水面高度
   * @param {number} flowDegrees 水面旋转角度
   * @returns {Primitive} 水面 Primitive 对象
   */
  _createPrimitive(
    positions: Cartesian3[],
    extrudedHeight: number,
    flowDegrees: number
  ) {
    const material = this._createReflectionWaterMaterial()
    this._material = material

    const appearance: any = new MaterialAppearance({
      material,
      vertexShaderSource: WaterAppearanceVS,
      translucent: true,
    })
    appearance.uniforms = {}
    appearance.uniforms.reflectMatrix = Matrix4.toArray(this._reflectMatrix)
    appearance.uniforms.reflectorProjectionMatrix = Matrix4.toArray(
      this._reflectorProjectionMatrix
    )
    appearance.uniforms.reflectorViewMatrix = Matrix4.toArray(
      this._reflectorViewMatrix
    )

    const primitive = new Primitive({
      geometryInstances: new GeometryInstance({
        geometry: new PolygonGeometry({
          polygonHierarchy: new PolygonHierarchy(positions),
          perPositionHeight: true,
          extrudedHeight,
          stRotation: CesiumMath.toRadians(flowDegrees),
          closeTop: true,
          closeBottom: false,
          vertexFormat: VertexFormat.POSITION_NORMAL_AND_ST,
        }),
      }),
      appearance,
      asynchronous: false,
    })
    return primitive
  }
  /**
   * @description 获取世界坐标到 ENU 坐标系的变换矩阵。
   * @returns {Matrix4} 变换矩阵
   */
  _getFixedFrameToEastNorthUpTransformFromWorldMatrix() {
    const EnuToFixedFrame = Transforms.eastNorthUpToFixedFrame(this._rwPos)

    const fixedFrameToEnu = Matrix4.inverse(EnuToFixedFrame, new Matrix4())
    return fixedFrameToEnu
  }
  /**
   * @description 创建帧缓冲区资源，用于存储反射场景的渲染结果。
   * @param {any} context Cesium 渲染上下文
   * @param {number} width 帧缓冲区宽度
   * @param {number} height 帧缓冲区高度
   * @param {boolean} hdr 是否高动态范围
   */
  _createFramebuffer(
    context: any,
    width: number,
    height: number,
    hdr: boolean
  ) {
    const colorTexture = this._colorTexture
    if (
      defined(colorTexture) &&
      colorTexture.width === width &&
      colorTexture.height === height &&
      this._hdr === hdr
    ) {
      return
    }

    this._destroyResource()

    this._hdr = hdr

    const pixelDatatype = hdr
      ? context.halfFloatingPointTexture
        ? PixelDatatype.HALF_FLOAT
        : PixelDatatype.FLOAT
      : PixelDatatype.UNSIGNED_BYTE
    this._colorTexture = new Texture({
      context,
      width,
      height,
      pixelFormat: PixelFormat.RGBA,
      pixelDatatype,
      sampler: new Sampler({
        wrapS: TextureWrap.CLAMP_TO_EDGE,
        wrapT: TextureWrap.CLAMP_TO_EDGE,
        minificationFilter: TextureMinificationFilter.LINEAR,
        magnificationFilter: TextureMagnificationFilter.LINEAR,
      }),
    })

    this._depthStencilTexture = new Texture({
      context,
      width,
      height,
      pixelFormat: PixelFormat.DEPTH_STENCIL,
      pixelDatatype: PixelDatatype.UNSIGNED_INT_24_8,
    })

    this._colorFramebuffer = new Framebuffer({
      context,
      colorTextures: [this._colorTexture],
      depthStencilTexture: this._depthStencilTexture,
      destroyAttachments: false,
    })
  }
  /**
   * @description 销毁帧缓冲区和纹理资源，释放显存。
   */
  _destroyResource() {
    this._colorTexture && this._colorTexture.destroy()
    this._depthStencilTexture && this._depthStencilTexture.destroy()
    this._colorFramebuffer && this._colorFramebuffer.destroy()

    this._colorTexture = undefined
    this._depthStencilTexture = undefined
    this._colorFramebuffer = undefined
  }
  /**
   * @description 销毁并移除动态水面对象，包括场景中的 Primitive、事件监听和显存资源。
   */
  destroy() {
    // 移除 preRender 事件监听
    if (this._scene && this.preRender) {
      this._scene.preRender.removeEventListener(this.preRender)
    }
    // 从场景中移除水面 Primitive
    if (this._scene && this._primitive) {
      this._scene.primitives.remove(this._primitive)
    }
    // 销毁显存资源
    this._destroyResource()
    // 清空引用
    this._primitive = undefined
    this._material = undefined
    this._colorFramebuffer = undefined
    this._colorTexture = undefined
    this._depthStencilTexture = undefined
  }
}

export default WaterPrimitive
