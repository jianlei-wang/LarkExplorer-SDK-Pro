// Cesium Icon资源key
export const CesiumIcon =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYjUwNWQyOC0yZmZhLTRmMzItOTQyZC02ZmQyMWIyMTA3NmEiLCJpZCI6NjcyNzcsImlhdCI6MTY2ODE1ODc2Mn0.t1h6-ZADkGnZUZZoLtrlgtTp8_MR2Kxfhew42ksDgmk"

// 天地图token
export const TDT_KEY = "51f791b33368bb3935997fa43031a7ec"

// 3DTiles模型默认参数
export const DEF_3DTILES_OPTION = {
  skipLevelOfDetail: true,
  preferLeaves: true,
  maximumMemoryUsage: 256, // 内存分配变小有利于倾斜摄影数据回收，提升性能体验
  baseScreenSpaceError: 256,
  maximumScreenSpaceError: 16, // 数值加大，能让最终成像变模糊
  skipScreenSpaceErrorFactor: 16,
  skipLevels: 2, //lod级别加载
  immediatelyLoadDesiredLevelOfDetail: true,
  loadSiblings: true, // 如果为true则不会在已加载完概况房屋后，自动从中心开始超清化房屋
  cullWithChildrenBounds: true,
  cullRequestsWhileMoving: true,
  cullRequestsWhileMovingMultiplier: 1, // 值越小能够更快的剔除
  preloadWhenHidden: true,
  progressiveResolutionHeightFraction: 1, // 数值偏于0能够让初始加载变得模糊
  dynamicScreenSpaceErrorDensity: 1, // 数值加大，能让周边加载变快
  dynamicScreenSpaceErrorFactor: 1, // 暂时未知作用
  dynamicScreenSpaceError: true, // 根据测试，有了这个后，会在真正的全屏加载完之后才清晰化房屋
}
