import { Viewer } from "src/core";
/**
 * 判断是否已经加载地形数据
 * @param viewer - 地图场景
 * @returns 是否已经加载地形
 */
export declare const boolTerrain: (viewer: Viewer) => import("cesium").TileAvailability | undefined;
