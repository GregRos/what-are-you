import { isFunction, isObject } from "lodash"
import { AnyCtor } from "./ctor-type.js"

const sCtor = "constructor"
const sPrototype = "prototype"

function getCtor<T extends object>(obj: T): AnyCtor<T> {
    return obj[sCtor] as AnyCtor<T>
}
function getCtorProto<T extends Function>(obj: T): T {
    return obj[sPrototype] as T
}
export const isInstanceOf = <Parent extends object>(
    instance: object,
    what: AnyCtor<Parent>
): instance is Parent => {
    return instance instanceof what
}

/** Return true when `obj` looks like the prototype object of some constructor. */
export function isPrototypeObject(obj: object): boolean {
    if (!isObject(obj)) {
        return false
    }

    if (!Object.hasOwn(obj, sCtor)) {
        return false
    }

    const ctor = getCtor(obj)
    const ctorPtoto = getCtorProto(ctor)
    return isFunction(ctor) && ctorPtoto === obj && isInstanceOf(obj, ctor)
}

export function getPrototypeChain<T>(obj: T, depth: number): T[] {
    const chain: T[] = []
    let current: T | null = obj

    while (current) {
        if (depth <= 0) {
            break
        }
        chain.push(current)
        current = Object.getPrototypeOf(current)
    }

    return chain
}
