import { CssPropKey } from "../props"
import { addPrefix } from "../utils"
import {
  ThemePropValue,
  ScaleEntry,
  BaseVars,
  CssValueMap,
  PrefixedKey,
  CssValueMapProps,
  AliasMap,
  SCALED_ALIAS,
  FlatMap,
  STATIC_VALUE_PREFIX,
} from "./scales.models"

/** Converts a set of vars to CSS values (i.e., using the var set's `ref` as a value) */
export function getCssMapFromVars<T extends BaseVars>(vars: T) {
  const entries: [keyof T, ScaleEntry][] = Object.entries(vars)
  return entries.reduce((out: Record<keyof T, string>, [key, entry]: [keyof T, ScaleEntry]) => {
    out[key] = entry.ref
    return out
  }, {} as Record<keyof T, string>)
}

/** Converts a CSS map to theme tokens */
export function getThemePropsFromCssMap<T extends CssValueMap>(vars: T) {
  const keys = Object.keys(vars)
  return keys.reduce((out, key) => {
    key = addPrefix(String(key))
    out[key as keyof typeof out] = key
    return out
  }, {} as Record<PrefixedKey<T>, ThemePropValue>)
}

/** Extracts CSS prop names from a CSS map */
export function getPropsFromCssMap<T extends CssValueMap>(vars: T) {
  // return vars as any
  const keys = Object.keys(vars)
  return keys.reduce((out, key) => {
    const source = vars[key]
    key = addPrefix(String(key))
    out[key as keyof typeof out] = typeof source === "string" ? null : Object.entries(source)
    return out
  }, {} as CssValueMapProps<T>)
}

/**
 * Generates an `aliasMap` and a set of `cssAliases` for a `cssAliasMap`.
 *
 * @param {AliasMap} map is keyed to your intended aliases, with a value of CSS props and target CSS theme tokens.
 * @param {FlatMap} flatMap is keyed to CSS props, with values of target CSS theme tokens, for cases where target tokens are always the same for a given CSS prop, regardless of source alias.
 */
export function getAliasMap<A extends AliasMap, F extends FlatMap>(map: A, flatMap?: F) {
  const cssAliases = {} as { [key in PrefixedKey<A>]: typeof SCALED_ALIAS }
  const aliasMap = {} as Record<string, any>

  Object.entries(map).forEach(([key, values]) => {
    const alias = addPrefixIfNotStatic(key) as string
    cssAliases[alias as PrefixedKey<A>] = SCALED_ALIAS
    Object.entries(values).forEach(([prop, target]) => {
      if (!aliasMap[prop]) {
        aliasMap[prop] = {}
      }
      aliasMap[prop][alias] = addPrefixIfNotStatic(target)
    })
  })

  if (flatMap) {
    Object.entries(flatMap).forEach(([prop, target]) => {
      aliasMap[prop] = addPrefixIfNotStatic(target)
    })
  }

  return { cssAliases, aliasMap: aliasMap as AliasMap }
}

function addPrefixIfNotStatic(text: string) {
  return text.startsWith(STATIC_VALUE_PREFIX) ? text.replace(STATIC_VALUE_PREFIX, "") : addPrefix(text)
}

/** Returns a CSS value from an alias map, using a CSS prop key and value */
export function mapAliasToValue(aliasMap: AliasMap, prop: CssPropKey, value: string | number) {
  const propValue = aliasMap[prop as keyof typeof aliasMap]
  if (propValue) {
    if (typeof propValue === "string") {
      return propValue
    }
    return propValue[value as keyof typeof propValue] ?? ""
  }
  return ""
}
