import { tokenToVarMap } from '../config/styles.css'
import { STYLE_UNIT } from '../shared/models/theme.models'
import { createTheme, type CreateThemeOptions } from './generate-theme'
import type { Theme } from './types'

/** Scales where values are unitless (no rem suffix) */
const UNITLESS_SCALES = new Set(['zIndex'])

/** Map Theme scale field → tokenToVarMap key (when they differ) */
const SCALE_VAR_MAP: Partial<Record<string, string>> = { borderWidth: 'border' }

/** Theme font key → fontFamily scale key */
const FONT_KEY_MAP: Record<string, string> = { mono: 'code' }

/** Token scale keys that live as flat fields on Theme */
const TOKEN_SCALE_KEYS = ['fontSize', 'size', 'space', 'radius', 'zIndex', 'borderWidth'] as const

/**
 * Convert a Theme to a flat map of CSS variable name → value.
 *
 * Uses the same hashed variable names that styled() components reference,
 * so runtime theme changes are reflected immediately via the cascade.
 *
 * Handles:
 * - Palettes → primary1..12, secondary1..12, neutral1..12, background1..12
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

  // All three palettes in one loop
  for (const [name, scales] of Object.entries(theme.palettes)) {
    const palette = scales[mode]
    for (let i = 0; i < palette.length; i++) {
      const varName = colorMap[`$${name}${i + 1}`]
      if (varName) vars[varName] = palette[i]
    }
  }

  // Alpha palettes (theme-aware translucent colors)
  if (theme.alphaPalettes) {
    for (const [name, scales] of Object.entries(theme.alphaPalettes)) {
      const palette = scales[mode]
      for (let i = 0; i < palette.length; i++) {
        const varName = colorMap[`$${name}Alpha${i + 1}`]
        if (varName) vars[varName] = palette[i]
      }
    }
  }

  // Token overrides (flat fields on Theme)
  for (const scale of TOKEN_SCALE_KEYS) {
    const tokens = theme[scale]
    if (!tokens) continue
    const varMapKey = SCALE_VAR_MAP[scale] ?? scale
    const scaleMap = tokenToVarMap[varMapKey as keyof typeof tokenToVarMap] as
      | Record<string, string>
      | undefined
    if (!scaleMap) continue
    const unit = UNITLESS_SCALES.has(scale) ? '' : STYLE_UNIT
    for (const [key, value] of Object.entries(tokens)) {
      const varName = scaleMap[`$${key}`]
      if (varName) vars[varName] = value === 0 ? '0' : `${value}${unit}`
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

  // Gradients
  if (theme.gradients?.primary) vars['--stl-gradient-primary'] = theme.gradients.primary
  if (theme.gradients?.secondary) vars['--stl-gradient-secondary'] = theme.gradients.secondary
  if (theme.gradients?.neutral) vars['--stl-gradient-neutral'] = theme.gradients.neutral

  // Glass
  if (theme.glass?.blur) vars['--stl-glass-blur'] = theme.glass.blur
  if (theme.glass?.tint) vars['--stl-glass-tint'] = theme.glass.tint
  if (theme.glass?.border) vars['--stl-glass-border'] = theme.glass.border
  if (theme.glass?.gradient) vars['--stl-glass-gradient'] = theme.glass.gradient

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

// ---------------------------------------------------------------------------
// Build-time theme CSS injection
// ---------------------------------------------------------------------------

const THEME_ID_RE = /^[a-z0-9-]+$/

/**
 * Generate a scoped CSS block for a theme, suitable for appending to stl.css.
 *
 * The output is wrapped in marker comments so it can be found and replaced
 * on subsequent runs. Activate the theme by setting `data-stl-theme="{id}"`
 * on `<html>`.
 */
export function generateThemeCss(options: CreateThemeOptions, id: string): string {
  if (!THEME_ID_RE.test(id)) {
    throw new Error(`Theme id must match /^[a-z0-9-]+$/, got: "${id}"`)
  }

  const theme = createTheme(options)
  const lightVars = themeToVars(theme, 'light')
  const darkVars = themeToVars(theme, 'dark')

  const lightDecl = Object.entries(lightVars)
    .map(([n, v]) => `  ${n}: ${v};`)
    .join('\n')
  const darkDecl = Object.entries(darkVars)
    .map(([n, v]) => `  ${n}: ${v};`)
    .join('\n')

  return [
    `/* --- stl-theme: ${id} --- */`,
    `[data-stl-theme="${id}"] {`,
    lightDecl,
    `}`,
    `[data-stl-theme="${id}"][data-color-mode="dark"] {`,
    darkDecl,
    `}`,
    `/* --- /stl-theme: ${id} --- */`,
  ].join('\n')
}

/**
 * Inject or replace a theme block in a CSS stylesheet string.
 *
 * If a block with matching marker comments already exists it is replaced;
 * otherwise the new block is appended to the end.
 */
export function injectThemeIntoStylesheet(
  cssContent: string,
  themeCss: string,
  themeId: string,
): string {
  const escaped = themeId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(
    `/\\* --- stl-theme: ${escaped} --- \\*/[\\s\\S]*?/\\* --- /stl-theme: ${escaped} --- \\*/`,
  )

  if (re.test(cssContent)) {
    return cssContent.replace(re, themeCss)
  }
  return cssContent + '\n\n' + themeCss
}
