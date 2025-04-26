import { isAnyIterable, isArrayLike, isAsyncIterable, isDoddle, isIterable, isNextable } from "@lib"

describe("isArrayLike", () => {
    it("returns true for array", () => {
        expect(isArrayLike([1, 2, 3])).toBe(true)
    })
    it("returns true for arguments object", () => {
        function test(...args: any[]) {
            return isArrayLike(arguments)
        }
        expect(test(1, 2, 3)).toBe(true)
    })
    it("returns false for function", () => {
        expect(isArrayLike(function () {})).toBe(false)
    })
    it("returns false for object without length", () => {
        expect(isArrayLike({})).toBe(false)
    })
    it("returns false for object with non-integer length", () => {
        expect(isArrayLike({ length: "3" })).toBe(false)
        expect(isArrayLike({ length: 3.5 })).toBe(false)
    })
})

describe("isIterable", () => {
    it("returns true for array", () => {
        expect(isIterable([1, 2, 3])).toBe(true)
    })
    it("returns true for Set", () => {
        expect(isIterable(new Set([1, 2]))).toBe(true)
    })
    it("returns false for plain object", () => {
        expect(isIterable({})).toBe(false)
    })
    it("returns false for null", () => {
        expect(isIterable(null)).toBe(false)
    })
})

describe("isAsyncIterable", () => {
    it("returns true for async iterable", () => {
        const asyncIterable = {
            [Symbol.asyncIterator]() {
                return {
                    next() {
                        return Promise.resolve({ done: true, value: undefined })
                    }
                }
            }
        }
        expect(isAsyncIterable(asyncIterable)).toBe(true)
    })
    it("returns false for iterable only", () => {
        expect(isAsyncIterable([1, 2, 3])).toBe(false)
    })
    it("returns false for plain object", () => {
        expect(isAsyncIterable({})).toBe(false)
    })
})

describe("isAnyIterable", () => {
    it("returns true for iterable", () => {
        expect(isAnyIterable([1, 2, 3])).toBe(true)
    })
    it("returns true for async iterable", () => {
        const asyncIterable = {
            [Symbol.asyncIterator]() {
                return {
                    next() {
                        return Promise.resolve({ done: true, value: undefined })
                    }
                }
            }
        }
        expect(isAnyIterable(asyncIterable)).toBe(true)
    })
    it("returns false for non-iterable", () => {
        expect(isAnyIterable({})).toBe(false)
    })
})

describe("isNextable", () => {
    it("returns true for iterator", () => {
        const arr = [1, 2, 3]
        const iterator = arr[Symbol.iterator]()
        expect(isNextable(iterator)).toBe(true)
    })
    it("returns true for async iterator", () => {
        const asyncIterator = {
            next: () => Promise.resolve({ done: true, value: undefined })
        }
        expect(isNextable(asyncIterator)).toBe(true)
    })
    it("returns false for object without next", () => {
        expect(isNextable({})).toBe(false)
    })
})

describe("isDoddle", () => {
    it("returns true for object with pull and map functions", () => {
        const doddleObj = {
            pull: () => {},
            map: () => {}
        }
        expect(isDoddle(doddleObj)).toBe(true)
    })
    it("returns false for object missing pull", () => {
        const obj = { map: () => {} }
        expect(isDoddle(obj)).toBe(false)
    })
    it("returns false for object missing map", () => {
        const obj = { pull: () => {} }
        expect(isDoddle(obj)).toBe(false)
    })
    it("returns false for non-object", () => {
        expect(isDoddle(null)).toBe(false)
        expect(isDoddle(42)).toBe(false)
    })
})
