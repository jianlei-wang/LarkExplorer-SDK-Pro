# larkexplorer-sdk-pro

[**版本日志**](./CHANGES.md) | [**历史日志**](./LOG.md)

`larkexplorer-sdk-pro` 是基于开源项目 `Cesium` 进行二次开发的二三维一体的 `WebGis` 应用框架，该框架优化了部分 `Cesium` 的使用方式并基于业务开发相应功能方法，旨在为开发者快速构建 `WebGis` 应用。

```warning
Tips：本框架是 JS+GIS 的框架包。开发者需要有一定的前端技术和 GIS 相关技术，以下为老版SDK导航

SDK下载地址（最新版本）：https://app.larkview.cn/larkexplorersdk/download/release/sdk.zip

SDK下载地址（特定版本）：https://app.larkview.cn/larkexplorersdk/download/版本号/sdk.zip

SDK开发指南（含组件库）：https://app.larkview.cn/sdk-docs/

SDK在线demo：https://app.larkview.cn/larkexplorersdk/demo/#/

SDK在线API文档：https://app.larkview.cn/larkexplorersdk/api-docs/

SDK组件库：https://www.npmjs.com/package/larkexplorer-ui

```

## 快速开始

### 1.npm引入

```bash
npm i larkexplorer-sdk-pro --save-dev
```

### 2.创建基础地球——以在vue3中使用为例

```typescript
<script setup lang="ts">
import { Viewer, BaseLayer } from 'larkexplorer-sdk-pro';
import * as Cesium from 'cesium';
import { nextTick, onMounted } from 'vue';
onMounted(() => {
  nextTick(() => {
    window.viewer = new Viewer('map', {
      baseLayer: BaseLayer.DefaultSingleImg,
    });
    console.log(window.viewer);
  });
});
</script>

<template>
  <div id="map"></div>
</template>

<style scoped lang="scss">
#map {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
```

### 3. 注意：若出现Cesium静态文件访问出错

```bash
// 引入vite-plugin-cesium插件
npm i vite-plugin-cesium --save-dev
```

vite.config.ts配置

```typescript
import cesium from "vite-plugin-cesium"

export default defineConfig({
  plugins: [cesium()],
})
```

## 版权声明

```warning
☆ 北京东方至远科技股份有限公司 || Beijing Vastitude Technology Co.,Ltd ☆
```

## 谢谢
