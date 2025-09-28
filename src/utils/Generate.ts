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
export function randomId() {
  const tempUrl = URL.createObjectURL(new Blob())
  const uuid = tempUrl.toString()
  URL.revokeObjectURL(tempUrl)
  return uuid.substring(uuid.lastIndexOf("/") + 1)
}

/**
 * 安全执行回调
 */
export function safeCallback(callback: Function | undefined, data: any) {
  callback && typeof callback === "function" && callback(data)
}
