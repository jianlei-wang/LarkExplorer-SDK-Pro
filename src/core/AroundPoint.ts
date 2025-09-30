import { Cartesian3, JulianDate, Matrix4, Math as CesiumMath } from "cesium"
import Viewer from "./Viewer"

class AroundPoint {
  private _time: number
  private _angle: number
  private _position: Cartesian3
  private _distance: number
  private _startTime: any
  /**
   * 绕点旋转类
   * @param {Object} viewer 地图场景对象
   * @param {Cartesian3} position 目标点坐标，笛卡尔坐标
   * @param {number} angle 观察角度，-90为垂直正视，建议值区间[-30,-40]
   * @param {number} amount 旋转360度所需要时间，单位：秒(s)
   * @param {number} distance 点距离相机距离，单位：米(m)
   */
  constructor(
    private viewer: Viewer,
    position: Cartesian3,
    angle: number,
    amount: number,
    distance: number
  ) {
    this._time = amount
    this._angle = angle
    this._position = position
    this._distance = distance
    this._startTime = JulianDate.fromDate(new Date())
  }

  _bindEvent() {
    this.viewer.clock.onTick.addEventListener(this._rotate, this)
  }

  _unbindEvent() {
    this.viewer.camera.lookAtTransform(Matrix4.IDENTITY)
    this.viewer.clock.onTick.removeEventListener(this._rotate, this)
  }

  _rotate() {
    let delTime = JulianDate.secondsDifference(
      this.viewer.clock.currentTime,
      this._startTime
    )
    const angle = 360 / this._time
    let heading = CesiumMath.toRadians(delTime * angle)
    this.viewer.scene.camera.setView({
      destination: this._position, // 点的坐标
      orientation: {
        heading: heading,
        pitch: CesiumMath.toRadians(this._angle),
      },
    })
    this.viewer.scene.camera.moveBackward(this._distance)
  }

  /**
   * 开始旋转
   * @returns {AroundPoint} 绕点旋转对象
   */
  start() {
    this.viewer.clock.shouldAnimate = true
    this._unbindEvent()
    this._bindEvent()
    return this
  }

  /**
   * 停止旋转
   * @returns {AroundPoint} 绕点旋转对象
   */
  stop() {
    this._unbindEvent()
    return this
  }

  /**
   * 注销对象
   */
  destroy() {
    this._unbindEvent()
  }
}

export default AroundPoint
