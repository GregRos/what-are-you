import {
    getFunctionName,
    getNiceClassName,
    getNiceTypeOf,
    getNiceValueName,
    getSymbolDescription
} from "@lib"

describe("getNiceTypeOf", () => {
    it("returns 'null' for null", () => {
        expect(getNiceTypeOf(null)).toBe("null")
    })
    it("returns typeof for primitives", () => {
        expect(getNiceTypeOf(123)).toBe("number")
        expect(getNiceTypeOf("abc")).toBe("string")
        expect(getNiceTypeOf(undefined)).toBe("undefined")
        expect(getNiceTypeOf(true)).toBe("boolean")
        expect(getNiceTypeOf(Symbol("s"))).toBe("symbol")
        expect(getNiceTypeOf(10n)).toBe("bigint")
    })
    it("returns 'object' for objects", () => {
        expect(getNiceTypeOf({})).toBe("object")
        expect(getNiceTypeOf([])).toBe("object")
    })
    it("returns 'function' for functions", () => {
        expect(getNiceTypeOf(() => {})).toBe("function")
    })
})

describe("getNiceClassName", () => {
    it("returns function name for functions", () => {
        function Foo() {}
        expect(getNiceClassName(Foo)).toBe("Foo")
        expect(getNiceClassName(function () {})).toBe(undefined)
    })
    it("returns constructor name for objects", () => {
        class Bar {}
        expect(getNiceClassName(new Bar())).toBe("Bar")
        expect(getNiceClassName({})).toBe("Object")
    })
    it("returns 'null' for null", () => {
        expect(getNiceClassName(null)).toBe("null")
    })
    it("returns typeof for primitives", () => {
        expect(getNiceClassName(123)).toBe("number")
        expect(getNiceClassName("abc")).toBe("string")
    })
    it("returns Symbol.toStringTag if present", () => {
        const obj = { [Symbol.toStringTag]: "CustomTag" }
        expect(getNiceClassName(obj)).toBe("CustomTag")
    })
})

describe("getSymbolDescription", () => {
    it("returns symbol description", () => {
        expect(getSymbolDescription(Symbol("foo"))).toBe("foo")
        expect(getSymbolDescription(Symbol())).toBe("undefined")
    })
})

describe("getNiceValueName", () => {
    it("handles nullish values", () => {
        expect(getNiceValueName(null)).toBe("null")
        expect(getNiceValueName(undefined)).toBe("undefined")
    })
    it("handles functions", () => {
        function foo() {}
        expect(getNiceValueName(foo)).toBe("function foo")
        expect(getNiceValueName(function () {})).toBe("function <anonymous>")
    })
    it("handles bigints", () => {
        expect(getNiceValueName(10n)).toBe("10n")
    })
    it("handles symbols", () => {
        expect(getNiceValueName(Symbol("desc"))).toBe("Symbol(desc)")
    })
    it("handles strings", () => {
        expect(getNiceValueName("short")).toBe('"short"')
        expect(getNiceValueName("a".repeat(40))).toBe('"' + "a".repeat(30) + '⋯"')
    })
    it("handles objects", () => {
        expect(getNiceValueName({})).toMatch(/^object /)
        expect(getNiceValueName([])).toMatch(/^iterable /)
        expect(getNiceValueName(new (class X {})())).toMatch(/X/)
    })
    it("handles numbers and booleans", () => {
        expect(getNiceValueName(42)).toBe("42")
        expect(getNiceValueName(false)).toBe("false")
    })
})

describe("getFunctionName", () => {
    it("returns function name or null", () => {
        function foo() {}
        expect(getFunctionName(foo)).toBe("foo")
        expect(getFunctionName(function () {})).toBe(undefined)
    })
})
