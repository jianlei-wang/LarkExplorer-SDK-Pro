import { Viewer } from "src/core"

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
