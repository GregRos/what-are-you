import {
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
} from "@lib"

describe("isObject", () => {
    it("returns true for objects", () => {
        expect(isObject({})).toBe(true)
        expect(isObject([])).toBe(true)
        expect(isObject(new Date())).toBe(true)
    })
    it("returns false for null", () => {
        expect(isObject(null)).toBe(false)
    })
    it("returns false for primitives", () => {
        expect(isObject(1)).toBe(false)
        expect(isObject("str")).toBe(false)
        expect(isObject(undefined)).toBe(false)
        expect(isObject(true)).toBe(false)
    })
})

describe("isFunction", () => {
    it("returns true for functions", () => {
        expect(isFunction(() => {})).toBe(true)
        expect(isFunction(function () {})).toBe(true)
    })
    it("returns false for non-functions", () => {
        expect(isFunction({})).toBe(false)
        expect(isFunction(1)).toBe(false)
        expect(isFunction(null)).toBe(false)
    })
})

describe("isBigInt", () => {
    it("returns true for BigInt", () => {
        expect(isBigInt(BigInt(10))).toBe(true)
    })
    it("returns false for non-BigInt", () => {
        expect(isBigInt(10)).toBe(false)
        expect(isBigInt("10")).toBe(false)
    })
})

describe("isString", () => {
    it("returns true for strings", () => {
        expect(isString("hello")).toBe(true)
        expect(isString("")).toBe(true)
    })
    it("returns false for non-strings", () => {
        expect(isString(1)).toBe(false)
        expect(isString(null)).toBe(false)
    })
})

describe("isPropertyKey", () => {
    it("returns true for string, number, symbol", () => {
        expect(isPropertyKey("foo")).toBe(true)
        expect(isPropertyKey(123)).toBe(true)
        expect(isPropertyKey(Symbol("s"))).toBe(true)
    })
    it("returns false for other types", () => {
        expect(isPropertyKey({})).toBe(false)
        expect(isPropertyKey(null)).toBe(false)
        expect(isPropertyKey(undefined)).toBe(false)
    })
})

describe("isNullish", () => {
    it("returns true for null and undefined", () => {
        expect(isNullish(null)).toBe(true)
        expect(isNullish(undefined)).toBe(true)
    })
    it("returns false for other values", () => {
        expect(isNullish(0)).toBe(false)
        expect(isNullish("")).toBe(false)
        expect(isNullish(false)).toBe(false)
    })
})

describe("isArray", () => {
    it("returns true for arrays", () => {
        expect(isArray([])).toBe(true)
        expect(isArray([1, 2, 3])).toBe(true)
    })
    it("returns false for non-arrays", () => {
        expect(isArray({})).toBe(false)
        expect(isArray("foo")).toBe(false)
    })
})

describe("isThenable", () => {
    it("returns true for Promise-like objects", () => {
        expect(isThenable(Promise.resolve(1))).toBe(true)
        expect(isThenable({ then: () => {} })).toBe(true)
    })
    it("returns false for non-thenables", () => {
        expect(isThenable({})).toBe(false)
        expect(isThenable(null)).toBe(false)
        expect(isThenable(1)).toBe(false)
    })
})

describe("isNumber", () => {
    it("returns true for numbers", () => {
        expect(isNumber(1)).toBe(true)
        expect(isNumber(-1)).toBe(true)
        expect(isNumber(0)).toBe(true)
        expect(isNumber(Infinity)).toBe(true)
    })
    it("returns false for non-numbers", () => {
        expect(isNumber("1" as any)).toBe(false)
        expect(isNumber(null as any)).toBe(false)
    })
})

describe("isInt", () => {
    it("returns true for safe integers", () => {
        expect(isInt(1)).toBe(true)
        expect(isInt(0)).toBe(true)
        expect(isInt(Number.MAX_SAFE_INTEGER)).toBe(true)
    })
    it("returns false for non-integers or unsafe integers", () => {
        expect(isInt(1.1)).toBe(false)
        expect(isInt(Number.MAX_SAFE_INTEGER + 1)).toBe(false)
        expect(isInt(NaN)).toBe(false)
        expect(isInt(Infinity)).toBe(false)
    })
})

describe("isIntOrInfinity", () => {
    it("returns true for safe integers and Infinity", () => {
        expect(isIntOrInfinity(1)).toBe(true)
        expect(isIntOrInfinity(Infinity)).toBe(true)
    })
    it("returns false for non-integers", () => {
        expect(isIntOrInfinity(1.1)).toBe(false)
        expect(isIntOrInfinity(NaN)).toBe(false)
    })
})

describe("isNat", () => {
    it("returns true for non-negative safe integers", () => {
        expect(isNat(0)).toBe(true)
        expect(isNat(10)).toBe(true)
    })
    it("returns false for negative or non-integers", () => {
        expect(isNat(-1)).toBe(false)
        expect(isNat(1.1)).toBe(false)
    })
})

describe("isNatOrInfinity", () => {
    it("returns true for non-negative safe integers and Infinity", () => {
        expect(isNatOrInfinity(0)).toBe(true)
        expect(isNatOrInfinity(10)).toBe(true)
        expect(isNatOrInfinity(Infinity)).toBe(true)
    })
    it("returns false for negative or non-integers", () => {
        expect(isNatOrInfinity(-1)).toBe(false)
        expect(isNatOrInfinity(1.1)).toBe(false)
    })
})

describe("isBool", () => {
    it("returns true for booleans", () => {
        expect(isBool(true)).toBe(true)
        expect(isBool(false)).toBe(true)
    })
    it("returns false for non-booleans", () => {
        expect(isBool(1 as any)).toBe(false)
        expect(isBool("true" as any)).toBe(false)
    })
})

describe("isNotNullish", () => {
    it("returns true for non-nullish values", () => {
        expect(isNotNullish(0)).toBe(true)
        expect(isNotNullish("")).toBe(true)
        expect(isNotNullish(false)).toBe(true)
    })
    it("returns false for nullish values", () => {
        expect(isNotNullish(null)).toBe(false)
        expect(isNotNullish(undefined)).toBe(false)
    })
})

describe("isPair", () => {
    it("returns true for arrays of length 2", () => {
        expect(isPair([1, 2])).toBe(true)
        expect(isPair(["a", "b"])).toBe(true)
    })
    it("returns false for arrays of other lengths or non-arrays", () => {
        expect(isPair([1])).toBe(false)
        expect(isPair([1, 2, 3])).toBe(false)
        expect(isPair("ab")).toBe(false)
    })
})

describe("isPosInt", () => {
    it("returns true for positive safe integers", () => {
        expect(isPosInt(1)).toBe(true)
        expect(isPosInt(100)).toBe(true)
    })
    it("returns false for zero, negative, or non-integers", () => {
        expect(isPosInt(0)).toBe(false)
        expect(isPosInt(-1)).toBe(false)
        expect(isPosInt(1.1)).toBe(false)
    })
})

describe("isError", () => {
    it("returns true for Error instances", () => {
        expect(isError(new Error())).toBe(true)
        expect(isError(new TypeError())).toBe(true)
    })
    it("returns false for non-Error values", () => {
        expect(isError({})).toBe(false)
        expect(isError("error")).toBe(false)
    })
})

describe("isSymbol", () => {
    it("returns true for symbols", () => {
        expect(isSymbol(Symbol())).toBe(true)
    })
    it("returns false for non-symbols", () => {
        expect(isSymbol("sym")).toBe(false)
        expect(isSymbol(1)).toBe(false)
    })
})
