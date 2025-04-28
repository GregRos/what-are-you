type _ProtectedCtor<T extends object> = typeof _ProtectedCtorClass & {
    prototype: T
}
type _PrivateCtor<T extends object> = typeof _PrivateCtorClass & {
    prototype: T
}
type _PublicCtor<T extends object> = abstract new (...args: any[]) => T
export type AnyCtor<T extends object> = _ProtectedCtor<T> | _PublicCtor<T> | _PrivateCtor<T>

export type InstanceTypeOf<T extends AnyCtor<any>> =
    T extends _PrivateCtor<infer U>
        ? U
        : T extends _ProtectedCtor<infer U>
          ? U
          : T extends _PublicCtor<infer U>
            ? U
            : never
declare abstract class _ProtectedCtorClass {
    protected constructor(...args: any[])
}

declare abstract class _PrivateCtorClass {
    private constructor(...args: any[])
}
