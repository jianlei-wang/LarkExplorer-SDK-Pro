import {
  BillboardCollection,
  Cartesian3,
  Color,
  defined,
  GeoJsonDataSource,
  HeightReference,
  JulianDate,
  Resource,
  VerticalOrigin,
} from "cesium"
import { Viewer } from "src/core"
import BillboardGraphic, {
  BillboardOption,
} from "src/core/graphics/BillboardGraphics"

export interface JsonFilter {
  str: string
  value: BillboardOption
}
export interface JsonFilterOptions {
  key: string
  filters: Array<JsonFilter>
}

export function geojsonPoints(
  viewer: Viewer,
  geojson: string | any,
  options: BillboardOption,
  filterOption?: JsonFilterOptions
) {
  console.time("pointTime")
  const billboardCollection = viewer.scene.primitives.add(
    new BillboardCollection()
  )
  console.log(options)
  const defOpt = new BillboardGraphic(options)
  console.log(defOpt.value)
  GeoJsonDataSource.load(geojson)
    .then((data) => {
      console.log("加载数据：", data)
      const points = data.entities.values.slice(0, 100)
      for (let index = 0; index < points.length; index++) {
        const { position } = points[index]
        if (defined(position)) {
          const pos = position!.getValue(JulianDate.now())
          billboardCollection.add({ position: pos, ...defOpt.value })
        }
      }
      console.timeEnd("pointTime")
    })
    .catch((err) => {
      console.log("加载失败！！")
      throw new Error(err)
    })
    .finally(() => {
      console.log("加载成功！！")
    })
}
