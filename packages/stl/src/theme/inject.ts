import type { Theme } from './types'

const VAR_PREFIX = '--vlt'

/**
 * Convert a Theme to a flat map of CSS variable name → value.
 *
 * Handles:
 * - Palette → `--vlt-color-{1..12}` (1-indexed for readability)
 * - Accent palettes → `--vlt-{name}-{1..12}`
 * - Token overrides → `--vlt-{scale}-{key}` (size, space, radius, zIndex, borderWidth)
 * - Shadows → `--vlt-shadow-{sm|md|lg|xl|2xl}`
 * - Fonts → `--vlt-font-{heading|body|mono}`
 */
export function themeToVars(
  theme: Theme,
  mode: 'light' | 'dark' = 'light',
): Record<string, string> {
  const vars: Record<string, string> = {}

  // Palette colors (12-step)
  const palette = theme.palettes[mode]
  for (let i = 0; i < palette.length; i++) {
    vars[`${VAR_PREFIX}-color-${i + 1}`] = palette[i]
  }

  // Accent palettes
  if (theme.accentPalettes) {
    for (const [name, scales] of Object.entries(theme.accentPalettes)) {
      const accentPalette = scales[mode]
      for (let i = 0; i < accentPalette.length; i++) {
        vars[`${VAR_PREFIX}-${name}-${i + 1}`] = accentPalette[i]
      }
    }
  }

  // Token overrides
  if (theme.tokens) {
    for (const [scale, tokens] of Object.entries(theme.tokens)) {
      if (!tokens) continue
      for (const [key, value] of Object.entries(tokens)) {
        vars[`${VAR_PREFIX}-${scale}-${key}`] = String(value)
      }
    }
  }

  // Shadows
  if (theme.shadows) {
    const shadowScale = theme.shadows[mode]
    if (shadowScale) {
      for (const [level, token] of Object.entries(shadowScale)) {
        if (!token) continue
        vars[`${VAR_PREFIX}-shadow-${level}`] = token.boxShadow
        vars[`${VAR_PREFIX}-shadow-${level}-color`] = token.color
      }
    }
  }

  // Fonts
  if (theme.fonts) {
    for (const [role, family] of Object.entries(theme.fonts)) {
      if (family) {
        vars[`${VAR_PREFIX}-font-${role}`] = family
      }
    }
  }

  return vars
}

/**
 * Generate a `<style>` tag string with `:root` CSS variables for a theme.
 */
export function getThemeStyleTag(theme: Theme, mode: 'light' | 'dark' = 'light'): string {
  const vars = themeToVars(theme, mode)
  const declarations = Object.entries(vars)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n')
  return `<style>:root {\n${declarations}\n}</style>`
}
