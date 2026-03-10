import type React from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { ChartDataTable } from './ChartDataTable'
import { createChartTheme } from './theme'
import type { ChartConfig } from './types'
import { getSeriesColors } from './utils'

// -- Resolve CSS custom properties to actual values --

function useResolvedTheme() {
  const [tokens, setTokens] = useState<Record<string, string>>({})
  const ref = useRef<HTMLDivElement>(null)

  const resolve = useCallback(() => {
    const el = ref.current
    if (!el) return
    const cs = getComputedStyle(el)
    setTokens({
      background:
        cs.getPropertyValue('--stl-background').trim() ||
        cs.getPropertyValue('--background').trim() ||
        '#ffffff',
      color:
        cs.getPropertyValue('--stl-foreground').trim() ||
        cs.getPropertyValue('--color').trim() ||
        '#111111',
      color4:
        cs.getPropertyValue('--stl-surface2').trim() ||
        cs.getPropertyValue('--color4').trim() ||
        '#ededed',
      color8:
        cs.getPropertyValue('--stl-color8').trim() ||
        cs.getPropertyValue('--color8').trim() ||
        '#6a6a6a',
      borderColor:
        cs.getPropertyValue('--stl-border').trim() ||
        cs.getPropertyValue('--borderColor').trim() ||
        '#e8e8e8',
    })
  }, [])

  useEffect(() => {
    resolve()
  }, [resolve])

  return { ref, tokens }
}

// -- Chart Context --

interface ChartContextValue {
  config: ChartConfig
  resolvedColors: Record<string, string>
  victoryTheme: ReturnType<typeof createChartTheme>
  dimensions: { width: number; height: number }
  reducedMotion: boolean
}

const ChartContext = createContext<ChartContextValue | null>(null)

export function useChartContext(): ChartContextValue {
  const ctx = useContext(ChartContext)
  if (!ctx) {
    throw new Error('useChartContext must be used within a <Chart> component')
  }
  return ctx
}

// -- Chart Component --

export interface ChartContainerProps {
  config: ChartConfig
  children: React.ReactNode
  accessibilityLabel: string
  width?: number
  height?: number
  data?: Record<string, unknown>[]
  xAxisKey?: string
}

const DEFAULT_HEIGHT = 350

export function Chart({
  config,
  children,
  accessibilityLabel,
  width: explicitWidth,
  height: explicitHeight,
  data,
  xAxisKey,
}: ChartContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [measuredWidth, setMeasuredWidth] = useState(0)
  const { ref: themeRef, tokens } = useResolvedTheme()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (explicitWidth != null) return

    const el = containerRef.current
    if (!el) return

    setMeasuredWidth(el.clientWidth)

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setMeasuredWidth(entry.contentRect.width)
        }
      })
      observer.observe(el)
      return () => observer.disconnect()
    }
  }, [explicitWidth])

  const resolvedTokens = useMemo(
    () => ({
      background: tokens.background || 'var(--stl-background, #ffffff)',
      color: tokens.color || 'var(--stl-foreground, #111111)',
      colorSubtitle: tokens.color8 || 'var(--stl-color8, #6a6a6a)',
      borderColor: tokens.borderColor || 'var(--stl-border, #e8e8e8)',
      color4: tokens.color4 || 'var(--stl-surface2, #ededed)',
    }),
    [tokens],
  )

  const victoryTheme = useMemo(() => createChartTheme(resolvedTokens), [resolvedTokens])

  const resolvedColors = useMemo(() => getSeriesColors(config, tokens), [config, tokens])

  const finalWidth = explicitWidth ?? measuredWidth
  const finalHeight = explicitHeight ?? DEFAULT_HEIGHT

  const contextValue = useMemo<ChartContextValue>(
    () => ({
      config,
      resolvedColors,
      victoryTheme,
      dimensions: { width: finalWidth, height: finalHeight },
      reducedMotion,
    }),
    [config, resolvedColors, victoryTheme, finalWidth, finalHeight, reducedMotion],
  )

  return (
    <div
      ref={(el) => {
        ;(containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el
        ;(themeRef as React.MutableRefObject<HTMLDivElement | null>).current = el
      }}
      role="img"
      aria-label={accessibilityLabel}
      style={{
        width: explicitWidth != null ? explicitWidth : '100%',
        height: finalHeight,
        position: 'relative',
      }}
    >
      <ChartContext.Provider value={contextValue}>
        {finalWidth > 0 ? children : null}
      </ChartContext.Provider>
      {data && <ChartDataTable data={data} config={config} xAxisKey={xAxisKey} />}
    </div>
  )
}
