import type { CreateThemeOptions } from './generate-theme'

/**
 * Default — Rich cyan-blue primary + muted purple secondary + neutral grays.
 *
 * Primary accent: hue 200, saturation 85 (rich cyan-blue)
 * Secondary accent: hue 290, saturation 50 (muted purple)
 * Neutral: hue 290, saturation 0 (true achromatic gray)
 */
export const THEME_PRESET_DEFAULT: CreateThemeOptions = {
  primary: { hue: 200, saturation: 85 },
  secondary: { hue: 290, saturation: 50 },
  tertiary: { hue: 290, saturation: 0, isNeutral: true },
  fonts: {
    heading: 'Inter, system-ui, -apple-system, sans-serif',
    body: 'Inter, system-ui, -apple-system, sans-serif',
    mono: 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace',
  },
}

