import {
  type BreakpointOverrides,
  type ColorMode,
  type ConditionKeys,
  DEFAULT_COLOR_MODE,
  type SemanticColorOverrides,
  type Theme,
  type ThemeOverrides,
  applyTheme,
  tokenValue as baseTokenValue,
  conditionsMap,
} from '@vlting/stl'
import type { ReactElement, ReactNode } from 'react'
import { createContext, useCallback, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useThemeStyle } from '../hooks/useThemeStyle'
import { useContextConditions } from './StlProvider.utils'

export const CssConditionsContext = createContext<Record<ConditionKeys, boolean>>(
  Object.keys(conditionsMap).reduce(
    (output, key) => {
      output[key as ConditionKeys] = false
      return output
    },
    {} as Record<ConditionKeys, boolean>,
  ),
)

// GLOBAL STL PROVIDER /////////////////////////////////////////////////
export interface StlContextProps {
  colorMode: ColorMode
  isDark: boolean
  setColorMode: (mode: ColorMode) => void
  toggleColorMode: () => void
  isTouchDevice: boolean
  tokenValue: typeof baseTokenValue
}

export const StlContext = createContext<StlContextProps>({
  colorMode: DEFAULT_COLOR_MODE,
  isDark: false,
  setColorMode: () => undefined,
  toggleColorMode: () => undefined,
  isTouchDevice: false,
  tokenValue: baseTokenValue,
})

export interface StlProviderProps {
  children: ReactNode
  /** Full theme object from createTheme(). Takes precedence over themeOverrides. */
  theme?: Readonly<Theme>
  defaultColorMode?: ColorMode
  isDebugMode?: boolean
  breakpointOverrides?: BreakpointOverrides
  themeOverrides?: ThemeOverrides
  semanticColorOverrides?: SemanticColorOverrides
}

export function StlProvider(props: StlProviderProps): ReactElement {
  const {
    children,
    theme,
    defaultColorMode = DEFAULT_COLOR_MODE,
    isDebugMode = false,
    breakpointOverrides,
    themeOverrides,
    semanticColorOverrides,
  } = props
  const [colorMode, setColorMode] = useState<ColorMode>(defaultColorMode)
  const tokenValue = useThemeStyle(colorMode, themeOverrides, semanticColorOverrides)

  // Apply full theme object when provided (CSS var injection)
  useEffect(() => {
    if (theme) {
      applyTheme(theme, colorMode)
    }
  }, [theme, colorMode])

  const systemColorMode = useMediaQuery<ColorMode>(
    '(prefers-color-scheme: dark)',
    defaultColorMode,
    'dark',
    'light',
  )
  const conditions = useContextConditions(
    colorMode,
    false,
    isDebugMode,
    breakpointOverrides,
  )
  const isTouchDevice = conditions.touch

  const toggleColorMode = useCallback(
    () =>
      setColorMode((mode: ColorMode) => {
        const next = mode === 'light' ? 'dark' : 'light'
        try {
          localStorage.setItem('stl-color-mode', next)
        } catch {}
        return next
      }),
    [],
  )

  // Persist color mode to localStorage on explicit set
  const wrappedSetColorMode = useCallback((mode: ColorMode) => {
    try {
      localStorage.setItem('stl-color-mode', mode)
    } catch {}
    setColorMode(mode)
  }, [])

  // Read from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('stl-color-mode') as ColorMode | null
      if (stored === 'light' || stored === 'dark') {
        setColorMode(stored)
        return
      }
    } catch {}
  }, [])

  // Sync with system color mode changes via rAF (skip initial mount)
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const rafId = requestAnimationFrame(() => {
      setColorMode(systemColorMode)
    })
    return () => cancelAnimationFrame(rafId)
  }, [systemColorMode])

  return (
    <StlContext.Provider
      value={{
        colorMode,
        isDark: colorMode === 'dark',
        setColorMode: wrappedSetColorMode,
        toggleColorMode,
        isTouchDevice,
        tokenValue,
      }}
    >
      <CssConditionsContext.Provider value={conditions}>
        {children}
      </CssConditionsContext.Provider>
    </StlContext.Provider>
  )
}
