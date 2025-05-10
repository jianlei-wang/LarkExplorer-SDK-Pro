(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('cesium')) :
    typeof define === 'function' && define.amd ? define(['exports', 'cesium'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.LarkExplorer = {}, global.Cesium));
})(this, (function (exports, Cesium) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var Cesium__namespace = /*#__PURE__*/_interopNamespace(Cesium);

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    /**
     * Cesium 事件类型映射表（自定义事件名称到 Cesium 原生事件类型的映射）
     * @readonly
     * @enum {number}
     * @property {ScreenSpaceEventType} leftDown - 鼠标左键按下事件
     * @property {ScreenSpaceEventType} leftUp - 鼠标左键释放事件
     * @property {ScreenSpaceEventType} leftClick - 鼠标左键单击事件
     * @property {ScreenSpaceEventType} leftDblClick - 鼠标左键双击事件
     * @property {ScreenSpaceEventType} rightDown - 鼠标右键按下事件
     * @property {ScreenSpaceEventType} rightUp - 鼠标右键释放事件
     * @property {ScreenSpaceEventType} rightClick - 鼠标右键单击事件
     * @property {ScreenSpaceEventType} middleDown - 鼠标中键按下事件
     * @property {ScreenSpaceEventType} middleUp - 鼠标中键释放事件
     * @property {ScreenSpaceEventType} middleClick - 鼠标中键单击事件
     * @property {ScreenSpaceEventType} mouseMove - 鼠标移动事件
     * @property {ScreenSpaceEventType} wheel - 鼠标滚轮滚动事件
     * @property {ScreenSpaceEventType} pinchStart - 触摸屏双指手势开始事件
     * @property {ScreenSpaceEventType} pinchEnd - 触摸屏双指手势结束事件
     * @property {ScreenSpaceEventType} pinchMove - 触摸屏双指手势移动事件
     */
    var eventNameMap = {
        leftDown: Cesium.ScreenSpaceEventType.LEFT_DOWN,
        leftUp: Cesium.ScreenSpaceEventType.LEFT_UP,
        leftClick: Cesium.ScreenSpaceEventType.LEFT_CLICK,
        leftDblClick: Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
        rightDown: Cesium.ScreenSpaceEventType.RIGHT_DOWN,
        rightUp: Cesium.ScreenSpaceEventType.RIGHT_UP,
        rightClick: Cesium.ScreenSpaceEventType.RIGHT_CLICK,
        middleDown: Cesium.ScreenSpaceEventType.MIDDLE_DOWN,
        middleUp: Cesium.ScreenSpaceEventType.MIDDLE_UP,
        middleClick: Cesium.ScreenSpaceEventType.MIDDLE_CLICK,
        mouseMove: Cesium.ScreenSpaceEventType.MOUSE_MOVE,
        wheel: Cesium.ScreenSpaceEventType.WHEEL,
        pinchStart: Cesium.ScreenSpaceEventType.PINCH_START,
        pinchEnd: Cesium.ScreenSpaceEventType.PINCH_END,
        pinchMove: Cesium.ScreenSpaceEventType.PINCH_MOVE,
    };

    // 基于 Cesium 的屏幕空间事件处理器扩展类，支持多回调函数管理
    var EventEmitter = /** @class */ (function () {
        /**
         * @param {Viewer} viewer - Cesium 的视图器对象
         * @description
         * 基于 Cesium 的屏幕空间事件处理器扩展类，支持多回调函数管理
         * @example
         * const emitter = new EventEmitter(viewer);
         * emitter.on('leftClick', (event) => console.log('Clicked:', event.position));
         */
        function EventEmitter(viewer) {
            this.viewer = viewer;
            /** @private 原生的 Cesium 屏幕空间事件处理器 */
            this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas);
            /** @private 存储事件及其回调函数的映射表 */
            this.events = new Map();
        }
        /**
         * 绑定指定事件类型的回调函数
         * @param {EventType} eventName - 要监听的事件名称（参见 eventNameMap 的键名）
         * @param {Function} callback - 事件触发时的回调函数
         * @throws {Error} 当 eventName 不是有效的事件类型时
         */
        EventEmitter.prototype.on = function (eventName, callback) {
            var _this = this;
            if (!this.events.has(eventName)) {
                this.events.set(eventName, []);
                this.handler.setInputAction(function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var callbacks = _this.events.get(eventName);
                    callbacks === null || callbacks === void 0 ? void 0 : callbacks.forEach(function (callback) {
                        callback.apply(void 0, args);
                    });
                }, eventNameMap[eventName]);
            }
            this.events.get(eventName).push(callback);
        };
        /**
         * 移除指定事件类型的回调函数
         * @param {EventType} eventName - 要移除的事件名称
         * @param {Function} [callback] - 要移除的特定回调函数（不传则移除该事件所有回调）
         */
        EventEmitter.prototype.off = function (eventName, callback) {
            if (!this.events.has(eventName))
                return;
            if (callback) {
                var callbacks = this.events.get(eventName);
                var index = callbacks.indexOf(callback);
                if (index !== -1) {
                    callbacks.splice(index, 1);
                }
            }
            else {
                this.events.delete(eventName);
            }
        };
        /**
         * 清空所有已注册的事件和回调
         */
        EventEmitter.prototype.clear = function () {
            this.events.clear();
        };
        return EventEmitter;
    }());

    // Cesium Icon资源key
    var CesiumIcon = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYjUwNWQyOC0yZmZhLTRmMzItOTQyZC02ZmQyMWIyMTA3NmEiLCJpZCI6NjcyNzcsImlhdCI6MTY2ODE1ODc2Mn0.t1h6-ZADkGnZUZZoLtrlgtTp8_MR2Kxfhew42ksDgmk";
    // 天地图token
    var TDT_KEY = "51f791b33368bb3935997fa43031a7ec";

    /*
     * 通用方法
     * @Author: jianlei wang
     * @Date: 2025-04-23 09:42:04
     * @Last Modified by: jianlei wang
     * @Last Modified time: 2025-04-23 11:07:26
     */
    /**
     * 获取静态资源文件
     * @param path 静态资源路径
     * @returns 静态资源在线路径
     */
    function getStaticFile(path) {
        return new URL("./static/".concat(path), (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT' && document.currentScript.src || new URL('larkexplorer.umd.js', document.baseURI).href))).href;
    }

    /**
     * 天地图，获取参数
     * @param type 地图类型：img-影像，vec-矢量，cva-矢量注记，cia-影像注记
     * @param token 天地图token
     * @returns
     */
    var getTdtOption = function (type, token) {
        if (token === void 0) { token = TDT_KEY; }
        var url = "https://{s}.tianditu.gov.cn/".concat(type, "_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=").concat(type, "&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={TileCol}&TILEROW={TileRow}&TILEMATRIX={TileMatrix}&TILEMATRIX={TileMatrix}&tk=").concat(token);
        return {
            url: url,
            layer: type,
            style: "default",
            format: "tiles",
            tileMatrixSetID: "w",
            maximumLevel: 18,
            subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
            token: token,
        };
    };

    /**
     * 基础图层类，包括影像底图和地形底图
     */
    var BaseLayer = {
        /**
         * 默认单图像底图
         * @readonly
         * @type {ImageryLayer}
         */
        get DefaultSingleImg() {
            var img = getStaticFile("globe.jpg");
            return Cesium.ImageryLayer.fromProviderAsync(Cesium.SingleTileImageryProvider.fromUrl(img), {});
        },
        /**
         * 默认arcgis底图
         * @readonly
         * @type {ImageryLayer}
         */
        get DefaultArcgisImg() {
            return Cesium.ImageryLayer.fromProviderAsync(Cesium.ArcGisMapServerImageryProvider.fromUrl("https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer"), {});
        },
        /**
         * 默认天地图影像地图
         * @readonly
         * @type {ImageryLayer}
         */
        get DefaultTdtImg() {
            var option = getTdtOption("img");
            return Cesium.ImageryLayer.fromProviderAsync(Promise.resolve(new Cesium.WebMapTileServiceImageryProvider(option)), {});
        },
        /**
         * 默认天地图矢量地图
         * @readonly
         * @type {ImageryLayer}
         */
        get DefaultTdtVec() {
            var option = getTdtOption("vec");
            return Cesium.ImageryLayer.fromProviderAsync(Promise.resolve(new Cesium.WebMapTileServiceImageryProvider(option)), {});
        },
        /**
         * 默认全球地形
         * @readonly
         * @type {Terrain}
         */
        get DefaultTerrain() {
            var terrainProvider = Cesium.createWorldTerrainAsync({
                requestWaterMask: true,
                requestVertexNormals: true,
            });
            return new Cesium.Terrain(terrainProvider);
        },
        /**
         * 获取tms格式地形
         * @param {String} url - 地形文件路径，如：http://localhost:80/terrain/
         * @returns {Terrain} - tms格式地形对象
         */
        getTerrain: function (url) {
            return new Cesium.Terrain(Cesium.CesiumTerrainProvider.fromUrl(url));
        },
    };

    // 设置默认相机观察范围（覆盖Cesium默认设置）
    Cesium__namespace.Camera.DEFAULT_VIEW_RECTANGLE = new Cesium__namespace.Rectangle(Cesium__namespace.Math.toRadians(70), Cesium__namespace.Math.toRadians(-15), Cesium__namespace.Math.toRadians(140), Cesium__namespace.Math.toRadians(80));
    // 增强版地图场景类，继承自 Cesium.Viewer，提供了更丰富的功能和配置选项。
    var Viewer = /** @class */ (function (_super) {
        __extends(Viewer, _super);
        /**
         * 创建地图场景实例
         * @extends Cesium.Viewer
         * @param {Element | string} container - DOM元素或元素ID，作为地图容器
         * @param {ViewOption} [options] - 地图配置选项（合并默认配置）
         * @description
         * 增强版地图场景类，继承自 Cesium.Viewer，提供了更丰富的功能和配置选项。
         * @example
         * // 创建地图实例
         * const viewer = new Viewer('cesiumContainer', {
         *   timeline: true,
         *   scene3DOnly: false
         * });
         */
        function Viewer(container, options) {
            var _this = _super.call(this, container, __assign({ 
                // 基础配置
                animation: false, fullscreenButton: false, geocoder: false, homeButton: false, infoBox: false, sceneModePicker: false, timeline: false, sceneMode: Cesium__namespace.SceneMode.SCENE3D, scene3DOnly: true, baseLayerPicker: false, navigationHelpButton: false, vrButton: false, selectionIndicator: false, orderIndependentTranslucency: true, shouldAnimate: true, baseLayer: BaseLayer.DefaultSingleImg, 
                // WebGL上下文配置
                contextOptions: {
                    webgl: {
                        preserveDrawingBuffer: false,
                        failIfMajorPerformanceCaveat: true,
                        antialias: true,
                        alpha: true,
                        powerPreference: "high-performance",
                    },
                    requestWebgl1: false,
                }, shadows: true }, options)) || this;
            _this.options = options;
            /**
             * Cesium事件发射器实例
             * @type {EventEmitter}
             */
            _this.eventEmitter = new EventEmitter(_this);
            _this.initBaseConfig();
            return _this;
        }
        /**
         * 初始化基础场景配置
         * @private
         * @method
         * @description
         * 执行以下配置：
         * 1. 地形深度检测
         * 2. 天体显示设置
         * 3. 光照设置
         * 4. 碰撞检测
         * 5. 版权信息隐藏
         * 6. 高DPI适配
         * 7. Cesium Icon资源key设置
         */
        Viewer.prototype.initBaseConfig = function () {
            var _a, _b, _c;
            // Cesium Icon资源key
            Cesium__namespace.Ion.defaultAccessToken = ((_a = this.options) === null || _a === void 0 ? void 0 : _a.defaultKey) || CesiumIcon;
            // 地形交互配置，深度监测
            this.scene.globe.depthTestAgainstTerrain = true;
            // 天体显示配置
            this.scene.skyBox.show = true;
            this.scene.sun.show = true;
            this.scene.moon.show = false;
            this.scene.skyAtmosphere.show = true;
            // 光照配置
            this.scene.globe.enableLighting = true;
            // 时间系统配置
            this.clock.multiplier = 1;
            // 相机碰撞检测
            this.scene.screenSpaceCameraController.enableCollisionDetection = true;
            // 显示帧率
            this.scene.debugShowFramesPerSecond = ((_b = this.options) === null || _b === void 0 ? void 0 : _b.fpsShow) || false;
            this.cesiumWidget.creditContainer.style.display = "none";
            // 高分辨率适配，支持图像渲染像素化处理
            this.resolutionScale = window.devicePixelRatio;
            // 开启抗锯齿
            this.scene.postProcessStages.fxaa.enabled = true;
            // Mapbox控制模式
            if ((_c = this.options) === null || _c === void 0 ? void 0 : _c.mapboxController) {
                // 设置中键用于缩放
                this.scene.screenSpaceCameraController.zoomEventTypes = [
                    Cesium__namespace.CameraEventType.WHEEL, // 保留滚轮缩放
                    Cesium__namespace.CameraEventType.MIDDLE_DRAG, // 添加中键拖动缩放
                    Cesium__namespace.CameraEventType.PINCH, // 保留多点触控缩放
                ];
                //设置右键旋转
                this.scene.screenSpaceCameraController.tiltEventTypes = [
                    Cesium__namespace.CameraEventType.RIGHT_DRAG,
                    Cesium__namespace.CameraEventType.PINCH,
                    {
                        eventType: Cesium__namespace.CameraEventType.RIGHT_DRAG,
                        modifier: Cesium__namespace.KeyboardEventModifier.CTRL,
                    },
                    {
                        eventType: Cesium__namespace.CameraEventType.MIDDLE_DRAG,
                        modifier: Cesium__namespace.KeyboardEventModifier.CTRL,
                    },
                ];
            }
        };
        /**
         * @method
         * @description 测试方法，输出'test'到控制台
         */
        Viewer.prototype.test = function () {
            console.log("test");
        };
        Object.defineProperty(Viewer.prototype, "fps", {
            /**
             * 控制帧率显示
             * @type {Boolean}
             */
            get: function () {
                return this.scene.debugShowFramesPerSecond;
            },
            set: function (show) {
                this.scene.debugShowFramesPerSecond = show; // 显示帧率
            },
            enumerable: false,
            configurable: true
        });
        return Viewer;
    }(Cesium__namespace.Viewer));

    exports.BaseLayer = BaseLayer;
    exports.Viewer = Viewer;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=larkexplorer.umd.js.map
