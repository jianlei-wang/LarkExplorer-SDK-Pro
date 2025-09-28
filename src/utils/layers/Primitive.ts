import { Primitive } from "cesium"
import { Viewer } from "src/core"

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
export const removePrimitiveById = (viewer: Viewer, id: string) => {
  const primitive = getPrimitiveById(viewer, id)
  removePrimitive(viewer, primitive)
}

/**
 * 根据id获取指定primitive图层
 * @param viewer
 * @param id
 * @returns
 */
export const getPrimitiveById = (viewer: Viewer, id: string) => {
  const primitives = (viewer.scene.primitives as any)._primitives
  return primitives.find((layer: any) => layer.id === id)
}
