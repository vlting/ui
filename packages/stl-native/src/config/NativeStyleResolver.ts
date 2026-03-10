import type { ViewStyle, TextStyle } from 'react-native'

/** Loose CSS descriptor type for native — replaces STL's CSS type */
type CSS = Record<
  string,
  string | number | Record<string, string | number | Record<string, string | number>>
>
import { type ConditionMask, CondBit, maskMatches } from './conditions'
import { normalizeToRN } from './propMap'
import { nativeMappedProps, type NativeMappedPropKey } from './mappedProps'
import { resolveToken, isShadowProp, resolveShadowToken } from './tokenResolver'
import { getTheme, type NativeTokenMaps } from './theme'

type NativeStyle = Readonly<ViewStyle & TextStyle>
type StyleEntry = [string, number | string]

/** Threshold below which a lineHeight value is treated as a CSS-style multiplier */
const LINE_HEIGHT_MULTIPLIER_THRESHOLD = 10

/** nth-child condition keys */
const NTH_CHILD_KEYS = new Set(['first', 'last', 'even', 'odd'])

interface PreResolvedBranch {
  conditionMask: ConditionMask
  lightEntries: StyleEntry[]
  darkEntries: StyleEntry[]
  nthChild?: 'first' | 'last' | 'even' | 'odd'
}

/**
 * The core native style engine. Replaces StyleManager for React Native.
 *
 * - Constructor runs at styled() time: analyzes descriptor, pre-resolves tokens
 * - resolve(conditionMask) at render time: cache lookup -> frozen object
 * - All token resolution at definition time, not render time
 */
export class NativeStyleResolver {
  private cache = new Map<string, NativeStyle>()
  private branches: PreResolvedBranch[] | null = null
  private css: CSS
  private hasNthChild = false

  constructor(css: CSS) {
    this.css = css
    // Pre-scan for nth-child keys
    for (const key of Object.keys(css)) {
      if (NTH_CHILD_KEYS.has(key)) {
        this.hasNthChild = true
        break
      }
    }
  }

  private ensureResolved(): PreResolvedBranch[] {
    if (this.branches === null) {
      const theme = getTheme()
      this.branches = analyzeAndPreResolve(this.css, theme.light, theme.dark)
    }
    return this.branches
  }

  /**
   * Resolves styles for a given condition mask.
   * Steady-state: O(1) Map.get() returning a frozen reference.
   * Cold cache: merges pre-resolved branches, freezes, caches.
   */
  resolve(conditionMask: ConditionMask, index?: number, length?: number): NativeStyle {
    const cacheKey =
      this.hasNthChild && index !== undefined && length !== undefined
        ? `${conditionMask}|${index}|${length}`
        : String(conditionMask)

    const cached = this.cache.get(cacheKey)
    if (cached !== undefined) return cached

    const isDark = (conditionMask & CondBit.dark) !== 0
    const result: Record<string, number | string> = {}

    const branches = this.ensureResolved()
    for (const branch of branches) {
      // Base branch (conditionMask === 0) always applies
      if (branch.conditionMask !== 0 && !maskMatches(conditionMask, branch.conditionMask))
        continue

      // Check nth-child conditions
      if (branch.nthChild) {
        if (index === undefined || length === undefined) continue
        switch (branch.nthChild) {
          case 'first':
            if (index !== 0) continue
            break
          case 'last':
            if (index !== length - 1) continue
            break
          case 'even':
            if (index % 2 !== 0) continue
            break
          case 'odd':
            if (index % 2 === 0) continue
            break
        }
      }

      const entries = isDark ? branch.darkEntries : branch.lightEntries
      for (const [prop, value] of entries) {
        result[prop] = value
      }
    }

    // RN lineHeight is absolute (px), not a CSS multiplier.
    // Convert small values (multipliers) to absolute by multiplying with fontSize.
    if (
      typeof result.lineHeight === 'number' &&
      result.lineHeight < LINE_HEIGHT_MULTIPLIER_THRESHOLD
    ) {
      const fontSize =
        typeof result.fontSize === 'number'
          ? result.fontSize
          : getTheme().light.fontSize.$p
      result.lineHeight = Math.round(fontSize * result.lineHeight)
    }

    const frozen = Object.freeze(result) as NativeStyle
    this.cache.set(cacheKey, frozen)
    return frozen
  }

  /** Clears the style cache (e.g., after theme change) */
  invalidate() {
    this.cache.clear()
  }
}

// ANALYSIS + PRE-RESOLUTION ///////////////////////////////////////////////////

const BASE_MASK = 0

function analyzeAndPreResolve(
  css: CSS,
  lightTokens: NativeTokenMaps,
  darkTokens: NativeTokenMaps,
): PreResolvedBranch[] {
  const branches: PreResolvedBranch[] = []
  walkCss(css, BASE_MASK, branches, lightTokens, darkTokens)
  return branches
}

