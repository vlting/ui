import { type RenderOptions, render as rtlRender } from '@testing-library/react'
import type { ReactElement } from 'react'
import { Provider } from '../provider/Provider'

function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider defaultColorMode="light">
      {children}
    </Provider>
  )
}

export function render(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return rtlRender(ui, { wrapper: AllProviders, ...options })
}

export { screen, fireEvent, waitFor } from '@testing-library/react'
