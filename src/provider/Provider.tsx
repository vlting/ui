import type { ColorMode } from '@vlting/stl'
import type { ReactNode } from 'react'
import type { BrandFontConfig } from '../../packages/utils/googleFontsUrl'
import { StlProvider } from '../../packages/stl-react/src/providers/StlProvider'
import { useFontLoader } from '../../packages/utils/useFontLoader'

export interface ProviderProps {
  children: ReactNode
  defaultColorMode?: ColorMode
  fontConfig?: BrandFontConfig
  /** Shown while fonts are loading on React Native. Ignored on web. */
  fontLoadingFallback?: ReactNode
}

export function Provider({
  children,
  defaultColorMode = 'light',
  fontConfig,
  fontLoadingFallback = null,
}: ProviderProps) {
  const { loaded } = useFontLoader(fontConfig)

  return (
    <StlProvider defaultColorMode={defaultColorMode}>
      {loaded ? children : fontLoadingFallback}
    </StlProvider>
  )
}
