import React from 'react'
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
  VictoryVoronoiContainer,
} from 'victory'
import { useChartContext } from './Chart'
import { ChartLegend } from './ChartLegend'
import type { ChartDataPoint, TooltipVariant } from './types'

export type LineChartVariant =
  | 'default'
  | 'dots'
  | 'multiple'
  | 'labels'
  | 'stepped'
  | 'custom-dots'
  | 'interactive'
  | 'linear'
  | 'legend'
  | 'icons'

export interface LineChartProps {
  /** Chart data points */
  data: ChartDataPoint[]
  /** Display variant */
  variant?: LineChartVariant
  /** Key in data to use for X axis values */
  xAxisKey?: string
  /** Show X axis */
  showXAxis?: boolean
  /** Show Y axis */
  showYAxis?: boolean
  /** Show grid lines */
  showGrid?: boolean
  /** Show data point dots */
  showDots?: boolean
  /** Show value labels on data points */
  showLabels?: boolean
  /** Enable interactive hover behavior */
  interactive?: boolean
  /** Show legend below chart */
  showLegend?: boolean
  /** Tooltip display variant */
  tooltipVariant?: TooltipVariant
  /** Line interpolation curve type */
  curveType?: 'natural' | 'linear' | 'step'
  /** Line stroke width (default: 2) */
  strokeWidth?: number
  /** Dot size when showing dots (default: 4) */
  dotSize?: number
  /** Custom dot component for scatter points */
  customDot?: React.ComponentType<any>
}

export function LineChart({
  data,
  variant = 'default',
  xAxisKey = 'x',
  showXAxis = false,
  showYAxis = false,
  showGrid = false,
  showDots = false,
  showLabels = false,
  interactive = false,
  showLegend = false,
  curveType,
  strokeWidth = 2,
  dotSize = 4,
  customDot,
}: LineChartProps) {
  const { config, resolvedColors, victoryTheme, dimensions } = useChartContext()
  const seriesKeys = Object.keys(config)

  // Resolve variant-specific overrides
  const shouldShowDots = showDots || variant === 'dots' || variant === 'custom-dots'
  const shouldShowLabels = showLabels || variant === 'labels'
  const shouldShowLegend = showLegend || variant === 'legend'
  const isInteractive = interactive || variant === 'interactive'
  const shouldShowXAxis = showXAxis || variant === 'labels'
  const shouldShowYAxis = showYAxis

  // Resolve interpolation
  type Interpolation = 'natural' | 'linear' | 'stepAfter'
  let interpolation: Interpolation = (
    curveType === 'step' ? 'stepAfter' : (curveType ?? 'natural')
  ) as Interpolation
  if (variant === 'stepped') interpolation = 'stepAfter'
  if (variant === 'linear') interpolation = 'linear'

  return (
    <>
      <VictoryChart
        width={dimensions.width}
        height={dimensions.height}
        theme={victoryTheme as any}
        containerComponent={isInteractive ? <VictoryVoronoiContainer /> : undefined}
        padding={victoryTheme.chart.padding}
      >
        {/* Axes */}
        {shouldShowXAxis && <VictoryAxis />}
        {shouldShowYAxis && <VictoryAxis dependentAxis />}

        {/* Grid lines */}
        {showGrid && (
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: 'transparent' },
              grid: {
                stroke: victoryTheme.axis.style.grid.stroke,
                strokeOpacity: victoryTheme.axis.style.grid.strokeOpacity,
              },
              tickLabels: { fill: 'transparent' },
            }}
          />
        )}

        {/* Lines — one per series */}
        {seriesKeys.map((key) => (
          <VictoryLine
            key={key}
            data={data}
            x={xAxisKey}
            y={key}
            interpolation={interpolation}
            style={{
              data: {
                stroke: resolvedColors[key],
                strokeWidth,
              },
            }}
            labels={shouldShowLabels ? ({ datum }: any) => datum[key] : undefined}
            labelComponent={shouldShowLabels ? <VictoryLabel dy={-10} /> : undefined}
          />
        ))}

        {/* Dots (scatter) — rendered after lines so they appear on top */}
        {shouldShowDots &&
          seriesKeys.map((key) => (
            <VictoryScatter
              key={`scatter-${key}`}
              data={data}
              x={xAxisKey}
              y={key}
              size={dotSize}
              style={{
                data: {
                  fill: resolvedColors[key],
                },
              }}
              dataComponent={
                variant === 'custom-dots' && customDot
                  ? React.createElement(customDot)
                  : undefined
              }
            />
          ))}
      </VictoryChart>

      {shouldShowLegend && <ChartLegend config={config} />}
    </>
  )
}
