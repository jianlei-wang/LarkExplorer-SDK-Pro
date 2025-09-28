import { ImageryLayer } from "cesium"
import { Viewer } from "src/core"

/**
 * 移除影像图层
 * @param {Object} viewer 地图场景对象
 * @param layer 待移除图层
 */
export function removeImageryLayer(viewer: Viewer, layer: ImageryLayer) {
  layer && viewer.imageryLayers.remove(layer)
}

/**
 * 根据Id返回对应的Imagery（影像图层）
 * @param {Viewer} viewer
 * @param {string} id
 * @returns
 */
export function getImageryById(viewer: Viewer, id: string): ImageryLayer {
  const imageryList = (viewer.imageryLayers as any)._layers
  return imageryList.find((imagery: any) => imagery.id === id)
}
