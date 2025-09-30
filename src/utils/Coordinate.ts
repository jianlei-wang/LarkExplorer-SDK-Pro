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
 * 经纬度坐标数组转笛卡尔坐标数组
 * @method
 * @description 位置：Coordinates.PosFromDegreeArray
 * @param {Array<Number[]>} positions 经纬度坐标数组，如：[[120,34],[121,35]]
 * @returns {Array<Cartesian3>} 笛卡尔坐标数组
 */
export function PosFromDegreeArray(positions: Array<number[]>) {
  let result = []
  for (let index = 0; index < positions.length; index++) {
    const pos = positions[index]
    result.push(pos[0], pos[1])
  }
  const points = Cartesian3.fromDegreesArray(result)
  return points
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
 * 笛卡尔坐标点集合转WGS84点集合
 * @method
 * @description 位置：Coordinates.arrayCartesiansToWGS84
 * @param {Array<Cartesian3>} cartesians 笛卡尔坐标点集合
 * @returns {Array<DegreePos>} WGS84坐标点集合
 */
export function arrayCartesiansToWGS84(cartesians: Cartesian3[] = []) {
  return cartesians.map((item) => transformCartesianToWGS84(item))
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

/**
 * 返回点集的范围，默认弧度：[west, south, east, north]
 * @method
 * @description 位置：Coordinates.getExtent
 * @param {Array<Cartesian3>} points 点集，笛卡尔坐标
 * @param {Boolean} degrees 是否返回值为经纬度，true-返回值为经纬度值；false-返回值为弧度值
 * @returns {Array<Number>} 四至范围 => [west, south, east, north]
 */
export function getExtent(points: Cartesian3[], degrees: boolean) {
  let west = 100000000,
    south = 100000000,
    east = -100000000,
    north = -100000000
  for (let i = 0; i < points.length; i++) {
    const cartographic = Cartographic.fromCartesian(points[i])
    const { longitude, latitude } = cartographic
    west = Math.min(longitude, west)
    south = Math.min(latitude, south)
    east = Math.max(longitude, east)
    north = Math.max(latitude, north)
  }
  if (degrees) {
    west = CesiumMath.toDegrees(west)
    south = CesiumMath.toDegrees(south)
    east = CesiumMath.toDegrees(east)
    north = CesiumMath.toDegrees(north)
  }

  return [west, south, east, north]
}

/**
 * 计算空间两点间距离（经纬度坐标）
 * @param {number} lon1 - 第1个点经度
 * @param {number} lat1 - 第1个点纬度
 * @param {number} lon2 - 第2个点经度
 * @param {number} lat2 - 第2个点维度
 * @returns 距离：米
 */
export function calculateDis(
  lon1: number,
  lat1: number,
  lon2: number,
  lat2: number
) {
  const R = 6371000 // 地球半径，单位米
  const radLat1 = (Math.PI / 180) * lat1
  const radLon1 = (Math.PI / 180) * lon1
  const radLat2 = (Math.PI / 180) * lat2
  const radLon2 = (Math.PI / 180) * lon2
  // 计算经纬度差值
  const deltaLat = radLat2 - radLat1
  const deltaLon = radLon2 - radLon1
  // 使用 Haversine 公式计算距离
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(radLat1) *
      Math.cos(radLat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  // 计算距离并返回
  const distance = R * c
  return distance
}

/**
 * 经纬度四至转弧度四至
 * @method
 * @param {Array<Number>} extent 经纬度四至，如：[112,23,120,30]
 * @returns {Array<Number>}  转换后的弧度四至
 */
export function extentToRadians(extent: number[]) {
  return extent.map((val) => degreesToRadians(val))
}

/**
 * 角度转弧度
 * @method
 * @param {Number} degrees 角度值
 * @returns {Number} 弧度值
 */
export function degreesToRadians(degrees: number) {
  const radians = CesiumMath.toRadians(degrees)
  return radians
}
