import { Primitive } from "cesium"
import { Viewer } from "src/core"
import { flyToExtent } from "../Navigation"

/**
 * 移除指定primitive
 * @param viewer - 地图场景
 * @param primitive - 待移除primitive对象
 */
export function removePrimitive(viewer: Viewer, primitive: Primitive) {
  primitive && viewer.scene.primitives.remove(primitive)
}

/**
 * 移除指定id的primitive
 * @param viewer - 地图场景
 * @param id - ID
 */
export function removePrimitiveById  (viewer: Viewer, id: string)  {
  const primitive = getPrimitiveById(viewer, id)
  removePrimitive(viewer, primitive)
}

/**
 * 根据id获取指定primitive图层
 * @param viewer
 * @param id
 * @returns
 */
export function getPrimitiveById (viewer: Viewer, id: string)  {
  const primitives = (viewer.scene.primitives as any)._primitives
  return primitives.find((layer: any) => layer.id === id)
}

/**
 * 跳转到primitive对象
 * @param {*} viewer
 * @param {*} item
 */
export const flyToPrimitive = (viewer:Viewer, item:any) => {
  if (!item.CusExtent) return
  flyToExtent(viewer, item.CusExtent)
}