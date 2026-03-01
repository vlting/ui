import type { ReactNode } from 'react'
import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui'
import type { BrandFontConfig } from '../../packages/design-tokens/brands'
import { FontLoader } from '../../packages/utils/FontLoader'
import defaultConfig from '../../config/tamagui.config'

export interface ProviderProps {
  children: ReactNode
  config?: TamaguiProviderProps['config']
  defaultTheme?: 'light' | 'dark'
  fontConfig?: BrandFontConfig
}

export function Provider({
  children,
  config = defaultConfig,
  defaultTheme = 'light',
  fontConfig,
}: ProviderProps) {
  return (
    <TamaguiProvider config={config} defaultTheme={defaultTheme}>
      <FontLoader fontConfig={fontConfig} />
      {children}
    </TamaguiProvider>
  )
}
