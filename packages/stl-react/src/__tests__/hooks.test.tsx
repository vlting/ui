import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'

// Mock @vlting/stl
jest.mock('@vlting/stl', () => {
  const conditionsMap: Record<string, any> = {
    ltr: true,
    rtl: true,
    light: 'COLOR_MODE === light',
    dark: 'COLOR_MODE === dark',
    debug: 'debugmode',
    xl: true,
    lg: true,
    md: true,
    sm: true,
    xs: true,
    '!xl': true,
    '!lg': true,
    '!md': true,
    '!sm': true,
    '!xs': true,
    highContrast: '(prefers-contrast: more)',
    lowMotion: '(prefers-reduced-motion)',
    lowData: '(prefers-reduced-data)',
    touch: '(hover: none)',
    pointer: '(hover: hover) and (pointer: fine)',
    tv: '(hover: hover) and (pointer: coarse)',
    '!highContrast': '(prefers-contrast: more)',
    '!lowMotion': '(prefers-reduced-motion)',
    '!lowData': '(prefers-reduced-data)',
    '!touch': '(hover: none)',
    '!pointer': '(hover: hover) and (pointer: fine)',
    '!tv': '(hover: hover) and (pointer: coarse)',
  }

  return {
    DEFAULT_COLOR_MODE: 'light',
    conditionsMap,
    conditionKeys: Object.keys(conditionsMap),
    mapConditions: (
      conditions: Record<string, boolean>,
      colorMode: string,
      debug = false,
      direction = 'ltr',
    ) => ({
      ...conditions,
      '!xl': !conditions.xl,
      '!lg': !conditions.lg,
      '!md': !conditions.md,
      '!sm': !conditions.sm,
      '!xs': !conditions.xs,
      ltr: direction === 'ltr',
      rtl: direction === 'rtl',
      '!highContrast': !conditions.highContrast,
      '!lowMotion': !conditions.lowMotion,
      '!lowData': !conditions.lowData,
      '!touch': !conditions.touch,
      '!pointer': !conditions.pointer,
      '!tv': !conditions.tv,
      light: colorMode === 'light',
      dark: colorMode === 'dark',
      debug,
    }),
    queryConditionsMap: {
      highContrast: '(prefers-contrast: more)',
      lowMotion: '(prefers-reduced-motion)',
      lowData: '(prefers-reduced-data)',
      touch: '(hover: none)',
      pointer: '(hover: hover) and (pointer: fine)',
      tv: '(hover: hover) and (pointer: coarse)',
    },
    observerConditionsMap: {
      xl: 1699,
      lg: 1399,
      md: 1099,
      sm: 799,
      xs: 599,
    },
    style: () => ({
      style: {},
      className: 'mock-class',
      debug: undefined,
    }),
    StyleManager: class {
      useClassName() {}
      setNewStyle() {}
      processCss() {}
      processVariantCss() {}
      processOverridesCss() {}
      compile() {
        return { style: {}, className: 'mock-class', debug: undefined }
      }
    },
    capitalizeFirstLetter: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
    getThemeOverrides: () => ({ overrides: {}, style: {} }),
    tokenValue: {
      animation: {},
      border: {},
      color: {},
      column: {},
      font: {},
      fontFamily: {},
      fontSize: {},
      fontWeight: {},
      lineHeight: {},
      outline: {},
      radius: {},
      row: {},
      shadow: {},
      size: {},
      space: {},
      textDecoration: {},
      typoSpace: {},
      typo: {},
      zIndex: {},
    },
  }
})

import { useColorMode } from '../hooks/useColorMode'
import { useConditions } from '../hooks/useConditions'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useRTL } from '../hooks/useRTL'
import { useTokens } from '../hooks/useTokens'
import { useTransition } from '../hooks/useTransition'
import { StlProvider } from '../providers/StlProvider'

function createWrapper(props: Record<string, any> = {}) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <StlProvider {...props}>{children}</StlProvider>
  }
}

