import type { CreateThemeOptions } from './generate-theme'

/**
 * Default — Blue primary + purple secondary + neutral grays.
 *
 * Primary accent: hue 205, saturation 100 (teal-shifted blue)
 * Secondary accent: hue 280, saturation 80 (purple)
 * Neutral: hue 215, saturation 0 (true achromatic gray)
 */
export const THEME_PRESET_DEFAULT: CreateThemeOptions = {
  primary: { hue: 205, saturation: 100 },
  secondary: { hue: 280, saturation: 80 },
  neutral: { hue: 215, saturation: 0, isNeutral: true },
  background: { hue: 215, saturation: 0 },
  fonts: { body: 'inter', heading: 'montserrat', code: 'firaCode' },
}
