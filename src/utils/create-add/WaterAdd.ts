import {
  Color,
  EllipsoidSurfaceAppearance,
  GeometryInstance,
  GroundPrimitive,
  Material,
  PolygonGeometry,
  PolygonHierarchy,
} from "cesium"
import { Viewer } from "src/core"
import waterImg from "src/static/water-img"
import { Cartesian3 } from "src/types/CesiumTypes"
import { randomId } from "../Generate"
import { SetCusMark } from "../layers/Layers"
import { getExtent } from "../Coordinate"
import WaterPrimitive, { WaterReflectionOption } from "../layers/WaterPrimitive"

/**
 * 水面对象参数
 * @instance
 * @property {string} [id] - 可选，对象唯一绑定id
 * @property {string} [img] - 可选，水面纹理贴图
 * @property {Array<Cartesian3[]>} [polygons] - 水面坐标集合，笛卡尔坐标类型
 * @property {string[]} [ids] - 可选，每个水面专属id
 */
export interface WaterOptions {
  id?: string
  img?: string
  polygons: Array<Cartesian3[]>
  ids?: string[]
}

/**
 * 加载基础水面
 * @param viewer
 * @param options
 * @returns
 */
export function addWaters(viewer: Viewer, options: WaterOptions) {
  const { id, img = waterImg, polygons, ids = [] } = options
  const instances: GeometryInstance[] = []
  const allPositions: Cartesian3[] = []
  for (let index = 0; index < polygons.length; index++) {
    const positions = polygons[index]
    const instance = new GeometryInstance({
      id: ids[index] || randomId(),
      geometry: new PolygonGeometry({
        polygonHierarchy: new PolygonHierarchy(positions),
        vertexFormat: EllipsoidSurfaceAppearance.VERTEX_FORMAT,
      }),
    })
    instances.push(instance)
    allPositions.push(...positions)
  }
  let waterPrimitive: any = new GroundPrimitive({
    allowPicking: true,
    asynchronous: true,
    geometryInstances: instances,
    appearance: new EllipsoidSurfaceAppearance({
      aboveGround: true,
      material: new Material({
        fabric: {
          type: "Water",
          uniforms: {
            blendColor: new Color(1, 0, 0, 0.3),
            normalMap: img,
            frequency: 200,
            animationSpeed: 0.01,
            amplitude: 10,
          },
        },
      }),
    }),
  })

  waterPrimitive.id = id
  waterPrimitive.CusExtent = getExtent(allPositions, true)
  SetCusMark(waterPrimitive, "primitive", "Water", true)
  const primitive = viewer.scene.primitives.add(waterPrimitive)
  return primitive
}
