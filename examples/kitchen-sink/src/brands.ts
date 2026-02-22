import { createBrandConfig, defaultBrand } from '@vlting/ui'
import { neonBrand } from '../../../../packages/design-tokens/src/brands/neon'
import { createTamagui } from 'tamagui'

const defaultConfig = createTamagui(createBrandConfig(defaultBrand))
const neonConfig = createTamagui(createBrandConfig(neonBrand))

export const brands = {
  default: { label: 'Default', definition: defaultBrand, config: defaultConfig },
  neon: { label: 'Neon', definition: neonBrand, config: neonConfig },
} as const

export type BrandKey = keyof typeof brands
