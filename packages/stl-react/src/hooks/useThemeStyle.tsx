import { useMemo, useEffect } from "react"
import {
  ColorMode,
  COLOR_MODE_ATTR,
  getThemeOverrides,
  SemanticColorOverrides,
  ThemeOverrides,
  tokenValue as baseTokenValue,
} from "@vlting/stl"
import { isSSR } from "../shared/utils"

const STYLE_TAG_ID = "stl-theme-overrides"

export function useThemeStyle(
  colorMode: ColorMode = "light",
  userOverrides?: ThemeOverrides,
  semanticColorOverrides?: SemanticColorOverrides
) {
  const { tokenValue, styleString } = useMemo(() => {
    const { style, overrides } = getThemeOverrides(colorMode, userOverrides, semanticColorOverrides)

    // Build CSS string from user overrides only (dark vars now in build-time CSS)
    const entries = Object.entries(style)
    const styleString = entries.length > 0
      ? entries.map(([k, v]) => `${k}: ${v}`).join(";")
      : ""

    // Generate the up-to-date tokenValue
    const tokenValue = {
      animation: { ...baseTokenValue.animation, ...overrides.animation },
      border: { ...baseTokenValue.border, ...overrides.border },
      color: { ...baseTokenValue.color, ...overrides.color },
      column: { ...baseTokenValue.column, ...overrides.column },
      font: { ...baseTokenValue.font, ...overrides.font },
      fontFamily: { ...baseTokenValue.fontFamily, ...overrides.fontFamily },
      fontSize: { ...baseTokenValue.fontSize, ...overrides.fontSize },
      fontWeight: { ...baseTokenValue.fontWeight, ...overrides.fontWeight },
      lineHeight: { ...baseTokenValue.lineHeight, ...overrides.lineHeight },
      outline: { ...baseTokenValue.outline, ...overrides.outline },
      radius: { ...baseTokenValue.radius, ...overrides.radius },
      row: { ...baseTokenValue.row, ...overrides.row },
      shadow: { ...baseTokenValue.shadow, ...overrides.shadow },
      size: { ...baseTokenValue.size, ...overrides.size },
      space: { ...baseTokenValue.space, ...overrides.space },
      textDecoration: { ...baseTokenValue.textDecoration, ...overrides.textDecoration },
      typoSpace: { ...baseTokenValue.typoSpace, ...overrides.typoSpace },
      typo: { ...baseTokenValue.typo, ...overrides.typo },
      zIndex: { ...baseTokenValue.zIndex, ...overrides.zIndex },
    } as typeof baseTokenValue

    return { tokenValue, styleString }
  }, [colorMode, userOverrides, semanticColorOverrides])

  // DOM mutations in useEffect (not useMemo) — proper lifecycle + cleanup
  useEffect(() => {
    if (isSSR || !document?.documentElement) return

    // Set color mode attribute (triggers CSS rule matching for dark vars)
    document.documentElement.setAttribute(COLOR_MODE_ATTR, colorMode)

    // Clean up any legacy inline style from previous version
    if (document.documentElement.hasAttribute("style")) {
      document.documentElement.removeAttribute("style")
    }

    // Manage <style> tag for user overrides
    if (styleString) {
      let tag = document.getElementById(STYLE_TAG_ID) as HTMLStyleElement | null
      if (!tag) {
        tag = document.createElement("style")
        tag.id = STYLE_TAG_ID
        document.head.appendChild(tag)
      }
      tag.textContent = `:root { ${styleString} }`
    } else {
      const tag = document.getElementById(STYLE_TAG_ID)
      if (tag) tag.remove()
    }

    // Cleanup on unmount
    return () => {
      const tag = document.getElementById(STYLE_TAG_ID)
      if (tag) tag.remove()
    }
  }, [colorMode, styleString])

  return tokenValue
}
