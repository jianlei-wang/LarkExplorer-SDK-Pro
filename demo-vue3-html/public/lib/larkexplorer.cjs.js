'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Cesium = require('cesium');

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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

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
var EventNameMap = {
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

var EventEmitter = /** @class */ (function () {
    /**
     * 创建事件处理器实例
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
            }, EventNameMap[eventName]);
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
     * 移除事件类型集
     * @param {Array<EventType>} eventNames 要移除的事件名称集合
     */
    EventEmitter.prototype.offEvents = function (eventNames) {
        if (eventNames === void 0) { eventNames = []; }
        for (var index = 0; index < eventNames.length; index++) {
            var eventName = eventNames[index];
            this.events.has(eventName) && this.events.delete(eventName);
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
// 3DTiles模型默认参数
var DEF_3DTILES_OPTION = {
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
};

var globeImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAADCAYAAACwAX77AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABWSURBVBhXAUsAtP8BY3Z+/z0sAwCsygIAFAjlACUQ/QDV7QsAAQdAZP8iGv8ACQL/AFkrFQCg1fUA//4DAAE/XXH/HRcWAOPr7QATEhMADwwMAP389wC1nxmQIMsw2wAAAABJRU5ErkJggg==";

/**
 * 天地图，获取参数
 * @param type 地图类型：img-影像，vec-矢量，cva-矢量注记，cia-影像注记
 * @param token 天地图token
 * @returns
 */
function getTdtOption(type, token) {
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
}

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
        return Cesium.ImageryLayer.fromProviderAsync(Cesium.SingleTileImageryProvider.fromUrl(globeImg), {});
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

/**
 * 获取地图尺寸
 */
function mapSize(viewer) {
    var _a = viewer.canvas, width = _a.width, height = _a.height;
    return { width: width, height: height };
}
/**
 * 获取地图图片
 */
function mapImg(viewer) {
    viewer.render(); //避免出现导出是一张黑乎乎的图片
    return viewer.scene.canvas.toDataURL("image/png");
}

/**
 * 判断是否已经加载地形数据
 * @param viewer - 地图场景
 * @returns 是否已经加载地形
 */
function boolTerrain(viewer) {
    return viewer.terrainProvider.availability;
}

var Terrain = /** @class */ (function () {
    /**
     * 地形主类
     * @param viewer
     */
    function Terrain(viewer) {
        this.viewer = viewer;
        this.viewer = viewer;
        this._alpha = 1.0;
        this._updateTranslucency(false);
    }
    Object.defineProperty(Terrain.prototype, "provider", {
        /**
         * 地形对象，参考Cesium的TerrainProvider类
         * @readonly
         * @type {TerrainProvider}
         */
        get: function () {
            return this.viewer.terrainProvider;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Terrain.prototype, "exaggeration", {
        /**
         * 地形夸张系数
         * @type {Number}
         */
        get: function () {
            return this.viewer.scene.verticalExaggeration;
        },
        set: function (scale) {
            this.viewer.scene.verticalExaggeration = scale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Terrain.prototype, "show", {
        /**
         * 是否显示地形（借助于地形夸张调整）
         * @param {boolean} bool
         */
        set: function (bool) {
            var terrain = boolTerrain(this.viewer);
            if (!terrain)
                return;
            this.exaggeration = bool ? 1 : 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Terrain.prototype, "alpha", {
        /**
         * 地表透明度，只有在开启碰撞检测的时候才能生效
         * @type {Number}
         */
        get: function () {
            return this._alpha;
        },
        set: function (val) {
            this._updateAlpha(val);
            this._alpha = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Terrain.prototype, "translucency", {
        /**
         * 地表碰撞检测
         * @type {Boolean}
         */
        get: function () {
            return this.viewer.scene.globe.translucency.enabled;
        },
        set: function (bool) {
            this._updateTranslucency(bool);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Terrain.prototype, "enableUnderground", {
        /**
         * 是否允许进入地下
         * @type {Boolean}
         */
        get: function () {
            return !this.viewer.scene.screenSpaceCameraController
                .enableCollisionDetection;
        },
        set: function (bool) {
            this.viewer.scene.screenSpaceCameraController.enableCollisionDetection =
                !bool;
        },
        enumerable: false,
        configurable: true
    });
    Terrain.prototype._updateAlpha = function (val) {
        var frontFaceAlphaByDistance = this.viewer.scene.globe.translucency.frontFaceAlphaByDistance;
        frontFaceAlphaByDistance.nearValue = val;
        frontFaceAlphaByDistance.farValue = val;
    };
    Terrain.prototype._updateTranslucency = function (bool) {
        this.viewer.scene.globe.translucency.frontFaceAlphaByDistance =
            new Cesium.NearFarScalar(1.5e2, 0.5, 8.0e6, 1.0);
        this.viewer.scene.globe.translucency.enabled = bool; //是否开启透明
        this._updateAlpha(this._alpha);
    };
    return Terrain;
}());

/**
 * 移除指定entity
 * @param viewer - 地图场景
 * @param entity - 待移除对象
 */
function removeEntity(viewer, entity) {
    var children = entityChildren(entity);
    children &&
        children.forEach(function (ele) {
            removeEntity(viewer, ele);
        });
    entity.PostRender && entity.PostRender();
    entity.CustomDom && viewer.container.removeChild(entity.CustomDom);
    viewer.entities.remove(entity);
}
/**
 * 获取entity的子对象
 * @param entity - entity对象
 * @returns - 子对象集合
 */
function entityChildren(entity) {
    return entity._children;
}
/**
 * 根据id获取entity
 * @param id
 */
function getEntityById(viewer, id) {
    return viewer.entities.getById(id);
}

/**
 * 移除指定primitive
 * @param viewer - 地图场景
 * @param primitive - 待移除primitive对象
 */
function removePrimitive(viewer, primitive) {
    primitive && viewer.scene.primitives.remove(primitive);
}
/**
 * 根据id获取指定primitive图层
 * @param viewer
 * @param id
 * @returns
 */
var getPrimitiveById = function (viewer, id) {
    var primitives = viewer.scene.primitives._primitives;
    return primitives.find(function (layer) { return layer.id === id; });
};

/**
 * 移除影像图层
 * @param {Object} viewer 地图场景对象
 * @param layer 待移除图层
 */
function removeImageryLayer(viewer, layer) {
    layer && viewer.imageryLayers.remove(layer);
}
/**
 * 根据Id返回对应的Imagery（影像图层）
 * @param {Viewer} viewer
 * @param {string} id
 * @returns
 */
function getImageryById(viewer, id) {
    var imageryList = viewer.imageryLayers._layers;
    return imageryList.find(function (imagery) { return imagery.id === id; });
}

/**
 * 加载3DTiles图层
 * @param {*} viewer
 * @param {*} url
 * @param {*} height
 * @returns
 */
function load3Dtiles(viewer, url, height) {
    return __awaiter(this, void 0, void 0, function () {
        var model;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Cesium.Cesium3DTileset.fromUrl(url, DEF_3DTILES_OPTION)
                    // 超出可视区的瓦片进行销毁，提高性能
                ];
                case 1:
                    model = _a.sent();
                    // 超出可视区的瓦片进行销毁，提高性能
                    model.tileLoad.addEventListener(function (tile) {
                        tile.tileset.trimLoadedTiles();
                    });
                    height && offsetHeight(model, height);
                    model = viewer.scene.primitives.add(model);
                    SetCusMark(model, "primitive", "3dtiles", true);
                    return [2 /*return*/, model];
            }
        });
    });
}
/**
 * 加载3DTIles图层至指定位置
 * @param {*} viewer
 * @param {*} url
 * @param {*} pos
 */
function load3DtilesOnPos(viewer, url, pos) {
    return __awaiter(this, void 0, void 0, function () {
        var model;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Cesium.Cesium3DTileset.fromUrl(url, DEF_3DTILES_OPTION)];
                case 1:
                    model = _a.sent();
                    model.tileLoad.addEventListener(function (tile) {
                        tile.tileset.trimLoadedTiles();
                    });
                    pos && updatePos(model, pos);
                    viewer.scene.primitives.add(model);
                    SetCusMark(model, "primitive", "3dtiles", true);
                    return [2 /*return*/, model];
            }
        });
    });
}
/**
 * 调整3dtiles模型高度
 * @param model - 3dtiles模型
 * @param h - 调整后高度
 * @param lng - 调整后经度，WGS84坐标
 * @param lat - 调整后纬度，WGS84坐标
 */
function updatePos(model, pos) {
    var x = pos.x, y = pos.y, _a = pos.z, z = _a === void 0 ? 0 : _a;
    //高度偏差，正数为向上偏，负数为向下偏，根据真实的模型位置不断进行调整
    //计算tileset的绑定范围
    var boundingSphere = model.boundingSphere;
    //计算中心点位置
    var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
    var longitude = cartographic.longitude, latitude = cartographic.latitude, height = cartographic.height;
    //计算中心点位置坐标
    var surface = Cesium.Cartesian3.fromRadians(longitude, latitude, 0);
    var lng = x ? Cesium.Math.toRadians(x) : longitude;
    var lat = y ? Cesium.Math.toRadians(y) : latitude;
    //偏移后的三维坐标
    var offset = Cesium.Cartesian3.fromRadians(lng, lat, z - height);
    var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
    //tileset.modelMatrix转换
    model.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
}
function offsetHeight(model, height) {
    //高度偏差，正数为向上偏，负数为向下偏，根据真实的模型位置不断进行调整
    //计算tileset的绑定范围
    var boundingSphere = model.boundingSphere;
    //计算中心点位置
    var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
    var longitude = cartographic.longitude, latitude = cartographic.latitude;
    //计算中心点位置坐标
    var surface = Cesium.Cartesian3.fromRadians(longitude, latitude, 0);
    //偏移后的三维坐标
    var offset = Cesium.Cartesian3.fromRadians(longitude, latitude, height);
    var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
    //tileset.modelMatrix转换
    model.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
}
/**
 * 移除3dtiles图层
 * @param viewer - 地图场景
 * @param model - 待移除模型
 */
var remove3Dtiles = function (viewer, model) {
    model && viewer.scene.primitives.remove(model);
};

/**
 * 获取场景中所有的图层
 * @param viewer
 * @returns
 */
function getAllLayers(viewer) {
    //@ts-ignore
    var entities = viewer.entities._entities._array;
    //@ts-ignore
    var imageryLayers = viewer.imageryLayers._layers;
    //@ts-ignore
    var primitives = viewer.scene.primitives._primitives;
    //@ts-ignore
    var dataSources = viewer.dataSources._dataSources;
    return { entities: entities, imageryLayers: imageryLayers, primitives: primitives, dataSources: dataSources };
}
/**
 * 给图层打上自定义标记，便于删除
 * @param item - 待标记对象
 * @param type - 对象类型["imagerylayer","entity","primitive","particle"]
 * @param geo - 对象几何类型["WebMapTileServiceImageryProvider","Point","SpreadPoint","Polyline","Polygon","Circle","Radar","Model","fire","Billboard","panel"]
 * @param pick - 是否支持点选
 */
function SetCusMark(item, type, geo, pick) {
    if (pick === void 0) { pick = true; }
    item.CustomType = type;
    item.CustomGeo = geo;
    item.AllowPick = pick;
}
/**
 * 返回图层类型
 * @param layer 图层对象
 * @returns 图层类型：Entity/Primitive/3DTiles/ImageryLayer
 */
function layerType(layer) {
    if (layer instanceof Cesium.Entity)
        return "Entity";
    if (layer instanceof Cesium.BillboardCollection ||
        layer instanceof Cesium.Primitive ||
        layer instanceof Cesium.GroundPrimitive ||
        layer instanceof Cesium.GroundPolylinePrimitive)
        return "Primitive";
    if (layer instanceof Cesium.Cesium3DTileset)
        return "3DTiles";
    if (layer instanceof Cesium.ImageryLayer)
        return "ImageryLayer";
    return layer.CustomType;
}
/**
 * 移除指定图层
 * @param viewer - 地图场景
 * @param layer - 待移除图层
 */
function removeLayer(viewer, layer) {
    var type = layerType(layer);
    switch (type.toLowerCase()) {
        case "entity":
            removeEntity(viewer, layer);
            break;
        case "primitive":
            removePrimitive(viewer, layer);
            break;
        case "3dtiles":
            remove3Dtiles(viewer, layer);
            break;
        case "imagerylayer":
            removeImageryLayer(viewer, layer);
            break;
    }
}
/**
 * 根据id获取图层
 * @param {*} viewer
 * @param {*} id
 * @returns
 */
function getLayerById(viewer, id) {
    var layer = getEntityById(viewer, id) ||
        getPrimitiveById(viewer, id) ||
        getImageryById(viewer, id);
    return layer;
}

/**
 * 根据像素px值拾取位置点
 * @method
 * @description 位置：Coordinates.getCatesian3FromPX
 * @param {Viewer} viewer 地图场景
 * @param {Cartesian2} px 屏幕坐标
 * @returns {Cartesian3 | null} 位置点笛卡尔坐标
 */
var getCatesian3FromPX = function (viewer, px) {
    var scene = viewer.scene;
    var picks = scene.drillPick(px);
    var cartesian = undefined;
    var isOn3dtiles = false;
    for (var i in picks) {
        var pick = picks[i];
        var primitive = pick && pick.primitive;
        if (primitive instanceof Cesium.Cesium3DTileFeature ||
            primitive instanceof Cesium.Cesium3DTileset ||
            primitive instanceof Cesium.Model) {
            isOn3dtiles = true;
        }
        if (isOn3dtiles) {
            scene.pick(px);
            cartesian = scene.pickPosition(px);
            if (cartesian) {
                var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                var x = Cesium.Math.toDegrees(cartographic.longitude), y = Cesium.Math.toDegrees(cartographic.latitude), z = cartographic.height;
                cartesian = transformWGS84ToCartesian({ x: x, y: y, z: z });
            }
        }
    }
    var isOnTerrain = false; // 地形
    var boolTerrain = viewer.terrainProvider instanceof Cesium.EllipsoidTerrainProvider;
    if (!isOn3dtiles && !boolTerrain) {
        var ray = scene.camera.getPickRay(px);
        if (!ray)
            return null;
        cartesian = scene.globe.pick(ray, scene);
        isOnTerrain = true;
    }
    // 地球
    if (!isOn3dtiles && !isOnTerrain && boolTerrain) {
        cartesian = scene.camera.pickEllipsoid(px, scene.globe.ellipsoid);
    }
    if (cartesian) {
        var position = transformCartesianToWGS84(cartesian);
        if (position.z && position.z < 0) {
            position.z = 0.01;
            cartesian = transformWGS84ToCartesian(position);
        }
        return cartesian;
    }
    return null;
};
/**
 * WGS84坐标转笛卡尔坐标
 * @method
 * @description 位置：Coordinates.transformWGS84ToCartesian
 * @param {DegreePos} position WGS84坐标
 * @returns {Cartesian3} 笛卡尔坐标
 */
var transformWGS84ToCartesian = function (position) {
    var x = position.x, y = position.y, _a = position.z, z = _a === void 0 ? 0 : _a;
    return position
        ? Cesium.Cartesian3.fromDegrees(x, y, z, Cesium.Ellipsoid.WGS84)
        : Cesium.Cartesian3.ZERO;
};
/**
 * 笛卡尔坐标转WGS84
 * @method
 * @description 位置：Coordinates.transformCartesianToWGS84
 * @param {Cartesian3} cartesian3 笛卡尔坐标
 * @return {DegreePos} WGS84坐标
 */
var transformCartesianToWGS84 = function (cartesian3) {
    var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian3);
    var longitude = cartographic.longitude, latitude = cartographic.latitude, height = cartographic.height;
    return {
        x: Cesium.Math.toDegrees(longitude),
        y: Cesium.Math.toDegrees(latitude),
        z: height,
    };
};
/**
 * WGS84坐标转弧度坐标
 * @method
 * @description 位置：Coordinates.transformWGS84ToCartographic
 * @param {DegreePos} position WGS84坐标点
 * @return {Cesium.Cartographic} 弧度坐标点
 */
function transformWGS84ToCartographic(position) {
    return position
        ? Cesium.Cartographic.fromDegrees(position.x, position.y, position.z)
        : Cesium.Cartographic.ZERO;
}
/**
 * 弧度坐标转WGS84坐标
 * @method
 * @description 位置：Coordinates.transformCartographicToWGS84
 * @param {Cartographic} cartographic 弧度坐标
 * @returns {DegreePos} WGS84经纬度坐标
 */
function transformCartographicToWGS84(cartographic) {
    var longitude = cartographic.longitude, latitude = cartographic.latitude, height = cartographic.height;
    return {
        x: Cesium.Math.toDegrees(longitude),
        y: Cesium.Math.toDegrees(latitude),
        z: height,
    };
}
/**
 * 获取经纬度点集高度(限地形)
 * @method
 * @description 位置：Coordinates.height4Degrees
 * @param {Cesium.TerrainProvider} terrain 当前场景地形对象
 * @param {Array<DegreePos>} points 经纬度坐标数组
 * @param {boolean} [car3Only=false] 是否仅返回笛卡尔坐标数组
 * @returns {Promise<T>} 异步返回：高度值数组
 */
function height4Degrees(terrain_1, points_1) {
    return __awaiter(this, arguments, void 0, function (terrain, points, car3Only) {
        var cartographics, result;
        if (car3Only === void 0) { car3Only = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cartographics = points.map(function (point) {
                        return Cesium.Cartographic.fromDegrees(point.x, point.y);
                    });
                    return [4 /*yield*/, height4Cartographics(terrain, cartographics, car3Only)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
/**
 * 获取笛卡尔点集高度(限地形)
 * @method
 * @description 位置：Coordinates.height4Positions
 * @param {Cesium.TerrainProvider} terrain 当前场景地形对象
 * @param {Array<Cartesian3>} points 笛卡尔坐标数组
 * @param {boolean} [car3Only=false] 是否仅返回笛卡尔坐标数组
 * @returns {Promise<T>} 异步返回：高度值数组
 */
function height4Positions(terrain_1, points_1) {
    return __awaiter(this, arguments, void 0, function (terrain, points, car3Only) {
        var cartographics, result;
        if (car3Only === void 0) { car3Only = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cartographics = points.map(function (ele) { return Cesium.Cartographic.fromCartesian(ele); });
                    return [4 /*yield*/, height4Cartographics(terrain, cartographics, car3Only)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
/**
 * 获取cartographics弧度点集高度(限地形)
 * @method
 * @description 位置：Coordinates.height4Cartographics
 * @param {Cesium.TerrainProvider} terrain 当前场景地形对象
 * @param {Array<Cartographic>} points 笛卡尔坐标数组
 * @param {boolean} [car3Only=false] 是否仅返回笛卡尔坐标数组
 * @returns {Promise<T>} 异步返回：高度值数组
 */
function height4Cartographics(terrain_1, cartographics_1) {
    return __awaiter(this, arguments, void 0, function (terrain, cartographics, car3Only) {
        var updatedCartographics, result;
        if (car3Only === void 0) { car3Only = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Cesium.sampleTerrainMostDetailed(terrain, cartographics)];
                case 1:
                    updatedCartographics = _a.sent();
                    console.log(updatedCartographics);
                    result = updatedCartographics.map(function (cartographic) {
                        var cartesian3 = Cesium.Cartographic.toCartesian(cartographic);
                        return car3Only
                            ? cartesian3
                            : {
                                degree: transformCartographicToWGS84(cartographic),
                                cartesian3: cartesian3,
                                cartographic: cartographic,
                            };
                    });
                    return [2 /*return*/, result];
            }
        });
    });
}

var Coordinate = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getCatesian3FromPX: getCatesian3FromPX,
    transformWGS84ToCartesian: transformWGS84ToCartesian,
    transformCartesianToWGS84: transformCartesianToWGS84,
    transformWGS84ToCartographic: transformWGS84ToCartographic,
    transformCartographicToWGS84: transformCartographicToWGS84,
    height4Degrees: height4Degrees,
    height4Positions: height4Positions,
    height4Cartographics: height4Cartographics
});

/**
 * 地图添加点数据-Primitive形式
 * @param viewer
 * @param positions
 * @param options
 * @returns
 */
function PointPrimitiveAdd(viewer_1, positions_1) {
    return __awaiter(this, arguments, void 0, function (viewer, positions, options) {
        var onGround, primitive, index, option, position, point;
        if (options === void 0) { options = []; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    onGround = options[0].onGround;
                    if (!onGround) return [3 /*break*/, 2];
                    return [4 /*yield*/, height4Positions(viewer.terrainProvider, positions, true)];
                case 1:
                    positions = (_a.sent());
                    _a.label = 2;
                case 2:
                    primitive = viewer.scene.primitives.add(new Cesium.PointPrimitiveCollection());
                    for (index = 0; index < positions.length; index++) {
                        option = new PointGraphic(options[index]).value;
                        console.log("当前对象配置：", option);
                        position = positions[index];
                        point = __assign({ position: position }, option);
                        SetCusMark(primitive, "primitive", "point", option.allowPick);
                        primitive.add(point);
                    }
                    return [2 /*return*/, primitive];
            }
        });
    });
}
function PointEntityAdd(viewer, positions, options) {
    if (options === void 0) { options = []; }
    var parent = viewer.entities.add(new Cesium.Entity());
    for (var index = 0; index < positions.length; index++) {
        var position = positions[index];
        var option = new PointGraphic(options[index]).value;
        var point = viewer.entities.add({
            parent: parent,
            id: option.id,
            name: "Point",
            position: position,
            point: option,
        });
        SetCusMark(point, "entity", "point", option.allowPick);
    }
    return parent;
}

var Add = /** @class */ (function () {
    /**
     * 图层-添加对象类
     * @param  {Viewer} viewer 地图场景对象
     */
    function Add(viewer) {
        this.viewer = viewer;
    }
    /**
     * 添加点-Primitive形式
     * @param {Cartesian3} position 点位置，笛卡尔坐标
     * @param {PointOption} option 点参数
     * @returns {Cesium.Primitive} 点对象，Primitive类对象，参照Cesium
     */
    Add.prototype.addPointPrimitive = function (position, option) {
        return __awaiter(this, void 0, void 0, function () {
            var pointPrimitive;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, PointPrimitiveAdd(this.viewer, [position], [option])];
                    case 1:
                        pointPrimitive = _a.sent();
                        return [2 /*return*/, pointPrimitive];
                }
            });
        });
    };
    /**
     * 添加点集-Primitive形式
     * @param {Cartesian3[]} positions 点位置，笛卡尔坐标
     * @param {PointOption[]} options 点参数
     * @returns {Cesium.Primitive} 点对象，Primitive类对象，参照Cesium
     */
    Add.prototype.addPointPrimitives = function (positions, options) {
        return __awaiter(this, void 0, void 0, function () {
            var pointPrimitive;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, PointPrimitiveAdd(this.viewer, positions, options)];
                    case 1:
                        pointPrimitive = _a.sent();
                        return [2 /*return*/, pointPrimitive];
                }
            });
        });
    };
    /**
     * 添加点-Entity形式
     * @param {Cartesian3} position 点位置，笛卡尔坐标集合
     * @param {PointOption} option 点参数
     * @returns {Cesium.Entity} 点对象，Entity类对象，参照Cesium
     */
    Add.prototype.addPointEntity = function (position, option) {
        var pointEntity = PointEntityAdd(this.viewer, [position], [option]);
        return pointEntity;
    };
    /**
     * 添加点集-Entity形式
     * @param {Cartesian3[]} positions 点位置，笛卡尔坐标集合
     * @param {PointOption[]} options 点参数
     * @returns {Cesium.Entity} 点对象，Entity parent类对象，参照Cesium
     */
    Add.prototype.addPointEntities = function (positions, options) {
        var pointEntity = PointEntityAdd(this.viewer, positions, options);
        return pointEntity;
    };
    return Add;
}());

/**
 * 3DTiles模型压平处理类
 * 通过自定义着色器实现对指定区域内模型的高度压平效果
 */
var Flatten = /** @class */ (function () {
    /**
     * 创建3DTiles模型压平实例
     * @param {Cesium3DTileset} tileset - 需要进行压平操作的三维模型对象
     * @param {FlatOption} [option={}] - 压平参数配置
     * @throws {Error} 当模型对象无效时抛出异常
     */
    function Flatten(tileset, option) {
        if (option === void 0) { option = {}; }
        this.tileset = tileset;
        /**
         * 数组去重方法
         * @param {number[]} arr - 需要去重的数组
         * @returns {number[]} 去重后的数组
         */
        this.getUniqueArray = function (arr) {
            return arr.filter(function (item, index, arr) { return arr.indexOf(item, 0) === index; });
        };
        // 初始化压平区域列表
        this._regionList = [];
        // 初始化局部坐标数组
        this._localPositionsArr = [];
        // 设置压平高度，默认为0
        this._flatHeight = option.height || 0;
        // 验证模型对象有效性
        if (!tileset) {
            throw new Error("3DTiles模型异常，未检索到进行压平操作的模型对象");
        }
        // 计算模型中心点和坐标变换矩阵
        this._center = tileset.boundingSphere.center.clone();
        this._matrix = Cesium.Transforms.eastNorthUpToFixedFrame(this._center.clone());
        this._localMatrix = Cesium.Matrix4.inverse(this._matrix, new Cesium.Matrix4());
    }
    /**
     * 添加压平区域
     * @param {FlatRegionOption} region - 压平区域配置参数
     */
    Flatten.prototype.addRegion = function (region) {
        this._regionList.push(region);
        this.calculateStr();
    };
    /**
     * 根据ID移除压平区域
     * @param {string} id - 要移除的压平区域唯一标识符
     */
    Flatten.prototype.removeRegionById = function (id) {
        if (!id)
            return;
        this._regionList = this._regionList.filter(function (region) { return region.id != id; });
        this._localPositionsArr = [];
        this.calculateStr();
    };
    /**
     * 计算并更新压平着色器字符串
     * 将压平区域坐标转换为局部坐标并生成对应的着色器代码
     */
    Flatten.prototype.calculateStr = function () {
        // 遍历所有压平区域，将世界坐标转换为模型局部坐标
        for (var i = 0; i < this._regionList.length; i++) {
            var positions = this._regionList[i].positions;
            var localCoord = this.car3ToLocal(positions);
            this._localPositionsArr.push(localCoord);
        }
        // 生成点在多边形内的判断函数字符串
        var funStr = this.strInPolygonFun(this._localPositionsArr);
        var str = "";
        var _loop_1 = function (i) {
            var coors = this_1._localPositionsArr[i];
            var n = coors.length;
            var instr = "";
            // 将多边形顶点坐标赋值给着色器变量
            coors.forEach(function (coordinate, index) {
                instr += "points_".concat(n, "[").concat(index, "] = vec2(").concat(coordinate[0], ", ").concat(coordinate[1], ");\n");
            });
            // 生成压平处理逻辑：如果点在多边形内，则应用压平变换
            str += "\n              ".concat(instr, "\n              if(isPointInPolygon_").concat(n, "(position2D)){\n                // \u521B\u5EFA\u538B\u5E73\u540E\u7684\u5C40\u90E8\u5750\u6807\n                vec4 tileset_local_position_transformed = vec4(tileset_local_position.x, tileset_local_position.y, ground_z, 1.0);\n                // \u8F6C\u6362\u56DE\u6A21\u578B\u5750\u6807\u7CFB\n                vec4 model_local_position_transformed = czm_inverseModel * u_tileset_localToWorldMatrix * tileset_local_position_transformed;\n                // \u66F4\u65B0\u9876\u70B9\u5750\u6807\n                vsOutput.positionMC.xy = model_local_position_transformed.xy;\n                vsOutput.positionMC.z = model_local_position_transformed.z + modelMC.z*0.0001;\n                return;\n              }\n            ");
        };
        var this_1 = this;
        // 为每个压平区域生成对应的着色器判断逻辑
        for (var i = 0; i < this._localPositionsArr.length; i++) {
            _loop_1(i);
        }
        // 更新自定义着色器
        this.updateShader(funStr, str);
    };
    /**
     * 销毁压平效果，恢复模型原始状态
     */
    Flatten.prototype.destroy = function () {
        this.tileset.customShader = undefined;
    };
    /**
     * 生成点在多边形内判断函数的GLSL代码
     * 根据多边形顶点数量生成对应的判断函数
     * @param {Array<number[][]>} polygons - 多边形顶点坐标数组
     * @returns {string} 生成的GLSL函数字符串
     */
    Flatten.prototype.strInPolygonFun = function (polygons) {
        // 获取所有多边形的顶点数量
        var pMap = polygons.map(function (polygon) { return polygon.length; });
        // 去重，避免生成重复的函数
        var uniqueArray = this.getUniqueArray(pMap);
        var str = "";
        // 为每种顶点数量的多边形生成对应的判断函数
        uniqueArray.forEach(function (length) {
            str += "\n              // \u5B9A\u4E49\u591A\u8FB9\u5F62\u9876\u70B9\u6570\u7EC4\n              vec2 points_".concat(length, "[").concat(length, "];\n              // \u5224\u65AD\u70B9\u662F\u5426\u5728\u591A\u8FB9\u5F62\u5185\u7684\u51FD\u6570\n              bool isPointInPolygon_").concat(length, "(vec2 point){\n                int nCross = 0; // \u4EA4\u70B9\u6570\n                const int n = ").concat(length, "; \n                // \u904D\u5386\u591A\u8FB9\u5F62\u7684\u6BCF\u6761\u8FB9\n                for(int i = 0; i < n; i++){\n                  vec2 p1 = points_").concat(length, "[i];\n                  vec2 p2 = points_").concat(length, "[int(mod(float(i+1),float(n)))];\n                  // \u8DF3\u8FC7\u6C34\u5E73\u8FB9\n                  if(p1[1] == p2[1]){ continue; }\n                  // \u68C0\u67E5\u70B9\u662F\u5426\u5728\u8FB9\u7684y\u8303\u56F4\u4E4B\u5916\n                  if(point[1] < min(p1[1], p2[1])){ continue; }\n                  if(point[1] >= max(p1[1], p2[1])){ continue; }\n                  // \u8BA1\u7B97\u5C04\u7EBF\u4E0E\u8FB9\u7684\u4EA4\u70B9x\u5750\u6807\n                  float x = p1[0] + ((point[1] - p1[1]) * (p2[0] - p1[0])) / (p2[1] - p1[1]);\n                  // \u5982\u679C\u4EA4\u70B9\u5728\u6D4B\u8BD5\u70B9\u53F3\u4FA7\uFF0C\u589E\u52A0\u4EA4\u70B9\u6570\n                  if(x > point[0]){ nCross++; }\n                }\n                // \u6839\u636E\u4EA4\u70B9\u6570\u7684\u5947\u5076\u6027\u5224\u65AD\u70B9\u662F\u5426\u5728\u591A\u8FB9\u5F62\u5185\n                return int(mod(float(nCross), float(2))) == 1;\n              }\n            ");
        });
        return str;
    };
    /**
     * 更新自定义着色器
     * @param {string} vtx1 - 点在多边形内判断函数字符串
     * @param {string} vtx2 - 压平处理逻辑字符串
     */
    Flatten.prototype.updateShader = function (vtx1, vtx2) {
        // 创建自定义着色器
        var flatCustomShader = new Cesium.CustomShader({
            uniforms: {
                // 模型局部到世界的变换矩阵
                u_tileset_localToWorldMatrix: {
                    type: Cesium.UniformType.MAT4,
                    value: this._matrix,
                },
                // 世界到模型局部的变换矩阵
                u_tileset_worldToLocalMatrix: {
                    type: Cesium.UniformType.MAT4,
                    value: this._localMatrix,
                },
                // 压平高度值
                u_flatHeight: {
                    type: Cesium.UniformType.FLOAT,
                    value: this._flatHeight,
                },
            },
            vertexShaderText: "\n            // \u5305\u542B\u6240\u6709\u70B9\u5728\u591A\u8FB9\u5F62\u5185\u7684\u5224\u65AD\u51FD\u6570\n            ".concat(vtx1, "\n            void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput){\n              // \u83B7\u53D6\u6A21\u578B\u9876\u70B9\u5750\u6807\n              vec3 modelMC = vsInput.attributes.positionMC;\n              vec4 model_local_position = vec4(modelMC.x, modelMC.y, modelMC.z, 1.0);\n              // \u8F6C\u6362\u5230\u6A21\u578B\u5C40\u90E8\u5750\u6807\u7CFB\n              vec4 tileset_local_position = u_tileset_worldToLocalMatrix * czm_model * model_local_position;\n              vec2 position2D = vec2(tileset_local_position.x,tileset_local_position.y);\n              // \u8BA1\u7B97\u538B\u5E73\u540E\u7684\u57FA\u51C6\u9AD8\u5EA6\n              float ground_z = 0.0 + u_flatHeight;\n              // \u5E94\u7528\u591A\u4E2A\u591A\u8FB9\u5F62\u533A\u57DF\u7684\u538B\u5E73\u5904\u7406\n              ").concat(vtx2, "\n            }"),
        });
        // 将自定义着色器应用到模型
        this.tileset.customShader = flatCustomShader;
    };
    /**
     * 将世界坐标系下的笛卡尔坐标数组转换为模型局部坐标系下的二维坐标数组
     * @param {Cartesian3[]} positions - 世界坐标系下的坐标数组
     * @returns {number[][]} 模型局部坐标系下的二维坐标数组
     */
    Flatten.prototype.car3ToLocal = function (positions) {
        var arr = [];
        for (var i = 0; i < positions.length; i++) {
            var position = positions[i];
            // 应用逆变换矩阵将世界坐标转换为局部坐标
            var lp = Cesium.Matrix4.multiplyByPoint(this._localMatrix, position, new Cesium.Cartesian3());
            // 只取x,y坐标，忽略z坐标（用于二维平面判断）
            arr.push([lp.x, lp.y]);
        }
        return arr;
    };
    return Flatten;
}());

var TilesModel = /** @class */ (function () {
    /**
     * 模型主类
     * @param {Viewer} viewer - 地图场景对象
     */
    function TilesModel(viewer) {
        this.viewer = viewer;
        /**
         * 模型压平类
         */
        this.Flatten = Flatten;
    }
    /**
     * 加载3Dtiles模型
     * @param {string} url - 模型地址
     * @param {number} [height=0] - 可选：高度偏差，正数为向上偏，负数为向下偏，根据真实的模型位置不断进行调整
     * @returns {Promise<Cesium.Cesium3DTileset>} 模型对象，Cesium3DTile类对象，参考Cesium
     */
    TilesModel.prototype.add3DTiles = function (url_1) {
        return __awaiter(this, arguments, void 0, function (url, height) {
            var model;
            if (height === void 0) { height = 0; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, load3Dtiles(this.viewer, url, height)];
                    case 1:
                        model = _a.sent();
                        return [2 /*return*/, model];
                }
            });
        });
    };
    /**
     * 加载3Dtiles模型到指定位置
     * @param {string} url - 模型地址
     * @param {DegreePos} position - 设置模型位置，WGS84经纬度格式
     * @returns {Promise<Cesium.Cesium3DTileset>} 模型对象，Cesium.Cesium3DTile类对象，参考Cesium
     */
    TilesModel.prototype.add3DTilesOnPos = function (url, position) {
        return __awaiter(this, void 0, void 0, function () {
            var model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, load3DtilesOnPos(this.viewer, url, position)];
                    case 1:
                        model = _a.sent();
                        return [2 /*return*/, model];
                }
            });
        });
    };
    /**
     * 调整3DTiles模型位置
     * @param {Cesium.Cesium3DTileset} model 待调整模型对象
     * @param {DegreePos} position 设置模型位置，WGS84经纬度格式
     * @returns {Cesium.Cesium3DTileset} 模型对象，Primitive类对象，参考Cesium
     */
    TilesModel.prototype.update3DTiles = function (model, position) {
        updatePos(model, position);
        return model;
    };
    return TilesModel;
}());

