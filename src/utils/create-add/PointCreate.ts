import { PointGraphics, Viewer } from "src/core"
import { PointOption } from "src/core/graphics/PointGraphics"
import { getCatesian3FromPX } from "../Coordinate"
import { ConstantPositionProperty, Entity } from "cesium"
import { safeCallback } from "../Generate"

/**
 * 创建点对象
 * @param viewer
 * @param option
 * @param callback
 */
export function PointCreate(
  viewer: Viewer,
  option: PointOption,
  callback: Function
) {
  let point: Entity
  viewer.ReminderTip.message = "左键点击地图添加点对象，右键结束添加"
  viewer.ReminderTip.show = true
  viewer.EventHandler.on("leftClick", (e: any) => {
    let pixPos = e.position
    let cartesian = getCatesian3FromPX(viewer, pixPos)
    if (!cartesian) return
    if (point) {
      point.position = new ConstantPositionProperty(cartesian)
    } else {
      option = new PointGraphics(option).value
      point = viewer.entities.add({
        id: option.id,
        name: "Point-Create",
        position: cartesian,
        point: option,
      })
    }
  })
  viewer.EventHandler.on("rightClick", () => {
    viewer.EventHandler.offEvents(["leftClick", "rightClick"])
    viewer.ReminderTip.show = false
    safeCallback(callback, point)
  })
}
