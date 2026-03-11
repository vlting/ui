import { type ComponentType, type ForwardedRef, createElement, forwardRef } from 'react'
import type { TextStyle, ViewStyle } from 'react-native'

/** Loose CSS descriptor type for native */
type CSS = Record<
  string,
  string | number | Record<string, string | number | Record<string, string | number>>
>

import { useConditionMask } from '../hooks/useConditionMask'
import { NativeStyleResolver } from './NativeStyleResolver'
import { CondBit, type ConditionMask } from './conditions'

type NativeStyle = Readonly<ViewStyle & TextStyle>

const INTERACTION_KEYS = new Set(['hovered', 'pressed', 'focused'])

/** Checks if a CSS descriptor contains interaction condition keys */
function hasInteractionKeys(css: CSS): boolean {
  for (const key of Object.keys(css)) {
    if (INTERACTION_KEYS.has(key)) return true
  }
  return false
}

// VARIANT RESOLUTION //////////////////////////////////////////////////////////

interface VariantResolverEntry {
  key: string
  resolver: NativeStyleResolver
}

function buildVariantResolvers(variants: Variants): Map<string, VariantResolverEntry[]> {
  const map = new Map<string, VariantResolverEntry[]>()
  for (const [variantName, variantValues] of Object.entries(variants)) {
    const entries: VariantResolverEntry[] = []
    for (const [valueName, css] of Object.entries(variantValues)) {
      entries.push({
        key: valueName,
        resolver: new NativeStyleResolver(css),
      })
    }
    map.set(variantName, entries)
  }
  return map
}

function resolveWithVariants(
  baseStyle: NativeStyle,
  variantResolvers: Map<string, VariantResolverEntry[]>,
  activeVariants: Record<string, string | boolean | undefined>,
  conditionMask: ConditionMask,
  variantCache: Map<string, NativeStyle>,
  index?: number,
  length?: number,
): NativeStyle {
  // Build a cache key from active variant values
  let cacheKey = String(conditionMask)
  for (const [name, value] of Object.entries(activeVariants)) {
    if (value !== undefined && value !== false) {
      cacheKey += `|${name}=${value}`
    }
  }
  if (index !== undefined && length !== undefined) {
    cacheKey += `|i=${index}|l=${length}`
  }

  const cached = variantCache.get(cacheKey)
  if (cached !== undefined) return cached

  // Merge base + active variant styles
  const merged = { ...baseStyle } as Record<string, number | string>

  for (const [variantName, entries] of variantResolvers) {
    const activeValue = activeVariants[variantName]
    if (activeValue === undefined || activeValue === false) continue

    const valueKey = activeValue === true ? 'true' : String(activeValue)
    const entry = entries.find((e) => e.key === valueKey)
    if (!entry) continue

    const variantStyle = entry.resolver.resolve(conditionMask, index, length)
    Object.assign(merged, variantStyle)
  }

  const frozen = Object.freeze(merged) as NativeStyle
  variantCache.set(cacheKey, frozen)
  return frozen
}

// CSS PROP OVERRIDE ///////////////////////////////////////////////////////////

const overrideCache = new WeakMap<CSS, Map<string, NativeStyle>>()

function resolveWithOverrides(
  baseStyle: NativeStyle,
  cssProp: CSS,
  conditionMask: ConditionMask,
  index?: number,
  length?: number,
): NativeStyle {
  let maskCache = overrideCache.get(cssProp)
  if (!maskCache) {
    maskCache = new Map()
    overrideCache.set(cssProp, maskCache)
  }

  const cacheKey =
    index !== undefined && length !== undefined
      ? `${conditionMask}|${index}|${length}`
      : String(conditionMask)

  const cached = maskCache.get(cacheKey)
  if (cached !== undefined) return cached

  const overrideResolver = new NativeStyleResolver(cssProp)
  const overrideStyle = overrideResolver.resolve(conditionMask, index, length)
  const merged = Object.freeze({ ...baseStyle, ...overrideStyle }) as NativeStyle
  maskCache.set(cacheKey, merged)
  return merged
}

// STYLED FUNCTION /////////////////////////////////////////////////////////////

type Variants = Record<string, Record<string, CSS>>

type VariantProps<V extends Variants> = {
  [K in keyof V]?: keyof V[K] extends 'true' | 'false' ? boolean : keyof V[K]
}

