import { ProviderType, ProviderData } from "../types"


type ExtractStringValues<T> = T extends string
  ? T
  : T extends { providerName: infer N }
  ? N extends string
    ? N
    : never
  : never;

type HasDuplicateStringValues<T extends ProviderType[], U = ExtractStringValues<T[number]>> = T extends [infer F, ...infer R]
  ? F extends string
    ? F extends U
      ? R extends U[]
        ? F extends ExtractStringValues<R[number]>
          ? true
          : HasDuplicateStringValues<R, U>
        : false
      : false
    : F extends { providerName: infer N }
    ? N extends U
      ? R extends U[]
        ? N extends ExtractStringValues<R[number]>
          ? true
          : HasDuplicateStringValues<R, U>
        : false
      : false
    : HasDuplicateStringValues<R, U>
  : false;

type NoDuplicates<T extends ProviderType[]> = HasDuplicateStringValues<T> extends true ? never : T;