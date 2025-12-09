import {
  getAllLayers,
  getLayerById,
  removeLayer,
} from "src/utils/layers/Layers"
import Viewer from "./Viewer"
import { Add, Creator } from "./layers/AddCreator"
import TilesModel from "./layers/TilesModel"

class Layers {
  /**
   * 地形主类
   * @param {Viewer} viewer
   * @see {@link Add} - 添加对象类
   */
  constructor(private viewer: Viewer) {}

  /**
   * 图层-添加对象类
   * @type {Add}
   */
  public Add: Add = new Add(this.viewer)

  /**
   * 图层-创建对象类
   * @type {Creator}
   */
  public Creator: Creator = new Creator(this.viewer)

  /**
   * 模型图层对象类
   * @type {TilesModel}
   */
  public TilesModel: TilesModel = new TilesModel(this.viewer)

  /**
   * 所有场景中的图层
   */
  get _layers() {
    return getAllLayers(this.viewer)
  }

  /**
   * 根据id获取图层
   * @param {String} id 待获取图层id
   * @returns 图层对象
   */
  getById(id: string) {
    return getLayerById(this.viewer, id)
  }

  /**
   * 移除指定图层
   * @param {Object} layer 待移除图层
   */
  remove(layer: any) {
    removeLayer(this.viewer, layer)
  }
  /**
   * 移除指定ID图层
   * @param {String} id 图层Id
   */
  removeById(id: string) {
    const layer = this.getById(id)
    layer && this.remove(layer)
  }
}
export default Layers