type StyledComponentProps<P, V extends Variants | undefined> = Omit<
  P,
  'css' | 'style' | 'index' | 'length'
> & {
  css?: CSS
  style?: ViewStyle & TextStyle
  index?: number
  length?: number
} & (V extends Variants ? VariantProps<V> : {})

/**
 * Creates a styled React Native component with token-based styling,
 * variant support, and condition-responsive styles.
 *
 * All token resolution happens at module scope (when styled() is called).
 * Render path is O(1) cache lookup returning a frozen style object.
 */
export function styled<
  C extends ComponentType<any>,
  V extends Variants | undefined = undefined,
>(component: C, css: CSS, variants?: string | V, styleName?: string) {
  // Normalize overloaded args (same pattern as web)
  styleName = typeof variants === 'string' ? variants : styleName
  const hasVariants = !!variants && typeof variants !== 'string'
  const variantsDefinition = hasVariants ? (variants as Variants) : undefined
  const variantKeys: string[] = hasVariants ? Object.keys(variants as Variants) : []

  // === Module scope — runs once at styled() time ===
  const resolver = new NativeStyleResolver(css)
  const variantResolvers = variantsDefinition
    ? buildVariantResolvers(variantsDefinition)
    : null
  const variantCache = new Map<string, NativeStyle>()
  const needsInteractionStyle = hasInteractionKeys(css)

  type Props = StyledComponentProps<
    React.ComponentProps<C>,
    V extends Variants ? V : undefined
  >

  function StyledComponent(props: Props, ref: ForwardedRef<any>) {
    const conditionMask = useConditionMask()

    // Separate STL props from component props
    const { css: cssProp, style: styleProp, index, length, ...rest } = props as any
    const componentProps = { ...rest }

    // Strip variant props from forwarded props
    if (hasVariants) {
      for (const key of variantKeys) {
        delete componentProps[key]
      }
    }

    // For Pressable-like components with interaction keys, use style callback
    if (needsInteractionStyle) {
      const resolveForMask = (mask: ConditionMask) => {
        let style = resolver.resolve(mask, index, length)

        if (variantResolvers && hasVariants) {
          const activeVariants: Record<string, string | boolean | undefined> = {}
          for (const key of variantKeys) {
            activeVariants[key] = (props as any)[key]
          }
          style = resolveWithVariants(
            style,
            variantResolvers,
            activeVariants,
            mask,
            variantCache,
            index,
            length,
          )
        }

        if (cssProp) {
          style = resolveWithOverrides(style, cssProp, mask, index, length)
        }

        return styleProp ? { ...style, ...styleProp } : style
      }

      componentProps.style = (state: {
        pressed?: boolean
        hovered?: boolean
        focused?: boolean
      }) => {
        let mask = conditionMask
        if (state.hovered) mask |= CondBit.hovered
        if (state.pressed) mask |= CondBit.pressed
        if (state.focused) mask |= CondBit.focused
        return resolveForMask(mask)
      }

      return createElement(component, { ...componentProps, ref })
    }

    // O(1) cache lookup — returns frozen object with stable reference
    let style = resolver.resolve(conditionMask, index, length)

    // Variant resolution (also cached)
    if (variantResolvers && hasVariants) {
      const activeVariants: Record<string, string | boolean | undefined> = {}
      for (const key of variantKeys) {
        activeVariants[key] = (props as any)[key]
      }
      style = resolveWithVariants(
        style,
        variantResolvers,
        activeVariants,
        conditionMask,
        variantCache,
        index,
        length,
      )
    }

    // css prop override (dynamic — WeakMap keyed by css object reference)
    if (cssProp) {
      style = resolveWithOverrides(style, cssProp, conditionMask, index, length)
    }

    // Merge with inline style prop if provided (user escape hatch)
    const finalStyle = styleProp ? { ...style, ...styleProp } : style

    return createElement(component, { ...componentProps, style: finalStyle, ref })
  }

  StyledComponent.displayName =
    styleName ||
    `Styled(${(component as any).displayName || (component as any).name || 'Component'})`

  const forwarded = forwardRef(StyledComponent) as any
  forwarded.isStyledComponent = true
  return forwarded as React.ForwardRefExoticComponent<Props & React.RefAttributes<any>>
}
