import { createBrandConfig, defaultBrand, funBrand, poshBrand } from '@vlting/ui'
import { createTamagui } from 'tamagui'

const defaultConfig = createTamagui(createBrandConfig(defaultBrand))
const funConfig = createTamagui(createBrandConfig(funBrand))
const poshConfig = createTamagui(createBrandConfig(poshBrand))

export const brands = {
  default: { label: 'Default', definition: defaultBrand, config: defaultConfig },
  fun: { label: 'Fun', definition: funBrand, config: funConfig },
  posh: { label: 'Posh', definition: poshBrand, config: poshConfig },
} as const

export type BrandKey = keyof typeof brands
