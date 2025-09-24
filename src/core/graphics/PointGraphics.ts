import { PointGraphics, HeightReference, Color, ConstantProperty } from "cesium"
import { randomId } from "src/utils/Generate"

/**
 * 点几何属性参数类型
 * @interface
 * @extends  Cesium.PointGraphics.ConstructorOptions
 * @property {string} [id="随机值"] - 点对象唯一id，不传参数情况下自动生成，如936e0deb-c208-4098-9959-327e519e63e2
 * @property {string} [pColor="#ff0000"] - 点填充颜色
 * @property {string} [pOutlineColor="#ffff00"] - 点轮廓线颜色
 * @property {boolean} [onGround=true] - 是否贴地
 * @property {boolean} [allowPick=true] - 是否支持点选
 * @property {Cesium.Color} [color=Cesium.Color.RED] - 指定点颜色的属性
 * @property {Cesium.Color} [outlineColor=Cesium.Color.YELLOW] -	指定轮廓颜色的属性
 * @property {number} [pixelSize=1] - 指定大小（以像素为单位）的数字属性
 * @property {number} [outlineWidth=0] - 指定轮廓宽度（以像素为单位）的数字属性
 * @property {Cesium.HeightReference} [heightReference=HeightReference.RELATIVE_TO_GROUND] - 指定高度相对于什么的属性
 * @property {Cesium.NearFarScalar} [scaleByDistance] - 用于根据距离缩放点
 * @property {Cesium.SplitDirection} [splitDirection] - 指定要应用于此点的 SplitDirection 拆分的属性
 * @property {Cesium.NearFarScalar} [translucencyByDistance] - 用于根据与摄像机的距离设置半透明
 * @property {number} [disableDepthTestDistance] - 一个属性，指定与相机的距离，在该相机上禁用深度测试
 * @property {Cesium.DistanceDisplayCondition} [distanceDisplayCondition] - 一个属性，指定该点将显示在距摄像机的距离处
 * @property {object} [featureAttribute] - 一个属性，指定该点所携带的对象属性表
 */
export interface PointOption extends PointGraphics.ConstructorOptions {
  pColor?: string
  pOutlineColor?: string
  onGround?: boolean
  allowPick?: boolean
  id?: string
  featureAttribute?: object
}

class PointGraphic extends PointGraphics {
  private _onGround: boolean
  private _pColor: string
  private _pOutlineColor: string
  private _allowPick: ConstantProperty
  private _id: string
  private _featureAttribute: ConstantProperty
  /**
   * 点几何属性参数类
   * @extends Cesium.PointGraphics
   * @param {PointOption} [options] - 点集合属性参数选项
   */

  constructor(options: PointOption = {}) {
    super()
    this.merge(options as PointGraphics)
    const {
      onGround,
      pColor,
      pOutlineColor,
      allowPick,
      id,
      featureAttribute = {},
    } = options
    this._onGround = onGround || true
    this.updateHr(this._onGround)
    this._pColor = pColor || "#ff0000"
    this.updateColor(this._pColor)
    this._pOutlineColor = pOutlineColor || "#ffff00"
    this.updateOutlineColor(this._pOutlineColor)
    this._allowPick = new ConstantProperty(allowPick || true)
    this._id = id || randomId()
    this._featureAttribute = new ConstantProperty({
      id: this._id,
      ...featureAttribute,
    })
  }

  /**
   * 点几何属性参数值
   */
  get value() {
    const {
      color,
      outlineColor,
      pixelSize,
      outlineWidth,
      heightReference,
      scaleByDistance,
      show,
      splitDirection,
      translucencyByDistance,
      disableDepthTestDistance,
      distanceDisplayCondition,
      allowPick,
      featureAttribute,
      id,
    } = this
    const props: any = {
      color,
      outlineColor,
      pixelSize,
      outlineWidth,
      heightReference,
      scaleByDistance,
      show,
      splitDirection,
      translucencyByDistance,
      disableDepthTestDistance,
      distanceDisplayCondition,
      allowPick,
      featureAttribute,
      id,
    }
    const result: Record<string, any> = {}
    console.log("测试问题开始：", props)
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
   * 点唯一id
   */
  get id() {
    return this._id
  }

  /**
   * 点贴地设置
   */
  get onGround() {
    return this._onGround
  }
  set onGround(bool: boolean) {
    this._onGround = bool
    this.updateHr(bool)
  }

  /**
   * 点填充颜色
   */
  get pColor() {
    return this._pColor
  }
  set pColor(val: string) {
    this._pColor = val
    this.updateColor(val)
  }

  /**
   * 点轮廓线填充颜色
   */
  get pOutlineColor() {
    return this._pColor
  }
  set pOutlineColor(val: string) {
    this._pOutlineColor = val
    this.updateOutlineColor(val)
  }

  /**
   * 点对象点选设置
   */
  get allowPick() {
    return this._allowPick.getValue()
  }
  set allowPick(bool: boolean) {
    this._allowPick = new ConstantProperty(bool)
  }

  /**
   * 点对象属性表
   */
  get featureAttribute() {
    return this._featureAttribute
  }
  set featureAttribute(val: object) {
    this._featureAttribute = new ConstantProperty(val)
  }

  updateHr(bool: boolean) {
    this.heightReference = bool
      ? new ConstantProperty(HeightReference.CLAMP_TO_GROUND).getValue()
      : new ConstantProperty(HeightReference.NONE).getValue()
  }

  updateColor(color: string) {
    this.color = new ConstantProperty(
      Color.fromCssColorString(color)
    ).getValue()
  }

  updateOutlineColor(color: string) {
    this.outlineColor = new ConstantProperty(
      Color.fromCssColorString(color)
    ).getValue()
  }
}
export default PointGraphic
