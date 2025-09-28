import * as Cesium from "cesium";
import EventEmitter from "./EventEmitter";
import Terrain from "./Terrain";
import Layers from "./Layers";
import Handler from "./Handler";
/**
 * 地图场景配置扩展接口
 * @interface
 * @extends Cesium.Viewer.ConstructorOptions
 * @property {string} [defaultKey] - Cesium Icon资源key
 * @property {boolean} [fpsShow=false] - 是否显示帧率，默认不显示
 * @property {boolean} [mapboxController=false] - 是否采用Mapbox控制模式（左键拖动，中间缩放，右键视角），默认不开启
 */
interface ViewOption extends Cesium.Viewer.ConstructorOptions {
    defaultKey?: string;
    fpsShow?: boolean;
    mapboxController?: boolean;
}
declare class Viewer extends Cesium.Viewer {
    options?: ViewOption | undefined;
    /**
     * 创建地图场景实例
     * @extends Cesium.Viewer
     * @param {Element | string} container - DOM元素或元素ID，作为地图容器
     * @param {ViewOption} [options] - 地图配置选项（合并默认配置）
     * @description
     * 增强版地图场景类，继承自 Cesium.Viewer，提供了更丰富的功能和配置选项。
     * @example
     * // 创建地图实例
     * const viewer = new Viewer('cesiumContainer', {
     *   timeline: true,
     *   scene3DOnly: false
     * });
     */
    constructor(container: Element | string, options?: ViewOption | undefined);
    /**
     * Cesium事件发射器实例
     * @type {EventEmitter}
     */
    EventHandler: EventEmitter;
    /**
     * 地图Handler句柄主类，关联地图点击通用方法
     * @type {Handler}
     */
    Handlers: Handler;
    /**
     * 地形主类，地形相关方法
     * @type {Terrain}
     */
    Terrain: Terrain;
    /**
     * 图层主类，图层相关方法
     * @type {Layers}
     */
    Layers: Layers;
    /**
     * 初始化基础场景配置
     * @private
     * @method
     * @description
     * 执行以下配置：
     * 1. 地形深度检测
     * 2. 天体显示设置
     * 3. 光照设置
     * 4. 碰撞检测
     * 5. 版权信息隐藏
     * 6. 高DPI适配
     * 7. Cesium Icon资源key设置
     */
    private initBaseConfig;
    /**
     * 控制帧率显示
     * @type {Boolean}
     */
    get fps(): boolean;
    set fps(show: boolean);
    /**
     * 地图画布大小，例如：{width:1920,height:1080}
     * @type {Object}
     * @readonly
     */
    get size(): {
        width: number;
        height: number;
    };
    /**
     * 当前地图场景图片，base64格式
     * @type {String}
     * @readonly
     */
    get image(): string;
    /**
     * 场景底图
     * Cesium机制是最底层的图层为_isBaseLayer，通过lowerToBottom来控制
     * @type {Cesium.ImageryLayer} imagery 参考Cesium的ImageryLayer
     */
    get baseImagery(): Cesium.ImageryLayer;
    set baseImagery(imagery: Cesium.ImageryLayer);
}
export default Viewer;