describe('useColorMode', () => {
  it('returns colorMode, isDark, setColorMode, toggleColorMode', () => {
    const { result } = renderHook(() => useColorMode(), {
      wrapper: createWrapper(),
    })

    expect(result.current.colorMode).toBe('light')
    expect(result.current.isDark).toBe(false)
    expect(typeof result.current.setColorMode).toBe('function')
    expect(typeof result.current.toggleColorMode).toBe('function')
  })

  it('defaults to the specified defaultColorMode', () => {
    const { result } = renderHook(() => useColorMode(), {
      wrapper: createWrapper({ defaultColorMode: 'dark' }),
    })

    expect(result.current.colorMode).toBe('dark')
    expect(result.current.isDark).toBe(true)
  })

  it('toggleColorMode toggles between light and dark', () => {
    const { result } = renderHook(() => useColorMode(), {
      wrapper: createWrapper({ defaultColorMode: 'dark' }),
    })

    act(() => {
      result.current.toggleColorMode()
    })

    expect(result.current.colorMode).toBe('light')
    expect(result.current.isDark).toBe(false)
  })

  it('setColorMode sets a specific mode', () => {
    const { result } = renderHook(() => useColorMode(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.setColorMode('dark')
    })

    expect(result.current.colorMode).toBe('dark')
    expect(result.current.isDark).toBe(true)
  })
})

describe('useConditions', () => {
  it('returns a record of boolean conditions', () => {
    const { result } = renderHook(() => useConditions(), {
      wrapper: createWrapper(),
    })

    expect(typeof result.current).toBe('object')
    expect(typeof result.current.light).toBe('boolean')
    expect(typeof result.current.dark).toBe('boolean')
    expect(typeof result.current.ltr).toBe('boolean')
    expect(typeof result.current.rtl).toBe('boolean')
  })

  it('reflects light mode conditions by default', () => {
    const { result } = renderHook(() => useConditions(), {
      wrapper: createWrapper(),
    })

    expect(result.current.light).toBe(true)
    expect(result.current.dark).toBe(false)
  })
})

describe('useTransition', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('returns active, mounted, and style when visible', () => {
    const { result } = renderHook(() => useTransition(true))

    expect(result.current.mounted).toBe(true)
    expect(result.current.style).toBeDefined()
    expect(result.current.style).toHaveProperty('opacity')
    expect(result.current.style).toHaveProperty('transition')
  })

  it('returns mounted=false when not visible after exit duration', () => {
    const { result } = renderHook(() => useTransition(false, { exit: 100 }))

    act(() => {
      jest.advanceTimersByTime(150)
    })

    expect(result.current.mounted).toBe(false)
    expect(result.current.active).toBe(false)
  })

  it('uses custom enter/exit durations', () => {
    const { result } = renderHook(() => useTransition(true, { enter: 300, exit: 500 }))

    expect(result.current.style.transition).toContain('300ms')
  })

  afterEach(() => {
    jest.useRealTimers()
  })
})

describe('useMediaQuery', () => {
  it('returns default value initially', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)', false))

    expect(result.current).toBe(false)
  })

  it('returns mapped true/false values', () => {
    const { result } = renderHook(() =>
      useMediaQuery<string>('(prefers-color-scheme: dark)', 'light', 'dark', 'light'),
    )

    expect(result.current).toBe('light')
  })
})

describe('useTokens', () => {
  it('returns tokenValue from context', () => {
    const { result } = renderHook(() => useTokens(), {
      wrapper: createWrapper(),
    })

    expect(result.current.tokenValue).toBeDefined()
    expect(typeof result.current.tokenValue).toBe('object')
  })
})

describe('useRTL', () => {
  it('returns ltr value by default', () => {
    const { result } = renderHook(() => useRTL('rtl-value', 'ltr-value'), {
      wrapper: createWrapper(),
    })

    expect(result.current).toBe('ltr-value')
  })

  it('returns default false when no args given and direction is ltr', () => {
    const { result } = renderHook(() => useRTL(), {
      wrapper: createWrapper(),
    })

    expect(result.current).toBe(false)
  })
})
