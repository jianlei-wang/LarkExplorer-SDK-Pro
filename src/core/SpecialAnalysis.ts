import Heatmap3D from "./analysis/heatmap/Heatmap3D"
import Viewer from "./Viewer"

class SpecialAnalysis {
  Heatmap3D: typeof Heatmap3D
  constructor(private viewer: Viewer) {
    this.Heatmap3D = Heatmap3D
  }
}

export default SpecialAnalysis
