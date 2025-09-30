import {
  Cartesian2,
  Cartographic,
  Math as CesiumMath,
  Cartesian3,
  Rectangle,
} from "cesium"
import { Viewer } from "src/core"
import { calculateDis, extentToRadians } from "./Coordinate"
import { DegreePos, H_P_R } from "src/types"
import { DEF_HPR } from "./Default"
import { layerType } from "./layers/Layers"
import { flyToEntity, zoomToEntity } from "./layers/Entity"
import { flyTo3DTiles, zoomTo3DTiles } from "./layers/3DTiles"
import { flyToPrimitive } from "./layers/Primitive"

/**
 * 获取地图尺寸
 */
export function mapSize(viewer: Viewer) {
  const { width, height } = viewer.canvas
  return { width, height }
}

/**
 * 获取地图图片
 */
export function mapImg(viewer: Viewer) {
  viewer.render() //避免出现导出是一张黑乎乎的图片
  return viewer.scene.canvas.toDataURL("image/png")
}

/**
 * 获取比例尺，页面1px的距离，单位m
 */
export function getScale(viewer: Viewer) {
  const { width, height } = mapSize(viewer)
  let midX = Math.floor(width / 2)
  let midY = Math.floor(height / 2)
  let leftPos, rightPos
  do {
    leftPos = viewer.camera.pickEllipsoid(new Cartesian2(midX, midY))
    rightPos = viewer.camera.pickEllipsoid(new Cartesian2(midX + 2, midY))
    if (!leftPos || !rightPos) {
      midX -= 1
    }
  } while (!leftPos || !rightPos)
  const lg = Cartographic.fromCartesian(leftPos)
  const rg = Cartographic.fromCartesian(rightPos)
  const lon1 = CesiumMath.toDegrees(lg.longitude)
  const lat1 = CesiumMath.toDegrees(lg.latitude)
  const lon2 = CesiumMath.toDegrees(rg.longitude)
  const lat2 = CesiumMath.toDegrees(rg.latitude)
  const distance = calculateDis(lon1, lat1, lon2, lat2)
  return distance / 2
}

/**
 * 获取地图四至，最小和最大经纬度
 */
export const viewExtend = (viewer: Viewer) => {
  const { camera, scene } = viewer
  let params = { minx: 0, maxx: 0, miny: 0, maxy: 0 }
  let extend = camera.computeViewRectangle()
  if (typeof extend === "undefined") {
    //2D下会可能拾取不到坐标，extend返回undefined,因此作如下转换
    let canvas = scene.canvas
    let upperLeft = new Cartesian2(0, 0) //canvas左上角坐标转2d坐标
    let lowerRight = new Cartesian2(canvas.clientWidth, canvas.clientHeight) //canvas右下角坐标转2d坐标

    let ellipsoid = scene.globe.ellipsoid
    let upperLeft3 = camera.pickEllipsoid(upperLeft, ellipsoid) //2D转3D世界坐标

    let lowerRight3 = camera.pickEllipsoid(lowerRight, ellipsoid) //2D转3D世界坐标

    let upperLeftCartographic = scene.globe.ellipsoid.cartesianToCartographic(
      upperLeft3!
    ) //3D世界坐标转弧度
    let lowerRightCartographic = scene.globe.ellipsoid.cartesianToCartographic(
      lowerRight3!
    ) //3D世界坐标转弧度

    let minx = CesiumMath.toDegrees(upperLeftCartographic.longitude) //弧度转经纬度
    let maxx = CesiumMath.toDegrees(lowerRightCartographic.longitude) //弧度转经纬度

    let miny = CesiumMath.toDegrees(lowerRightCartographic.latitude) //弧度转经纬度
    let maxy = CesiumMath.toDegrees(upperLeftCartographic.latitude) //弧度转经纬度

    params.minx = minx
    params.maxx = maxx
    params.miny = miny
    params.maxy = maxy
  } else {
    //3D获取方式
    params.maxx = CesiumMath.toDegrees(extend.east)
    params.maxy = CesiumMath.toDegrees(extend.north)
    params.minx = CesiumMath.toDegrees(extend.west)
    params.miny = CesiumMath.toDegrees(extend.south)
  }
  // 返回屏幕所在经纬度范围
  return params
}

/**
 * 跳转到指定相机位置
 * @param viewer - 地图场景
 * @param {Cartesian3} position - 位置信息，笛卡尔坐标
 * @param {H_P_R} hpr - 姿态信息
 * @param {number} time - 跳转时间，单位秒
 * @param {boolean} degree - 传参类型是否为度
 * @param  callback - 回调函数
 */
export const flyToPos = (
  viewer: Viewer,
  position: Cartesian3 | DegreePos,
  hpr: H_P_R,
  time = 2,
  degree = false,
  callback?: Function
) => {
  const { x, y, z } = position
  const { heading, pitch, roll } = hpr || DEF_HPR
  const _pos: Cartesian3 = degree
    ? Cartesian3.fromDegrees(x, y, z)
    : (position as Cartesian3)
  const _hpr = degree
    ? {
        heading: CesiumMath.toRadians(heading),
        pitch: CesiumMath.toRadians(pitch),
        roll: CesiumMath.toRadians(roll),
      }
    : hpr
  viewer.camera.flyTo({
    destination: _pos,
    orientation: _hpr,
    duration: time,
    complete: () => {
      callback && typeof callback === "function" && callback()
    },
  })
}

/**
 * 跳转到指定四至范围
 * @param {*} viewer
 * @param {*} extent [西,南,东,北]-单位经纬度
 * @param {*} time
 * @param {*} callback
 */
export const flyToExtent = (
  viewer: Viewer,
  extent: number[],
  time = 2,
  callback?: Function
) => {
  const ex = extentToRadians(extent)
  const rectangle = new Rectangle(ex[0], ex[1], ex[2], ex[3])
  viewer.camera.flyTo({
    destination: rectangle,
    duration: time,
    complete: () => {
      callback && typeof callback === "function" && callback()
    },
  })
}

/**
 * 跳转到指定对象
 * @param viewer
 * @param item
 */
export function flyToItem(viewer: Viewer, item: any) {
  const type = layerType(item)
  switch (type.toLowerCase()) {
    case "entity":
      flyToEntity(viewer, item)
      break
    case "3dtiles":
      flyTo3DTiles(viewer, item)
      break
    case "primitive":
      flyToPrimitive(viewer, item)
      break
    default:
      break
  }
}

/**
 * 定位到指定对象
 * @param viewer
 * @param item
 */
export function zoomToItem(viewer: Viewer, item: any) {
  const type = layerType(item)
  switch (type.toLowerCase()) {
    case "entity":
      zoomToEntity(viewer, item)
      break
    case "3dtiles":
      zoomTo3DTiles(viewer, item)
      break

    default:
      break
  }
}

/**
 * 跳转到指定的经纬度点
 * @param viewer - 地图场景
 * @param x - 经度
 * @param y - 纬度
 * @param z - 高度
 * @param time - 跳转时间
 * @param callback -回调
 */
export function flyToDegree(
  viewer: Viewer,
  x: number,
  y: number,
  z: number,
  time: number,
  callback?: Function
) {
  const position = Cartesian3.fromDegrees(x, y, z)
  viewer.camera.flyTo({
    destination: position,
    duration: time,
    complete: () => {
      callback && typeof callback === "function" && callback()
    },
  })
}
