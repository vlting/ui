import { createBrandConfig, defaultBrand, neonBrand } from '@vlting/ui'
import { createTamagui } from 'tamagui'

const defaultConfig = createTamagui(createBrandConfig(defaultBrand))
const neonConfig = createTamagui(createBrandConfig(neonBrand))

export const brands = {
  default: { label: 'Default', definition: defaultBrand, config: defaultConfig },
  neon: { label: 'Neon', definition: neonBrand, config: neonConfig },
} as const

export type BrandKey = keyof typeof brands
