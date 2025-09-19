/**
 * 天地图，获取参数
 * @param type 地图类型：img-影像，vec-矢量，cva-矢量注记，cia-影像注记
 * @param token 天地图token
 * @returns
 */
export declare function getTdtOption(type: "img" | "vec" | "cva" | "cia", token?: string): {
    url: string;
    layer: "img" | "vec" | "cva" | "cia";
    style: string;
    format: string;
    tileMatrixSetID: string;
    maximumLevel: number;
    subdomains: string[];
    token: string;
};
