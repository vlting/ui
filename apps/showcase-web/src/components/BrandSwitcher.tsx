import { useCallback, useEffect, useState } from 'react'
import { useColorMode } from '@vlting/stl-react'
import {
  defaultBrand,
  funBrand,
  poshBrand,
  shadcnBrand,
  injectBrandVars,
} from '@vlting/ui/design-tokens'
import type { Brand } from '@vlting/ui/design-tokens'

type BrandKey = 'default' | 'shadcn' | 'fun' | 'posh'

const brandMap: Record<BrandKey, Brand> = {
  default: defaultBrand,
  shadcn: shadcnBrand,
  fun: funBrand,
  posh: poshBrand,
}

const brandLabels: Record<BrandKey, string> = {
  default: 'Default',
  shadcn: 'Shadcn',
  fun: 'Fun',
  posh: 'Posh',
}

const STORAGE_KEY = 'vlting-showcase-brand'

function applyBrandVars(brand: Brand, mode: 'light' | 'dark') {
  const vars = injectBrandVars(brand, mode)
  const root = document.documentElement
  for (const [name, value] of Object.entries(vars)) {
    root.style.setProperty(name, value)
  }
}

function clearBrandVars(brand: Brand, mode: 'light' | 'dark') {
  const vars = injectBrandVars(brand, mode)
  const root = document.documentElement
  for (const name of Object.keys(vars)) {
    root.style.removeProperty(name)
  }
}

export function useBrandSwitcher() {
  const { colorMode } = useColorMode()
  const mode = colorMode === 'dark' ? 'dark' : 'light'

  const [brandKey, setBrandKey] = useState<BrandKey>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY) as BrandKey) || 'default'
    } catch {
      return 'default'
    }
  })

  // Apply CSS variables when brand or color mode changes
  useEffect(() => {
    const brand = brandMap[brandKey]
    applyBrandVars(brand, mode)
    return () => clearBrandVars(brand, mode)
  }, [brandKey, mode])

  const setBrand = useCallback((key: BrandKey) => {
    // Clear old brand vars before applying new ones
    setBrandKey(prev => {
      clearBrandVars(brandMap[prev], mode)
      return key
    })
    try {
      localStorage.setItem(STORAGE_KEY, key)
    } catch {
      // Storage unavailable
    }
  }, [mode])

  return { brandKey, setBrand, brandOptions: Object.keys(brandMap) as BrandKey[] }
}

export function BrandSwitcher() {
  const { brandKey, setBrand, brandOptions } = useBrandSwitcher()

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setBrand(e.target.value as BrandKey)
    },
    [setBrand],
  )

  return (
    <select
      value={brandKey}
      onChange={handleChange}
      aria-label="Select brand theme"
      style={{
        padding: '6px 12px',
        borderRadius: 6,
        border: '1px solid var(--stl-borderColor, #ddd)',
        background: 'var(--stl-surface1, #f5f5f5)',
        color: 'var(--stl-color, #111)',
        cursor: 'pointer',
        fontSize: 14,
      }}
    >
      {brandOptions.map(key => (
        <option key={key} value={key}>
          {brandLabels[key]}
        </option>
      ))}
    </select>
  )
}
