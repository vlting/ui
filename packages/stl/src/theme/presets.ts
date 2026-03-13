import type { CreateThemeOptions } from './generate-theme'

/**
 * Default — Blue primary + purple secondary + neutral grays.
 *
 * Primary accent: hue 215, saturation 90 (blue)
 * Secondary accent: hue 300, saturation 80 (muted purple)
 * Neutral: hue 215, saturation 0 (true achromatic gray)
 */
export const THEME_PRESET_DEFAULT: CreateThemeOptions = {
  primary: { hue: 215, saturation: 100 },
  secondary: { hue: 300, saturation: 80 },
  tertiary: { hue: 215, saturation: 0, isNeutral: true },
  fonts: { body: 'inter', heading: 'montserrat', code: 'firaCode' },
}
