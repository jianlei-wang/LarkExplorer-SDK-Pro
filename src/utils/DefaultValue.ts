/**
 * 为参数设置默认值。如果第一个参数不为 undefined，则返回第一个参数，否则返回第二个参数。
 * @template T
 * @param {T | undefined | null} a - 如果已定义且非空，则返回的值
 * @param {T} b - 默认值
 * @returns {T} 如果第一个参数不为 undefined 和 null，则返回第一个参数，否则返回第二个参数。
 * @example
 * param = defaultValue(param, 'default');
 */
export function defaultValue<T>(a: T | undefined | null, b: T): T {
  return a !== undefined && a !== null ? a : b
}

/**
 * 冻结的空对象，用作传递给 `set` 方法的选项的默认值
 */
defaultValue.EMPTY_OBJECT = Object.freeze({})

export default defaultValue
