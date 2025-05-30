import { Viewer } from "cesium";
import { EventType } from "src/types";
declare class EventEmitter {
    viewer: Viewer;
    /**
     * 创建事件处理器实例
     * @param {Viewer} viewer - Cesium 的视图器对象
     * @description
     * 基于 Cesium 的屏幕空间事件处理器扩展类，支持多回调函数管理
     * @example
     * const emitter = new EventEmitter(viewer);
     * emitter.on('leftClick', (event) => console.log('Clicked:', event.position));
     */
    constructor(viewer: Viewer);
    /** @private 原生的 Cesium 屏幕空间事件处理器 */
    private handler;
    /** @private 存储事件及其回调函数的映射表 */
    private events;
    /**
     * 绑定指定事件类型的回调函数
     * @param {EventType} eventName - 要监听的事件名称（参见 eventNameMap 的键名）
     * @param {Function} callback - 事件触发时的回调函数
     * @throws {Error} 当 eventName 不是有效的事件类型时
     */
    on(eventName: EventType, callback: Function): void;
    /**
     * 移除指定事件类型的回调函数
     * @param {EventType} eventName - 要移除的事件名称
     * @param {Function} [callback] - 要移除的特定回调函数（不传则移除该事件所有回调）
     */
    off(eventName: EventType, callback?: Function): void;
    /**
     * 清空所有已注册的事件和回调
     */
    clear(): void;
}
export default EventEmitter;
