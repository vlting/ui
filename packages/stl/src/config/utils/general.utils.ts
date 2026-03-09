import { STATIC_VALUE_PREFIX } from "../scales"

/** Our theme object/token prefix */
export const THEME_PREFIX = "$"

/** Adds a theme prefix to a string */
export function addPrefix(value: string) {
  return `${THEME_PREFIX}${value}` as const
}

/** Adds a static value prefix to a string */
export function addStaticValuePrefix(value: string) {
  return `${STATIC_VALUE_PREFIX}${value}` as const
}

/** Removes a theme prefix from a string */
export function removePrefix(value: string) {
  if (value.startsWith(THEME_PREFIX)) {
    return value.substring(1)
  }
  return value
}