var Layers = /** @class */ (function () {
    /**
     * 地形主类
     * @param {Viewer} viewer
     * @see {@link Add} - 添加对象类
     */
    function Layers(viewer) {
        this.viewer = viewer;
        /**
         * 图层-添加对象类
         * @type {Add}
         */
        this.Add = new Add(this.viewer);
        /**
         * 模型图层对象类
         * @type {TilesModel}
         */
        this.TilesModel = new TilesModel(this.viewer);
    }
    Object.defineProperty(Layers.prototype, "_layers", {
        /**
         * 所有场景中的图层
         */
        get: function () {
            return getAllLayers(this.viewer);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 根据id获取图层
     * @param {String} id 待获取图层id
     * @returns 图层对象
     */
    Layers.prototype.getById = function (id) {
        return getLayerById(this.viewer, id);
    };
    /**
     * 移除指定图层
     * @param {Object} layer 待移除图层
     */
    Layers.prototype.remove = function (layer) {
        removeLayer(this.viewer, layer);
    };
    /**
     * 移除指定ID图层
     * @param {String} id 图层Id
     */
    Layers.prototype.removeById = function (id) {
        var layer = this.getById(id);
        layer && this.remove(layer);
    };
    return Layers;
}());

/*
 * 通用方法
 * @Author: jianlei wang
 * @Date: 2025-04-23 09:42:04
 * @Last Modified by: jianlei wang
 * @Last Modified time: 2025-09-26 09:44:11
 */
/**
 * 生成唯一id
 * @returns 例：936e0deb-c208-4098-9959-327e519e63e2
 */
function randomId() {
    var tempUrl = URL.createObjectURL(new Blob());
    var uuid = tempUrl.toString();
    URL.revokeObjectURL(tempUrl);
    return uuid.substring(uuid.lastIndexOf("/") + 1);
}
/**
 * 安全执行回调
 */
function safeCallback(callback, data) {
    callback && typeof callback === "function" && callback(data);
}

/**
 * 开启全局拾取
 * @param viewer
 * @param handler
 * @param callback
 */
function initPickGlobal(viewer, callback) {
    var _this = this;
    viewer.EventHandler.on("leftClick", function (e) { return __awaiter(_this, void 0, void 0, function () {
        var pos, pick, pickRay, featuresPromise, imagery;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pos = getCatesian3FromPX(viewer, e.position);
                    if (!Cesium.defined(pos))
                        return [2 /*return*/];
                    pick = viewer.scene.drillPick(e.position) // 获取 pick 拾取对象
                    ;
                    // 优先拾取矢量
                    // 判断是否获取到了 pick 对象
                    if (Cesium.defined(pick) && pick.length > 0) {
                        safeCallback(callback, { pos: pos, pick: pick });
                        return [2 /*return*/];
                    }
                    pickRay = viewer.camera.getPickRay(e.position);
                    if (!Cesium.defined(pickRay)) return [3 /*break*/, 2];
                    return [4 /*yield*/, viewer.imageryLayers.pickImageryLayerFeatures(pickRay, viewer.scene)];
                case 1:
                    featuresPromise = _a.sent();
                    imagery = featuresPromise && featuresPromise[0];
                    if (imagery != null && imagery.imageryLayer) {
                        safeCallback(callback, { pos: pos, pick: imagery });
                        return [2 /*return*/];
                    }
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); });
    viewer.EventHandler.on("mouseMove", function (e) {
        var endPos = e.endPosition;
        var pick = viewer.scene.pick(endPos);
        document.body.style.cursor = Cesium.defined(pick) ? "pointer" : "default";
    });
}

var Handler = /** @class */ (function () {
    /**
     * 地图Handler句柄主类
     * @param viewer
     */
    function Handler(viewer) {
        this.viewer = viewer;
    }
    /**
     * 开启全局对象拾取(针对于矢量和wms服务数据)
     * @param {Boolean} bool - 是否开启
     * @param {Function} callback - 回调函数，返回拾取对象集合
     */
    Handler.prototype.pickEnabled = function (bool, callback) {
        this.viewer.EventHandler.offEvents(["leftClick", "mouseMove"]);
        bool && initPickGlobal(this.viewer, callback);
    };
    /**
     * 重置鼠标事件
     */
    Handler.prototype.reset = function () {
        this.viewer.EventHandler.clear();
    };
    return Handler;
}());

// 设置默认相机观察范围（覆盖Cesium默认设置）
Cesium__namespace.Camera.DEFAULT_VIEW_RECTANGLE = new Cesium__namespace.Rectangle(Cesium__namespace.Math.toRadians(70), Cesium__namespace.Math.toRadians(-15), Cesium__namespace.Math.toRadians(140), Cesium__namespace.Math.toRadians(80));
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
        _this.EventHandler = new EventEmitter(_this);
        /**
         * 地图Handler句柄主类，关联地图点击通用方法
         * @type {Handler}
         */
        _this.Handlers = new Handler(_this);
        /**
         * 地形主类，地形相关方法
         * @type {Terrain}
         */
        _this.Terrain = new Terrain(_this);
        /**
         * 图层主类，图层相关方法
         * @type {Layers}
         */
        _this.Layers = new Layers(_this);
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
    Object.defineProperty(Viewer.prototype, "lightShadow", {
        /**
         * 地球光源阴影
         * @type {Boolean}
         */
        set: function (bool) {
            this.scene.globe.enableLighting = bool;
            this.shadows = bool;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Viewer.prototype, "size", {
        /**
         * 地图画布大小，例如：{width:1920,height:1080}
         * @type {Object}
         * @readonly
         */
        get: function () {
            return mapSize(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Viewer.prototype, "image", {
        /**
         * 当前地图场景图片，base64格式
         * @type {String}
         * @readonly
         */
        get: function () {
            return mapImg(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Viewer.prototype, "baseImagery", {
        /**
         * 场景底图
         * Cesium机制是最底层的图层为_isBaseLayer，通过lowerToBottom来控制
         * @type {Cesium.ImageryLayer} imagery 参考Cesium的ImageryLayer
         */
        get: function () {
            //@ts-ignore
            var layers = this.imageryLayers._layers;
            var baseLayer = layers.find(function (layer) { return layer._isBaseLayer; });
            return baseLayer;
        },
        set: function (imagery) {
            //@ts-ignore
            var baseLayer = this.imageryLayers._layers.find(function (layer) { return layer._isBaseLayer; });
            baseLayer && this.imageryLayers.remove(baseLayer);
            this.imageryLayers.lowerToBottom(imagery);
        },
        enumerable: false,
        configurable: true
    });
    return Viewer;
}(Cesium__namespace.Viewer));

var PointGraphic = /** @class */ (function (_super) {
    __extends(PointGraphic, _super);
    /**
     * 点几何属性参数类
     * @extends Cesium.PointGraphics
     * @param {PointOption} [options] - 点集合属性参数选项
     */
    function PointGraphic(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.merge(options);
        var onGround = options.onGround, pColor = options.pColor, pOutlineColor = options.pOutlineColor, allowPick = options.allowPick, id = options.id, _a = options.featureAttribute, featureAttribute = _a === void 0 ? {} : _a;
        _this._onGround = onGround || true;
        _this.updateHr(_this._onGround);
        _this._pColor = pColor || "#ff0000";
        _this.updateColor(_this._pColor);
        _this._pOutlineColor = pOutlineColor || "#ffff00";
        _this.updateOutlineColor(_this._pOutlineColor);
        _this._allowPick = new Cesium.ConstantProperty(allowPick || true);
        _this._id = id || randomId();
        _this._featureAttribute = new Cesium.ConstantProperty(__assign({ id: _this._id }, featureAttribute));
        _this.show = new Cesium.ConstantProperty(true);
        return _this;
    }
    Object.defineProperty(PointGraphic.prototype, "value", {
        /**
         * 点几何属性参数值
         */
        get: function () {
            var _a = this, onGround = _a.onGround, pColor = _a.pColor, pOutlineColor = _a.pOutlineColor, allowPick = _a.allowPick, id = _a.id, featureAttribute = _a.featureAttribute, color = _a.color, outlineColor = _a.outlineColor, pixelSize = _a.pixelSize, outlineWidth = _a.outlineWidth, heightReference = _a.heightReference, scaleByDistance = _a.scaleByDistance, show = _a.show, splitDirection = _a.splitDirection, translucencyByDistance = _a.translucencyByDistance, disableDepthTestDistance = _a.disableDepthTestDistance, distanceDisplayCondition = _a.distanceDisplayCondition;
            var props = {
                onGround: onGround,
                pColor: pColor,
                pOutlineColor: pOutlineColor,
                allowPick: allowPick,
                id: id,
                featureAttribute: featureAttribute,
                color: color,
                outlineColor: outlineColor,
                pixelSize: pixelSize,
                outlineWidth: outlineWidth,
                heightReference: heightReference,
                scaleByDistance: scaleByDistance,
                show: show,
                splitDirection: splitDirection,
                translucencyByDistance: translucencyByDistance,
                disableDepthTestDistance: disableDepthTestDistance,
                distanceDisplayCondition: distanceDisplayCondition,
            };
            var result = {};
            for (var key in props) {
                var prop = props[key];
                if (prop && typeof prop.getValue === "function") {
                    var value = prop.getValue();
                    if (value !== undefined && value !== null) {
                        result[key] = value;
                    }
                }
                else if (prop !== undefined && prop !== null) {
                    result[key] = prop;
                }
            }
            return result;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointGraphic.prototype, "id", {
        /**
         * 点唯一id
         */
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointGraphic.prototype, "onGround", {
        /**
         * 点贴地设置
         */
        get: function () {
            return this._onGround;
        },
        set: function (bool) {
            this._onGround = bool;
            this.updateHr(bool);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointGraphic.prototype, "pColor", {
        /**
         * 点填充颜色
         */
        get: function () {
            return this._pColor;
        },
        set: function (val) {
            this._pColor = val;
            this.updateColor(val);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointGraphic.prototype, "pOutlineColor", {
        /**
         * 点轮廓线填充颜色
         */
        get: function () {
            return this._pOutlineColor;
        },
        set: function (val) {
            this._pOutlineColor = val;
            this.updateOutlineColor(val);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointGraphic.prototype, "allowPick", {
        /**
         * 点对象点选设置
         */
        get: function () {
            return this._allowPick.getValue();
        },
        set: function (bool) {
            this._allowPick = new Cesium.ConstantProperty(bool);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointGraphic.prototype, "featureAttribute", {
        /**
         * 点对象属性表
         */
        get: function () {
            return this._featureAttribute;
        },
        set: function (val) {
            this._featureAttribute = new Cesium.ConstantProperty(val);
        },
        enumerable: false,
        configurable: true
    });
    PointGraphic.prototype.updateHr = function (bool) {
        this.heightReference = bool
            ? new Cesium.ConstantProperty(Cesium.HeightReference.CLAMP_TO_GROUND).getValue()
            : new Cesium.ConstantProperty(Cesium.HeightReference.NONE).getValue();
    };
    PointGraphic.prototype.updateColor = function (color) {
        this.color = new Cesium.ConstantProperty(Cesium.Color.fromCssColorString(color)).getValue();
    };
    PointGraphic.prototype.updateOutlineColor = function (color) {
        this.outlineColor = new Cesium.ConstantProperty(Cesium.Color.fromCssColorString(color)).getValue();
    };
    return PointGraphic;
}(Cesium.PointGraphics));

exports.BaseLayer = BaseLayer;
exports.Coordinates = Coordinate;
exports.EventNameMap = EventNameMap;
exports.PointGraphics = PointGraphic;
exports.Viewer = Viewer;
//# sourceMappingURL=larkexplorer.cjs.js.map
