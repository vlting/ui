'use client'

import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'
import { StlProvider } from '../../../packages/stl-react/src/providers/StlProvider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <StlProvider defaultColorMode="light">{children}</StlProvider>
    </ThemeProvider>
  )
}
