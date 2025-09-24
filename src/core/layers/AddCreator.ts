import { Cartesian3 } from "src/types/CesiumTypes"
import Viewer from "../Viewer"

import {
  PointEntityAdd,
  PointPrimitiveAdd,
} from "src/utils/create-add/PointAdd"
import { PointOption } from "../graphics/PointGraphics"
import { SetCusMark } from "src/utils/layers/Layers"

export class Add {
  /**
   * 图层-添加对象类
   * @param  {Viewer} viewer 地图场景对象
   */
  constructor(private viewer: Viewer) {}

  /**
   * 添加点-Primitive形式
   * @param {Cartesian3} position 点位置，笛卡尔坐标
   * @param {PointOption} options 点参数
   * @returns {Cesium.Primitive} 点对象，Primitive类对象，参照Cesium
   */
  addPointPrimitive(position: Cartesian3, options: PointOption) {
    const pointPrimitive = PointPrimitiveAdd(this.viewer, [position], [options])
    return pointPrimitive
  }
  addPointEntity(position: Cartesian3, options: PointOption) {
    const pointEntity = PointEntityAdd(this.viewer, [position], [options])
    return pointEntity
  }
}
