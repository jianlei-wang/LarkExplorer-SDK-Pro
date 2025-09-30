import {
  Cartesian3,
  Cartographic,
  Cesium3DTileset,
  Math,
  Matrix4,
} from "cesium"
import { Viewer } from "src/core"
import { DEF_3DTILES_OPTION } from "../Default"
import { SetCusMark } from "./Layers"
import { DegreePos } from "src/types"

/**
 * 加载3DTiles图层
 * @param {*} viewer
 * @param {*} url
 * @param {*} height
 * @returns
 */
export async function load3Dtiles(
  viewer: Viewer,
  url: string,
  height?: number
) {
  let model = await Cesium3DTileset.fromUrl(url, DEF_3DTILES_OPTION)
  // 超出可视区的瓦片进行销毁，提高性能
  model.tileLoad.addEventListener((tile) => {
    tile.tileset.trimLoadedTiles()
  })
  height && offsetHeight(model, height)
  model = viewer.scene.primitives.add(model)
  SetCusMark(model, "primitive", "3dtiles", true)
  return model
}

/**
 * 加载3DTIles图层至指定位置
 * @param {*} viewer
 * @param {*} url
 * @param {*} pos
 */
export async function load3DtilesOnPos(
  viewer: Viewer,
  url: string,
  pos: DegreePos
) {
  let model = await Cesium3DTileset.fromUrl(url, DEF_3DTILES_OPTION)
  model.tileLoad.addEventListener((tile) => {
    tile.tileset.trimLoadedTiles()
  })
  pos && updatePos(model, pos)
  viewer.scene.primitives.add(model)
  SetCusMark(model, "primitive", "3dtiles", true)
  return model
}

/**
 * 调整3dtiles模型高度
 * @param model - 3dtiles模型
 * @param h - 调整后高度
 * @param lng - 调整后经度，WGS84坐标
 * @param lat - 调整后纬度，WGS84坐标
 */
export function updatePos(model: Cesium3DTileset, pos: DegreePos) {
  const { x, y, z = 0 } = pos
  //高度偏差，正数为向上偏，负数为向下偏，根据真实的模型位置不断进行调整
  //计算tileset的绑定范围
  var boundingSphere = model.boundingSphere
  //计算中心点位置
  var cartographic = Cartographic.fromCartesian(boundingSphere.center)
  const { longitude, latitude, height } = cartographic
  //计算中心点位置坐标
  var surface = Cartesian3.fromRadians(longitude, latitude, 0)
  const lng = x ? Math.toRadians(x) : longitude
  const lat = y ? Math.toRadians(y) : latitude
  //偏移后的三维坐标
  var offset = Cartesian3.fromRadians(lng, lat, z - height)
  var translation = Cartesian3.subtract(offset, surface, new Cartesian3())
  //tileset.modelMatrix转换
  model.modelMatrix = Matrix4.fromTranslation(translation)
}

export function offsetHeight(model: Cesium3DTileset, height: number) {
  //高度偏差，正数为向上偏，负数为向下偏，根据真实的模型位置不断进行调整
  //计算tileset的绑定范围
  var boundingSphere = model.boundingSphere
  //计算中心点位置
  var cartographic = Cartographic.fromCartesian(boundingSphere.center)
  const { longitude, latitude } = cartographic
  //计算中心点位置坐标
  var surface = Cartesian3.fromRadians(longitude, latitude, 0)

  //偏移后的三维坐标
  var offset = Cartesian3.fromRadians(longitude, latitude, height)
  var translation = Cartesian3.subtract(offset, surface, new Cartesian3())
  //tileset.modelMatrix转换
  model.modelMatrix = Matrix4.fromTranslation(translation)
}

/**
 * 移除3dtiles图层
 * @param viewer - 地图场景
 * @param model - 待移除模型
 */
export const remove3Dtiles = (viewer: Viewer, model: Cesium3DTileset) => {
  model && viewer.scene.primitives.remove(model)
}
