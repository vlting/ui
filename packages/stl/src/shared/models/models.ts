export type Shared<A extends Record<string, any>, B extends Record<string, any>> = Extract<keyof A, keyof B>
export type NotShared<A extends Record<string, any>, B extends Record<string, any>> = Exclude<keyof A, keyof B>

export type CustomVarHint = "<Any valid CSS>"
export type CoreStaticKeys = "initial" | "inherit" | "unset" | "revert" | "revert-layer"

// This is a hacky way to get a union-friendly string that doesn't wipe out static string values from a union
export type CustomString = string & { hack?: unknown }

export type CoreCustomValues = CustomVarHint | CoreStaticKeys | CustomString
