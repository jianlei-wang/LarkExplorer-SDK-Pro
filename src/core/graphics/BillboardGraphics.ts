import {
  BillboardGraphics,
  ConstantProperty,
  HeightReference,
  VerticalOrigin,
} from "cesium"
import { DEF_POINT_IMG } from "src/utils/Default"
import { randomId } from "src/utils/Generate"
/**
 * 广告版几何属性参数类型
 * @interface
 * @extends  Cesium.BillboardGraphics.ConstructorOptions
 * @property {string} [id="随机值"] - 对象唯一id，不传参数情况下自动生成，如936e0deb-c208-4098-9959-327e519e63e2
 * @property {boolean} [onGround=true] - 是否贴地
 * @property {boolean} [allowPick=true] - 是否支持点选
 * @property {object} [featureAttribute] - 一个属性，指定该点所携带的对象属性表
 * @link https://cesium.com/learn/cesiumjs/ref-doc/BillboardGraphics.html#.ConstructorOptions
 */
export interface BillboardOption extends BillboardGraphics.ConstructorOptions {
  onGround?: boolean
  allowPick?: boolean
  id?: string
  featureAttribute?: object
}

/**
 * 广告版几何属性参数类
 * @extends Cesium.BillboardGraphics
 * @param {BillboardOption} [options] - 广告版集合属性参数选项
 */
class BillboardGraphic extends BillboardGraphics {
  private _onGround: boolean | undefined
  private _allowPick: ConstantProperty
  private _id: any
  private _featureAttribute: ConstantProperty
  constructor(options: BillboardOption = {}) {
    super()
    this.merge(options as BillboardGraphics)
    const {
      onGround,
      allowPick,
      id,
      featureAttribute = {},
      image,
      verticalOrigin,
    } = options
    this._onGround = onGround
    this.updateHr(this._onGround)
    this._allowPick = new ConstantProperty(allowPick)
    this._id = id || randomId()
    this._featureAttribute = new ConstantProperty({
      id: this._id,
      ...featureAttribute,
    })
    this.image = new ConstantProperty(image || DEF_POINT_IMG)
    this.verticalOrigin = new ConstantProperty(
      verticalOrigin || VerticalOrigin.BOTTOM
    )
  }

  /**
   * 广告版几何属性参数值
   */
  get value() {
    const {
      onGround,
      allowPick,
      id,
      featureAttribute,
      color,
      heightReference,
      scaleByDistance,
      show,
      splitDirection,
      translucencyByDistance,
      disableDepthTestDistance,
      distanceDisplayCondition,
      width,
      height,
      image,
      verticalOrigin,
      horizontalOrigin,
    } = this
    const props: any = {
      onGround,
      allowPick,
      id,
      featureAttribute,
      color,
      heightReference,
      scaleByDistance,
      show,
      splitDirection,
      translucencyByDistance,
      disableDepthTestDistance,
      distanceDisplayCondition,
      width,
      height,
      image,
      verticalOrigin,
      horizontalOrigin,
    }
    const result: Record<string, any> = {}
    for (const key in props) {
      const prop = props[key]
      if (prop && typeof prop.getValue === "function") {
        const value = prop.getValue()
        if (value !== undefined && value !== null) {
          result[key] = value
        }
      } else if (prop !== undefined && prop !== null) {
        result[key] = prop
      }
    }
    return result
  }

  /**
   * 广告版唯一id
   */
  get id() {
    return this._id
  }

  /**
   * 广告版贴地设置
   */
  get onGround() {
    return this._onGround
  }
  set onGround(bool: boolean | undefined) {
    this._onGround = bool
    this.updateHr(bool)
  }
  /**
   * 广告版对象点选设置
   */
  get allowPick() {
    return this._allowPick.getValue()
  }
  set allowPick(bool: boolean) {
    this._allowPick = new ConstantProperty(bool)
  }

  /**
   * 广告版对象属性表
   */
  get featureAttribute() {
    return this._featureAttribute
  }
  set featureAttribute(val: object) {
    this._featureAttribute = new ConstantProperty(val)
  }

  updateHr(bool: boolean | undefined) {
    this.heightReference = bool
      ? new ConstantProperty(HeightReference.CLAMP_TO_GROUND)
      : new ConstantProperty(HeightReference.NONE)
  }
}

export default BillboardGraphic
