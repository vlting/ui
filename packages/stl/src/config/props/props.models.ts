import { sourceProps } from "./sourceProps"
import { CssValue, CssValueMap } from "../scales"
import { THEME_PREFIX } from "../utils"

export type KeysFromScale<T extends CssValueMap> = `${typeof THEME_PREFIX}${Exclude<keyof T, symbol>}`

export type PseudoClass = Record<string, string | string[]>

export type CssRule = Record<string, string | number>
export type CssClassDef = { [classHash: string]: CssRule }
export type CssValueClassMap<M extends CssValueMap> = Record<KeysFromScale<M>, string>

export type CssValueRules<S extends Record<string | number, CssValue>> = Record<keyof S, CssClassDef>

export type CssPropKey = keyof typeof sourceProps

export type FilterKeys = Partial<Record<CssPropKey, unknown>>

export type PickKeys<T extends Record<string, unknown>, K extends Record<string, unknown>> = Pick<
  T,
  Extract<keyof T, keyof K>
>

export type CustomVarPropValue = { varName: string; className: string }

export const SCALED_PLACEHOLDER = "*"
