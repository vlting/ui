import { darkPalette, lightPalette } from '../themes/palettes'
import type { BrandDefinition } from './types'

export const defaultBrand: BrandDefinition = {
  name: 'default',
  palettes: {
    light: lightPalette,
    dark: darkPalette,
  },
}
