import { Entity } from "cesium"
import { Viewer } from "src/core"

/**
 * 移除指定entity
 * @param viewer - 地图场景
 * @param entity - 待移除对象
 */
export function removeEntity(viewer: Viewer, entity: Entity | any) {
  const children = entityChildren(entity)
  children &&
    children.forEach((ele: Entity) => {
      removeEntity(viewer, ele)
    })
  entity.PostRender && entity.PostRender()
  entity.CustomDom && viewer.container.removeChild(entity.CustomDom)
  viewer.entities.remove(entity)
}

/**
 * 移除指定id的entity
 * @param viewer - 地图场景
 * @param id - ID
 */
export function removeEntityById(viewer: Viewer, id: string) {
  const entity = getEntityById(viewer, id)
  entity && removeEntity(viewer, entity)
}

/**
 * 获取entity的子对象
 * @param entity - entity对象
 * @returns - 子对象集合
 */
export function entityChildren(entity: Entity) {
  return (entity as any)._children
}

/**
 * 根据id获取entity
 * @param id
 */
export function getEntityById(viewer: Viewer, id: string) {
  return viewer.entities.getById(id)
}
