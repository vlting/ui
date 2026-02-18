import { type RenderOptions, render as rtlRender } from '@testing-library/react'
import type { ReactElement } from 'react'
import { TamaguiProvider } from 'tamagui'
import config from '../../config/tamagui.config'

function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      {children}
    </TamaguiProvider>
  )
}

export function render(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return rtlRender(ui, { wrapper: AllProviders, ...options })
}

export { screen, fireEvent, waitFor } from '@testing-library/react'
