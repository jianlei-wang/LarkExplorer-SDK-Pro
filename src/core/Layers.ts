import { getAllLayers } from "src/utils/layers/Layers"
import Viewer from "./Viewer"
import { Add } from "./layers/AddCreator"

class Layers {
  Add: Add
  /**
   * 地形主类
   * @param {Viewer} viewer
   */
  constructor(private viewer: Viewer) {
    this.Add = new Add(this.viewer)
  }

  /**
   * 所有场景中的图层
   */
  get _layers() {
    return getAllLayers(this.viewer)
  }
}
export default Layers
