import { lightPalette, darkPalette } from '../themes'
import type { BrandDefinition } from './index'

export const defaultBrand: BrandDefinition = {
  name: 'default',
  palettes: {
    light: lightPalette,
    dark: darkPalette,
  },
}
