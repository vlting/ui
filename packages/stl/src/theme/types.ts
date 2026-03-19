import type { HtmlHeadLink } from '../shared/models/theme.models'
import type { ShadowScale } from './themes'

/**
 * Theme — a simple data object describing visual identity.
 *
 * No factory pattern, no framework dependencies.
 * Consumed by `themeToVars()` to produce CSS custom properties.
 */
export interface Theme {
  name: string
  palettes: {
    primary: { light: string[]; dark: string[] }
    secondary: { light: string[]; dark: string[] }
    neutral: { light: string[]; dark: string[] }
    background: { light: string[]; dark: string[] }
  }
  // Flattened token overrides (no nested `tokens` wrapper)
  size?: Record<string | number, number>
  space?: Record<string | number, number>
  radius?: Record<string | number, number>
  zIndex?: Record<string | number, number>
  fontSize?: Record<string, number>
  borderWidth?: Record<string, number>
  shadows?: {
    light?: ShadowScale
    dark?: ShadowScale
  }
  fonts?: {
    heading?: string
    subheading?: string
    body?: string
    mono?: string
  }
  fontLinks?: HtmlHeadLink[]
  gradients?: {
    primary?: string
    secondary?: string
    neutral?: string
  }
  glass?: {
    blur?: string
    tint?: string
    border?: string
    gradient?: string
  } | null
}
