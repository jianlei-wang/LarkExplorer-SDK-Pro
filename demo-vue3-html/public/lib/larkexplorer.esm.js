import * as Cesium from 'cesium';
import { ScreenSpaceEventType, ScreenSpaceEventHandler, ImageryLayer, SingleTileImageryProvider, ArcGisMapServerImageryProvider, WebMapTileServiceImageryProvider, createWorldTerrainAsync, Terrain as Terrain$1, CesiumTerrainProvider, Cartographic, Math as Math$1, EllipsoidTerrainProvider, Cartesian3, Ellipsoid, Cesium3DTileFeature, Cesium3DTileset, Model, sampleTerrainMostDetailed, Matrix4, Entity, BillboardCollection, Primitive, GroundPrimitive, GroundPolylinePrimitive, Rectangle, Cartesian2, NearFarScalar, PointPrimitiveCollection, GeometryInstance, PolygonGeometry, PolygonHierarchy, EllipsoidSurfaceAppearance, Material, Color, Cesium3DTilePassState, Cesium3DTilePass, Texture, TextureMinificationFilter, TextureMagnificationFilter, Camera, Plane, Cartesian4, defined, MaterialAppearance, VertexFormat, Transforms, PixelDatatype, PixelFormat, Sampler, TextureWrap, Framebuffer, MipmapHint, SunLight, BoundingRectangle, UniformState, PerspectiveFrustum, ConstantPositionProperty, ConstantProperty, HeightReference, VerticalOrigin, BillboardGraphics, GeoJsonDataSource, JulianDate, CustomShader, UniformType, viewerCesium3DTilesInspectorMixin, SceneMode, clone, PointGraphics } from 'cesium';

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
    leftDown: ScreenSpaceEventType.LEFT_DOWN,
    leftUp: ScreenSpaceEventType.LEFT_UP,
    leftClick: ScreenSpaceEventType.LEFT_CLICK,
    leftDblClick: ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
    rightDown: ScreenSpaceEventType.RIGHT_DOWN,
    rightUp: ScreenSpaceEventType.RIGHT_UP,
    rightClick: ScreenSpaceEventType.RIGHT_CLICK,
    middleDown: ScreenSpaceEventType.MIDDLE_DOWN,
    middleUp: ScreenSpaceEventType.MIDDLE_UP,
    middleClick: ScreenSpaceEventType.MIDDLE_CLICK,
    mouseMove: ScreenSpaceEventType.MOUSE_MOVE,
    wheel: ScreenSpaceEventType.WHEEL,
    pinchStart: ScreenSpaceEventType.PINCH_START,
    pinchEnd: ScreenSpaceEventType.PINCH_END,
    pinchMove: ScreenSpaceEventType.PINCH_MOVE,
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
        this.handler = new ScreenSpaceEventHandler(this.viewer.canvas);
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
// skipLevelOfDetail: false, // 如果为true，初始的时候不会一次性加载整个模型，建议加载后手动开启，
// preferLeaves: false,
// maximumMemoryUsage: 256, // 内存分配变小有利于倾斜摄影数据回收，提升性能体验
// baseScreenSpaceError: 256,
// maximumScreenSpaceError: 16, // 数值加大，能让最终成像变模糊
// skipScreenSpaceErrorFactor: 16,
// skipLevels: 1, //lod级别加载
// immediatelyLoadDesiredLevelOfDetail: true,
// loadSiblings: false, // 如果为true则不会在已加载完概况房屋后，自动从中心开始超清化房屋
// cullWithChildrenBounds: true,
// cullRequestsWhileMoving: true,
// cullRequestsWhileMovingMultiplier: 1, // 值越小能够更快的剔除
// preloadWhenHidden: true,
// progressiveResolutionHeightFraction: 1, // 数值偏于0能够让初始加载变得模糊
// dynamicScreenSpaceErrorDensity: 1, // 数值加大，能让周边加载变快
// dynamicScreenSpaceErrorFactor: 1, // 暂时未知作用
// dynamicScreenSpaceError: true, // 根据测试，有了这个后，会在真正的全屏加载完之后才清晰化房屋
};
// 默认欧拉角
var DEF_HPR = {
    heading: 6.283185307179586,
    pitch: -1.5693096181732886,
    roll: 0,
};
// 默认点图标
var DEF_POINT_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAABU0lEQVR4AeyUT0rDUBDGv0mh+XeDiph26VlcuNITWHWhKHgNUXSh1hPoyoVn0ZU0KvYG+VdIxkwrXQh9nQfVbjIwjwkz+X7hy/AcrCga8L8Z31jdWP1nDlgvV7IedNLIPck2vEEWeTdJ5PW5g8D2C63Aadc9olb1BdAFE/YYOCDgLmt7Sdr1d2ARarBAwXQ1V5v5IYna23P7vxoqsNhrhP6IEpxzKEMFplaptbGX9NwtDVsHZtrUiMkMV45qVgUWQW06hHrnFk+rwEz8slhqOsFl9TqtzKcOXLYezTKz7lv4UTzPngyFChx+piMQHxt0Ji1GdTYpFIcKLDrBsLg2wol2w3j8JLOaVINFTOBcOmsAnxLjvr61butN2vfHeRgMM+3vEClYgeUNsT2Ii0v/Pe/7cX4YxvmARkilZ5PWYBtx02wDNrmz1F5j9VLtNImtzOpvAAAA//+1zHtWAAAABklEQVQDAOm9XD2e9VbWAAAAAElFTkSuQmCC";

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
        return ImageryLayer.fromProviderAsync(SingleTileImageryProvider.fromUrl(globeImg), {});
    },
    /**
     * 默认arcgis底图
     * @readonly
     * @type {ImageryLayer}
     */
    get DefaultArcgisImg() {
        return ImageryLayer.fromProviderAsync(ArcGisMapServerImageryProvider.fromUrl("https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer"), {});
    },
    /**
     * 默认天地图影像地图
     * @readonly
     * @type {ImageryLayer}
     */
    get DefaultTdtImg() {
        var option = getTdtOption("img");
        return ImageryLayer.fromProviderAsync(Promise.resolve(new WebMapTileServiceImageryProvider(option)), {});
    },
    /**
     * 默认天地图矢量地图
     * @readonly
     * @type {ImageryLayer}
     */
    get DefaultTdtVec() {
        var option = getTdtOption("vec");
        return ImageryLayer.fromProviderAsync(Promise.resolve(new WebMapTileServiceImageryProvider(option)), {});
    },
    /**
     * 默认全球地形
     * @readonly
     * @type {Terrain}
     */
    get DefaultTerrain() {
        var terrainProvider = createWorldTerrainAsync({
            requestWaterMask: true,
            requestVertexNormals: true,
        });
        return new Terrain$1(terrainProvider);
    },
    /**
     * 获取tms格式地形
     * @param {String} url - 地形文件路径，如：http://localhost:80/terrain/
     * @returns {Terrain} - tms格式地形对象
     */
    getTerrain: function (url) {
        return new Terrain$1(CesiumTerrainProvider.fromUrl(url));
    },
};

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
        if (primitive instanceof Cesium3DTileFeature ||
            primitive instanceof Cesium3DTileset ||
            primitive instanceof Model) {
            isOn3dtiles = true;
        }
        if (isOn3dtiles) {
            scene.pick(px);
            cartesian = scene.pickPosition(px);
            if (cartesian) {
                var cartographic = Cartographic.fromCartesian(cartesian);
                var x = Math$1.toDegrees(cartographic.longitude), y = Math$1.toDegrees(cartographic.latitude), z = cartographic.height;
                cartesian = transformWGS84ToCartesian({ x: x, y: y, z: z });
            }
        }
    }
    var isOnTerrain = false; // 地形
    var boolTerrain = viewer.terrainProvider instanceof EllipsoidTerrainProvider;
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
 * 经纬度坐标数组转笛卡尔坐标数组
 * @method
 * @description 位置：Coordinates.PosFromDegreeArray
 * @param {Array<Number[]>} positions 经纬度坐标数组，如：[[120,34],[121,35]]
 * @returns {Array<Cartesian3>} 笛卡尔坐标数组
 */
function PosFromDegreeArray(positions) {
    var result = [];
    for (var index = 0; index < positions.length; index++) {
        var pos = positions[index];
        result.push(pos[0], pos[1]);
    }
    var points = Cartesian3.fromDegreesArray(result);
    return points;
}
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
        ? Cartesian3.fromDegrees(x, y, z, Ellipsoid.WGS84)
        : Cartesian3.ZERO;
};
/**
 * 笛卡尔坐标转WGS84
 * @method
 * @description 位置：Coordinates.transformCartesianToWGS84
 * @param {Cartesian3} cartesian3 笛卡尔坐标
 * @return {DegreePos} WGS84坐标
 */
var transformCartesianToWGS84 = function (cartesian3) {
    var cartographic = Ellipsoid.WGS84.cartesianToCartographic(cartesian3);
    var longitude = cartographic.longitude, latitude = cartographic.latitude, height = cartographic.height;
    return {
        x: Math$1.toDegrees(longitude),
        y: Math$1.toDegrees(latitude),
        z: height,
    };
};
/**
 * 笛卡尔坐标点集合转WGS84点集合
 * @method
 * @description 位置：Coordinates.arrayCartesiansToWGS84
 * @param {Array<Cartesian3>} cartesians 笛卡尔坐标点集合
 * @returns {Array<DegreePos>} WGS84坐标点集合
 */
function arrayCartesiansToWGS84(cartesians) {
    if (cartesians === void 0) { cartesians = []; }
    return cartesians.map(function (item) { return transformCartesianToWGS84(item); });
}
/**
 * WGS84坐标转弧度坐标
 * @method
 * @description 位置：Coordinates.transformWGS84ToCartographic
 * @param {DegreePos} position WGS84坐标点
 * @return {Cesium.Cartographic} 弧度坐标点
 */
