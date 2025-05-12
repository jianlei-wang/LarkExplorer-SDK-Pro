/*
 * 通用方法
 * @Author: jianlei wang
 * @Date: 2025-04-23 09:42:04
 * @Last Modified by: jianlei wang
 * @Last Modified time: 2025-05-12 16:18:53
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
