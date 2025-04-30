export function createNamedFunction<T extends (...args: any[]) => any>(name: string, func: T) {
    const f = {
        [name](...args: Parameters<T>) {
            return func.call(null, ...args)
        }
    }[name] as T
    return f
}
