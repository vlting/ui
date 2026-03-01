import type { ReactNode } from 'react'
import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui'
import type { BrandFontConfig } from '../../packages/design-tokens/brands'
import { useFontLoader } from '../../packages/utils/useFontLoader'
import defaultConfig from '../../config/tamagui.config'

export interface ProviderProps {
  children: ReactNode
  config?: TamaguiProviderProps['config']
  defaultTheme?: 'light' | 'dark'
  fontConfig?: BrandFontConfig
  /** Shown while fonts are loading on React Native. Ignored on web. */
  fontLoadingFallback?: ReactNode
}

export function Provider({
  children,
  config = defaultConfig,
  defaultTheme = 'light',
  fontConfig,
  fontLoadingFallback = null,
}: ProviderProps) {
  const { loaded } = useFontLoader(fontConfig)

  return (
    <TamaguiProvider config={config} defaultTheme={defaultTheme}>
      {loaded ? children : fontLoadingFallback}
    </TamaguiProvider>
  )
}
