import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  AccessibilityInfo,
  Appearance,
  Dimensions,
  I18nManager,
  type ScaledSize,
} from 'react-native'
import {
  type ConditionKeys,
  type ConditionMask,
  computeConditionMask,
  observerConditionsMap,
} from '../config/conditions'
import type { ColorMode } from '../shared/colorGen'
import { DEFAULT_COLOR_MODE } from '../shared/colorGen'

// CONTEXT /////////////////////////////////////////////////////////////////////

export const ConditionMaskContext = createContext<ConditionMask>(0)

export interface StlContextValue {
  colorMode: ColorMode
  isDark: boolean
  setColorMode: (mode: ColorMode) => void
  toggleColorMode: () => void
}

export const StlContext = createContext<StlContextValue>({
  colorMode: DEFAULT_COLOR_MODE,
  isDark: false,
  setColorMode: () => undefined,
  toggleColorMode: () => undefined,
})

// BREAKPOINT DETECTION ////////////////////////////////////////////////////////

function getBreakpointConditions(width: number): Partial<Record<ConditionKeys, boolean>> {
  return {
    xs: width <= observerConditionsMap.xs,
    sm: width <= observerConditionsMap.sm,
    md: width <= observerConditionsMap.md,
    lg: width <= observerConditionsMap.lg,
    xl: width <= observerConditionsMap.xl,
    '!xs': width > observerConditionsMap.xs,
    '!sm': width > observerConditionsMap.sm,
    '!md': width > observerConditionsMap.md,
    '!lg': width > observerConditionsMap.lg,
    '!xl': width > observerConditionsMap.xl,
  }
}

// PROVIDER ////////////////////////////////////////////////////////////////////

interface StlProviderProps {
  children: ReactNode
  defaultColorMode?: ColorMode
  isDebugMode?: boolean
  themeOverrides?: Record<string, any>
  semanticColorOverrides?: Record<string, any>
  breakpointOverrides?: Record<string, number>
}

export function StlProvider({
  children,
  defaultColorMode = DEFAULT_COLOR_MODE,
  isDebugMode = false,
}: StlProviderProps) {
  const [colorMode, setColorMode] = useState<ColorMode>(defaultColorMode)
  const [windowWidth, setWindowWidth] = useState(() => Dimensions.get('window').width)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  const isDark = colorMode === 'dark'
  const isRTL = I18nManager.isRTL

  // Listen to dimension changes
  useEffect(() => {
    const handler = ({ window }: { window: ScaledSize }) => {
      setWindowWidth(window.width)
    }
    const sub = Dimensions.addEventListener('change', handler)
    return () => sub.remove()
  }, [])

  // Listen to system color scheme
  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setColorMode(colorScheme === 'dark' ? 'dark' : 'light')
    })
    return () => sub.remove()
  }, [])

  // Detect reduced motion preference
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setIsReducedMotion)
    const sub = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setIsReducedMotion,
    )
    return () => sub.remove()
  }, [])

  const toggleColorMode = useCallback(
    () => setColorMode((m) => (m === 'light' ? 'dark' : 'light')),
    [],
  )

  // Compute condition mask — single number encapsulating all boolean conditions
  const conditionMask = useMemo(() => {
    const breakpoints = getBreakpointConditions(windowWidth)
    return computeConditionMask({
      ...breakpoints,
      dark: isDark,
      light: !isDark,
      rtl: isRTL,
      ltr: !isRTL,
      lowMotion: isReducedMotion,
      '!lowMotion': !isReducedMotion,
      // RN is always touch
      touch: true,
      '!touch': false,
      pointer: false,
      '!pointer': true,
      tv: false,
      '!tv': true,
      hightContrast: false,
      '!hightContrast': true,
      lowData: false,
      '!lowData': true,
      debug: isDebugMode,
    })
  }, [windowWidth, isDark, isReducedMotion, isDebugMode])

  const stlValue = useMemo<StlContextValue>(
    () => ({
      colorMode,
      isDark,
      setColorMode,
      toggleColorMode,
    }),
    [colorMode, isDark, toggleColorMode],
  )

  return (
    <StlContext.Provider value={stlValue}>
      <ConditionMaskContext.Provider value={conditionMask}>
        {children}
      </ConditionMaskContext.Provider>
    </StlContext.Provider>
  )
}
