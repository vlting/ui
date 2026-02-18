import type { ReactNode } from 'react'
import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui'
import defaultConfig from '../../config/tamagui.config'

export interface ProviderProps {
  children: ReactNode
  config?: TamaguiProviderProps['config']
  defaultTheme?: 'light' | 'dark'
}

export function Provider({
  children,
  config = defaultConfig,
  defaultTheme = 'light',
}: ProviderProps) {
  return (
    <TamaguiProvider config={config} defaultTheme={defaultTheme}>
      {children}
    </TamaguiProvider>
  )
}