function walkCss(
  css: CSS,
  currentMask: ConditionMask,
  branches: PreResolvedBranch[],
  lightTokens: NativeTokenMaps,
  darkTokens: NativeTokenMaps,
  nthChild?: 'first' | 'last' | 'even' | 'odd',
) {
  const lightEntries: StyleEntry[] = []
  const darkEntries: StyleEntry[] = []

  for (const [key, value] of Object.entries(css)) {
    // Check if key is an nth-child condition
    if (
      NTH_CHILD_KEYS.has(key) &&
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value)
    ) {
      walkCss(value as CSS, currentMask, branches, lightTokens, darkTokens, key as any)
      continue
    }

    // Check if key is a condition
    const condBit = CondBit[key as keyof typeof CondBit]
    if (
      condBit !== undefined &&
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value)
    ) {
      // Recurse into condition branch
      walkCss(
        value as CSS,
        currentMask | condBit,
        branches,
        lightTokens,
        darkTokens,
        nthChild,
      )
      continue
    }

    // Check if value is an inline condition object (e.g., { base: "$4", md: "$8" })
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      processInlineConditions(
        key,
        value as Record<string, string | number>,
        currentMask,
        branches,
        lightTokens,
        darkTokens,
        nthChild,
      )
      continue
    }

    // Regular prop + value — resolve and add
    if (typeof value === 'string' || typeof value === 'number') {
      resolveAndPush(key, value, lightEntries, darkEntries, lightTokens, darkTokens)
    }
  }

  if (lightEntries.length > 0 || darkEntries.length > 0) {
    branches.push({ conditionMask: currentMask, lightEntries, darkEntries, nthChild })
  }
}

function processInlineConditions(
  prop: string,
  conditions: Record<string, string | number>,
  parentMask: ConditionMask,
  branches: PreResolvedBranch[],
  lightTokens: NativeTokenMaps,
  darkTokens: NativeTokenMaps,
  nthChild?: 'first' | 'last' | 'even' | 'odd',
) {
  for (const [condKey, condValue] of Object.entries(conditions)) {
    if (typeof condValue !== 'string' && typeof condValue !== 'number') continue

    let mask = parentMask
    // "base" means no condition — use parent mask directly
    if (condKey !== 'base') {
      const condBit = CondBit[condKey as keyof typeof CondBit]
      if (condBit === undefined) continue
      mask = parentMask | condBit
    }

    const lightEntries: StyleEntry[] = []
    const darkEntries: StyleEntry[] = []
    resolveAndPush(prop, condValue, lightEntries, darkEntries, lightTokens, darkTokens)

    if (lightEntries.length > 0) {
      branches.push({ conditionMask: mask, lightEntries, darkEntries, nthChild })
    }
  }
}

function resolveAndPush(
  prop: string,
  value: string | number,
  lightEntries: StyleEntry[],
  darkEntries: StyleEntry[],
  lightTokens: NativeTokenMaps,
  darkTokens: NativeTokenMaps,
) {
  // Shadow prop expansion (e.g., shadow: "$md" → multiple RN shadow props)
  if (isShadowProp(prop)) {
    const shadowExpansion = resolveShadowToken(value)
    if (shadowExpansion) {
      for (const [shadowProp, shadowValue] of Object.entries(shadowExpansion)) {
        if (typeof shadowValue === 'object') {
          // shadowOffset is an object — push as-is
          lightEntries.push([shadowProp, shadowValue as any])
          darkEntries.push([shadowProp, shadowValue as any])
        } else {
          lightEntries.push([shadowProp, shadowValue])
          darkEntries.push([shadowProp, shadowValue])
        }
      }
      return
    }
  }

  // Check if it's a mapped prop (shorthand)
  const mapper = nativeMappedProps[prop as NativeMappedPropKey]
  if (mapper) {
    const expanded = (mapper as (v: string | number) => Record<string, string | number>)(
      value,
    )
    for (const [expandedProp, expandedValue] of Object.entries(expanded)) {
      pushResolved(
        expandedProp,
        expandedValue,
        lightEntries,
        darkEntries,
        lightTokens,
        darkTokens,
      )
    }
    return
  }

  // Normalize CSS logical prop -> RN prop
  const rnProp = normalizeToRN(prop)
  pushResolved(rnProp, value, lightEntries, darkEntries, lightTokens, darkTokens)
}

function pushResolved(
  rnProp: string,
  value: string | number,
  lightEntries: StyleEntry[],
  darkEntries: StyleEntry[],
  lightTokens: NativeTokenMaps,
  darkTokens: NativeTokenMaps,
) {
  const lightValue = resolveToken(rnProp, value, lightTokens)
  const darkValue = resolveToken(rnProp, value, darkTokens)
  lightEntries.push([rnProp, lightValue])
  darkEntries.push([rnProp, darkValue])
}
