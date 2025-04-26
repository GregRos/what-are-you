/**
 * Checks if the given value is an object.
 *
 * @template T - The type of the value to check.
 * @param value - The value to test.
 */
export function isObject<T>(value: T): value is T & {} {
    return typeof value === "object" && value != null
}

/**
 * Checks if the given value is a function.
 *
 * @param value - The value to check.
 */
export function isFunction(value: unknown): value is Function {
    return typeof value === "function"
}

/**
 * Checks if the given value is a BigInt.
 *
 * @param value - The value to check.
 */
export const isBigInt = (value: any): value is bigint => {
    return typeof value === "bigint"
}

/**
 * Checks if the given value is a string.
 *
 * @param value - The value to check.
 */
export const isString = (value: any): value is string => {
    return typeof value === "string"
}
/**
 * Checks if the given value is acceptable as the key of a property.
 *
 * That is, whether it's a string, a number, or a symbol.
 *
 * @param value - The value to check.
 */
export const isPropertyKey = (value: any): value is PropertyKey => {
    return isString(value) || isSymbol(value) || isNumber(value)
}

/**
 * Checks if the given value is null or undefined.
 *
 * @param value - The value to check.
 */
export const isNullish = (value: any): value is null | undefined => {
    return value == null
}

/**
 * Checks if the given value is an array.
 *
 * @param value - The value to check.
 */
export const isArray = Array.isArray

/**
 * Checks if the given value is a thenable (i.e., a Promise or similar).
 *
 * @template T - Allows asserting the type of the resolved value. Not part of the check.
 * @param what - The value to check.
 */
export const isThenable = <T = unknown>(what: unknown): what is PromiseLike<T> => {
    return isObject(what) && isFunction((what as any).then)
}

/**
 * Checks if the given value is a number.
 *
 * @param v - The value to check.
 */
export const isNumber = (v: number) => +v === v
/**
 * Checks if the given value is a number and can be represented exactly in JavaScript.
 *
 * That is, if it's a number in the range (-2⁵³, 2⁵³).
 *
 * @param v - The value to check.
 */
export const isInt = Number.isSafeInteger
/**
 * Checks if the given value is either a {@link isInt safe integer} or Infinity.
 *
 * @param v - The value to check.
 */
export const isIntOrInfinity = (v: number) => isInt(v) || v === Infinity

/**
 * Checks if the given value is a {@link isInt safe integer} and non-negative.
 *
 * @param v - The value to check.
 * @see {@link isInt}
 */
export const isNat = (v: number) => isInt(v) && v >= 0
/**
 * Checks if the given value is either a non-negative {@link isInt safe integer} or Infinity.
 *
 * @param v - The value to check.
 */
export const isNatOrInfinity = (v: number) => isIntOrInfinity(v) && v >= 0
/**
 * Checks if the given value is a boolean.
 *
 * @param value - The value to check.
 */
export const isBool = (value: boolean) => !!value === value
/**
 * Checks if the given value is not null or undefined.
 *
 * @param value - The value to check.
 */
export const isNotNullish = (value: any) => !isNullish(value)
/**
 * Checks if the given value is an array of two elements.
 *
 * @param value - The value to check.
 */
export const isPair = (value: any) => isArray(value) && value.length === 2
/**
 * Checks if the given value is a {@link isInt safe integer} and positive.
 *
 * @param value - The value to check.
 */
export const isPosInt = (value: number) => isInt(value) && value > 0
/**
 * Checks if the given value is an Error object.
 *
 * @param value - The value to check.
 */
export const isError = (value: any) => value instanceof Error
/**
 * Checks if the given value is a symbol.
 *
 * @param value - The value to check.
 */
export const isSymbol = (value: any) => typeof value === "symbol"
