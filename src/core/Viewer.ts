import * as Cesium from "cesium"
import EventEmitter from "./EventEmitter"
import { CesiumIcon } from "src/utils/Default"
import BaseLayer from "./BaseLayer"
import { mapImg, mapSize } from "src/utils/Navigation"

// 设置默认相机观察范围（覆盖Cesium默认设置）
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = new Cesium.Rectangle(
  Cesium.Math.toRadians(70),
  Cesium.Math.toRadians(-15),
  Cesium.Math.toRadians(140),
  Cesium.Math.toRadians(80)
)

/**
 * 地图场景配置扩展接口
 * @interface
 * @extends Cesium.Viewer.ConstructorOptions
 * @property {string} [defaultKey] - Cesium Icon资源key
 * @property {boolean} [fpsShow=false] - 是否显示帧率，默认不显示
 * @property {boolean} [mapboxController=false] - 是否采用Mapbox控制模式（左键拖动，中间缩放，右键视角），默认不开启
 */
interface ViewOption extends Cesium.Viewer.ConstructorOptions {
  defaultKey?: string
  fpsShow?: boolean
  mapboxController?: boolean
}

class Viewer extends Cesium.Viewer {
  /**
   * 创建地图场景实例
   * @extends Cesium.Viewer
   * @param {Element | string} container - DOM元素或元素ID，作为地图容器
   * @param {ViewOption} [options] - 地图配置选项（合并默认配置）
   * @description
   * 增强版地图场景类，继承自 Cesium.Viewer，提供了更丰富的功能和配置选项。
   * @example
   * // 创建地图实例
   * const viewer = new Viewer('cesiumContainer', {
   *   timeline: true,
   *   scene3DOnly: false
   * });
   */
  constructor(container: Element | string, public options?: ViewOption) {
    super(container, {
      // 基础配置
      animation: false,
      fullscreenButton: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      sceneModePicker: false,
      timeline: false,
      sceneMode: Cesium.SceneMode.SCENE3D,
      scene3DOnly: true,
      baseLayerPicker: false,
      navigationHelpButton: false,
      vrButton: false,
      selectionIndicator: false,
      orderIndependentTranslucency: true,
      shouldAnimate: true,
      baseLayer: BaseLayer.DefaultSingleImg,

      // WebGL上下文配置
      contextOptions: {
        webgl: {
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: true,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        },
        requestWebgl1: false,
      },
      shadows: true,
      ...options, // 合并用户自定义配置
    })
    this.initBaseConfig()
  }

  /**
   * Cesium事件发射器实例
   * @type {EventEmitter}
   */
  public EventHandler: EventEmitter = new EventEmitter(this)

  /**
   * 初始化基础场景配置
   * @private
   * @method
   * @description
   * 执行以下配置：
   * 1. 地形深度检测
   * 2. 天体显示设置
   * 3. 光照设置
   * 4. 碰撞检测
   * 5. 版权信息隐藏
   * 6. 高DPI适配
   * 7. Cesium Icon资源key设置
   */
  private initBaseConfig() {
    // Cesium Icon资源key
    Cesium.Ion.defaultAccessToken = this.options?.defaultKey || CesiumIcon

    // 地形交互配置，深度监测
    this.scene.globe.depthTestAgainstTerrain = true

    // 天体显示配置
    this.scene.skyBox.show = true
    this.scene.sun.show = true
    this.scene.moon.show = false
    this.scene.skyAtmosphere.show = true

    // 光照配置
    this.scene.globe.enableLighting = true

    // 时间系统配置
    this.clock.multiplier = 1

    // 相机碰撞检测
    this.scene.screenSpaceCameraController.enableCollisionDetection = true

    // 显示帧率
    this.scene.debugShowFramesPerSecond = this.options?.fpsShow || false

    // 隐藏版权信息
    ;(this.cesiumWidget.creditContainer as any).style.display = "none"

    // 高分辨率适配，支持图像渲染像素化处理
    this.resolutionScale = window.devicePixelRatio

    // 开启抗锯齿
    this.scene.postProcessStages.fxaa.enabled = true

    // Mapbox控制模式
    if (this.options?.mapboxController) {
      // 设置中键用于缩放
      this.scene.screenSpaceCameraController.zoomEventTypes = [
        Cesium.CameraEventType.WHEEL, // 保留滚轮缩放
        Cesium.CameraEventType.MIDDLE_DRAG, // 添加中键拖动缩放
        Cesium.CameraEventType.PINCH, // 保留多点触控缩放
      ]
      //设置右键旋转
      this.scene.screenSpaceCameraController.tiltEventTypes = [
        Cesium.CameraEventType.RIGHT_DRAG,
        Cesium.CameraEventType.PINCH,
        {
          eventType: Cesium.CameraEventType.RIGHT_DRAG,
          modifier: Cesium.KeyboardEventModifier.CTRL,
        },

        {
          eventType: Cesium.CameraEventType.MIDDLE_DRAG,
          modifier: Cesium.KeyboardEventModifier.CTRL,
        },
      ]
    }
  }

  /**
   * 控制帧率显示
   * @type {Boolean}
   */
  get fps() {
    return this.scene.debugShowFramesPerSecond
  }
  set fps(show) {
    this.scene.debugShowFramesPerSecond = show // 显示帧率
  }

  /**
   * 地图画布大小，例如：{width:1920,height:1080}
   * @type {Object}
   * @readonly
   */
  get size() {
    return mapSize(this)
  }

  /**
   * 当前地图场景图片，base64格式
   * @type {String}
   * @readonly
   */
  get image() {
    return mapImg(this)
  }

  /**
   * 场景底图
   * Cesium机制是最底层的图层为_isBaseLayer，通过lowerToBottom来控制
   * @type {Cesium.ImageryLayer} imagery 参考Cesium的ImageryLayer
   */
  get baseImagery() {
    //@ts-ignore
    const layers = this.imageryLayers._layers
    const baseLayer = layers.find((layer: any) => layer._isBaseLayer)
    return baseLayer
  }

  set baseImagery(imagery: Cesium.ImageryLayer) {
    //@ts-ignore
    const baseLayer = this.imageryLayers._layers.find(
      (layer: any) => layer._isBaseLayer
    )
    baseLayer && this.imageryLayers.remove(baseLayer)
    this.imageryLayers.lowerToBottom(imagery)
  }
}
export default Viewer
