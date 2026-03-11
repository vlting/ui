'use client'

import type { ReactNode } from 'react'
import { StlProvider } from '../../../packages/stl-react/src/providers/StlProvider'

export function Providers({ children }: { children: ReactNode }) {
  return <StlProvider defaultColorMode="light">{children}</StlProvider>
}
