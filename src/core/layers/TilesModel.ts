import {
  load3Dtiles,
  load3DtilesOnPos,
  updatePos,
} from "src/utils/layers/3DTiles"
import Viewer from "../Viewer"
import { DegreePos } from "src/types"
import { Cesium3DTileset, viewerCesium3DTilesInspectorMixin } from "cesium"
import Flatten from "./3dtiles/Flatten"

class TilesModel {
  private _inspector: boolean
  /**
   * 模型主类
   * @param {Viewer} viewer - 地图场景对象
   */
  constructor(private viewer: Viewer) {
    this._inspector = false
  }
  /**
   * 模型压平类
   */
  public Flatten = Flatten

  /**
   * 控制3Dtiles调试面板
   * @type {Boolean}
   */
  get inspectorGUI() {
    return this._inspector
  }
  set inspectorGUI(show: boolean) {
    this._inspector = show
    show
      ? this.viewer.extend(viewerCesium3DTilesInspectorMixin)
      : console.log("关闭")
  }

  /**
   * 加载3Dtiles模型
   * @param {string} url - 模型地址
   * @param {number} [height=0] - 可选：高度偏差，正数为向上偏，负数为向下偏，根据真实的模型位置不断进行调整
   * @returns {Promise<Cesium.Cesium3DTileset>} 模型对象，Cesium3DTile类对象，参考Cesium
   */
  async add3DTiles(url: string, height = 0) {
    const model = await load3Dtiles(this.viewer, url, height)
    return model
  }

  /**
   * 加载3Dtiles模型到指定位置
   * @param {string} url - 模型地址
   * @param {DegreePos} position - 设置模型位置，WGS84经纬度格式
   * @returns {Promise<Cesium.Cesium3DTileset>} 模型对象，Cesium.Cesium3DTile类对象，参考Cesium
   */
  async add3DTilesOnPos(url: string, position: DegreePos) {
    const model = await load3DtilesOnPos(this.viewer, url, position)
    return model
  }

  /**
   * 调整3DTiles模型位置
   * @param {Cesium.Cesium3DTileset} model 待调整模型对象
   * @param {DegreePos} position 设置模型位置，WGS84经纬度格式
   * @returns {Cesium.Cesium3DTileset} 模型对象，Primitive类对象，参考Cesium
   */
  update3DTiles(model: Cesium3DTileset, position: DegreePos) {
    updatePos(model, position)
    return model
  }
}
export default TilesModel
