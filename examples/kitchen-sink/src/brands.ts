import {
  defaultBrand,
  funBrand,
  injectBrandVars,
  poshBrand,
  shadcnBrand,
} from '@vlting/ui'

const brandDefinitions = {
  default: { label: 'Default', definition: defaultBrand },
  fun: { label: 'Fun', definition: funBrand },
  posh: { label: 'Posh', definition: poshBrand },
  shadcn: { label: 'shadcn', definition: shadcnBrand },
} as const

export type BrandKey = keyof typeof brandDefinitions

function getActiveBrandKey(): BrandKey {
  const segment = window.location.pathname.split('/')[1] || ''
  return segment in brandDefinitions ? (segment as BrandKey) : 'default'
}

const activeBrandKey = getActiveBrandKey()
const activeDef = brandDefinitions[activeBrandKey].definition

// Inject CSS variables for both light and dark modes
function injectBrandStyles() {
  const lightVars = injectBrandVars(activeDef, 'light')
  const darkVars = injectBrandVars(activeDef, 'dark')

  const style = document.createElement('style')
  style.id = 'brand-vars'
  style.textContent = [
    ':root {',
    ...Object.entries(lightVars).map(([k, v]) => `  ${k}: ${v};`),
    '}',
    '[data-color-mode="dark"] {',
    ...Object.entries(darkVars).map(([k, v]) => `  ${k}: ${v};`),
    '}',
  ].join('\n')
  document.head.appendChild(style)
}

injectBrandStyles()

export const brands = Object.fromEntries(
  Object.entries(brandDefinitions).map(([key, val]) => [key, { label: val.label }]),
) as Record<BrandKey, { label: string }>

export const activeBrand = {
  key: activeBrandKey,
  definition: activeDef,
}
