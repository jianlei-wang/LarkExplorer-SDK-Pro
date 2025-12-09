import { Cartesian3 } from "src/types/CesiumTypes"
import Viewer from "../Viewer"

import {
  PointEntityAdd,
  PointPrimitiveAdd,
} from "src/utils/create-add/PointAdd"
import { PointOption } from "../graphics/PointGraphics"
import { addWaters, WaterOptions } from "src/utils/create-add/WaterAdd"
import WaterPrimitive, {
  WaterReflectionOption,
} from "src/utils/layers/WaterPrimitive"
import { PointCreate } from "src/utils/create-add/PointCreate"
import { randomId, safeCallback } from "src/utils/Generate"
import { geojsonPoints } from "src/utils/layers/Geojson"
import { BillboardOption } from "../graphics/BillboardGraphics"

class Add {
  /**
   * 图层-添加对象类
   * @param  {Viewer} viewer 地图场景对象
   */
  constructor(private viewer: Viewer) {}

  /**
   * 添加点-Primitive形式
   * @method
   * @param {Cartesian3} position 点位置，笛卡尔坐标
   * @param {PointOption} option 点参数
   * @returns {Cesium.Primitive} 点对象，Primitive类对象，参照Cesium
   */
  async addPointPrimitive(position: Cartesian3, option: PointOption) {
    const pointPrimitive = await PointPrimitiveAdd(
      this.viewer,
      [position],
      [option]
    )
    return pointPrimitive
  }
  /**
   * 添加点集-Primitive形式
   * @param {Cartesian3[]} positions 点位置，笛卡尔坐标
   * @param {PointOption[]} options 点参数
   * @returns {Cesium.Primitive} 点对象，Primitive类对象，参照Cesium
   */
  async addPointPrimitives(positions: Cartesian3[], options: PointOption[]) {
    const pointPrimitive = await PointPrimitiveAdd(
      this.viewer,
      positions,
      options
    )
    return pointPrimitive
  }
  /**
   * 添加点-Entity形式
   * @param {Cartesian3} position 点位置，笛卡尔坐标集合
   * @param {PointOption} option 点参数
   * @returns {Cesium.Entity} 点对象，Entity类对象，参照Cesium
   */
  addPointEntity(position: Cartesian3, option: PointOption) {
    const pointEntity = PointEntityAdd(this.viewer, [position], [option])
    return pointEntity
  }

  /**
   * 添加点集-Entity形式
   * @param {Cartesian3[]} positions 点位置，笛卡尔坐标集合
   * @param {PointOption[]} options 点参数
   * @returns {Cesium.Entity} 点对象，Entity parent类对象，参照Cesium
   */
  addPointEntities(positions: Cartesian3[], options: PointOption[]) {
    const pointEntity = PointEntityAdd(this.viewer, positions, options)
    return pointEntity
  }

  /**
   * 添加水面-普通模式
   * @param {WaterOptions} options - 水面对象条件
   * @returns {Cesium.Primitive} - 水面对象，Primitive类对象，参照Cesium
   */
  addWaters(options: WaterOptions) {
    const waterPrimitives = addWaters(this.viewer, options)
    return waterPrimitives
  }

  /**
   * 添加动态水面-支持倒影
   * @param {WaterReflectionOption} options - 水面对象条件
   * @returns {WaterPrimitive} - 水面对象，WaterPrimitive类
   */
  addWaterReflection(options: WaterReflectionOption) {
    return new WaterPrimitive(this.viewer, options)
  }

  /**
   * 加载Geojson
   * @param type
   * @param json
   * @param options
   */
  addGeojson(
    type: "Point" | "Polyline" | "Polygon",
    json: string | object,
    options: BillboardOption = {}
  ) {
    geojsonPoints(this.viewer, json, options)
  }
}
class Creator {
  private _editingId: string // 当前正在创建的对象ID
  /**
   * 图层-创建对象类
   * @param  {Viewer} viewer 地图场景对象
   */
  constructor(private viewer: Viewer) {
    this._editingId = ""
  }

  /**
   * 初始化创建状态
   */
  private _initStatus() {
    this._editingId != "" && this.viewer.Layers.removeById(this._editingId)
    this.viewer.EventHandler.offEvents([
      "leftClick",
      "mouseMove",
      "rightClick",
      "leftDblClick",
    ])
  }

  /**
   * 创建点对象
   * @param {PointOption} option - 点参数
   * @param {Function} [callback] - 创建完成回调函数
   */
  createPoint(option: PointOption = {}, callback?: Function) {
    this._initStatus()
    this._updateOptID(option)
    PointCreate(this.viewer, option, (point: any) => {
      this._editingId = ""
      safeCallback(callback, point)
    })
  }

  /**
   * 更新创建对象ID
   * @param option
   */
  private _updateOptID(option: any) {
    if (!option.id) {
      option.id = "point-" + randomId()
    }
    this._editingId = option.id
  }
}
export { Add, Creator }
