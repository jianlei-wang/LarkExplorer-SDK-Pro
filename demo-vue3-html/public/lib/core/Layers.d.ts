import Viewer from "./Viewer";
import { Add } from "./layers/AddCreator";
declare class Layers {
    private viewer;
    Add: Add;
    /**
     * 地形主类
     * @param {Viewer} viewer
     * @see {@link Add} - 添加对象类
     */
    constructor(viewer: Viewer);
    /**
     * 所有场景中的图层
     */
    get _layers(): {
        entities: any;
        imageryLayers: any;
        primitives: any;
        dataSources: any;
    };
    /**
     * 根据id获取图层
     * @param {String} id 待获取图层id
     * @returns 图层对象
     */
    getById(id: string): any;
    /**
     * 移除指定图层
     * @param {Object} layer 待移除图层
     */
    remove(layer: any): void;
    /**
     * 移除指定ID图层
     * @param {String} id 图层Id
     */
    removeById(id: string): void;
}
export default Layers;
