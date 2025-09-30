import { Cartesian3 } from "src/types/CesiumTypes"
import Viewer from "../Viewer"

import {
  PointEntityAdd,
  PointPrimitiveAdd,
} from "src/utils/create-add/PointAdd"
import { PointOption } from "../graphics/PointGraphics"
import { addWaters, WaterOptions } from "src/utils/create-add/WaterAdd"

export class Add {
  /**
   * 图层-添加对象类
   * @param  {Viewer} viewer 地图场景对象
   */
  constructor(private viewer: Viewer) {}

  /**
   * 添加点-Primitive形式
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

  addWaters(options: WaterOptions) {
    const waterPrimitives = addWaters(this.viewer, options)
    return waterPrimitives
  }
}
