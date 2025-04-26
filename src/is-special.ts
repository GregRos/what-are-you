import { isFunction, isInt, isObject } from "./is-basic.js"

/**
 * Checks if the given value is array-like. It must be an object and have an integer `length`
 * property.
 *
 * @template T - Allows asserting the element type. Not part of the check.
 * @param value - The value to check.
 */
export function isArrayLike<T>(value: any): value is ArrayLike<T> {
    return isObject(value) && !isFunction(value) && isInt(value.length)
}

/**
 * Checks if the given value is an object
 *
 * @param value - The value to check.
 */
export function isIterable<T>(value: any): value is Iterable<T> {
    return isObject(value) && isFunction(value[Symbol.iterator])
}
/**
 * Checks if the given value is an iterable or async iterable.
 *
 * @template T - Allows asserting the element type. Not part of the check.
 * @param value - The value to check.
 */
export function isAnyIterable<T = unknown>(value: any): value is Iterable<T> {
    return isIterable(value) || isAsyncIterable(value)
}

/**
 * Checks if the given value is an async iterable.
 *
 * @template T - Allows asserting the element type. Not part of the check.
 * @param value - The value to check.
 */
export function isAsyncIterable<T>(value: any): value is AsyncIterable<T> {
    return isObject(value) && isFunction(value[Symbol.asyncIterator])
}

export function isNextable<T>(value: any): value is Iterator<T> | AsyncIterator<T> {
    // Checks if value is an iterator
    return isObject(value) && isFunction(value.next)
}

/**
 * Checks if the given value is a Doddle object.
 *
 * @param value - The value to check.
 * @returns True if the value is a Doddle object, false otherwise.
 */
export function isDoddle<T>(value: any): value is {
    pull(): T
} {
    return isObject(value) && isFunction(value.pull) && isFunction(value.map)
}
