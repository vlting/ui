import type { CreateThemeOptions } from './generate-theme'

/**
 * Default — Iris primary + purply-fuchsia secondary + neutral grays.
 *
 * Primary accent: hue 245, saturation 100 (iris / blueish-purple)
 * Secondary accent: hue 295, saturation 85 (purply fuchsia)
 * Neutral: hue 245, saturation 0 (true achromatic gray)
 */
export const THEME_PRESET_DEFAULT: CreateThemeOptions = {
  primary: { hue: 250, saturation: 100 },
  secondary: { hue: 90, saturation: 95 },
  neutral: { hue: 250, saturation: 0, isNeutral: true },
  background: { hue: 250, saturation: 0 },
  fonts: { body: 'inter', heading: 'montserrat', code: 'firaCode' },
}
