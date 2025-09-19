import { Viewer } from "cesium";
/**
 * 获取地图尺寸
 */
export declare function mapSize(viewer: Viewer): {
    width: number;
    height: number;
};
/**
 * 获取地图图片
 */
export declare function mapImg(viewer: Viewer): string;
