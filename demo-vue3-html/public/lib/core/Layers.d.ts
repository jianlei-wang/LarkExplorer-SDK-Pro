import Viewer from "./Viewer";
import { Add } from "./layers/AddCreator";
declare class Layers {
    private viewer;
    Add: Add;
    /**
     * 地形主类
     * @param {Viewer} viewer
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
}
export default Layers;
