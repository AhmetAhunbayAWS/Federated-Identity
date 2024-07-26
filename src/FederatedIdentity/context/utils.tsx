type ExtractProviderNames<T> = T extends string
  ? T
  : T extends { providerName: infer N }
  ? N extends string
    ? N
    : never
  : never;

// Recursive utility type to check for duplicates
type HasDuplicateProviders<T extends any[], U = ExtractProviderNames<T[number]>> = T extends [infer F, ...infer R]
  ? F extends string
    ? F extends U
      ? R extends U[]
        ? F extends ExtractProviderNames<R[number]>
          ? true
          : HasDuplicateProviders<R, U>
        : false
      : false
    : F extends { providerName: infer N }
    ? N extends U
      ? R extends U[]
        ? N extends ExtractProviderNames<R[number]>
          ? true
          : HasDuplicateProviders<R, U>
        : false
      : false
    : HasDuplicateProviders<R, U>
  : false;

// Utility type to enforce no duplicates
type NoDuplicateProviders<T extends any[]> = HasDuplicateProviders<T> extends true ? never : T;
