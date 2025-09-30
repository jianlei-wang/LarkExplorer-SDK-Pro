import {
  Cartesian3,
  Cesium3DTileset,
  CustomShader,
  Matrix4,
  Transforms,
  UniformType,
} from "cesium"

/**
 * 模型压平参数配置接口
 * @property {number} [height=0] - 压平高度值，负值表示向下压平，正值表示向上隆起
 * @property {boolean} [outline=false] - 是否显示压平范围轮廓线
 */
export interface FlatOption {
  height?: number
  outline?: boolean
}

/**
 * 压平区域配置接口
 * @property {Cartesian3[]} positions - 定义压平区域的多边形顶点坐标数组
 * @property {string} id - 压平区域的唯一标识符
 */
export interface FlatRegionOption {
  positions: Cartesian3[]
  id: string
}

/**
 * 3DTiles模型压平处理类
 * 通过自定义着色器实现对指定区域内模型的高度压平效果
 */
class Flatten {
  /** 压平高度值 */
  private _flatHeight: number
  /** 模型中心点坐标 */
  private _center: Cartesian3 | undefined
  /** 模型局部坐标系到世界坐标系的变换矩阵 */
  private _matrix!: Matrix4
  /** 世界坐标系到模型局部坐标系的逆变换矩阵 */
  private _localMatrix!: Matrix4
  /** 压平区域配置列表 */
  private _regionList: FlatRegionOption[]
  /** 压平区域顶点在模型局部坐标系中的坐标数组 */
  private _localPositionsArr: Array<number[][]>

  /**
   * 创建3DTiles模型压平实例
   * @param {Cesium3DTileset} tileset - 需要进行压平操作的三维模型对象
   * @param {FlatOption} [option={}] - 压平参数配置
   * @throws {Error} 当模型对象无效时抛出异常
   */
  constructor(private tileset: Cesium3DTileset, option: FlatOption = {}) {
    // 初始化压平区域列表
    this._regionList = []
    // 初始化局部坐标数组
    this._localPositionsArr = []

    // 设置压平高度，默认为0
    this._flatHeight = option.height || 0

    // 验证模型对象有效性
    if (!tileset) {
      throw new Error("3DTiles模型异常，未检索到进行压平操作的模型对象")
    }

    // 计算模型中心点和坐标变换矩阵
    this._center = tileset.boundingSphere.center.clone()
    this._matrix = Transforms.eastNorthUpToFixedFrame(this._center.clone())
    this._localMatrix = Matrix4.inverse(this._matrix, new Matrix4())
  }

  /**
   * 添加压平区域
   * @param {FlatRegionOption} region - 压平区域配置参数
   */
  addRegion(region: FlatRegionOption) {
    this._regionList.push(region)
    this.calculateStr()
  }

  /**
   * 根据ID移除压平区域
   * @param {string} id - 要移除的压平区域唯一标识符
   */
  removeRegionById(id: string) {
    if (!id) return
    this._regionList = this._regionList.filter((region) => region.id != id)
    this._localPositionsArr = []
    this.calculateStr()
  }

  /**
   * 计算并更新压平着色器字符串
   * 将压平区域坐标转换为局部坐标并生成对应的着色器代码
   */
  private calculateStr() {
    // 遍历所有压平区域，将世界坐标转换为模型局部坐标
    for (let i = 0; i < this._regionList.length; i++) {
      let { positions } = this._regionList[i]
      let localCoord = this.car3ToLocal(positions)
      this._localPositionsArr.push(localCoord)
    }

    // 生成点在多边形内的判断函数字符串
    const funStr = this.strInPolygonFun(this._localPositionsArr)
    let str = ``

    // 为每个压平区域生成对应的着色器判断逻辑
    for (let i = 0; i < this._localPositionsArr.length; i++) {
      const coors = this._localPositionsArr[i]
      const n = coors.length
      let instr = ``

      // 将多边形顶点坐标赋值给着色器变量
      coors.forEach((coordinate, index) => {
        instr += `points_${n}[${index}] = vec2(${coordinate[0]}, ${coordinate[1]});\n`
      })

      // 生成压平处理逻辑：如果点在多边形内，则应用压平变换
      str += `
              ${instr}
              if(isPointInPolygon_${n}(position2D)){
                // 创建压平后的局部坐标
                vec4 tileset_local_position_transformed = vec4(tileset_local_position.x, tileset_local_position.y, ground_z, 1.0);
                // 转换回模型坐标系
                vec4 model_local_position_transformed = czm_inverseModel * u_tileset_localToWorldMatrix * tileset_local_position_transformed;
                // 更新顶点坐标
                vsOutput.positionMC.xy = model_local_position_transformed.xy;
                vsOutput.positionMC.z = model_local_position_transformed.z + modelMC.z*0.0001;
                return;
              }
            `
    }

    // 更新自定义着色器
    this.updateShader(funStr, str)
  }

