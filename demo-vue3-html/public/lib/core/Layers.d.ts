import Viewer from "./Viewer";
import { Add, Creator } from "./layers/AddCreator";
import TilesModel from "./layers/TilesModel";
declare class Layers {
    private viewer;
    /**
     * 地形主类
     * @param {Viewer} viewer
     * @see {@link Add} - 添加对象类
     */
    constructor(viewer: Viewer);
    /**
     * 图层-添加对象类
     * @type {Add}
     */
    Add: Add;
    /**
     * 图层-创建对象类
     * @type {Creator}
     */
    Creator: Creator;
    /**
     * 模型图层对象类
     * @type {TilesModel}
     */
    TilesModel: TilesModel;
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
