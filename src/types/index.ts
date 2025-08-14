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
 * @typedef EventType
 */
export type EventType = keyof typeof EventNameMap