  /**
   * 销毁压平效果，恢复模型原始状态
   */
  destroy() {
    this.tileset.customShader = undefined
  }

  /**
   * 生成点在多边形内判断函数的GLSL代码
   * 根据多边形顶点数量生成对应的判断函数
   * @param {Array<number[][]>} polygons - 多边形顶点坐标数组
   * @returns {string} 生成的GLSL函数字符串
   */
  private strInPolygonFun(polygons: Array<number[][]>): string {
    // 获取所有多边形的顶点数量
    let pMap = polygons.map((polygon) => polygon.length)
    // 去重，避免生成重复的函数
    let uniqueArray = this.getUniqueArray(pMap)
    let str = ``

    // 为每种顶点数量的多边形生成对应的判断函数
    uniqueArray.forEach((length) => {
      str += `
              // 定义多边形顶点数组
              vec2 points_${length}[${length}];
              // 判断点是否在多边形内的函数
              bool isPointInPolygon_${length}(vec2 point){
                int nCross = 0; // 交点数
                const int n = ${length}; 
                // 遍历多边形的每条边
                for(int i = 0; i < n; i++){
                  vec2 p1 = points_${length}[i];
                  vec2 p2 = points_${length}[int(mod(float(i+1),float(n)))];
                  // 跳过水平边
                  if(p1[1] == p2[1]){ continue; }
                  // 检查点是否在边的y范围之外
                  if(point[1] < min(p1[1], p2[1])){ continue; }
                  if(point[1] >= max(p1[1], p2[1])){ continue; }
                  // 计算射线与边的交点x坐标
                  float x = p1[0] + ((point[1] - p1[1]) * (p2[0] - p1[0])) / (p2[1] - p1[1]);
                  // 如果交点在测试点右侧，增加交点数
                  if(x > point[0]){ nCross++; }
                }
                // 根据交点数的奇偶性判断点是否在多边形内
                return int(mod(float(nCross), float(2))) == 1;
              }
            `
    })
    return str
  }

  /**
   * 更新自定义着色器
   * @param {string} vtx1 - 点在多边形内判断函数字符串
   * @param {string} vtx2 - 压平处理逻辑字符串
   */
  private updateShader(vtx1: string, vtx2: string) {
    // 创建自定义着色器
    let flatCustomShader = new CustomShader({
      uniforms: {
        // 模型局部到世界的变换矩阵
        u_tileset_localToWorldMatrix: {
          type: UniformType.MAT4,
          value: this._matrix,
        },
        // 世界到模型局部的变换矩阵
        u_tileset_worldToLocalMatrix: {
          type: UniformType.MAT4,
          value: this._localMatrix,
        },
        // 压平高度值
        u_flatHeight: {
          type: UniformType.FLOAT,
          value: this._flatHeight,
        },
      },
      vertexShaderText: `
            // 包含所有点在多边形内的判断函数
            ${vtx1}
            void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput){
              // 获取模型顶点坐标
              vec3 modelMC = vsInput.attributes.positionMC;
              vec4 model_local_position = vec4(modelMC.x, modelMC.y, modelMC.z, 1.0);
              // 转换到模型局部坐标系
              vec4 tileset_local_position = u_tileset_worldToLocalMatrix * czm_model * model_local_position;
              vec2 position2D = vec2(tileset_local_position.x,tileset_local_position.y);
              // 计算压平后的基准高度
              float ground_z = 0.0 + u_flatHeight;
              // 应用多个多边形区域的压平处理
              ${vtx2}
            }`,
    })
    // 将自定义着色器应用到模型
    this.tileset.customShader = flatCustomShader
  }

  /**
   * 数组去重方法
   * @param {number[]} arr - 需要去重的数组
   * @returns {number[]} 去重后的数组
   */
  private getUniqueArray = (arr: number[]): number[] => {
    return arr.filter((item, index, arr) => arr.indexOf(item, 0) === index)
  }

  /**
   * 将世界坐标系下的笛卡尔坐标数组转换为模型局部坐标系下的二维坐标数组
   * @param {Cartesian3[]} positions - 世界坐标系下的坐标数组
   * @returns {number[][]} 模型局部坐标系下的二维坐标数组
   */
  private car3ToLocal(positions: Cartesian3[]): number[][] {
    let arr = []
    for (let i = 0; i < positions.length; i++) {
      let position = positions[i]
      // 应用逆变换矩阵将世界坐标转换为局部坐标
      let lp = Matrix4.multiplyByPoint(
        this._localMatrix,
        position,
        new Cartesian3()
      )
      // 只取x,y坐标，忽略z坐标（用于二维平面判断）
      arr.push([lp.x, lp.y])
    }
    return arr
  }
}

export default Flatten
