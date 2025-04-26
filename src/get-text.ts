import {
    isBigInt,
    isFunction,
    isNullish,
    isObject,
    isString,
    isSymbol,
    isThenable
} from "./is-basic"
import { isAsyncIterable, isDoddle, isIterable, isNextable } from "./is-special"

/**
 * Gets a short value type name, which can be used in a message.
 *
 * @param value - The value to check.
 */
export function getNiceTypeOf(value: any) {
    return value === null ? "null" : typeof value
}
/**
 * Describes an object's class, type, or constructor name to be used in a message.
 *
 * - 📦 For an object, returns the name of its constructor or similar string.
 * - ⚙️ For a function (or class), returns the function's name.
 * - 🔠 For other values, returns the `typeof` string via {@link getNiceTypeOf}.
 *
 * @param something - The value whose class name or type is to be determined.
 */
export function getNiceClassName(something: any) {
    if (isFunction(something)) {
        return getFunctionName(something)
    }
    if (!isObject(something)) {
        return getNiceTypeOf(something)
    }
    if (something === null) {
        return "null"
    }

    let name: string | undefined
    if (something.constructor) {
        name = getFunctionName(something.constructor)
    }
    return name && name !== "Object" ? name : (getObjectStringTag(something) ?? "Object")
}

export function getObjectStringTag(object: any) {
    return object[Symbol.toStringTag]
}
/**
 * Gets the description of a symbol.
 *
 * @param symbol - The symbol to get the description of.
 */
export function getSymbolDescription(symbol: symbol) {
    return `${symbol.description}`
}

function _getShortObjectString(object: any) {
    if (isDoddle(object)) {
        return object.toString()
    }
    if (isIterable(object)) {
        return `iterable ${getNiceClassName(object)}`
    } else if (isAsyncIterable(object)) {
        return `async iterable ${getNiceClassName(object)}`
    } else if (isNextable(object)) {
        return `iterator ${getNiceClassName(object)}`
    } else if (isDoddle(object)) {
        return object.toString()
    } else if (isThenable(object)) {
        return `a Promise`
    } else {
        return `object ${getNiceClassName(object)}`
    }
}

/**
 * Gets a short string describing a value, to be used in a message.
 *
 * @param value - The value to describe.
 */
export function getNiceValueName(value: any) {
    if (isNullish(value)) {
        return `${value}`
    }
    if (isFunction(value)) {
        return `function ${getFunctionName(value) || "<anonymous>"}`
    }
    if (isBigInt(value)) {
        return `${value}n`
    }
    if (isSymbol(value)) {
        return `Symbol(${getSymbolDescription(value)})`
    }
    if (isString(value)) {
        if (value.length > 30) {
            value = value.slice(0, 30) + "⋯"
        }
        return `"${value}"`
    }
    if (isObject(value)) {
        return _getShortObjectString(value)
    }
    return `${value}`
}

/**
 * Gets the name of a function, or null if it has no name.
 *
 * @param func - The function to get the name of.
 */
export function getFunctionName(func: Function) {
    return func.name || undefined
}
