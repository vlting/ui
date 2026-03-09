import { useMemo } from "react"
import {
  ColorMode,
  getThemeOverrides,
  SemanticColorOverrides,
  ThemeOverrides,
  tokenValue as baseTokenValue,
} from "@vlting/stl"
import { isSSR } from "../shared/utils"

export function useThemeStyle(
  colorMode: ColorMode = "light",
  userOverrides?: ThemeOverrides,
  semanticColorOverrides?: SemanticColorOverrides
) {
  const tokenValue = useMemo(() => {
    const { style, overrides } = getThemeOverrides(colorMode, userOverrides, semanticColorOverrides)
    const styleString = Object.entries(style)
      .map(([k, v]) => `${k}: ${v}`)
      .join(";")

    // Apply the new style to the <html> tag
    if (!isSSR && document?.documentElement) {
      document.documentElement.setAttribute("style", styleString)
    }

    // Generate the up-to-date `tokenValue`
    return {
      animation: {
        ...baseTokenValue.animation,
        ...overrides.animation,
      },
      border: {
        ...baseTokenValue.border,
        ...overrides.border,
      },
      color: {
        ...baseTokenValue.color,
        ...overrides.color,
      },
      column: {
        ...baseTokenValue.column,
        ...overrides.column,
      },
      font: {
        ...baseTokenValue.font,
        ...overrides.font,
      },
      fontFamily: {
        ...baseTokenValue.fontFamily,
        ...overrides.fontFamily,
      },
      fontSize: {
        ...baseTokenValue.fontSize,
        ...overrides.fontSize,
      },
      fontWeight: {
        ...baseTokenValue.fontWeight,
        ...overrides.fontWeight,
      },
      lineHeight: {
        ...baseTokenValue.lineHeight,
        ...overrides.lineHeight,
      },
      outline: {
        ...baseTokenValue.outline,
        ...overrides.outline,
      },
      radius: {
        ...baseTokenValue.radius,
        ...overrides.radius,
      },
      row: {
        ...baseTokenValue.row,
        ...overrides.row,
      },
      shadow: {
        ...baseTokenValue.shadow,
        ...overrides.shadow,
      },
      size: {
        ...baseTokenValue.size,
        ...overrides.size,
      },
      space: {
        ...baseTokenValue.space,
        ...overrides.space,
      },
      textDecoration: {
        ...baseTokenValue.textDecoration,
        ...overrides.textDecoration,
      },
      typoSpace: {
        ...baseTokenValue.typoSpace,
        ...overrides.typoSpace,
      },
      typo: {
        ...baseTokenValue.typo,
        ...overrides.typo,
      },
      zIndex: {
        ...baseTokenValue.zIndex,
        ...overrides.zIndex,
      },
    } as typeof baseTokenValue
  }, [colorMode, userOverrides, semanticColorOverrides])

  return tokenValue
}
