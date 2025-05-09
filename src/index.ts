export type { AnyCtor, InstanceTypeOf } from "./ctor-type.js"
export { createNamedFunction } from "./function.js"
export {
    getFunctionName,
    getNiceClassName,
    getNiceTypeOf,
    getNiceValueName,
    getSymbolDescription
} from "./get-text.js"
export {
    isArray,
    isBigInt,
    isBool,
    isError,
    isFunction,
    isInt,
    isIntOrInfinity,
    isNat,
    isNatOrInfinity,
    isNotNullish,
    isNullish,
    isNumber,
    isObject,
    isPair,
    isPosInt,
    isPropertyKey,
    isString,
    isSymbol,
    isThenable
} from "./is-basic.js"
export {
    isAnyIterable,
    isArrayLike,
    isAsyncIterable,
    isDoddle,
    isIterable,
    isNextable
} from "./is-special.js"
export { getPrototypeChain, isInstanceOf, isPrototypeObject } from "./prototypes.js"
