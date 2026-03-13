import { tokenToVarMap } from '../config/styles.css'
import { STYLE_UNIT } from '../shared/models/theme.models'
import type { Theme } from './types'

/** Scales where values are unitless (no rem suffix) */
const UNITLESS_SCALES = new Set(['zIndex'])

/**
 * Scales whose Theme token keys use different semantics than the build-time
 * CSS var keys (step indices vs pixel values). Skipped for var overrides
 * because the key collision would produce incorrect results.
 */
const INCOMPATIBLE_TOKEN_SCALES = new Set(['size', 'space', 'borderWidth'])

/** Theme font key → fontFamily scale key */
const FONT_KEY_MAP: Record<string, string> = { mono: 'code' }

/**
 * Convert a Theme to a flat map of CSS variable name → value.
 *
 * Uses the same hashed variable names that styled() components reference,
 * so runtime theme changes are reflected immediately via the cascade.
 *
 * Handles:
 * - Palette → tertiary1..12 (neutral palette)
 * - Accent palettes → {name}1..12 (primary, secondary, blue, red, etc.)
 * - Token overrides → radius, zIndex (scales with matching key semantics)
 * - Shadows → sm, md, lg, xl, 2xl
 * - Fonts → heading, body, mono
 */
export function themeToVars(
  theme: Theme,
  mode: 'light' | 'dark' = 'light',
): Record<string, string> {
  const vars: Record<string, string> = {}
  const colorMap = tokenToVarMap.color as Record<string, string>

  // Palette → tertiary (neutral) scale
  const palette = theme.palettes[mode]
  for (let i = 0; i < palette.length; i++) {
    const varName = colorMap[`$tertiary${i + 1}`]
    if (varName) vars[varName] = palette[i]
  }

  // Accent palettes → named color scales
  if (theme.accentPalettes) {
    for (const [name, scales] of Object.entries(theme.accentPalettes)) {
      const accentPalette = scales[mode]
      for (let i = 0; i < accentPalette.length; i++) {
        const varName = colorMap[`$${name}${i + 1}`]
        if (varName) vars[varName] = accentPalette[i]
      }
    }
  }

  // Token overrides (radius, zIndex — scales with matching key semantics)
  if (theme.tokens) {
    for (const [scale, tokens] of Object.entries(theme.tokens)) {
      if (!tokens || INCOMPATIBLE_TOKEN_SCALES.has(scale)) continue
      const scaleMap = tokenToVarMap[scale as keyof typeof tokenToVarMap] as
        | Record<string, string>
        | undefined
      if (!scaleMap) continue
      const unit = UNITLESS_SCALES.has(scale) ? '' : STYLE_UNIT
      for (const [key, value] of Object.entries(tokens)) {
        const varName = scaleMap[`$${key}`]
        if (varName) vars[varName] = value === 0 ? '0' : `${value}${unit}`
      }
    }
  }

  // Shadows
  if (theme.shadows) {
    const shadowScale = theme.shadows[mode]
    const shadowMap = tokenToVarMap.shadow as Record<string, string>
    if (shadowScale) {
      for (const [level, token] of Object.entries(shadowScale)) {
        if (!token) continue
        const varName = shadowMap[`$${level}`]
        if (varName) vars[varName] = token.boxShadow
      }
    }
  }

  // Fonts
  if (theme.fonts) {
    const fontMap = tokenToVarMap.fontFamily as Record<string, string>
    for (const [role, family] of Object.entries(theme.fonts)) {
      if (!family) continue
      const tokenKey = FONT_KEY_MAP[role] ?? role
      const varName = fontMap[`$${tokenKey}`]
      if (varName) vars[varName] = family
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
