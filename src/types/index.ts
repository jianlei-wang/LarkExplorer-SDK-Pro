import { eventNameMap } from "src/core/DefineObject"

/**
 * 事件回调列表类型（事件类型到回调函数数组的映射）
 * @typedef {Map<EventType, Function[]>} Events
 */
export type Events = Map<EventType, Function[]>

/**
 * 可用的事件类型（eventNameMap 的键名集合）
 * @typedef {keyof typeof eventNameMap} EventType
 */
export type EventType = keyof typeof eventNameMap
