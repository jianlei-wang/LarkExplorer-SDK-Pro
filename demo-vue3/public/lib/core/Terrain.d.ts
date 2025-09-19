import { TerrainProvider } from "cesium";
import Viewer from "./Viewer";
declare class Terrain {
    private _viewer;
    private _alpha;
    constructor(viewer: Viewer);
    /**
     * 地形对象，参考Cesium的TerrainProvider类
     * @readonly
     * @type {TerrainProvider}
     */
    get provider(): TerrainProvider;
    /**
     * 地形夸张系数
     * @type {Number}
     */
    get exaggeration(): number;
    set exaggeration(scale: number);
    /**
     * 是否显示地形（借助于地形夸张调整）
     * @param {boolean} bool
     */
    set show(bool: boolean);
    /**
     * 地表透明度，只有在开启碰撞检测的时候才能生效
     * @type {Number}
     */
    get alpha(): number;
    set alpha(val: number);
    /**
     * 地表碰撞检测
     * @type {Boolean}
     */
    get translucency(): boolean;
    set translucency(bool: boolean);
    /**
     * 是否允许进入地下
     * @type {Boolean}
     */
    get enableUnderground(): boolean;
    set enableUnderground(bool: boolean);
    _updateAlpha(val: number): void;
    _updateTranslucency(bool: boolean): void;
}
export default Terrain;
