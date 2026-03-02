import React, { createContext, useContext, useRef, useState, useEffect, useMemo } from 'react'
import { useTheme } from 'tamagui'
import type { ChartConfig } from './types'
import { createChartTheme } from './theme'
import { getSeriesColors } from './utils'

// -- Chart Context --

interface ChartContextValue {
  config: ChartConfig
  resolvedColors: Record<string, string>
  victoryTheme: ReturnType<typeof createChartTheme>
  dimensions: { width: number; height: number }
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
  /** Chart configuration mapping series keys to labels/colors */
  config: ChartConfig
  /** Chart content (chart type components) */
  children: React.ReactNode
  /** Accessibility label describing the chart */
  accessibilityLabel: string
  /** Explicit width in pixels (overrides responsive sizing) */
  width?: number
  /** Explicit height in pixels (overrides responsive sizing, default: 350) */
  height?: number
}

const DEFAULT_HEIGHT = 350

export function Chart({
  config,
  children,
  accessibilityLabel,
  width: explicitWidth,
  height: explicitHeight,
}: ChartContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [measuredWidth, setMeasuredWidth] = useState(0)
  const theme = useTheme()

  // Responsive sizing — only measure if no explicit width
  useEffect(() => {
    if (explicitWidth != null) return

    const el = containerRef.current
    if (!el) return

    // Initial measurement
    setMeasuredWidth(el.clientWidth)

    // Observe resize
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

  // Resolve theme tokens to hex values for chart theming
  const resolvedTokens = useMemo(() => ({
    background: theme.background?.val || '#ffffff',
    color: theme.color?.val || '#111111',
    colorSubtitle: (theme as Record<string, { val?: string }>).color8?.val || '#6a6a6a',
    borderColor: theme.borderColor?.val || '#e8e8e8',
    color4: (theme as Record<string, { val?: string }>).color4?.val || '#ededed',
  }), [theme])

  const victoryTheme = useMemo(
    () => createChartTheme(resolvedTokens),
    [resolvedTokens]
  )

  const resolvedColors = useMemo(
    () => {
      // Build a flat lookup from theme for token resolution
      const themeFlat: Record<string, string> = {}
      for (const [key, val] of Object.entries(theme)) {
        if (val && typeof val === 'object' && 'val' in val && typeof val.val === 'string') {
          themeFlat[key] = val.val
        }
      }
      return getSeriesColors(config, themeFlat)
    },
    [config, theme]
  )

  const finalWidth = explicitWidth ?? measuredWidth
  const finalHeight = explicitHeight ?? DEFAULT_HEIGHT

  const contextValue = useMemo<ChartContextValue>(
    () => ({
      config,
      resolvedColors,
      victoryTheme,
      dimensions: { width: finalWidth, height: finalHeight },
    }),
    [config, resolvedColors, victoryTheme, finalWidth, finalHeight]
  )

  return (
    <div
      ref={containerRef}
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
    </div>
  )
}
