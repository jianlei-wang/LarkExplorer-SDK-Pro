import {
  PointPrimitiveCollection,
  Cartesian3 as Car3,
  Color,
  Entity,
} from "cesium"
import { PointGraphics, Viewer } from "src/core"
import { PointOption } from "src/core/graphics/PointGraphics"
import { Cartesian3 } from "src/types/CesiumTypes"
import { SetCusMark } from "../layers/Layers"

/**
 * 地图添加点数据-Primitive形式
 * @param viewer
 * @param positions
 * @param options
 * @returns
 */
export function PointPrimitiveAdd(
  viewer: Viewer,
  positions: Cartesian3[],
  options: PointOption[] = []
) {
  const primitive = viewer.scene.primitives.add(new PointPrimitiveCollection())
  for (let index = 0; index < positions.length; index++) {
    const option = new PointGraphics(options[index]).value
    const position = positions[index]
    const point = {
      position: position,
      ...option,
    }
    SetCusMark(primitive, "primitive", "point", option.allowPick)
    primitive.add(point)
  }
  return primitive
}

export function PointEntityAdd(
  viewer: Viewer,
  positions: Cartesian3[],
  options: PointOption[] = []
) {
  const parent = viewer.entities.add(new Entity())
  for (let index = 0; index < positions.length; index++) {
    const position = positions[index]
    const option = new PointGraphics(options[index]).value
    const point = viewer.entities.add({
      parent,
      id: option.id,
      name: "Point",
      position: position,
      point: option,
    })
    SetCusMark(point, "entity", "point", option.allowPick)
  }
  return parent
}