function transformWGS84ToCartographic(position) {
    return position
        ? Cartographic.fromDegrees(position.x, position.y, position.z)
        : Cartographic.ZERO;
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
        x: Math$1.toDegrees(longitude),
        y: Math$1.toDegrees(latitude),
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
                        return Cartographic.fromDegrees(point.x, point.y);
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
                    cartographics = points.map(function (ele) { return Cartographic.fromCartesian(ele); });
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
                case 0: return [4 /*yield*/, sampleTerrainMostDetailed(terrain, cartographics)];
                case 1:
                    updatedCartographics = _a.sent();
                    console.log(updatedCartographics);
                    result = updatedCartographics.map(function (cartographic) {
                        var cartesian3 = Cartographic.toCartesian(cartographic);
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
/**
 * 返回点集的范围，默认弧度：[west, south, east, north]
 * @method
 * @description 位置：Coordinates.getExtent
 * @param {Array<Cartesian3>} points 点集，笛卡尔坐标
 * @param {Boolean} degrees 是否返回值为经纬度，true-返回值为经纬度值；false-返回值为弧度值
 * @returns {Array<Number>} 四至范围 => [west, south, east, north]
 */
function getExtent(points, degrees) {
    var west = 100000000, south = 100000000, east = -100000000, north = -100000000;
    for (var i = 0; i < points.length; i++) {
        var cartographic = Cartographic.fromCartesian(points[i]);
        var longitude = cartographic.longitude, latitude = cartographic.latitude;
        west = Math.min(longitude, west);
        south = Math.min(latitude, south);
        east = Math.max(longitude, east);
        north = Math.max(latitude, north);
    }
    if (degrees) {
        west = Math$1.toDegrees(west);
        south = Math$1.toDegrees(south);
        east = Math$1.toDegrees(east);
        north = Math$1.toDegrees(north);
    }
    return [west, south, east, north];
}
/**
 * 计算空间两点间距离（经纬度坐标）
 * @param {number} lon1 - 第1个点经度
 * @param {number} lat1 - 第1个点纬度
 * @param {number} lon2 - 第2个点经度
 * @param {number} lat2 - 第2个点维度
 * @returns 距离：米
 */
function calculateDis(lon1, lat1, lon2, lat2) {
    var R = 6371000; // 地球半径，单位米
    var radLat1 = (Math.PI / 180) * lat1;
    var radLon1 = (Math.PI / 180) * lon1;
    var radLat2 = (Math.PI / 180) * lat2;
    var radLon2 = (Math.PI / 180) * lon2;
    // 计算经纬度差值
    var deltaLat = radLat2 - radLat1;
    var deltaLon = radLon2 - radLon1;
    // 使用 Haversine 公式计算距离
    var a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(radLat1) *
            Math.cos(radLat2) *
            Math.sin(deltaLon / 2) *
            Math.sin(deltaLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // 计算距离并返回
    var distance = R * c;
    return distance;
}
/**
 * 经纬度四至转弧度四至
 * @method
 * @param {Array<Number>} extent 经纬度四至，如：[112,23,120,30]
 * @returns {Array<Number>}  转换后的弧度四至
 */
function extentToRadians(extent) {
    return extent.map(function (val) { return degreesToRadians(val); });
}
/**
 * 角度转弧度
 * @method
 * @param {Number} degrees 角度值
 * @returns {Number} 弧度值
 */
function degreesToRadians(degrees) {
    var radians = Math$1.toRadians(degrees);
    return radians;
}

var Coordinate = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getCatesian3FromPX: getCatesian3FromPX,
    PosFromDegreeArray: PosFromDegreeArray,
    transformWGS84ToCartesian: transformWGS84ToCartesian,
    transformCartesianToWGS84: transformCartesianToWGS84,
    arrayCartesiansToWGS84: arrayCartesiansToWGS84,
    transformWGS84ToCartographic: transformWGS84ToCartographic,
    transformCartographicToWGS84: transformCartographicToWGS84,
    height4Degrees: height4Degrees,
    height4Positions: height4Positions,
    height4Cartographics: height4Cartographics,
    getExtent: getExtent,
    calculateDis: calculateDis,
    extentToRadians: extentToRadians,
    degreesToRadians: degreesToRadians
});

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
 * 跳转到entity对象
 * @param viewer - 地图场景
 * @param item - entity对象
 */
function flyToEntity(viewer, item) {
    var children = entityChildren(item);
    children && children.length > 0 ? viewer.flyTo(children) : viewer.flyTo(item);
}
/**
 * 定位到entity对象
 * @param viewer - 地图场景
 * @param item - entity对象
 */
function zoomToEntity(viewer, item) {
    var children = entityChildren(item);
    children && children.length > 0
        ? viewer.zoomTo(children)
        : viewer.zoomTo(item);
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
function getPrimitiveById(viewer, id) {
    var primitives = viewer.scene.primitives._primitives;
    return primitives.find(function (layer) { return layer.id === id; });
}
/**
 * 跳转到primitive对象
 * @param {*} viewer
 * @param {*} item
 */
var flyToPrimitive = function (viewer, item) {
    if (!item.CusExtent)
        return;
    flyToExtent(viewer, item.CusExtent);
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
                case 0: return [4 /*yield*/, Cesium3DTileset.fromUrl(url, DEF_3DTILES_OPTION)
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
                    // model.skipLevelOfDetail = true
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
                case 0: return [4 /*yield*/, Cesium3DTileset.fromUrl(url, DEF_3DTILES_OPTION)];
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
    var cartographic = Cartographic.fromCartesian(boundingSphere.center);
    var longitude = cartographic.longitude, latitude = cartographic.latitude, height = cartographic.height;
    //计算中心点位置坐标
    var surface = Cartesian3.fromRadians(longitude, latitude, 0);
    var lng = x ? Math$1.toRadians(x) : longitude;
    var lat = y ? Math$1.toRadians(y) : latitude;
    //偏移后的三维坐标
    var offset = Cartesian3.fromRadians(lng, lat, z - height);
    var translation = Cartesian3.subtract(offset, surface, new Cartesian3());
    //tileset.modelMatrix转换
    model.modelMatrix = Matrix4.fromTranslation(translation);
}
function offsetHeight(model, height) {
    //高度偏差，正数为向上偏，负数为向下偏，根据真实的模型位置不断进行调整
    //计算tileset的绑定范围
    var boundingSphere = model.boundingSphere;
    //计算中心点位置
    var cartographic = Cartographic.fromCartesian(boundingSphere.center);
    var longitude = cartographic.longitude, latitude = cartographic.latitude;
    //计算中心点位置坐标
    var surface = Cartesian3.fromRadians(longitude, latitude, 0);
    //偏移后的三维坐标
    var offset = Cartesian3.fromRadians(longitude, latitude, height);
    var translation = Cartesian3.subtract(offset, surface, new Cartesian3());
    //tileset.modelMatrix转换
    model.modelMatrix = Matrix4.fromTranslation(translation);
}
/**
 * 移除3dtiles图层
 * @param viewer - 地图场景
 * @param model - 待移除模型
 */
function remove3Dtiles(viewer, model) {
    model && viewer.scene.primitives.remove(model);
}
/**
 * 跳转到3dtiles对象
 * @param viewer
 * @param item
 */
function flyTo3DTiles(viewer, item) {
    item && viewer.flyTo(item);
}
/**
 * 定位到3dtiles对象
 * @param viewer
 * @param item
 */
function zoomTo3DTiles(viewer, item) {
    item && viewer.zoomTo(item);
}

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
    if (layer instanceof Entity)
        return "Entity";
    if (layer instanceof BillboardCollection ||
        layer instanceof Primitive ||
        layer instanceof GroundPrimitive ||
        layer instanceof GroundPolylinePrimitive)
        return "Primitive";
    if (layer instanceof Cesium3DTileset)
        return "3DTiles";
    if (layer instanceof ImageryLayer)
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
 * 获取比例尺，页面1px的距离，单位m
 */
function getScale(viewer) {
    var _a = mapSize(viewer), width = _a.width, height = _a.height;
    var midX = Math.floor(width / 2);
    var midY = Math.floor(height / 2);
    var leftPos, rightPos;
    do {
        leftPos = viewer.camera.pickEllipsoid(new Cartesian2(midX, midY));
        rightPos = viewer.camera.pickEllipsoid(new Cartesian2(midX + 2, midY));
        if (!leftPos || !rightPos) {
            midX -= 1;
        }
    } while (!leftPos || !rightPos);
    var lg = Cartographic.fromCartesian(leftPos);
    var rg = Cartographic.fromCartesian(rightPos);
    var lon1 = Math$1.toDegrees(lg.longitude);
    var lat1 = Math$1.toDegrees(lg.latitude);
    var lon2 = Math$1.toDegrees(rg.longitude);
    var lat2 = Math$1.toDegrees(rg.latitude);
    var distance = calculateDis(lon1, lat1, lon2, lat2);
    return distance / 2;
}
/**
 * 获取地图四至，最小和最大经纬度
 */
var viewExtend = function (viewer) {
    var camera = viewer.camera, scene = viewer.scene;
    var params = { minx: 0, maxx: 0, miny: 0, maxy: 0 };
    var extend = camera.computeViewRectangle();
    if (typeof extend === "undefined") {
        //2D下会可能拾取不到坐标，extend返回undefined,因此作如下转换
        var canvas = scene.canvas;
        var upperLeft = new Cartesian2(0, 0); //canvas左上角坐标转2d坐标
        var lowerRight = new Cartesian2(canvas.clientWidth, canvas.clientHeight); //canvas右下角坐标转2d坐标
        var ellipsoid = scene.globe.ellipsoid;
        var upperLeft3 = camera.pickEllipsoid(upperLeft, ellipsoid); //2D转3D世界坐标
        var lowerRight3 = camera.pickEllipsoid(lowerRight, ellipsoid); //2D转3D世界坐标
        var upperLeftCartographic = scene.globe.ellipsoid.cartesianToCartographic(upperLeft3); //3D世界坐标转弧度
        var lowerRightCartographic = scene.globe.ellipsoid.cartesianToCartographic(lowerRight3); //3D世界坐标转弧度
        var minx = Math$1.toDegrees(upperLeftCartographic.longitude); //弧度转经纬度
        var maxx = Math$1.toDegrees(lowerRightCartographic.longitude); //弧度转经纬度
        var miny = Math$1.toDegrees(lowerRightCartographic.latitude); //弧度转经纬度
        var maxy = Math$1.toDegrees(upperLeftCartographic.latitude); //弧度转经纬度
        params.minx = minx;
        params.maxx = maxx;
        params.miny = miny;
        params.maxy = maxy;
    }
    else {
        //3D获取方式
        params.maxx = Math$1.toDegrees(extend.east);
        params.maxy = Math$1.toDegrees(extend.north);
        params.minx = Math$1.toDegrees(extend.west);
        params.miny = Math$1.toDegrees(extend.south);
    }
    // 返回屏幕所在经纬度范围
    return params;
};
/**
 * 跳转到指定相机位置
 * @param viewer - 地图场景
 * @param {Cartesian3} position - 位置信息，笛卡尔坐标
 * @param {H_P_R} hpr - 姿态信息
 * @param {number} time - 跳转时间，单位秒
 * @param {boolean} degree - 传参类型是否为度
 * @param  callback - 回调函数
 */
var flyToPos = function (viewer, position, hpr, time, degree, callback) {
    if (time === void 0) { time = 2; }
    if (degree === void 0) { degree = false; }
    var x = position.x, y = position.y, z = position.z;
    var _a = hpr || DEF_HPR, heading = _a.heading, pitch = _a.pitch, roll = _a.roll;
    var _pos = degree
        ? Cartesian3.fromDegrees(x, y, z)
        : position;
    var _hpr = degree
        ? {
            heading: Math$1.toRadians(heading),
            pitch: Math$1.toRadians(pitch),
            roll: Math$1.toRadians(roll),
        }
        : hpr;
    viewer.camera.flyTo({
        destination: _pos,
        orientation: _hpr,
        duration: time,
        complete: function () {
            callback && typeof callback === "function" && callback();
        },
    });
};
/**
 * 跳转到指定四至范围
 * @param {*} viewer
 * @param {*} extent [西,南,东,北]-单位经纬度
 * @param {*} time
 * @param {*} callback
 */
var flyToExtent = function (viewer, extent, time, callback) {
    if (time === void 0) { time = 2; }
    var ex = extentToRadians(extent);
    var rectangle = new Rectangle(ex[0], ex[1], ex[2], ex[3]);
    viewer.camera.flyTo({
        destination: rectangle,
        duration: time,
        complete: function () {
            callback && typeof callback === "function" && callback();
        },
    });
};
/**
 * 跳转到指定对象
 * @param viewer
 * @param item
 */
function flyToItem(viewer, item) {
    var type = layerType(item);
    switch (type.toLowerCase()) {
        case "entity":
            flyToEntity(viewer, item);
            break;
        case "3dtiles":
            flyTo3DTiles(viewer, item);
            break;
        case "primitive":
            flyToPrimitive(viewer, item);
            break;
    }
}
/**
 * 定位到指定对象
 * @param viewer
 * @param item
 */
function zoomToItem(viewer, item) {
    var type = layerType(item);
    switch (type.toLowerCase()) {
        case "entity":
            zoomToEntity(viewer, item);
            break;
        case "3dtiles":
            zoomTo3DTiles(viewer, item);
            break;
    }
}
/**
 * 跳转到指定的经纬度点
 * @param viewer - 地图场景
 * @param x - 经度
 * @param y - 纬度
 * @param z - 高度
 * @param time - 跳转时间
 * @param callback -回调
 */
function flyToDegree(viewer, x, y, z, time, callback) {
    var position = Cartesian3.fromDegrees(x, y, z);
    viewer.camera.flyTo({
        destination: position,
        duration: time,
        complete: function () {
            callback && typeof callback === "function" && callback();
        },
    });
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
            new NearFarScalar(1.5e2, 0.5, 8.0e6, 1.0);
        this.viewer.scene.globe.translucency.enabled = bool; //是否开启透明
        this._updateAlpha(this._alpha);
    };
    return Terrain;
}());

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
                    primitive = viewer.scene.primitives.add(new PointPrimitiveCollection());
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
/**
 * 地图添加点数据-entity形式
 * @param viewer
 * @param positions
 * @param options
 * @returns
 */
function PointEntityAdd(viewer, positions, options) {
    if (options === void 0) { options = []; }
    var parent = viewer.entities.add(new Entity());
    for (var index = 0; index < positions.length; index++) {
        var position = positions[index];
        var option = new PointGraphic(options[index]).value;
        var point = viewer.entities.add({
            parent: parent,
            id: option.id,
            name: "Point-Add",
            position: position,
            point: option,
        });
        SetCusMark(point, "entity", "point", option.allowPick);
    }
    return parent;
}

var waterImg = "data:image/png;base64,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";

/*
 * 通用方法
 * @Author: jianlei wang
 * @Date: 2025-04-23 09:42:04
 * @Last Modified by: jianlei wang
 * @Last Modified time: 2025-10-10 09:45:27
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
 * 加载基础水面
 * @param viewer
 * @param options
 * @returns
 */
function addWaters(viewer, options) {
    var id = options.id, _a = options.img, img = _a === void 0 ? waterImg : _a, polygons = options.polygons, _b = options.ids, ids = _b === void 0 ? [] : _b;
    var instances = [];
    var allPositions = [];
    for (var index = 0; index < polygons.length; index++) {
        var positions = polygons[index];
        var instance = new GeometryInstance({
            id: ids[index] || randomId(),
            geometry: new PolygonGeometry({
                polygonHierarchy: new PolygonHierarchy(positions),
                vertexFormat: EllipsoidSurfaceAppearance.VERTEX_FORMAT,
            }),
        });
        instances.push(instance);
        allPositions.push.apply(allPositions, positions);
    }
    var waterPrimitive = new GroundPrimitive({
        allowPicking: true,
        asynchronous: true,
        geometryInstances: instances,
        appearance: new EllipsoidSurfaceAppearance({
            aboveGround: true,
            material: new Material({
                fabric: {
                    type: "Water",
                    uniforms: {
                        blendColor: new Color(1, 0, 0, 0.3),
                        normalMap: img,
                        frequency: 200,
                        animationSpeed: 0.01,
                        amplitude: 10,
                    },
                },
            }),
        }),
    });
    waterPrimitive.id = id;
    waterPrimitive.CusExtent = getExtent(allPositions, true);
    SetCusMark(waterPrimitive, "primitive", "Water", true);
    var primitive = viewer.scene.primitives.add(waterPrimitive);
    return primitive;
}

/**
 * 为参数设置默认值。如果第一个参数不为 undefined，则返回第一个参数，否则返回第二个参数。
 * @template T
 * @param {T | undefined | null} a - 如果已定义且非空，则返回的值
 * @param {T} b - 默认值
 * @returns {T} 如果第一个参数不为 undefined 和 null，则返回第一个参数，否则返回第二个参数。
 * @example
 * param = defaultValue(param, 'default');
 */
function defaultValue(a, b) {
    return a !== undefined && a !== null ? a : b;
}
/**
 * 冻结的空对象，用作传递给 `set` 方法的选项的默认值
 */
defaultValue.EMPTY_OBJECT = Object.freeze({});

var DefaultValue = /*#__PURE__*/Object.freeze({
    __proto__: null,
    defaultValue: defaultValue,
    'default': defaultValue
});

// 水面材质的 GLSL 片元着色器源码，模拟水面反射、波纹、光照等视觉效果。
var WaterMaterialSource = "\nuniform sampler2D image;\nuniform sampler2D normalTexture;\nuniform float time;\nuniform mat4 fixedFrameToEnu;\nin vec4 v_worldPosition;\nin vec4 v_uv;\nuniform float size;\nuniform vec4 waterColor;\nuniform float waterAlpha;\nuniform float rf0;\nuniform vec3 lightDirection;\nuniform float sunShiny;\nuniform float distortionScale;\nvec3 sunColor = vec3( 1.0 );\nvec4 getNoise(sampler2D normalMap, vec2 uv) {\n  float t = mod(time, 10.0); // \u8BA9 t \u5728 0~100 \u4E4B\u95F4\u5FAA\u73AF\n  // \u6DFB\u52A0\u591A\u4E2A\u9891\u7387\u7684\u566A\u58F0\u6765\u751F\u6210\u81EA\u7136\u7684\u6C34\u9762\u6CE2\u7EB9\u6548\u679C\n  vec2 uv0 = (uv / 103.0) + vec2(t / 17.0, t / 29.0);\n  vec2 uv1 = uv / 107.0 - vec2(t / -19.0, t / 31.0);\n  vec2 uv2 = uv / vec2(8907.0, 9803.0) + vec2(t / 101.0, t / 97.0);\n  vec2 uv3 = uv / vec2(1091.0, 1027.0) - vec2(t / 109.0, t / -113.0);\n  // \u4F7F\u7528\u66F4\u591A\u7684\u566A\u58F0\u53E0\u52A0\uFF0C\u4EE5\u4EA7\u751F\u66F4\u4E30\u5BCC\u7684\u6CE2\u7EB9\u6548\u679C\n  vec4 noise = texture(normalMap, uv0) * 0.5 + texture(normalMap, uv1) * 0.3 + texture(normalMap, uv2) * 0.1 + texture(normalMap, uv3) * 0.1;\n  return noise * 0.5 - 1.0;  // \u5F52\u4E00\u5316\u5230 [-1, 1] \u533A\u95F4\n}\nvoid sunLight(const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor, inout vec3 sunDirection) {\n  vec3 reflection = normalize(reflect(-sunDirection, surfaceNormal));\n  float direction = max(0.0, dot(eyeDirection, reflection)); // \u8BA1\u7B97\u89C6\u89D2\u4E0E\u53CD\u5C04\u5149\u7684\u89D2\u5EA6\n  specularColor += pow(direction, shiny) * sunColor * spec;  // \u9AD8\u5149\u6548\u679C\n  diffuseColor += max(dot(sunDirection, surfaceNormal), 0.0) * sunColor * diffuse;  // \u6F2B\u53CD\u5C04\u6548\u679C\n}\nczm_material czm_getMaterial(czm_materialInput materialInput) {\n  czm_material material = czm_getDefaultMaterial(materialInput);\n  vec2 transformedSt = materialInput.st * 2.0 - 1.0;\n  vec4 noise = getNoise(normalTexture, transformedSt * size);\n  vec3 surfaceNormal = normalize(noise.xzy);\n  vec3 diffuseLight = vec3(0.0);\n  vec3 specularLight = vec3(0.0);\n  vec3 eye = (czm_inverseView * vec4(vec3(0.0), 1.0)).xyz;\n  eye = (fixedFrameToEnu * vec4(eye, 1.0)).xyz;\n  vec3 world = (fixedFrameToEnu * vec4(v_worldPosition.xyz, 1.0)).xyz;\n  vec3 worldToEye = eye - world;\n  worldToEye = vec3(worldToEye.x, worldToEye.z, -worldToEye.y);\n  vec3 eyeDirection = normalize(worldToEye);\n  vec3 sunDirection = normalize(lightDirection);\n  float shiny = sunShiny;\n  float spec = 2.0;\n  float diffuse = 0.5;\n  sunLight(surfaceNormal, eyeDirection, shiny, spec, diffuse, diffuseLight, specularLight, sunDirection);\n  float distance = length(worldToEye);\n  float distortionScale = distortionScale;\n  float attenuation = clamp(1.0 / (distance * 0.5 + 1.0), 0.6, 1.0);\n  vec2 uvDistorted = (v_uv.xy / v_uv.w) * 0.5 + 0.5 + surfaceNormal.xz * distortionScale * 0.02 * attenuation;\n  vec3 reflectionSample = vec3(texture(image, uvDistorted));\n  float theta = max(dot(eyeDirection, surfaceNormal), 0.0);\n  float reflectance = mix(rf0, 1.0, pow(1.0 - theta, 5.0));\n  vec3 waterColor = waterColor.rgb;\n  vec3 scatter = max(0.0, dot(surfaceNormal, eyeDirection)) * waterColor;\n  // \u6DF7\u5408\u6563\u5C04\u5149\u4E0E\u53CD\u5C04\u5149\n  vec3 albedo = mix(\n    sunColor * diffuseLight * 0.3 + scatter,\n    vec3(0.1) + reflectionSample * 0.9 + reflectionSample * specularLight,\n    reflectance\n  );\n  material.diffuse = albedo.rgb;\n  material.alpha = waterAlpha;\n  return material;\n}\n\n";
// 水面顶点着色器源码，计算水面顶点的反射坐标和世界坐标
var WaterAppearanceVS = "\nin vec3 position3DHigh;\nin vec3 position3DLow;\nin vec3 normal;\nin vec2 st;\nin float batchId;\nout vec3 v_positionEC;\nout vec3 v_normalEC;\nout vec2 v_st;\nuniform mat4 reflectorProjectionMatrix;\nuniform mat4 reflectorViewMatrix;\nuniform mat4 reflectMatrix;\nout vec4 v_worldPosition;\nout vec4 v_uv;\nvoid main() {\n  vec4 p = czm_computePosition();\n  v_positionEC = (czm_modelViewRelativeToEye * p).xyz;\n  v_normalEC = czm_normal * normal;\n  v_st = st;\n  mat4 modelView = reflectorViewMatrix * reflectMatrix * czm_model;\n  modelView[3][0] = 0.0;\n  modelView[3][1] = 0.0;\n  modelView[3][2] = 0.0;\n  v_uv = reflectorProjectionMatrix * modelView * p;\n  vec4 positionMC = vec4( position3DHigh + position3DLow, 1.0 );\n  v_worldPosition = czm_model * positionMC;\n  gl_Position = czm_modelViewProjectionRelativeToEye * p;\n}\n";
/**
 * @description 创建一个占位纹理（1x1红色像素），用于初始化材质，防止纹理未加载时出错。
 * @param {any} context Cesium 渲染上下文
 * @returns {Texture} 占位纹理对象
 */
function createPlaceHolderTexture(context) {
    var placeholderTexture = new Texture({
        context: context,
        source: {
            width: 1,
            height: 1,
            arrayBufferView: new Uint8Array([255, 0, 0, 255]),
        },
        sampler: new Sampler({
            wrapS: TextureWrap.REPEAT,
            wrapT: TextureWrap.REPEAT,
            minificationFilter: TextureMinificationFilter.LINEAR,
            magnificationFilter: TextureMinificationFilter.LINEAR,
        }),
    });
    placeholderTexture.type = "sampler2D";
    return placeholderTexture;
}
/**
 * @description 计算反射向量，用于模拟光线在水面上的反射效果。
 * @param {Cartesian3} view 视线向量
 * @param {Cartesian3} normal 法向量
 * @returns {Cartesian3} 反射后的向量
 */
function reflect(view, normal) {
    var scaledNormal = normal.clone();
    var reflect = view.clone();
    var scalar = 2 * Cartesian3.dot(view, normal);
    Cartesian3.multiplyByScalar(normal, scalar, scaledNormal);
    return Cartesian3.subtract(view, scaledNormal, reflect);
}
/**
 * @description 判断一个数是否为2的幂，用于判断纹理是否支持生成 mipmap。
 * @param {number} value 数值
 * @returns {boolean} 是否为2的幂
 */
function isPowerOfTwo(value) {
    return (value & (value - 1)) === 0 && value !== 0;
}
/**
 * @description 给材质添加纹理 Uniform，支持异步加载图片并生成 Cesium 纹理对象。
 * @param {object} options 配置项
 * @property {any} context Cesium 渲染上下文
 * @property {Material} material 材质对象
 * @property {string} uniformName Uniform 名称
 * @property {string} imgSrc 图片地址
 * @property {TextureWrap} [wrapS] 水平方向包裹方式
 * @property {TextureWrap} [wrapT] 垂直方向包裹方式
 * @property {TextureMinificationFilter} [minificationFilter] 缩小过滤方式
 * @property {TextureMagnificationFilter} [magnificationFilter] 放大过滤方式
 */
function addTextureUniform(options) {
    var context = options.context, material = options.material, uniformName = options.uniformName, imgSrc = options.imgSrc, wrapS = options.wrapS, wrapT = options.wrapT;
    var ws = wrapS || TextureWrap.REPEAT;
    var wt = wrapT || TextureWrap.REPEAT;
    var miniF = options.minificationFilter || TextureMinificationFilter.LINEAR;
    var magF = options.magnificationFilter || TextureMagnificationFilter.LINEAR;
    var source = new Image();
    source.src = imgSrc;
    source.addEventListener("load", function () {
        var sampler = new Sampler({ ws: ws, wt: wt, miniF: miniF, magF: magF });
        var texture = new Texture({ context: context, source: source, sampler: sampler });
        texture.type = "sampler2D";
        if (isPowerOfTwo(source.width) && isPowerOfTwo(source.height)) {
            texture.generateMipmap(MipmapHint.NICEST);
        }
        material.uniforms[uniformName] = texture;
    });
}
/**
 * @constant
 * @description Cesium 3D Tiles 渲染 Pass 状态，用于场景渲染流程控制。
 */
var renderTilesetPassState = new Cesium3DTilePassState({
    pass: Cesium3DTilePass.RENDER,
});
/**
 * @constant
 * @description 用于场景背景色的临时变量。
 */
var scratchBackgroundColor = new Color();
/**
 * @function render
 * @description 渲染场景到帧缓冲区，用于生成水面反射的场景纹理。
 * @param {any} scene Cesium 场景对象
 * @param {any} passStateFramebuffer 帧缓冲区对象
 */
function render(scene, passStateFramebuffer) {
    var frameState = scene._frameState;
    var context = scene.context;
    var us = context.uniformState;
    var view = scene._defaultView;
    scene._view = view;
    scene.updateFrameState();
    frameState.passes.render = true;
    frameState.passes.postProcess = scene.postProcessStages.hasSelected;
    frameState.tilesetPassState = renderTilesetPassState;
    var backgroundColor = defaultValue(scene.backgroundColor, Color.BLUE);
    if (scene._hdr) {
        backgroundColor = Color.clone(backgroundColor, scratchBackgroundColor);
        backgroundColor.red = Math.pow(backgroundColor.red, scene.gamma);
        backgroundColor.green = Math.pow(backgroundColor.green, scene.gamma);
        backgroundColor.blue = Math.pow(backgroundColor.blue, scene.gamma);
    }
    frameState.backgroundColor = backgroundColor;
    scene.fog.update(frameState);
    us.update(frameState);
    var shadowMap = scene.shadowMap;
    if (defined(shadowMap) && shadowMap.enabled) {
        if (!defined(scene.light) || scene.light instanceof SunLight) {
            Cartesian3.negate(us.sunDirectionWC, scene._shadowMapCamera.direction);
        }
        else {
            Cartesian3.clone(scene.light.direction, scene._shadowMapCamera.direction);
        }
        frameState.shadowMaps.push(shadowMap);
    }
    scene._computeCommandList.length = 0;
    scene._overlayCommandList.length = 0;
    var viewport = view.viewport;
    viewport.x = 0;
    viewport.y = 0;
    viewport.width = context.drawingBufferWidth;
    viewport.height = context.drawingBufferHeight;
    var passState = view.passState;
    passState.framebuffer = passStateFramebuffer;
    passState.blendingEnabled = undefined;
    passState.scissorTest = undefined;
    passState.viewport = BoundingRectangle.clone(viewport, passState.viewport);
    var globe = scene.globe;
    defined(globe) && globe.beginFrame(frameState);
    scene.updateEnvironment();
    scene.updateAndExecuteCommands(passState, backgroundColor);
    scene.resolveFramebuffers(passState);
    if (defined(globe)) {
        globe.endFrame(frameState);
        if (!globe.tilesLoaded) {
            scene._renderRequested = true;
        }
    }
    context.endFrame();
}
var clipBias = 0; //水面反射裁剪偏移量，用于调整反射效果
var WaterPrimitive = /** @class */ (function () {
    /**
     * @classdesc 水面 Primitive 类，负责创建和管理水面反射和波纹效果。
     * 构造后会自动将水面添加到 Cesium 场景中，并实现反射、波纹等视觉效果
     * @param {Viewer} viewer Cesium Viewer 实例
     * @param {WaterReflectionOption} options 水面反射参数选项
     * @description 初始化水面反射相关参数和资源，并将水面添加到场景。
     */
    function WaterPrimitive(viewer, options) {
        var _this = this;
        this._hdr = false;
        this._scene = viewer.scene;
        this._height = options.height;
        this._flowDegrees = defaultValue(options.flowDegrees, 0);
        var positions = options.positions;
        var total = positions.length;
        var _x = 0;
        var _y = 0;
        var _z = 0;
        this._positions = [];
        positions.forEach(function (p) {
            var latitude = p.latitude, longitude = p.longitude;
            _x += Math.cos(latitude) * Math.cos(longitude);
            _y += Math.cos(latitude) * Math.sin(longitude);
            _z += Math.sin(latitude);
            _this._positions.push(Cartesian3.fromRadians(longitude, latitude, _this._height));
        });
        _x /= total;
        _y /= total;
        _z /= total;
        var cX = Math.atan2(_y, _x);
        var hyp = Math.sqrt(_x * _x + _y * _y);
        var cY = Math.atan2(_z, hyp);
        this._rwPos = Cartesian3.fromRadians(cX, cY, this._height);
        this._originRWPos = this._rwPos.clone();
        this._normal = Ellipsoid.WGS84.geodeticSurfaceNormal(this._rwPos);
        this._waterPlane = Plane.fromPointNormal(this._rwPos, this._normal);
        var _a = this._waterPlane, normal = _a.normal, distance = _a.distance;
        var x = normal.x, y = normal.y, z = normal.z;
        this._reflectMatrix = new Matrix4(-2 * x * x + 1, -2 * x * y, -2 * x * z, -2 * x * distance, -2 * y * x, -2 * y * y + 1, -2 * y * z, -2 * y * distance, -2 * z * x, -2 * z * y, -2 * z * z + 1, -2 * z * distance, 0, 0, 0, 1);
        this._reflectorViewMatrix = Matrix4.IDENTITY.clone();
        this._reflectorProjectionMatrix = Matrix4.IDENTITY.clone();
        this._initUniforms = {
            normalMapUrl: defaultValue(options.normalMapUrl, waterImg),
            size: defaultValue(options.rippleSize, 50.0),
            waterColor: defaultValue(options.waterColor, Color.fromCssColorString("#00aeff")),
            waterAlpha: defaultValue(options.waterAlpha, 0.9),
            rf0: defaultValue(options.reflectivity, 0.3),
            lightDirection: defaultValue(options.lightDirection, new Cartesian3(0, 0, 1)),
            sunShiny: defaultValue(options.sunShiny, 100.0),
            distortionScale: defaultValue(options.distortionScale, 3.7),
        };
        var context = this._scene.context;
        this._createFramebuffer(context, context.drawingBufferWidth, context.drawingBufferHeight, this._scene.highDynamicRange);
        this._primitive = this._createPrimitive(this._positions, this._height, this._flowDegrees);
        this._scene.primitives.add(this._primitive);
        this.preRender = this.preRender.bind(this);
        this._scene.preRender.addEventListener(this.preRender);
        UniformState.prototype.updateFrustum = function (frustum) {
            Matrix4.clone(defaultValue(frustum.customProjectionMatrix, frustum.projectionMatrix), this._projection);
            this._inverseProjectionDirty = true;
            this._viewProjectionDirty = true;
            this._inverseViewProjectionDirty = true;
            this._modelViewProjectionDirty = true;
            this._modelViewProjectionRelativeToEyeDirty = true;
            if (defined(frustum.infiniteProjectionMatrix)) {
                Matrix4.clone(frustum.infiniteProjectionMatrix, this._infiniteProjection);
                this._modelViewInfiniteProjectionDirty = true;
            }
            this._currentFrustum.x = frustum.near;
            this._currentFrustum.y = frustum.far;
            this._farDepthFromNearPlusOne = frustum.far - frustum.near + 1.0;
            this._log2FarDepthFromNearPlusOne = Math.log2(this._farDepthFromNearPlusOne);
            this._oneOverLog2FarDepthFromNearPlusOne =
                1.0 / this._log2FarDepthFromNearPlusOne;
            if (defined(frustum._offCenterFrustum)) {
                frustum = frustum._offCenterFrustum;
            }
            this._frustumPlanes.x = frustum.top;
            this._frustumPlanes.y = frustum.bottom;
            this._frustumPlanes.z = frustum.left;
            this._frustumPlanes.w = frustum.right;
        };
        PerspectiveFrustum.prototype.clone = function (result) {
            if (!defined(result)) {
                result = new PerspectiveFrustum();
            }
            result.aspectRatio = this.aspectRatio;
            result.fov = this.fov;
            result.near = this.near;
            result.far = this.far;
            result._aspectRatio = undefined;
            result._fov = undefined;
            result._near = undefined;
            result._far = undefined;
            //@ts-ignore
            this._offCenterFrustum.clone(result._offCenterFrustum);
            //@ts-ignore
            result.customProjectionMatrix = this.customProjectionMatrix;
            return result;
        };
    }
    Object.defineProperty(WaterPrimitive.prototype, "rippleSize", {
        /**
         * @member {number} rippleSize
         * @description 水面波纹大小
         */
        get: function () {
            return this._material.uniforms.size;
        },
        set: function (value) {
            this._material.uniforms.size = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WaterPrimitive.prototype, "waterAlpha", {
        /**
         * @member {number} waterAlpha
         * @description 水面透明度
         */
        get: function () {
            return this._material.uniforms.waterAlpha;
        },
        set: function (value) {
            this._material.uniforms.waterAlpha = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WaterPrimitive.prototype, "reflectivity", {
        /**
         * @member {number} reflectivity
         * @description 水面反射率
         */
        get: function () {
            return this._material.uniforms.rf0;
        },
        set: function (value) {
            this._material.uniforms.rf0 = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WaterPrimitive.prototype, "distortionScale", {
        /**
         * @member {number} distortionScale
         * @description 水面扭曲强度
         */
        get: function () {
            return this._material.uniforms.distortionScale;
        },
        set: function (value) {
            this._material.uniforms.distortionScale = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WaterPrimitive.prototype, "height", {
        /**
         * @member {number} height
         * @description 水面高度
         */
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
            var rwpCa = Cartographic.fromCartesian(this._originRWPos);
            var newRwpCa = Cartesian3.fromRadians(rwpCa.longitude, rwpCa.latitude, this._height);
            var move = Cartesian3.subtract(newRwpCa, this._originRWPos, new Cartesian3());
            var moveMatrix4 = Matrix4.fromTranslation(move);
            this._primitive.modelMatrix = moveMatrix4;
            this._rwPos = newRwpCa;
            this._normal = Ellipsoid.WGS84.geodeticSurfaceNormal(this._rwPos);
            this._waterPlane = Plane.fromPointNormal(this._rwPos, this._normal);
            this._reflectMatrix = new Matrix4(-2 * this._waterPlane.normal.x * this._waterPlane.normal.x + 1, -2 * this._waterPlane.normal.x * this._waterPlane.normal.y, -2 * this._waterPlane.normal.x * this._waterPlane.normal.z, -2 * this._waterPlane.normal.x * this._waterPlane.distance, -2 * this._waterPlane.normal.y * this._waterPlane.normal.x, -2 * this._waterPlane.normal.y * this._waterPlane.normal.y + 1, -2 * this._waterPlane.normal.y * this._waterPlane.normal.z, -2 * this._waterPlane.normal.y * this._waterPlane.distance, -2 * this._waterPlane.normal.z * this._waterPlane.normal.x, -2 * this._waterPlane.normal.z * this._waterPlane.normal.y, -2 * this._waterPlane.normal.z * this._waterPlane.normal.z + 1, -2 * this._waterPlane.normal.z * this._waterPlane.distance, 0, 0, 0, 1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WaterPrimitive.prototype, "sunShiny", {
        /**
         * @member {number} sunShiny
         * @description 太阳高光强度
         */
        get: function () {
            return this._material.uniforms.sunShiny;
        },
        set: function (value) {
            this._material.uniforms.sunShiny = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WaterPrimitive.prototype, "lightDirection", {
        /**
         * @member {Cartesian3} lightDirection
         * @description 光照方向
         */
        get: function () {
            return this._material.uniforms.lightDirection;
        },
        set: function (value) {
            this._material.uniforms.lightDirection = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WaterPrimitive.prototype, "waterColor", {
        /**
         * @member {string} waterColor
         * @description 水面颜色
         */
        get: function () {
            return this._material.uniforms.waterColor.toCssHexString();
        },
        set: function (value) {
            this._material.uniforms.waterColor = Color.fromCssColorString(value);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @description 创建水面反射材质，包含反射场景纹理和法线贴图。
     * @returns {Material} 水面材质对象
     */
    WaterPrimitive.prototype._createReflectionWaterMaterial = function () {
        var context = this._scene.context;
        var placeholderTexture = createPlaceHolderTexture(context);
        var _a = this._initUniforms, normalMapUrl = _a.normalMapUrl, size = _a.size, waterColor = _a.waterColor, waterAlpha = _a.waterAlpha, rf0 = _a.rf0, lightDirection = _a.lightDirection, sunShiny = _a.sunShiny, distortionScale = _a.distortionScale;
        var texture = Texture.fromFramebuffer({
            context: context,
            framebuffer: this._colorFramebuffer,
        });
        texture.type = "sampler2D";
        var initUniforms = {
            size: size,
            waterColor: waterColor,
            waterAlpha: waterAlpha,
            rf0: rf0,
            lightDirection: lightDirection,
            sunShiny: sunShiny,
            distortionScale: distortionScale,
            normalTexture: placeholderTexture,
            image: texture,
            time: 0,
            fixedFrameToEnu: Matrix4.toArray(this._getFixedFrameToEastNorthUpTransformFromWorldMatrix()),
        };
        var material = new Material({
            fabric: {
                type: "ReflectionWater",
                uniforms: initUniforms,
                source: WaterMaterialSource,
            },
            translucent: false,
            minificationFilter: TextureMinificationFilter.LINEAR,
            magnificationFilter: TextureMagnificationFilter.LINEAR,
        });
        addTextureUniform({
            context: context,
            material: material,
            uniformName: "normalTexture",
            imgSrc: normalMapUrl,
        });
        return material;
    };
    /**
     * @description 更新虚拟相机参数，用于生成水面反射效果。
     * @param {Camera} camera 当前场景相机
     * @returns {boolean} 是否成功更新
     */
    WaterPrimitive.prototype._updateVirtualCamera = function (camera) {
        var lookAtPosition = new Cartesian3(0, 0, -1);
        var target = new Cartesian3();
        //@ts-ignore
        this._virtualCamera = Camera.clone(camera, this._virtualCamera);
        var cameraWorldPosition = camera.positionWC.clone();
        var view = Cartesian3.subtract(this._rwPos, cameraWorldPosition, new Cartesian3());
        if (Cartesian3.dot(view, this._normal) > 0) {
            return false;
        }
        view = reflect(view, this._normal);
        Cartesian3.negate(view, view);
        Cartesian3.add(view, this._rwPos, view);
        this._virtualCamera.position = view.clone();
        Cartesian3.add(camera.directionWC, cameraWorldPosition, lookAtPosition);
        Cartesian3.subtract(this._rwPos, lookAtPosition, target);
        target = reflect(target, this._normal);
        Cartesian3.negate(target, target);
        Cartesian3.add(target, this._rwPos, target);
        this._virtualCamera.direction = Cartesian3.subtract(target, this._virtualCamera.position, new Cartesian3());
        Cartesian3.normalize(this._virtualCamera.direction, this._virtualCamera.direction);
        Cartesian3.add(camera.upWC, cameraWorldPosition, lookAtPosition);
        Cartesian3.subtract(this._rwPos, lookAtPosition, target);
        target = reflect(target, this._normal);
        Cartesian3.negate(target, target);
        Cartesian3.add(target, this._rwPos, target);
        this._virtualCamera.up = Cartesian3.subtract(target, this._virtualCamera.position, new Cartesian3());
        Cartesian3.normalize(this._virtualCamera.up, this._virtualCamera.up);
        this._reflectorProjectionMatrix =
            this._virtualCamera.frustum.projectionMatrix;
        this._reflectorViewMatrix = this._virtualCamera.viewMatrix;
        var reflectorPlane = Plane.fromPointNormal(this._rwPos, this._normal);
        Plane.transform(reflectorPlane, this._virtualCamera.viewMatrix, reflectorPlane);
        var clipPlane = new Cartesian4(reflectorPlane.normal.x, reflectorPlane.normal.y, reflectorPlane.normal.z, reflectorPlane.distance);
        var projectionMatrix = Matrix4.clone(this._virtualCamera.frustum.projectionMatrix);
        var q = new Cartesian4((Math.sign(clipPlane.x) + projectionMatrix[8]) / projectionMatrix[0], (Math.sign(clipPlane.y) + projectionMatrix[9]) / projectionMatrix[5], -1, (1.0 + projectionMatrix[10]) / projectionMatrix[14]);
        Cartesian4.multiplyByScalar(clipPlane, 2.0 / Cartesian4.dot(clipPlane, q), clipPlane);
        projectionMatrix[2] = clipPlane.x;
        projectionMatrix[6] = clipPlane.y;
        projectionMatrix[10] = clipPlane.z + 1.0 - clipBias;
        projectionMatrix[14] = clipPlane.w;
        this._virtualCamera.frustum.customProjectionMatrix =
            Matrix4.clone(projectionMatrix);
        return true;
    };
    /**
     * @description preRender事件处理，渲染水面反射。每帧调用，更新水面反射纹理。
     * @param {any} scene Cesium 场景对象
     */
    WaterPrimitive.prototype.preRender = function (scene) {
        if (!defined(this._primitive))
            return;
        var curDefaultViewCamera = scene._defaultView.camera;
        var currentShadowMap = scene.shadowMap;
        var currentGlobe = scene.globe.show;
        var currentShowSkirts = scene.globe.showSkirts;
        if (!this._updateVirtualCamera(scene._defaultView.camera)) {
            this._primitive.show = false;
            return;
        }
        this._primitive.show = false;
        scene._defaultView.camera = this._virtualCamera;
        scene.shadowMap = undefined;
        scene.globe.show = false;
        scene.globe.showSkirts = false;
        var context = scene.context;
        var width = context.drawingBufferWidth;
        var height = context.drawingBufferHeight;
        var hdr = scene.highDynamicRange;
        this._createFramebuffer(context, width, height, hdr);
        render(scene, this._colorFramebuffer);
        var appearance = this._primitive.appearance;
        var texture = Texture.fromFramebuffer({
            context: context,
            framebuffer: this._colorFramebuffer,
        });
        texture.type = "sampler2D";
        this._material.uniforms.image = texture;
        this._material.uniforms.time = performance.now() / 1000.0;
        this._material.uniforms.fixedFrameToEnu = Matrix4.toArray(this._getFixedFrameToEastNorthUpTransformFromWorldMatrix());
        appearance.uniforms.reflectMatrix = Matrix4.toArray(this._reflectMatrix);
        appearance.uniforms.reflectorProjectionMatrix = Matrix4.toArray(this._reflectorProjectionMatrix);
        appearance.uniforms.reflectorViewMatrix = Matrix4.toArray(this._reflectorViewMatrix);
        this._primitive.show = true;
        scene._defaultView.camera = curDefaultViewCamera;
        scene.shadowMap = currentShadowMap;
        scene.globe.show = currentGlobe;
        scene.globe.showSkirts = currentShowSkirts;
    };
    /**
     * @description 创建水面 Primitive（几何体和材质），并设置反射相关 Uniform。
     * @param {Cartesian3[]} positions 水面顶点坐标
     * @param {number} extrudedHeight 水面高度
     * @param {number} flowDegrees 水面旋转角度
     * @returns {Primitive} 水面 Primitive 对象
     */
    WaterPrimitive.prototype._createPrimitive = function (positions, extrudedHeight, flowDegrees) {
        var material = this._createReflectionWaterMaterial();
        this._material = material;
        var appearance = new MaterialAppearance({
            material: material,
            vertexShaderSource: WaterAppearanceVS,
            translucent: true,
        });
        appearance.uniforms = {};
        appearance.uniforms.reflectMatrix = Matrix4.toArray(this._reflectMatrix);
        appearance.uniforms.reflectorProjectionMatrix = Matrix4.toArray(this._reflectorProjectionMatrix);
        appearance.uniforms.reflectorViewMatrix = Matrix4.toArray(this._reflectorViewMatrix);
        var primitive = new Primitive({
            geometryInstances: new GeometryInstance({
                geometry: new PolygonGeometry({
                    polygonHierarchy: new PolygonHierarchy(positions),
                    perPositionHeight: true,
                    extrudedHeight: extrudedHeight,
                    stRotation: Math$1.toRadians(flowDegrees),
                    closeTop: true,
                    closeBottom: false,
                    vertexFormat: VertexFormat.POSITION_NORMAL_AND_ST,
                }),
            }),
            appearance: appearance,
            asynchronous: false,
        });
        return primitive;
    };
    /**
     * @description 获取世界坐标到 ENU 坐标系的变换矩阵。
     * @returns {Matrix4} 变换矩阵
     */
    WaterPrimitive.prototype._getFixedFrameToEastNorthUpTransformFromWorldMatrix = function () {
        var EnuToFixedFrame = Transforms.eastNorthUpToFixedFrame(this._rwPos);
        var fixedFrameToEnu = Matrix4.inverse(EnuToFixedFrame, new Matrix4());
        return fixedFrameToEnu;
    };
    /**
     * @description 创建帧缓冲区资源，用于存储反射场景的渲染结果。
     * @param {any} context Cesium 渲染上下文
     * @param {number} width 帧缓冲区宽度
     * @param {number} height 帧缓冲区高度
     * @param {boolean} hdr 是否高动态范围
     */
    WaterPrimitive.prototype._createFramebuffer = function (context, width, height, hdr) {
        var colorTexture = this._colorTexture;
        if (defined(colorTexture) &&
            colorTexture.width === width &&
            colorTexture.height === height &&
            this._hdr === hdr) {
            return;
        }
        this._destroyResource();
        this._hdr = hdr;
        var pixelDatatype = hdr
            ? context.halfFloatingPointTexture
                ? PixelDatatype.HALF_FLOAT
                : PixelDatatype.FLOAT
            : PixelDatatype.UNSIGNED_BYTE;
        this._colorTexture = new Texture({
            context: context,
            width: width,
            height: height,
            pixelFormat: PixelFormat.RGBA,
            pixelDatatype: pixelDatatype,
            sampler: new Sampler({
                wrapS: TextureWrap.CLAMP_TO_EDGE,
                wrapT: TextureWrap.CLAMP_TO_EDGE,
                minificationFilter: TextureMinificationFilter.LINEAR,
                magnificationFilter: TextureMagnificationFilter.LINEAR,
            }),
        });
        this._depthStencilTexture = new Texture({
            context: context,
            width: width,
            height: height,
            pixelFormat: PixelFormat.DEPTH_STENCIL,
            pixelDatatype: PixelDatatype.UNSIGNED_INT_24_8,
        });
        this._colorFramebuffer = new Framebuffer({
            context: context,
            colorTextures: [this._colorTexture],
            depthStencilTexture: this._depthStencilTexture,
            destroyAttachments: false,
        });
    };
    /**
     * @description 销毁帧缓冲区和纹理资源，释放显存。
     */
    WaterPrimitive.prototype._destroyResource = function () {
        this._colorTexture && this._colorTexture.destroy();
        this._depthStencilTexture && this._depthStencilTexture.destroy();
        this._colorFramebuffer && this._colorFramebuffer.destroy();
        this._colorTexture = undefined;
        this._depthStencilTexture = undefined;
        this._colorFramebuffer = undefined;
    };
    /**
     * @description 销毁并移除动态水面对象，包括场景中的 Primitive、事件监听和显存资源。
     */
    WaterPrimitive.prototype.destroy = function () {
        // 移除 preRender 事件监听
        if (this._scene && this.preRender) {
            this._scene.preRender.removeEventListener(this.preRender);
        }
        // 从场景中移除水面 Primitive
        if (this._scene && this._primitive) {
            this._scene.primitives.remove(this._primitive);
        }
        // 销毁显存资源
        this._destroyResource();
        // 清空引用
        this._primitive = undefined;
        this._material = undefined;
        this._colorFramebuffer = undefined;
        this._colorTexture = undefined;
        this._depthStencilTexture = undefined;
    };
    return WaterPrimitive;
}());

/**
 * 创建点对象
 * @param viewer
 * @param option
 * @param callback
 */
function PointCreate(viewer, option, callback) {
    var point;
    viewer.ReminderTip.message = "左键点击地图添加点对象，右键结束添加";
    viewer.ReminderTip.show = true;
    viewer.EventHandler.on("leftClick", function (e) {
        var pixPos = e.position;
        var cartesian = getCatesian3FromPX(viewer, pixPos);
        if (!cartesian)
            return;
        if (point) {
            point.position = new ConstantPositionProperty(cartesian);
        }
        else {
            option = new PointGraphic(option).value;
            point = viewer.entities.add({
                id: option.id,
                name: "Point-Create",
                position: cartesian,
                point: option,
            });
        }
    });
    viewer.EventHandler.on("rightClick", function () {
        viewer.EventHandler.offEvents(["leftClick", "rightClick"]);
        viewer.ReminderTip.show = false;
        safeCallback(callback, point);
    });
}

/**
 * 广告版几何属性参数类
 * @extends Cesium.BillboardGraphics
 * @param {BillboardOption} [options] - 广告版集合属性参数选项
 */
var BillboardGraphic = /** @class */ (function (_super) {
    __extends(BillboardGraphic, _super);
    function BillboardGraphic(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.merge(options);
        var onGround = options.onGround, allowPick = options.allowPick, id = options.id, _a = options.featureAttribute, featureAttribute = _a === void 0 ? {} : _a, image = options.image, verticalOrigin = options.verticalOrigin;
        _this._onGround = onGround;
        _this.updateHr(_this._onGround);
        _this._allowPick = new ConstantProperty(allowPick);
        _this._id = id || randomId();
        _this._featureAttribute = new ConstantProperty(__assign({ id: _this._id }, featureAttribute));
        _this.image = new ConstantProperty(image || DEF_POINT_IMG);
        _this.verticalOrigin = new ConstantProperty(verticalOrigin || VerticalOrigin.BOTTOM);
        return _this;
    }
    Object.defineProperty(BillboardGraphic.prototype, "value", {
        /**
         * 广告版几何属性参数值
         */
        get: function () {
            var _a = this, onGround = _a.onGround, allowPick = _a.allowPick, id = _a.id, featureAttribute = _a.featureAttribute, color = _a.color, heightReference = _a.heightReference, scaleByDistance = _a.scaleByDistance, show = _a.show, splitDirection = _a.splitDirection, translucencyByDistance = _a.translucencyByDistance, disableDepthTestDistance = _a.disableDepthTestDistance, distanceDisplayCondition = _a.distanceDisplayCondition, width = _a.width, height = _a.height, image = _a.image, verticalOrigin = _a.verticalOrigin, horizontalOrigin = _a.horizontalOrigin;
            var props = {
                onGround: onGround,
                allowPick: allowPick,
                id: id,
                featureAttribute: featureAttribute,
                color: color,
                heightReference: heightReference,
                scaleByDistance: scaleByDistance,
                show: show,
                splitDirection: splitDirection,
                translucencyByDistance: translucencyByDistance,
                disableDepthTestDistance: disableDepthTestDistance,
                distanceDisplayCondition: distanceDisplayCondition,
                width: width,
                height: height,
                image: image,
                verticalOrigin: verticalOrigin,
                horizontalOrigin: horizontalOrigin,
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
    Object.defineProperty(BillboardGraphic.prototype, "id", {
        /**
         * 广告版唯一id
         */
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BillboardGraphic.prototype, "onGround", {
        /**
         * 广告版贴地设置
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
    Object.defineProperty(BillboardGraphic.prototype, "allowPick", {
        /**
         * 广告版对象点选设置
         */
        get: function () {
            return this._allowPick.getValue();
        },
        set: function (bool) {
            this._allowPick = new ConstantProperty(bool);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BillboardGraphic.prototype, "featureAttribute", {
        /**
         * 广告版对象属性表
         */
        get: function () {
            return this._featureAttribute;
        },
        set: function (val) {
            this._featureAttribute = new ConstantProperty(val);
        },
        enumerable: false,
        configurable: true
    });
    BillboardGraphic.prototype.updateHr = function (bool) {
        this.heightReference = bool
            ? new ConstantProperty(HeightReference.CLAMP_TO_GROUND)
            : new ConstantProperty(HeightReference.NONE);
    };
    return BillboardGraphic;
}(BillboardGraphics));

function geojsonPoints(viewer, geojson, options, filterOption) {
    console.time("pointTime");
    var billboardCollection = viewer.scene.primitives.add(new BillboardCollection());
    console.log(options);
    var defOpt = new BillboardGraphic(options);
    console.log(defOpt.value);
    GeoJsonDataSource.load(geojson)
        .then(function (data) {
        console.log("加载数据：", data);
        var points = data.entities.values.slice(0, 100);
        for (var index = 0; index < points.length; index++) {
            var position = points[index].position;
            if (defined(position)) {
                var pos = position.getValue(JulianDate.now());
                billboardCollection.add(__assign({ position: pos }, defOpt.value));
            }
        }
        console.timeEnd("pointTime");
    })
        .catch(function (err) {
        console.log("加载失败！！");
        throw new Error(err);
    })
        .finally(function () {
        console.log("加载成功！！");
    });
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
     * @method
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
    /**
     * 添加水面-普通模式
     * @param {WaterOptions} options - 水面对象条件
     * @returns {Cesium.Primitive} - 水面对象，Primitive类对象，参照Cesium
     */
    Add.prototype.addWaters = function (options) {
        var waterPrimitives = addWaters(this.viewer, options);
        return waterPrimitives;
    };
    /**
     * 添加动态水面-支持倒影
     * @param {WaterReflectionOption} options - 水面对象条件
     * @returns {WaterPrimitive} - 水面对象，WaterPrimitive类
     */
    Add.prototype.addWaterReflection = function (options) {
        return new WaterPrimitive(this.viewer, options);
    };
    /**
     * 加载Geojson
     * @param type
     * @param json
     * @param options
     */
    Add.prototype.addGeojson = function (type, json, options) {
        if (options === void 0) { options = {}; }
        geojsonPoints(this.viewer, json, options);
    };
    return Add;
}());
var Creator = /** @class */ (function () {
    /**
     * 图层-创建对象类
     * @param  {Viewer} viewer 地图场景对象
     */
    function Creator(viewer) {
        this.viewer = viewer;
        this._editingId = "";
    }
    /**
     * 初始化创建状态
     */
    Creator.prototype._initStatus = function () {
        this._editingId != "" && this.viewer.Layers.removeById(this._editingId);
        this.viewer.EventHandler.offEvents([
            "leftClick",
            "mouseMove",
            "rightClick",
            "leftDblClick",
        ]);
    };
    /**
     * 创建点对象
     * @param {PointOption} option - 点参数
     * @param {Function} [callback] - 创建完成回调函数
     */
    Creator.prototype.createPoint = function (option, callback) {
        var _this = this;
        if (option === void 0) { option = {}; }
        this._initStatus();
        this._updateOptID(option);
        PointCreate(this.viewer, option, function (point) {
            _this._editingId = "";
            safeCallback(callback, point);
        });
    };
    /**
     * 更新创建对象ID
     * @param option
     */
    Creator.prototype._updateOptID = function (option) {
        if (!option.id) {
            option.id = "point-" + randomId();
        }
        this._editingId = option.id;
    };
    return Creator;
}());

var Flatten = /** @class */ (function () {
    /**
     * 3DTiles模型压平处理类
     * 通过自定义着色器实现对指定区域内模型的高度压平效果
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
        this._matrix = Transforms.eastNorthUpToFixedFrame(this._center.clone());
        this._localMatrix = Matrix4.inverse(this._matrix, new Matrix4());
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
        var flatCustomShader = new CustomShader({
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
            var lp = Matrix4.multiplyByPoint(this._localMatrix, position, new Cartesian3());
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
        this._inspector = false;
    }
    Object.defineProperty(TilesModel.prototype, "inspectorGUI", {
        /**
         * 控制3Dtiles调试面板
         * @type {Boolean}
         */
        get: function () {
            return this._inspector;
        },
        set: function (show) {
            this._inspector = show;
            show
                ? this.viewer.extend(viewerCesium3DTilesInspectorMixin)
                : console.log("关闭");
        },
        enumerable: false,
        configurable: true
    });
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
         * 图层-创建对象类
         * @type {Creator}
         */
        this.Creator = new Creator(this.viewer);
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
                    if (!defined(pos))
                        return [2 /*return*/];
                    pick = viewer.scene.drillPick(e.position) // 获取 pick 拾取对象
                    ;
                    console.log("SDK-点击：", pick);
                    // 优先拾取矢量
                    // 判断是否获取到了 pick 对象
                    if (defined(pick) && pick.length > 0) {
                        safeCallback(callback, { pos: pos, pick: pick });
                        return [2 /*return*/];
                    }
                    pickRay = viewer.camera.getPickRay(e.position);
                    if (!defined(pickRay)) return [3 /*break*/, 2];
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
        document.body.style.cursor = defined(pick) ? "pointer" : "default";
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

var AroundPoint = /** @class */ (function () {
    /**
     * 绕点旋转类
     * @param {Object} viewer 地图场景对象
     * @param {Cartesian3} position 目标点坐标，笛卡尔坐标
     * @param {number} angle 观察角度，-90为垂直正视，建议值区间[-30,-40]
     * @param {number} amount 旋转360度所需要时间，单位：秒(s)
     * @param {number} distance 点距离相机距离，单位：米(m)
     */
    function AroundPoint(viewer, position, angle, amount, distance) {
        this.viewer = viewer;
        this._time = amount;
        this._angle = angle;
        this._position = position;
        this._distance = distance;
        this._startTime = JulianDate.fromDate(new Date());
    }
    AroundPoint.prototype._bindEvent = function () {
        this.viewer.clock.onTick.addEventListener(this._rotate, this);
    };
    AroundPoint.prototype._unbindEvent = function () {
        this.viewer.camera.lookAtTransform(Matrix4.IDENTITY);
        this.viewer.clock.onTick.removeEventListener(this._rotate, this);
    };
    AroundPoint.prototype._rotate = function () {
        var delTime = JulianDate.secondsDifference(this.viewer.clock.currentTime, this._startTime);
        var angle = 360 / this._time;
        var heading = Math$1.toRadians(delTime * angle);
        this.viewer.scene.camera.setView({
            destination: this._position, // 点的坐标
            orientation: {
                heading: heading,
                pitch: Math$1.toRadians(this._angle),
            },
        });
        this.viewer.scene.camera.moveBackward(this._distance);
    };
    /**
     * 开始旋转
     * @returns {AroundPoint} 绕点旋转对象
     */
    AroundPoint.prototype.start = function () {
        this.viewer.clock.shouldAnimate = true;
        this._unbindEvent();
        this._bindEvent();
        return this;
    };
    /**
     * 停止旋转
     * @returns {AroundPoint} 绕点旋转对象
     */
    AroundPoint.prototype.stop = function () {
        this._unbindEvent();
        return this;
    };
    /**
     * 注销对象
     */
    AroundPoint.prototype.destroy = function () {
        this._unbindEvent();
    };
    return AroundPoint;
}());

var Navigation = /** @class */ (function () {
    /**
     * 导航主类
     * @param {Object} viewer 地图场景对象
     */
    function Navigation(viewer) {
        this.viewer = viewer;
        this._homeCamera = {
            degrees: { x: 102.778637, y: 34.673852, z: 7104159.98 },
            position: new Cartesian3(-2453733.1395831853, 10818816.243349865, 7649756.401418009),
            hpr: { heading: 6.283185307179586, pitch: -1.5691401107287417, roll: 0 },
        };
        this._rotation = false;
    }
    Object.defineProperty(Navigation.prototype, "homeCamera", {
        /**
         * 获取/设置初始视角
         * @type {CameraStatus}
         */
        get: function () {
            return this._homeCamera;
        },
        set: function (cameraStatus) {
            this._homeCamera = clone(cameraStatus, true);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Navigation.prototype, "rotation", {
        /**
         * 地球自转状态
         * @type {Boolean}
         */
        get: function () {
            return this._rotation;
        },
        set: function (bool) {
            var _a = this.viewer, clock = _a.clock, scene = _a.scene;
            if (bool) {
                clock.multiplier = 2000;
                scene.postUpdate.addEventListener(this.icrf, this);
            }
            else {
                clock.multiplier = 1.0;
                scene.postUpdate.removeEventListener(this.icrf, this);
                this.viewer.camera.lookAtTransform(Matrix4.IDENTITY);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Navigation.prototype, "cameraStatus", {
        /**
         * 当前相机状态
         * @readonly
         * @type {CameraStatus}
         */
        get: function () {
            var _a = this.viewer.camera, position = _a.position, heading = _a.heading, pitch = _a.pitch, roll = _a.roll;
            var degrees = transformCartesianToWGS84(position);
            var hpr = { heading: heading, pitch: pitch, roll: roll };
            return { degrees: degrees, position: position, hpr: hpr };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Navigation.prototype, "scale", {
        /**
         * 获取比例尺，页面1px的距离，单位m
         * @readonly
         * @type {number}
         *
         */
        get: function () {
            return getScale(this.viewer);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Navigation.prototype, "viewExtent", {
        /**
         * 获取地图四至，最小和最大经纬度
         * @readonly
         * @type {ViewExtent}
         */
        get: function () {
            return viewExtend(this.viewer);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 跳转到初始视角，即homeCamera参数
     * @param {number} [time=2.0] -（可选）跳转时间，以秒为单位，默认2秒
     */
    Navigation.prototype.homeView = function (time) {
        this.flyToPos(this._homeCamera, time || 2);
    };
    /**
     * 跳转到指定四至
     * @param {Array<Number>} extent 四至范围，格式：[west,south,east,north],单位经纬度
     * @param {Number} [time=2.0] 跳转时间，单位s，默认2秒
     * @param {Function} [callback] 回调函数，可以在其中写入跳转完成后执行方法
     */
    Navigation.prototype.flyToExtent = function (extent, time, callback) {
        flyToExtent(this.viewer, extent, time, callback);
    };
    /**
     * 跳转到指定视角
     * @param {ViewStatus} viewStatus 待跳转视角对象
     * @param {Number} [time=2.0] 跳转时间，单位秒(s)，默认2秒
     * @param {Boolean} [degree=false] 传参类型，欧拉角是否位经纬度。
     * 若degree=false，则{@link ViewStatus}的position为笛卡尔坐标，欧拉角单位为弧度；
     * 若degree=true，则{@link ViewStatus}的position为WGS84坐标，欧拉角单位为度
     * @param {Function} [callback] 回调函数，可以在其中写入跳转完成后执行方法
     */
    Navigation.prototype.flyToPos = function (viewStatus, time, degree, callback) {
        if (degree === void 0) { degree = false; }
        var position = viewStatus.position, hpr = viewStatus.hpr;
        var bool = typeof time === "number";
        flyToPos(this.viewer, position, hpr, bool ? time : 2, degree, callback);
    };
    /**
     * 定位到指定视角，仅限笛卡尔坐标和弧度参数
     * @param {ViewStatus} viewStatus
     */
    Navigation.prototype.zoomToPos = function (viewStatus) {
        this.flyToPos(viewStatus, 0);
    };
    /**
     * 跳转到指定对象
     * @param {Object} item - 待跳转对象，理论支持界面加载的所有对象
     */
    Navigation.prototype.flyToItem = function (item) {
        flyToItem(this.viewer, item);
    };
    /**
     * 定位到指定对象
     * @param {Object} item - 待定位对象，理论支持界面加载的所有对象
     */
    Navigation.prototype.zoomToItem = function (item) {
        zoomToItem(this.viewer, item);
    };
    /**
     * 跳转到指定坐标
     * @param {DegreePos} pos 待跳转坐标，WGS84坐标
     * @param {number} [time=2.0] 跳转时间，默认2秒
     * @param {Function} [callback] 回调函数，可以在其中写入跳转完成后执行方法
     */
    Navigation.prototype.flyToDegree = function (pos, time, callback) {
        var x = pos.x, y = pos.y, _a = pos.z, z = _a === void 0 ? 0 : _a;
        var bool = typeof time === "number";
        flyToDegree(this.viewer, x, y, z, bool ? time : 2, callback);
    };
    /**
     * 定位到指定坐标
     * @param {DegreePos} pos 待跳转坐标，WGS84坐标
     * @param {Function} [callback] 回调函数，可以在其中写入跳转完成后执行方法
     */
    Navigation.prototype.zoomToDegree = function (pos, callback) {
        this.flyToDegree(pos, 0, callback);
    };
    /**
     * 绕点旋转
     * @param {DegreePos} pos - 位置点，WGS84坐标
     * @param {number} angle 观察角度，-90为垂直正视，建议值区间[-30,-40]
     * @param {number} amount 旋转360度所需要时间，单位：秒(s)
     * @param {number} distance 点距离相机距离，单位：米(m)
     * @returns {AroundPoint} 绕点旋转对象
     */
    Navigation.prototype.aroundPoint = function (pos, angle, time, distance) {
        var x = pos.x, y = pos.y, z = pos.z;
        var aroundPoint = new AroundPoint(this.viewer, Cartesian3.fromDegrees(x, y, z), angle, time, distance);
        return aroundPoint;
    };
    Navigation.prototype.icrf = function () {
        if (this.viewer.scene.mode !== SceneMode.SCENE3D) {
            return true;
        }
        var icrfToFixed = Transforms.computeIcrfToFixedMatrix(this.viewer.clock.currentTime);
        if (defined(icrfToFixed)) {
            var camera = this.viewer.camera;
            var offset = Cartesian3.clone(camera.position);
            var transform = Matrix4.fromRotationTranslation(icrfToFixed);
            camera.lookAtTransform(transform, offset);
        }
    };
    return Navigation;
}());

var Heatmap3D = /** @class */ (function () {
    function Heatmap3D(viewer) {
        this.viewer = viewer;
    }
    Heatmap3D.prototype.test = function () {
        alert("Heatmap3D test()");
    };
    return Heatmap3D;
}());

var SpecialAnalysis = /** @class */ (function () {
    function SpecialAnalysis(viewer) {
        this.viewer = viewer;
        this.Heatmap3D = Heatmap3D;
    }
    return SpecialAnalysis;
}());

var ReminderTip = /** @class */ (function () {
    /**
     * 鼠标提示弹窗tip
     * @param {Viewer} viewer 地图场景
     * @param {string} [id="sdk-reminder-tip"] 元素对象id
     */
    function ReminderTip(viewer, id) {
        if (id === void 0) { id = "sdk-reminder-tip"; }
        this.viewer = viewer;
        this.id = id;
        this._viewEl =
            this.viewer.container.getElementsByClassName("cesium-viewer")[0];
        this._message = "";
        this._isShow = false;
        // 绑定事件处理函数，确保在移除时是同一个引用
        this._tipEvent = this._handleMouseMove.bind(this);
        var domObj = document.getElementById(this.id);
        this._tipEl = domObj || this.initTipEl(this.id);
    }
    Object.defineProperty(ReminderTip.prototype, "show", {
        /**
         * 是否显示提示框
         * @type {boolean}
         */
        get: function () {
            return this._isShow;
        },
        set: function (bool) {
            bool ? this.showTip() : this.hideTip();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReminderTip.prototype, "message", {
        /**
         * 提示内容
         * @type {string}
         */
        get: function () {
            return this._message;
        },
        set: function (str) {
            this._message = str;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 初始化元素
     * @param id
     * @returns
     */
    ReminderTip.prototype.initTipEl = function (id) {
        var elementbottom = document.createElement("div");
        this._viewEl.append(elementbottom);
        var html = "<div id=\"".concat(id, "\" style=\"display: none;pointer-events: none;position: absolute;z-index: 1000;opacity: 0.8;border-radius: 4px;padding: 4px 8px;white-space: nowrap;font-family:\u9ED1\u4F53;color:white;font-weight: bolder;font-size: 14px;background: #000000cc;color: white\"></div>");
        this._viewEl.insertAdjacentHTML("beforeend", html);
        var domEl = document.getElementById(id);
        return domEl;
    };
    /**
     * 显示提示框
     */
    ReminderTip.prototype.showTip = function () {
        this._isShow = true;
        this._viewEl.addEventListener("mousemove", this._tipEvent);
    };
    /**
     * 清除提示框
     */
    ReminderTip.prototype.hideTip = function () {
        this._isShow = false;
        this._tipEvent &&
            this._viewEl.removeEventListener("mousemove", this._tipEvent);
        this._createTip({ x: 0, y: 0 }, false);
        this._message = "";
    };
    /**
     * 鼠标移动事件处理
     */
    ReminderTip.prototype._handleMouseMove = function (e) {
        this._createTip({ x: e.clientX, y: e.clientY }, true);
    };
    /**
     * 创建提示
     * @param position
     * @param show
     */
    ReminderTip.prototype._createTip = function (position, show) {
        this._tipEl.innerHTML = this._message;
        this._tipEl.style.left = position.x + 15 + "px";
        this._tipEl.style.top = position.y + 20 + "px";
        this._tipEl.style.display = show ? "block" : "none";
    };
    return ReminderTip;
}());

// 设置默认相机观察范围（覆盖Cesium默认设置）
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = new Cesium.Rectangle(Cesium.Math.toRadians(70), Cesium.Math.toRadians(-15), Cesium.Math.toRadians(140), Cesium.Math.toRadians(80));
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
            animation: false, fullscreenButton: false, geocoder: false, homeButton: false, infoBox: false, sceneModePicker: false, timeline: false, sceneMode: Cesium.SceneMode.SCENE3D, scene3DOnly: true, baseLayerPicker: false, navigationHelpButton: false, vrButton: false, selectionIndicator: false, orderIndependentTranslucency: true, shouldAnimate: true, baseLayer: BaseLayer.DefaultSingleImg, 
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
        /**
         * 导航主类
         * @type {Navigation}
         */
        _this.Navigation = new Navigation(_this);
        /**
         * 空间分析主类
         * @type {SpecialAnalysis}
         */
        _this.SpecialAnalysis = new SpecialAnalysis(_this);
        /**
         * 鼠标提示主类
         * @type {SpecialAnalysis}
         */
        _this.ReminderTip = new ReminderTip(_this);
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
        Cesium.Ion.defaultAccessToken = ((_a = this.options) === null || _a === void 0 ? void 0 : _a.defaultKey) || CesiumIcon;
        // 地形交互配置，深度监测
        this.scene.globe.depthTestAgainstTerrain = true;
        // 天体显示配置
        this.scene.skyBox.show = true;
        this.scene.sun.show = true;
        this.scene.moon.show = false;
        this.scene.skyAtmosphere.show = true;
        // 光照配置
        this.scene.globe.enableLighting = false;
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
                Cesium.CameraEventType.WHEEL, // 保留滚轮缩放
                Cesium.CameraEventType.MIDDLE_DRAG, // 添加中键拖动缩放
                Cesium.CameraEventType.PINCH, // 保留多点触控缩放
            ];
            //设置右键旋转
            this.scene.screenSpaceCameraController.tiltEventTypes = [
                Cesium.CameraEventType.RIGHT_DRAG,
                Cesium.CameraEventType.PINCH,
                {
                    eventType: Cesium.CameraEventType.RIGHT_DRAG,
                    modifier: Cesium.KeyboardEventModifier.CTRL,
                },
                {
                    eventType: Cesium.CameraEventType.MIDDLE_DRAG,
                    modifier: Cesium.KeyboardEventModifier.CTRL,
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
}(Cesium.Viewer));

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
        var onGround = options.onGround, pColor = options.pColor, pOutlineColor = options.pOutlineColor, allowPick = options.allowPick, id = options.id, _a = options.pixelSize, pixelSize = _a === void 0 ? 15 : _a, _b = options.featureAttribute, featureAttribute = _b === void 0 ? {} : _b;
        _this.pixelSize = new ConstantProperty(pixelSize);
        _this._onGround = onGround;
        _this.updateHr(_this._onGround);
        _this._pColor = pColor || "#ff0000";
        _this.updateColor(_this._pColor);
        _this._pOutlineColor = pOutlineColor || "#ffff00";
        _this.updateOutlineColor(_this._pOutlineColor);
        _this._allowPick = new ConstantProperty(allowPick);
        _this._id = id || randomId();
        _this._featureAttribute = new ConstantProperty(__assign({ id: _this._id }, featureAttribute));
        _this.show = new ConstantProperty(true);
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
            this._allowPick = new ConstantProperty(bool);
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
            this._featureAttribute = new ConstantProperty(val);
        },
        enumerable: false,
        configurable: true
    });
    PointGraphic.prototype.updateHr = function (bool) {
        this.heightReference = bool
            ? new ConstantProperty(HeightReference.CLAMP_TO_GROUND)
            : new ConstantProperty(HeightReference.NONE);
    };
    PointGraphic.prototype.updateColor = function (color) {
        this.color = new ConstantProperty(Color.fromCssColorString(color)).getValue();
    };
    PointGraphic.prototype.updateOutlineColor = function (color) {
        this.outlineColor = new ConstantProperty(Color.fromCssColorString(color)).getValue();
    };
    return PointGraphic;
}(PointGraphics));

var Screen = /*#__PURE__*/Object.freeze({
    __proto__: null
});

export { BaseLayer, BillboardGraphic as BillboardGraphics, Coordinate as Coordinates, EventNameMap, PointGraphic as PointGraphics, Screen, Viewer, DefaultValue as defaultValue };
//# sourceMappingURL=larkexplorer.esm.js.map
