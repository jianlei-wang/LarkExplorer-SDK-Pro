import { Viewer } from "src/core"
import { getCatesian3FromPX } from "../Coordinate"
import { defined } from "cesium"
import { safeCallback } from "../Generate"

/**
 * 开启全局拾取
 * @param viewer
 * @param handler
 * @param callback
 */
export function initPickGlobal(viewer: Viewer, callback?: Function) {
  viewer.EventHandler.on("leftClick", async (e: any) => {
    const pos = getCatesian3FromPX(viewer, e.position)
    if (!defined(pos)) return
    let pick = viewer.scene.drillPick(e.position) // 获取 pick 拾取对象
    // 优先拾取矢量
    // 判断是否获取到了 pick 对象
    if (defined(pick) && pick.length > 0) {
      safeCallback(callback, { pos, pick })
      return
    }
    //  WMS 类拾取
    let pickRay = viewer.camera.getPickRay(e.position)
    if (defined(pickRay)) {
      // 判断是否拾取到了WMS对象
      let featuresPromise = await viewer.imageryLayers.pickImageryLayerFeatures(
        pickRay,
        viewer.scene
      )
      const imagery = featuresPromise && featuresPromise[0]
      if (imagery != null && imagery.imageryLayer) {
        safeCallback(callback, { pos, pick: imagery })
        return
      }
    }
  })

  viewer.EventHandler.on("mouseMove", (e: any) => {
    let endPos = e.endPosition
    let pick = viewer.scene.pick(endPos)
    document.body.style.cursor = defined(pick) ? "pointer" : "default"
  })
}
