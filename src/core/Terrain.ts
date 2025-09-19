import {
  EllipsoidTerrainProvider,
  NearFarScalar,
  TerrainProvider,
} from "cesium"
import Viewer from "./Viewer"
import { boolTerrain } from "src/utils/Terrain"

class Terrain {
  private _viewer: Viewer
  private _alpha: number
  constructor(viewer: Viewer) {
    this._viewer = viewer
    this._alpha = 1.0
    this._updateTranslucency(false)
  }
  /**
   * 地形对象，参考Cesium的TerrainProvider类
   * @readonly
   * @type {TerrainProvider}
   */
  get provider() {
    return this._viewer.terrainProvider
  }

  /**
   * 地形夸张系数
   * @type {Number}
   */
  get exaggeration() {
    return this._viewer.scene.verticalExaggeration
  }
  set exaggeration(scale) {
    this._viewer.scene.verticalExaggeration = scale
  }

  /**
   * 是否显示地形（借助于地形夸张调整）
   * @param {boolean} bool
   */
  set show(bool: boolean) {
    const terrain = boolTerrain(this._viewer)
    if (!terrain) return
    this.exaggeration = bool ? 1 : 0
  }

  /**
   * 地表透明度，只有在开启碰撞检测的时候才能生效
   * @type {Number}
   */
  get alpha() {
    return this._alpha
  }
  set alpha(val) {
    this._updateAlpha(val)
    this._alpha = val
  }

  /**
   * 地表碰撞检测
   * @type {Boolean}
   */
  get translucency() {
    return this._viewer.scene.globe.translucency.enabled
  }
  set translucency(bool) {
    this._updateTranslucency(bool)
  }

  /**
   * 是否允许进入地下
   * @type {Boolean}
   */
  get enableUnderground() {
    return !this._viewer.scene.screenSpaceCameraController
      .enableCollisionDetection
  }
  set enableUnderground(bool) {
    this._viewer.scene.screenSpaceCameraController.enableCollisionDetection =
      !bool
  }

  _updateAlpha(val: number) {
    const frontFaceAlphaByDistance =
      this._viewer.scene.globe.translucency.frontFaceAlphaByDistance
    frontFaceAlphaByDistance.nearValue = val
    frontFaceAlphaByDistance.farValue = val
  }

  _updateTranslucency(bool: boolean) {
    this._viewer.scene.globe.translucency.frontFaceAlphaByDistance =
      new NearFarScalar(1.5e2, 0.5, 8.0e6, 1.0)
    this._viewer.scene.globe.translucency.enabled = bool //是否开启透明
    this._updateAlpha(this._alpha)
  }
}

export default Terrain
