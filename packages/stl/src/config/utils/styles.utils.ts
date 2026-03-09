import { ColorMode, SemanticColors } from "../../shared/models"
import { generateThemeColors } from "../../shared/utils"
import { Colors } from "../props"
import { ScaleEntry, ColorPaletteEntry, PrefixedKey } from "../scales"
import { ThemeOverrides, StyleManager, Conditions, StyleMangerProps } from "../StyleManager"
import { darkVarMap, CSS, tokenToVarMap } from "../styles.css"
import { VariantCSS } from "../styles.models"
import { addPrefix } from "./general.utils"

export function getColorOverrides(colorMode: ColorMode, semanticColorOverrides: SemanticColorOverrides) {
  const overrides = {
    color: {},
  } as ThemeOverrides & { color: Record<Colors, string> }

  generateThemeColors<ScaleEntry>(
    semanticColorOverrides,
    colorMode,
    (key: keyof ColorPaletteEntry, _palette: any, value: string | number, _numberKey?: any, isMapped = false) => {
      if (!isMapped) {
        overrides.color[addPrefix(key) as PrefixedKey<ColorPaletteEntry>] = String(value)
      }
    }
  )
  return overrides
}

/** Get theme tokens that need to override the pre-generated design system */
export function getThemeOverrides(
  colorMode: ColorMode = "light",
  userOverrides?: ThemeOverrides,
  semanticColorOverrides?: SemanticColorOverrides
) {
  const overrides =
    !userOverrides && !semanticColorOverrides
      ? undefined
      : {
          ...(userOverrides ?? {}),
          ...(semanticColorOverrides ? getColorOverrides(colorMode, semanticColorOverrides) : {}),
        }

  const style = {
    ...(colorMode === "dark" ? darkVarMap : {}),
    ...flattenOverrides(overrides),
  }
  return { overrides: overrides ?? {}, style }
}

/** Converts a CSS style object into a set of pre-generated CSS class names, and possibly a style object */
export function style(
  css: CSS,
  conditions: Conditions,
  variantCss?: VariantCSS,
  overrides?: CSS | null,
  styleName?: string,
  manager?: StyleManager,
  props?: StyleMangerProps
) {
  if (manager) {
    manager.setNewStyle(conditions, styleName, props)
  } else {
    manager = new StyleManager(conditions, styleName, props)
  }

  // Process defined styles
  manager.processCss(css)

  // Process variants, if any.
  if (variantCss && variantCss.length > 0) {
    manager.processVariantCss(variantCss)
  }

  // Process style overrides, if any. This is useful for runtime overrides
  if (overrides) {
    manager.processOverridesCss(overrides)
  }

  return manager.compile()
}

/** Keeps the order of merged CSS selectors & props, unlike a regular merge, if an object key is repeated */
export const mergeCss = (...cssObject: MaybeCSS[]): CSS => {
  const mergedObj = {} as Record<string, any>

  // Loop through each CSS object
  cssObject.forEach((obj: MaybeCSS): void => {
    // Skip falsy values
    if (!obj) return

    // Loop through each property of the object
    Object.keys(obj).forEach((k: string): void => {
      type ObjKey = keyof typeof obj
      const key = k as ObjKey
      const newValue = obj[key]

      if (mergedObj[key] === undefined) {
        mergedObj[key] = newValue
      } else if (newValue && typeof newValue === "object") {
        const oldValue = mergedObj[key] ? (mergedObj[key] as CSS) : ({} as CSS)
        mergedObj[key] = mergeCss(oldValue, newValue as CSS)
      } else {
        // For primitives, just replace the old value with the new one, after deleting
        // the old one to preserve the order of properties.
        delete mergedObj[key]
        mergedObj[key] = newValue
      }
    })
  })
  return mergedObj as CSS
}

/** Generates a CSS class name from a `className` string, plus an optional pseudo-class */
export function getSelector(className: string, pseudoClass = "") {
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

type MaybeCSS = CSS | false | null | undefined

export type SemanticColorOverrides = Partial<SemanticColors>
