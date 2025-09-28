import { initPickGlobal } from "src/utils/handler/PickHandler"
import Viewer from "./Viewer"

class Handler {
  /**
   * 地图Handler句柄主类
   * @param viewer
   */
  constructor(private viewer: Viewer) {}

  /**
   * 开启全局对象拾取(针对于矢量和wms服务数据)
   * @param {Boolean} bool - 是否开启
   * @param {Function} callback - 回调函数，返回拾取对象集合
   */
  pickEnabled(bool: boolean, callback?: Function) {
    this.viewer.EventHandler.offEvents(["leftClick", "mouseMove"])
    bool && initPickGlobal(this.viewer, callback)
  }

  /**
   * 重置鼠标事件
   */
  reset() {
    this.viewer.EventHandler.clear()
  }
}

export default Handler
