import { EventNameMap } from "src/utils/DefineObject"

/**
 * 事件回调列表类型（事件类型到回调函数数组的映射）
 * @type
 * @typedef {Map<EventType, Function[]>} Events
 */
export type Events = Map<EventType, Function[]>

/**
 * 可用的事件类型（eventNameMap 的键名集合）
 * @type
 */
export type EventType = keyof typeof EventNameMap

/**
 * 3D WGS84坐标点
 * @interface
 * @property {number} x 经度X
 * @property {number} y 纬度y
 * @property {number} [z] 高度z，单位米
 */
export interface DegreePos {
  x: number
  y: number
  z?: number
}

/**
 * 屏幕坐标
 * @interface
 * @property {number} x 屏幕位置X
 * @property {number} y 屏幕位置y
 */
export interface WindowPos {
  x: number
  y: number
}
