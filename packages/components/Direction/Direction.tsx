import React, { createContext, useContext } from 'react'

type Dir = 'ltr' | 'rtl'
const DirectionContext = createContext<Dir>('ltr')

export interface DirectionProviderProps {
  dir?: Dir
  children: React.ReactNode
}

export function DirectionProvider({
  dir = 'ltr',
  children,
}: DirectionProviderProps) {
  return (
    <DirectionContext.Provider value={dir}>
      {children}
    </DirectionContext.Provider>
  )
}

export function useDirection(): Dir {
  const ctx = useContext(DirectionContext)
  if (ctx) return ctx
  if (typeof document !== 'undefined') {
    return (document.documentElement.dir as Dir) || 'ltr'
  }
  return 'ltr'
}

export const Direction = Object.assign(DirectionProvider, {
  Provider: DirectionProvider,
})
