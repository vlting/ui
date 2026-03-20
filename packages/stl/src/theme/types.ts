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
  alphaPalettes?: {
    primary: { light: string[]; dark: string[] }
    secondary: { light: string[]; dark: string[] }
    neutral: { light: string[]; dark: string[] }
    background: { light: string[]; dark: string[] }
    min: { light: string[]; dark: string[] }
    max: { light: string[]; dark: string[] }
  }
  // Token overrides — keys must match CSS var token names in the scale
  // size/space: 'base' (proportional), 0, 1, 2, 4, 6, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48...
  // borderWidth: 'widthBase', 'widthMin', 'widthMax', 'widthDefault', 'width0'
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
