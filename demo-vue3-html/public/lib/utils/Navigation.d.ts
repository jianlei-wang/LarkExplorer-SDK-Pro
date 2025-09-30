import { Cartesian3 } from "cesium";
import { Viewer } from "src/core";
import { DegreePos, H_P_R } from "src/types";
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
/**
 * 获取比例尺，页面1px的距离，单位m
 */
export declare function getScale(viewer: Viewer): number;
/**
 * 获取地图四至，最小和最大经纬度
 */
export declare const viewExtend: (viewer: Viewer) => {
    minx: number;
    maxx: number;
    miny: number;
    maxy: number;
};
/**
 * 跳转到指定相机位置
 * @param viewer - 地图场景
 * @param {Cartesian3} position - 位置信息，笛卡尔坐标
 * @param {H_P_R} hpr - 姿态信息
 * @param {number} time - 跳转时间，单位秒
 * @param {boolean} degree - 传参类型是否为度
 * @param  callback - 回调函数
 */
export declare const flyToPos: (viewer: Viewer, position: Cartesian3 | DegreePos, hpr: H_P_R, time?: number, degree?: boolean, callback?: Function) => void;
/**
 * 跳转到指定四至范围
 * @param {*} viewer
 * @param {*} extent [西,南,东,北]-单位经纬度
 * @param {*} time
 * @param {*} callback
 */
export declare const flyToExtent: (viewer: Viewer, extent: number[], time?: number, callback?: Function) => void;
/**
 * 跳转到指定对象
 * @param viewer
 * @param item
 */
export declare function flyToItem(viewer: Viewer, item: any): void;
/**
 * 定位到指定对象
 * @param viewer
 * @param item
 */
export declare function zoomToItem(viewer: Viewer, item: any): void;
/**
 * 跳转到指定的经纬度点
 * @param viewer - 地图场景
 * @param x - 经度
 * @param y - 纬度
 * @param z - 高度
 * @param time - 跳转时间
 * @param callback -回调
 */
export declare function flyToDegree(viewer: Viewer, x: number, y: number, z: number, time: number, callback?: Function): void;
