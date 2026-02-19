import { darkPalette, lightPalette } from '../themes/palettes'
import type { BrandDefinition } from './types'

/**
 * Minimal brand definition using the built-in palette and all default settings.
 * All optional fields (borders, outline, shadows, fonts, typography, animations)
 * fall through to the defaults defined in createBrandConfig.
 *
 * When generating a brand with AI, start from BrandDefinition and fill in
 * only the fields that differ from these defaults.
 */
export const defaultBrand: BrandDefinition = {
  name: 'default',
  palettes: {
    light: lightPalette,
    dark: darkPalette,
  },
}
