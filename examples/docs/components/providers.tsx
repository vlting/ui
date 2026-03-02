'use client'

import { createContext, useContext, useState, useMemo, type ReactNode } from 'react'
import { createTamagui } from 'tamagui'
import {
  Provider,
  createBrandConfig,
  defaultBrand,
  shadcnBrand,
  funBrand,
  poshBrand,
} from '@vlting/ui'
import { useTheme } from 'next-themes'
import { ThemeProvider } from 'next-themes'

type BrandKey = 'default' | 'shadcn' | 'fun' | 'posh'

const brandMap = {
  default: defaultBrand,
  shadcn: shadcnBrand,
  fun: funBrand,
  posh: poshBrand,
} as const

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

function TamaguiWrapper({ brand, children }: { brand: BrandKey; children: ReactNode }) {
  const { resolvedTheme } = useTheme()

  const config = useMemo(() => {
    return createTamagui(createBrandConfig(brandMap[brand]))
  }, [brand])

  return (
    <Provider config={config} defaultTheme={resolvedTheme === 'dark' ? 'dark' : 'light'}>
      {children}
    </Provider>
  )
}

function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrand] = useState<BrandKey>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('vlting-docs-brand') as BrandKey) || 'default'
    }
    return 'default'
  })

  const handleSetBrand = (newBrand: BrandKey) => {
    setBrand(newBrand)
    if (typeof window !== 'undefined') {
      localStorage.setItem('vlting-docs-brand', newBrand)
    }
  }

  const value = useMemo(
    () => ({
      brand,
      setBrand: handleSetBrand,
      brandOptions: ['default', 'shadcn', 'fun', 'posh'] as BrandKey[],
    }),
    [brand],
  )

  return (
    <BrandContext.Provider value={value}>
      <TamaguiWrapper brand={brand}>{children}</TamaguiWrapper>
    </BrandContext.Provider>
  )
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <BrandProvider>{children}</BrandProvider>
    </ThemeProvider>
  )
}
