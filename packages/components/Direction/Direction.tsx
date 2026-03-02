import React, { useContext, useState } from 'react'

type Direction = 'ltr' | 'rtl'

const DirectionContext = React.createContext<Direction>('ltr')

export interface DirectionProviderProps {
  children: React.ReactNode
  dir?: Direction
}

/**
 * Provides RTL/LTR direction context to descendant components.
 * If no `dir` prop is provided, defaults to the document's `dir` attribute on web,
 * or 'ltr' on React Native.
 */
export function DirectionProvider({ children, dir }: DirectionProviderProps) {
  const [direction] = useState<Direction>(() => {
    if (dir) return dir
    if (typeof document !== 'undefined') {
      return (document.documentElement.dir as Direction) || 'ltr'
    }
    return 'ltr'
  })

  const resolvedDir = dir ?? direction

  return (
    <DirectionContext.Provider value={resolvedDir}>
      {children}
    </DirectionContext.Provider>
  )
}

/**
 * Returns the current text direction ('ltr' or 'rtl').
 * Falls back to 'ltr' if used outside a DirectionProvider.
 */
export function useDirection(): Direction {
  return useContext(DirectionContext)
}

export const Direction = { Provider: DirectionProvider }
