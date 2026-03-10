import { generatePalette } from './generate-palette'
import type { Brand } from './types'

/**
 * Default brand — Clean neutral grays + cyan-blue primary + muted purple secondary.
 *
 * Neutral: hue 290, saturation 0 (true achromatic gray)
 * Primary: hue 200, saturation 85 (rich cyan-blue)
 * Secondary: hue 290, saturation 50 (muted purple)
 */
export const defaultBrand: Brand = {
  name: 'default',

  palettes: {
    light: generatePalette(290, 0, 'light'),
    dark: generatePalette(290, 0, 'dark'),
  },

  accentPalettes: {
    primary: {
      light: generatePalette(200, 85, 'light'),
      dark: generatePalette(200, 85, 'dark'),
    },
    secondary: {
      light: generatePalette(290, 50, 'light'),
      dark: generatePalette(290, 50, 'dark'),
    },
  },

  fonts: {
    heading: 'Inter, system-ui, -apple-system, sans-serif',
    body: 'Inter, system-ui, -apple-system, sans-serif',
    mono: 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace',
  },
}
