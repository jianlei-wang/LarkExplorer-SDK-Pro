import { CameraStatus, DegreePos, ViewStatus } from "src/types"
import Viewer from "./Viewer"
import {
  Cartesian3,
  clone,
  defined,
  JulianDate,
  Matrix4,
  Scene,
  SceneMode,
  Transforms,
} from "cesium"
import { transformCartesianToWGS84 } from "src/utils/Coordinate"
import {
  flyToDegree,
  flyToExtent,
  flyToItem,
  flyToPos,
  getScale,
  viewExtend,
  zoomToItem,
} from "src/utils/Navigation"
import AroundPoint from "./AroundPoint"

class Navigation {
  private _homeCamera: CameraStatus
  private _rotation: Boolean
  /**
   * 导航主类
   * @param {Object} viewer 地图场景对象
   */
  constructor(private viewer: Viewer) {
    this._homeCamera = {
      degrees: { x: 102.778637, y: 34.673852, z: 7104159.98 },
      position: new Cartesian3(
        -2453733.1395831853,
        10818816.243349865,
        7649756.401418009
      ),
      hpr: { heading: 6.283185307179586, pitch: -1.5691401107287417, roll: 0 },
    }
    this._rotation = false
  }
  /**
   * 获取/设置初始视角
   * @type {CameraStatus}
   */
  get homeCamera() {
    return this._homeCamera
  }
  set homeCamera(cameraStatus: CameraStatus) {
    this._homeCamera = clone(cameraStatus, true)
  }

  /**
   * 地球自转状态
   * @type {Boolean}
   */
  get rotation() {
    return this._rotation
  }
  set rotation(bool: Boolean) {
    const { clock, scene } = this.viewer
    if (bool) {
      clock.multiplier = 2000
      scene.postUpdate.addEventListener(this.icrf, this)
    } else {
      clock.multiplier = 1.0
      scene.postUpdate.removeEventListener(this.icrf, this)
      this.viewer.camera.lookAtTransform(Matrix4.IDENTITY)
    }
  }

  /**
   * 当前相机状态
   * @readonly
   * @type {CameraStatus}
   */
  get cameraStatus() {
    const { position, heading, pitch, roll } = this.viewer.camera
    const degrees = transformCartesianToWGS84(position)
    const hpr = { heading, pitch, roll }
    return { degrees, position, hpr }
  }

  /**
   * 获取比例尺，页面1px的距离，单位m
   * @readonly
   * @type {number}
   *
   */
  get scale() {
    return getScale(this.viewer)
  }

  /**
   * 获取地图四至，最小和最大经纬度
   * @readonly
   * @type {ViewExtent}
   */
  get viewExtent() {
    return viewExtend(this.viewer)
  }

  /**
   * 跳转到初始视角，即homeCamera参数
   * @param {number} [time=2.0] -（可选）跳转时间，以秒为单位，默认2秒
   */
  homeView(time: number) {
    this.flyToPos(this._homeCamera, time || 2)
  }

  /**
   * 跳转到指定四至
   * @param {Array<Number>} extent 四至范围，格式：[west,south,east,north],单位经纬度
   * @param {Number} [time=2.0] 跳转时间，单位s，默认2秒
   * @param {Function} [callback] 回调函数，可以在其中写入跳转完成后执行方法
   */
  flyToExtent(extent: number[], time: number, callback?: Function) {
    flyToExtent(this.viewer, extent, time, callback)
  }

  /**
   * 跳转到指定视角
   * @param {ViewStatus} viewStatus 待跳转视角对象
   * @param {Number} [time=2.0] 跳转时间，单位秒(s)，默认2秒
   * @param {Boolean} [degree=false] 传参类型，欧拉角是否位经纬度。
   * 若degree=false，则{@link ViewStatus}的position为笛卡尔坐标，欧拉角单位为弧度；
   * 若degree=true，则{@link ViewStatus}的position为WGS84坐标，欧拉角单位为度
   * @param {Function} [callback] 回调函数，可以在其中写入跳转完成后执行方法
   */
  flyToPos(
    viewStatus: ViewStatus,
    time: number,
    degree = false,
    callback?: Function
  ) {
    const { position, hpr } = viewStatus
    const bool = typeof time === "number"
    flyToPos(this.viewer, position, hpr, bool ? time : 2, degree, callback)
  }

  /**
   * 定位到指定视角，仅限笛卡尔坐标和弧度参数
   * @param {ViewStatus} viewStatus
   */
  zoomToPos(viewStatus: ViewStatus) {
    this.flyToPos(viewStatus, 0)
  }

  /**
   * 跳转到指定对象
   * @param {Object} item - 待跳转对象，理论支持界面加载的所有对象
   */
  flyToItem(item: any) {
    flyToItem(this.viewer, item)
  }

  /**
   * 定位到指定对象
   * @param {Object} item - 待定位对象，理论支持界面加载的所有对象
   */
  zoomToItem(item: any) {
    zoomToItem(this.viewer, item)
  }

  /**
   * 跳转到指定坐标
   * @param {DegreePos} pos 待跳转坐标，WGS84坐标
   * @param {number} [time=2.0] 跳转时间，默认2秒
   * @param {Function} [callback] 回调函数，可以在其中写入跳转完成后执行方法
   */
  flyToDegree(pos: DegreePos, time: number, callback?: Function) {
    const { x, y, z = 0 } = pos
    const bool = typeof time === "number"
    flyToDegree(this.viewer, x, y, z, bool ? time : 2, callback)
  }

  /**
   * 定位到指定坐标
   * @param {DegreePos} pos 待跳转坐标，WGS84坐标
   * @param {Function} [callback] 回调函数，可以在其中写入跳转完成后执行方法
   */
  zoomToDegree(pos: DegreePos, callback?: Function) {
    this.flyToDegree(pos, 0, callback)
  }

  /**
   * 绕点旋转
   * @param {DegreePos} pos - 位置点，WGS84坐标
   * @param {number} angle 观察角度，-90为垂直正视，建议值区间[-30,-40]
   * @param {number} amount 旋转360度所需要时间，单位：秒(s)
   * @param {number} distance 点距离相机距离，单位：米(m)
   * @returns {AroundPoint} 绕点旋转对象
   */
  aroundPoint(pos: DegreePos, angle: number, time: number, distance: number) {
    const { x, y, z } = pos
    let aroundPoint = new AroundPoint(
      this.viewer,
      Cartesian3.fromDegrees(x, y, z),
      angle,
      time,
      distance
    )
    return aroundPoint
  }

  icrf() {
    if (this.viewer.scene.mode !== SceneMode.SCENE3D) {
      return true
    }

    const icrfToFixed = Transforms.computeIcrfToFixedMatrix(
      this.viewer.clock.currentTime
    )

    if (defined(icrfToFixed)) {
      const camera = this.viewer.camera
      const offset = Cartesian3.clone(camera.position)
      const transform = Matrix4.fromRotationTranslation(icrfToFixed)
      camera.lookAtTransform(transform, offset)
    }
  }
}
export default Navigation
