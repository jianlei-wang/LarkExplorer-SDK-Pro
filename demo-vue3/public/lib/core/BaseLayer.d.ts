import { ImageryLayer, Terrain } from "cesium";
/**
 * 基础图层类，包括影像底图和地形底图
 */
declare const BaseLayer: {
    /**
     * 默认单图像底图
     * @readonly
     * @type {ImageryLayer}
     */
    readonly DefaultSingleImg: ImageryLayer;
    /**
     * 默认arcgis底图
     * @readonly
     * @type {ImageryLayer}
     */
    readonly DefaultArcgisImg: ImageryLayer;
    /**
     * 默认天地图影像地图
     * @readonly
     * @type {ImageryLayer}
     */
    readonly DefaultTdtImg: ImageryLayer;
    /**
     * 默认天地图矢量地图
     * @readonly
     * @type {ImageryLayer}
     */
    readonly DefaultTdtVec: ImageryLayer;
    /**
     * 默认全球地形
     * @readonly
     * @type {Terrain}
     */
    readonly DefaultTerrain: Terrain;
    /**
     * 获取tms格式地形
     * @param {String} url - 地形文件路径，如：http://localhost:80/terrain/
     * @returns {Terrain} - tms格式地形对象
     */
    getTerrain(url: string): Terrain;
};
export default BaseLayer;
