import {
  Cartographic,
  Cesium3DTileFeature,
  Cesium3DTileset,
  Model,
  Math as CesiumMath,
  EllipsoidTerrainProvider,
  Cartesian3,
  Ellipsoid,
  sampleTerrainMostDetailed,
  TerrainProvider,
  sampleTerrain,
} from "cesium"
import { Viewer } from "src/core"
import { DegreePos } from "src/types"
import { Cartesian2 } from "src/types/CesiumTypes"

/**
 * 根据像素px值拾取位置点
 * @method
 * @description 位置：Coordinates.getCatesian3FromPX
 * @param {Viewer} viewer 地图场景
 * @param {Cartesian2} px 屏幕坐标
 * @returns {Cartesian3 | null} 位置点笛卡尔坐标
 */
export const getCatesian3FromPX = (viewer: Viewer, px: Cartesian2) => {
  const scene = viewer.scene
  let picks = scene.drillPick(px)
  let cartesian = undefined
  let isOn3dtiles = false
  for (let i in picks) {
    let pick = picks[i]
    const primitive = pick && pick.primitive
    if (
      primitive instanceof Cesium3DTileFeature ||
      primitive instanceof Cesium3DTileset ||
      primitive instanceof Model
    ) {
      isOn3dtiles = true
    }
    if (isOn3dtiles) {
      scene.pick(px)
      cartesian = scene.pickPosition(px)
      if (cartesian) {
        let cartographic = Cartographic.fromCartesian(cartesian)
        let x = CesiumMath.toDegrees(cartographic.longitude),
          y = CesiumMath.toDegrees(cartographic.latitude),
          z = cartographic.height
        cartesian = transformWGS84ToCartesian({ x, y, z })
      }
    }
  }
  let isOnTerrain = false // 地形

  let boolTerrain = viewer.terrainProvider instanceof EllipsoidTerrainProvider
  if (!isOn3dtiles && !boolTerrain) {
    let ray = scene.camera.getPickRay(px)
    if (!ray) return null
    cartesian = scene.globe.pick(ray, scene)
    isOnTerrain = true
  }
  // 地球
  if (!isOn3dtiles && !isOnTerrain && boolTerrain) {
    cartesian = scene.camera.pickEllipsoid(px, scene.globe.ellipsoid)
  }
  if (cartesian) {
    let position = transformCartesianToWGS84(cartesian)
    if (position.z && position.z < 0) {
      position.z = 0.01
      cartesian = transformWGS84ToCartesian(position)
    }
    return cartesian
  }
  return null
}

/**
 * WGS84坐标转笛卡尔坐标
 * @method
 * @description 位置：Coordinates.transformWGS84ToCartesian
 * @param {DegreePos} position WGS84坐标
 * @returns {Cartesian3} 笛卡尔坐标
 */
export const transformWGS84ToCartesian = (position: DegreePos): Cartesian3 => {
  const { x, y, z = 0 } = position
  return position
    ? Cartesian3.fromDegrees(x, y, z, Ellipsoid.WGS84)
    : Cartesian3.ZERO
}

/**
 * 笛卡尔坐标转WGS84
 * @method
 * @description 位置：Coordinates.transformCartesianToWGS84
 * @param {Cartesian3} cartesian3 笛卡尔坐标
 * @return {DegreePos} WGS84坐标
 */
export const transformCartesianToWGS84 = (
  cartesian3: Cartesian3
): DegreePos => {
  let cartographic = Ellipsoid.WGS84.cartesianToCartographic(cartesian3)
  const { longitude, latitude, height } = cartographic
  return {
    x: CesiumMath.toDegrees(longitude),
    y: CesiumMath.toDegrees(latitude),
    z: height,
  }
}

/**
 * WGS84坐标转弧度坐标
 * @method
 * @description 位置：Coordinates.transformWGS84ToCartographic
 * @param {DegreePos} position WGS84坐标点
 * @return {Cesium.Cartographic} 弧度坐标点
 */
export function transformWGS84ToCartographic(
  position: DegreePos
): Cartographic {
  return position
    ? Cartographic.fromDegrees(position.x, position.y, position.z)
    : Cartographic.ZERO
}

/**
 * 弧度坐标转WGS84坐标
 * @method
 * @description 位置：Coordinates.transformCartographicToWGS84
 * @param {Cartographic} cartographic 弧度坐标
 * @returns {DegreePos} WGS84经纬度坐标
 */
export function transformCartographicToWGS84(
  cartographic: Cartographic
): DegreePos {
  const { longitude, latitude, height } = cartographic
  return {
    x: CesiumMath.toDegrees(longitude),
    y: CesiumMath.toDegrees(latitude),
    z: height,
  }
}

/**
 * 获取经纬度点集高度(限地形)
 * @method
 * @description 位置：Coordinates.height4Degrees
 * @param {Cesium.TerrainProvider} terrain 当前场景地形对象
 * @param {Array<DegreePos>} points 经纬度坐标数组
 * @param {boolean} [car3Only=false] 是否仅返回笛卡尔坐标数组
 * @returns {Promise<T>} 异步返回：高度值数组
 */
export async function height4Degrees(
  terrain: TerrainProvider,
  points: DegreePos[],
  car3Only = false
) {
  const cartographics = points.map((point) =>
    Cartographic.fromDegrees(point.x, point.y)
  )
  const result = await height4Cartographics(terrain, cartographics, car3Only)
  return result
}

/**
 * 获取笛卡尔点集高度(限地形)
 * @method
 * @description 位置：Coordinates.height4Positions
 * @param {Cesium.TerrainProvider} terrain 当前场景地形对象
 * @param {Array<Cartesian3>} points 笛卡尔坐标数组
 * @param {boolean} [car3Only=false] 是否仅返回笛卡尔坐标数组
 * @returns {Promise<T>} 异步返回：高度值数组
 */
export async function height4Positions(
  terrain: TerrainProvider,
  points: Cartesian3[],
  car3Only = false
) {
  const cartographics = points.map((ele) => Cartographic.fromCartesian(ele))
  const result = await height4Cartographics(terrain, cartographics, car3Only)
  return result
}

/**
 * 获取cartographics弧度点集高度(限地形)
 * @method
 * @description 位置：Coordinates.height4Cartographics
 * @param {Cesium.TerrainProvider} terrain 当前场景地形对象
 * @param {Array<Cartographic>} points 笛卡尔坐标数组
 * @param {boolean} [car3Only=false] 是否仅返回笛卡尔坐标数组
 * @returns {Promise<T>} 异步返回：高度值数组
 */
export async function height4Cartographics(
  terrain: TerrainProvider,
  cartographics: Cartographic[],
  car3Only = false
) {
  const updatedCartographics = await sampleTerrainMostDetailed(
    terrain,
    cartographics
  )
  console.log(updatedCartographics)
  const result = updatedCartographics.map((cartographic) => {
    const cartesian3 = Cartographic.toCartesian(cartographic)
    return car3Only
      ? cartesian3
      : {
          degree: transformCartographicToWGS84(cartographic),
          cartesian3,
          cartographic,
        }
  })
  return result
}
