'use client'

import {
  defaultBrand,
  funBrand,
  poshBrand,
  shadcnBrand,
} from '../../../packages/design-tokens'
import type { Brand } from '../../../packages/design-tokens'
import { useTheme } from 'next-themes'
import { ThemeProvider } from 'next-themes'
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type BrandKey = 'default' | 'shadcn' | 'fun' | 'posh'

const brandMap: Record<BrandKey, Brand> = {
  default: defaultBrand,
  shadcn: shadcnBrand,
  fun: funBrand,
  posh: poshBrand,
}

interface BrandContextValue {
  brand: BrandKey
  setBrand: (brand: BrandKey) => void
  brandOptions: BrandKey[]
}

const BrandContext = createContext<BrandContextValue>({
  brand: 'default',
  setBrand: () => {},
  brandOptions: ['default', 'shadcn', 'fun', 'posh'],
})

export function useBrand() {
  return useContext(BrandContext)
}

/**
 * Bridges brand palette colors to CSS custom properties so that
 * Tailwind-styled elements can react to brand changes.
 */
function useBrandCSSProperties(brand: BrandKey, resolvedTheme: string | undefined) {
  useEffect(() => {
    const root = document.documentElement
    const definition = brandMap[brand]
    const isDark = resolvedTheme === 'dark'
    const palette = isDark ? definition.palettes.dark : definition.palettes.light

    // Expose primary neutral palette as CSS custom properties
    root.style.setProperty('--brand-bg', palette[0])
    root.style.setProperty('--brand-bg-subtle', palette[1])
    root.style.setProperty('--brand-bg-muted', palette[2])
    root.style.setProperty('--brand-border', palette[4])
    root.style.setProperty('--brand-border-muted', palette[3])
    root.style.setProperty('--brand-text-muted', palette[7])
    root.style.setProperty('--brand-text', palette[10])
    root.style.setProperty('--brand-text-strong', palette[11])

    // Expose accent palette (first accent, typically 'blue')
    const accentPalettes = definition.accentPalettes
    const firstAccentKey = accentPalettes ? Object.keys(accentPalettes)[0] : null
    if (firstAccentKey && accentPalettes) {
      const accent = isDark
        ? accentPalettes[firstAccentKey].dark
        : accentPalettes[firstAccentKey].light
      root.style.setProperty('--brand-accent', accent[6])
      root.style.setProperty('--brand-accent-light', accent[4])
      root.style.setProperty('--brand-accent-subtle', accent[2])
      root.style.setProperty('--brand-accent-strong', accent[8])
    }

    // Expose brand font family
    const fontConfig = definition.fontConfig
    if (fontConfig) {
      root.style.setProperty('--brand-font-heading', fontConfig.heading.family)
      root.style.setProperty('--brand-font-body', fontConfig.body.family)
    }

    // Set a data attribute for brand-specific CSS targeting
    root.dataset.brand = brand
  }, [brand, resolvedTheme])
}

function BrandWrapper({ brand, children }: { brand: BrandKey; children: ReactNode }) {
  const { resolvedTheme } = useTheme()
  useBrandCSSProperties(brand, resolvedTheme)
  return <>{children}</>
}

function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrand] = useState<BrandKey>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('vlting-docs-brand') as BrandKey) || 'default'
    }
    return 'default'
  })

  const handleSetBrand = useCallback((newBrand: BrandKey) => {
    setBrand(newBrand)
    if (typeof window !== 'undefined') {
      localStorage.setItem('vlting-docs-brand', newBrand)
    }
  }, [])

  const value = useMemo(
    () => ({
      brand,
      setBrand: handleSetBrand,
      brandOptions: ['default', 'shadcn', 'fun', 'posh'] as BrandKey[],
    }),
    [brand, handleSetBrand],
  )

  return (
    <BrandContext.Provider value={value}>
      <BrandWrapper brand={brand}>{children}</BrandWrapper>
    </BrandContext.Provider>
  )
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <BrandProvider>{children}</BrandProvider>
    </ThemeProvider>
  )
}
