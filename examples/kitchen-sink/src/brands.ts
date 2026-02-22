import { createBrandConfig, defaultBrand, funBrand, poshBrand } from '@vlting/ui'
import { createTamagui } from 'tamagui'
import type { BrandDefinition } from '@vlting/ui'

const brandDefinitions = {
  default: { label: 'Default', definition: defaultBrand },
  fun: { label: 'Fun', definition: funBrand },
  posh: { label: 'Posh', definition: poshBrand },
} as const

export type BrandKey = keyof typeof brandDefinitions

// Determine the active brand from the URL at page load time.
// Only one createTamagui() call happens per page load — Tamagui uses
// a module-level singleton, so calling it multiple times would overwrite.
function getActiveBrandKey(): BrandKey {
  const segment = window.location.pathname.split('/')[1] || ''
  return segment in brandDefinitions ? (segment as BrandKey) : 'default'
}

const activeBrandKey = getActiveBrandKey()
const activeDef = brandDefinitions[activeBrandKey].definition
const activeConfig = createTamagui(createBrandConfig(activeDef))

export const brands = Object.fromEntries(
  Object.entries(brandDefinitions).map(([key, val]) => [key, { label: val.label }]),
) as Record<BrandKey, { label: string }>

export const activeBrand = {
  key: activeBrandKey,
  config: activeConfig,
}
