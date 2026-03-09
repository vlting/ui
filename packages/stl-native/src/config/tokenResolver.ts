import type { NativeTokenMaps } from "./theme"

/** Scale name type matching the keys of NativeTokenMaps */
type ScaleName = keyof NativeTokenMaps

/**
 * Maps each RN style prop to the scale it draws tokens from.
 * Only props that accept token values are listed.
 */
export const propScaleMap: Readonly<Record<string, ScaleName>> = Object.freeze({
  // Space scale
  marginTop: "space",
  marginBottom: "space",
  marginStart: "space",
  marginEnd: "space",
  paddingTop: "space",
  paddingBottom: "space",
  paddingStart: "space",
  paddingEnd: "space",
  top: "space",
  bottom: "space",
  start: "space",
  end: "space",
  rowGap: "space",
  columnGap: "space",

  // Size scale
  width: "size",
  height: "size",
  minWidth: "size",
  maxWidth: "size",
  minHeight: "size",
  maxHeight: "size",
  flexBasis: "size",

  // Color scale
  color: "color",
  backgroundColor: "color",
  borderTopColor: "color",
  borderBottomColor: "color",
  borderStartColor: "color",
  borderEndColor: "color",
  borderColor: "color",
  textDecorationColor: "color",
  shadowColor: "color",

  // Radius scale
  borderRadius: "radius",
  borderTopStartRadius: "radius",
  borderTopEndRadius: "radius",
  borderBottomStartRadius: "radius",
  borderBottomEndRadius: "radius",

  // Font scales
  fontSize: "fontSize",
  fontWeight: "fontWeight",
  fontFamily: "fontFamily",
  lineHeight: "lineHeight",
  letterSpacing: "typoSpace",

  // Border width — uses space scale (same as web)
  borderTopWidth: "space",
  borderBottomWidth: "space",
  borderStartWidth: "space",
  borderEndWidth: "space",
  borderWidth: "space",

  // ZIndex
  zIndex: "zIndex",
})

/** Shadow scale tokens for RN shadow properties */
const SHADOW_SCALE: Record<string, {
  shadowColor: string
  shadowOffset: { width: number; height: number }
  shadowOpacity: number
  shadowRadius: number
  elevation: number
}> = {
  $sm: { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.18, shadowRadius: 1, elevation: 1 },
  $md: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.22, shadowRadius: 3, elevation: 3 },
  $lg: { shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 6, elevation: 6 },
  $xl: { shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 12 },
}

/** Props that trigger shadow scale expansion */
const SHADOW_PROPS = new Set(["shadow", "boxShadow"])

/**
 * Resolves a shadow token to multiple RN shadow properties.
 * Returns null if not a shadow token.
 */
export function resolveShadowToken(value: string | number): Record<string, any> | null {
  if (typeof value !== "string") return null
  return SHADOW_SCALE[value] ?? null
}

/**
 * Checks if a prop is a shadow-related prop that should trigger scale expansion.
 */
export function isShadowProp(prop: string): boolean {
  return SHADOW_PROPS.has(prop)
}

/**
 * Resolves a token value (e.g., "$4", "$primary9") to a concrete value
 * using the provided token maps.
 *
 * - Non-token values (numbers, strings not starting with $) pass through
 * - Token values are resolved via O(1) hash-map lookup
 */
export function resolveToken(
  rnProp: string,
  value: string | number,
  tokenMaps: NativeTokenMaps,
): number | string {
  // Numbers pass through directly
  if (typeof value === "number") return value

  // Non-token strings pass through
  if (!value || value[0] !== "$") return value

  // Look up which scale this prop uses
  const scaleName = propScaleMap[rnProp]
  if (!scaleName) return value

  // O(1) lookup
  const tokens = tokenMaps[scaleName]
  const resolved = tokens[value as keyof typeof tokens]
  if (resolved !== undefined) return resolved

  // Fallback: strip $ and try
  return value
}
