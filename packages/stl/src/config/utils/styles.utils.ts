import type { ColorMode, SemanticColors } from '../../shared/models'
import { generateThemeColors } from '../../shared/utils'
import {
  type Conditions,
  StyleManager,
  type StyleMangerProps,
  type ThemeOverrides,
} from '../StyleManager'
import type { Colors } from '../props'
import type { ColorPaletteEntry, PrefixedKey, ScaleEntry } from '../scales'
import { type STL, tokenToVarMap } from '../styles.css'
import type { VariantSTL } from '../styles.models'
import { addPrefix } from './general.utils'

export function getColorOverrides(
  colorMode: ColorMode,
  semanticColorOverrides: SemanticColorOverrides,
) {
  const overrides = {
    color: {},
  } as ThemeOverrides & { color: Record<Colors, string> }

  generateThemeColors<ScaleEntry>(
    semanticColorOverrides,
    colorMode,
    (
      key: keyof ColorPaletteEntry,
      _palette: any,
      value: string | number,
      _numberKey?: any,
      isMapped = false,
    ) => {
      if (!isMapped) {
        overrides.color[addPrefix(key) as PrefixedKey<ColorPaletteEntry>] = String(value)
      }
    },
  )
  return overrides
}

/**
 * Get theme tokens that need to override the pre-generated design system.
 * Returns only user-provided overrides — dark mode vars are now delivered via build-time CSS.
 */
export function getThemeOverrides(
  colorMode: ColorMode = 'light',
  userOverrides?: ThemeOverrides,
  semanticColorOverrides?: SemanticColorOverrides,
) {
  const overrides =
    !userOverrides && !semanticColorOverrides
      ? undefined
      : {
          ...(userOverrides ?? {}),
          ...(semanticColorOverrides
            ? getColorOverrides(colorMode, semanticColorOverrides)
            : {}),
        }

  const style = flattenOverrides(overrides)
  return { overrides: overrides ?? {}, style }
}

/** Converts a CSS style object into a set of pre-generated CSS class names, and possibly a style object */
export function style(input: {
  stl: STL
  conditions: Conditions
  variantStl?: VariantSTL
  overrides?: STL | null
  styleName?: string
  manager?: StyleManager
  props?: StyleMangerProps
  useClassName?: boolean
}) {
  let { manager } = input
  const { stl, conditions, variantStl, overrides, styleName, props, useClassName } = input

  if (manager) {
    manager.setNewStyle(conditions, styleName, props)
  } else {
    manager = new StyleManager(conditions, styleName, props)
  }

  // Process defined styles
  manager.processStl(stl)

  // Process variants, if any.
  if (variantStl && variantStl.length > 0) {
    manager.processVariantStl(variantStl)
  }

  // Process style overrides, if any. This is useful for runtime overrides
  if (overrides) {
    manager.processOverridesStl(overrides)
  }

  return manager.compile(useClassName)
}

/** Keeps the order of merged CSS selectors & props, unlike a regular merge, if an object key is repeated */
export const mergeStl = (...cssObject: MaybeSTL[]): STL => {
  const mergedObj = {} as Record<string, any>

  // Loop through each CSS object
  cssObject.forEach((obj: MaybeSTL): void => {
    // Skip falsy values
    if (!obj) return

    // Loop through each property of the object
    Object.keys(obj).forEach((k: string): void => {
      type ObjKey = keyof typeof obj
      const key = k as ObjKey
      const newValue = obj[key]

      if (mergedObj[key] === undefined) {
        mergedObj[key] = newValue
      } else if (newValue && typeof newValue === 'object') {
        const oldValue = mergedObj[key] ? (mergedObj[key] as STL) : ({} as STL)
        mergedObj[key] = mergeStl(oldValue, newValue as STL)
      } else {
        // For primitives, just replace the old value with the new one, after deleting
        // the old one to preserve the order of properties.
        delete mergedObj[key]
        mergedObj[key] = newValue
      }
    })
  })
  return mergedObj as STL
}

/** Generates a CSS class name from a `className` string, plus an optional pseudo-class */
export function getSelector(className: string, pseudoClass = '') {
  return `.${className}${pseudoClass}`
}

// INNER UTILS //

/** Takes a nested (group-based) theme overrides object, and flattens it, without groupings */
function flattenOverrides(overrides?: ThemeOverrides) {
  return !overrides
    ? {}
    : (Object.entries(overrides).reduce((output, [group, rules]) => {
        Object.entries(rules).forEach(([token, value]) => {
          const tokenVars = tokenToVarMap[group as keyof typeof tokenToVarMap]
          const varName = tokenVars[token as keyof typeof tokenVars]
          output[varName] = value
        })
        return output
      }, {} as any) as Record<string, string | number>)
}

type MaybeSTL = STL | false | null | undefined

export type SemanticColorOverrides = Partial<SemanticColors>
