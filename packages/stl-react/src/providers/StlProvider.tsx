import type { ReactElement, ReactNode } from 'react'
import { createContext, useRef, useCallback, useEffect, useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import {
  ColorMode,
  ConditionKeys,
  conditionsMap,
  DEFAULT_COLOR_MODE,
  BreakpointOverrides,
  ThemeOverrides,
  SemanticColorOverrides,
  tokenValue as baseTokenValue,
} from '@vlting/stl'
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
  defaultColorMode?: ColorMode
  isDebugMode?: boolean
  breakpointOverrides?: BreakpointOverrides
  themeOverrides?: ThemeOverrides
  semanticColorOverrides?: SemanticColorOverrides
}

export function StlProvider(props: StlProviderProps): ReactElement {
  const {
    children,
    defaultColorMode = DEFAULT_COLOR_MODE,
    isDebugMode = false,
    breakpointOverrides,
    themeOverrides,
    semanticColorOverrides,
  } = props
  const [colorMode, setColorMode] = useState<ColorMode>(defaultColorMode)
  const tokenValue = useThemeStyle(colorMode, themeOverrides, semanticColorOverrides)

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

  const systemColorTimer = useRef<ReturnType<typeof setTimeout>>()

  const toggleColorMode = useCallback(
    () => setColorMode((mode: ColorMode) => (mode === 'light' ? 'dark' : 'light')),
    [],
  )

  // Change the color mode, when the user system's color mode changes
  useEffect(() => {
    systemColorTimer.current = setTimeout(() => {
      setColorMode(systemColorMode)
    }, 50)
    return () => {
      systemColorTimer.current && clearTimeout(systemColorTimer.current)
    }
  }, [systemColorMode])

  return (
    <StlContext.Provider
      value={{
        colorMode,
        isDark: colorMode === 'dark',
        setColorMode,
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
