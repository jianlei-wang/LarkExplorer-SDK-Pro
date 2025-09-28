import {
  Entity,
  BillboardCollection,
  Primitive,
  GroundPrimitive,
  GroundPolylinePrimitive,
  Cesium3DTileset,
  ImageryLayer,
} from "cesium"
import { Viewer } from "src/core"
import { getEntityById, removeEntity } from "./Entity"
import { getPrimitiveById, removePrimitive } from "./Primitive"
import { getImageryById, removeImageryLayer } from "./Imagery"

/**
 * 获取场景中所有的图层
 * @param viewer
 * @returns
 */
export function getAllLayers(viewer: Viewer) {
  //@ts-ignore
  const entities = viewer.entities._entities._array
  //@ts-ignore
  const imageryLayers = viewer.imageryLayers._layers
  //@ts-ignore
  const primitives = viewer.scene.primitives._primitives
  //@ts-ignore
  const dataSources = viewer.dataSources._dataSources
  return { entities, imageryLayers, primitives, dataSources }
}

/**
 * 给图层打上自定义标记，便于删除
 * @param item - 待标记对象
 * @param type - 对象类型["imagerylayer","entity","primitive","particle"]
 * @param geo - 对象几何类型["WebMapTileServiceImageryProvider","Point","SpreadPoint","Polyline","Polygon","Circle","Radar","Model","fire","Billboard","panel"]
 * @param pick - 是否支持点选
 */
export function SetCusMark(item: any, type: string, geo: string, pick = true) {
  item.CustomType = type
  item.CustomGeo = geo
  item.AllowPick = pick
}

/**
 * 返回图层类型
 * @param layer 图层对象
 * @returns 图层类型：Entity/Primitive/3DTiles/ImageryLayer
 */
export function layerType(layer: any): string {
  if (layer instanceof Entity) return "Entity"
  if (
    layer instanceof BillboardCollection ||
    layer instanceof Primitive ||
    layer instanceof GroundPrimitive ||
    layer instanceof GroundPolylinePrimitive
  )
    return "Primitive"
  if (layer instanceof Cesium3DTileset) return "3DTiles"
  if (layer instanceof ImageryLayer) return "ImageryLayer"
  return layer.CustomType
}

/**
 * 移除指定图层
 * @param viewer - 地图场景
 * @param layer - 待移除图层
 */
export function removeLayer(viewer: Viewer, layer: any) {
  const type = layerType(layer)
  switch (type.toLowerCase()) {
    case "entity":
      removeEntity(viewer, layer)
      break
    case "primitive":
      removePrimitive(viewer, layer)
      break
    case "3dtiles":
      // remove3Dtiles(viewer, layer)
      break
    case "imagerylayer":
      removeImageryLayer(viewer, layer)
      break
    default:
      break
  }
}

/**
 * 根据id获取图层
 * @param {*} viewer
 * @param {*} id
 * @returns
 */
export function getLayerById(viewer: Viewer, id: string) {
  let layer =
    getEntityById(viewer, id) ||
    getPrimitiveById(viewer, id) ||
    getImageryById(viewer, id)
  return layer
}
