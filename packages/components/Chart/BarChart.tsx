import React from 'react'
import {
  CartesianChart,
  Bar,
  StackedBar,
  BarGroup,
  useChartPressState,
} from 'victory-native'
import type { ChartConfig, ChartDataPoint, TooltipVariant } from './types'
import { useChartContext } from './Chart'
import { ChartLegend } from './ChartLegend'

export type BarChartVariant =
  | 'default'
  | 'horizontal'
  | 'stacked'
  | 'grouped'
  | 'negative'
  | 'label'
  | 'mixed'
  | 'custom-label'
  | 'active'
  | 'interactive'

export interface BarChartProps {
  data: ChartDataPoint[]
  variant?: BarChartVariant
  config: ChartConfig
  xAxisKey?: string
  showXAxis?: boolean
  showYAxis?: boolean
  showGrid?: boolean
  horizontal?: boolean
  stacked?: boolean
  grouped?: boolean
  showLabels?: boolean
  showTooltip?: boolean
  interactive?: boolean
  showLegend?: boolean
  tooltipVariant?: TooltipVariant
  barWidth?: number
  cornerRadius?: number
  activeBarIndex?: number | null
  customLabel?: React.ComponentType<any>
}

export function BarChart({
  data,
  variant = 'default',
  config,
  xAxisKey = 'x',
  showXAxis,
  showYAxis,
  showGrid: _showGrid = false,
  horizontal: _horizontal,
  stacked,
  grouped,
  showLabels: _showLabels,
  showTooltip: _showTooltip,
  interactive,
  showLegend,
  tooltipVariant: _tooltipVariant,
  barWidth,
  cornerRadius,
  activeBarIndex,
  customLabel: _customLabel,
}: BarChartProps) {
  const { resolvedColors, victoryTheme } = useChartContext()
  const seriesKeys = Object.keys(config)

  // Resolve variant-driven flags
  const isStacked = stacked ?? (variant === 'stacked' || variant === 'negative' || variant === 'mixed')
  const isGrouped = grouped ?? variant === 'grouped'
  const isInteractive = interactive ?? variant === 'interactive'
  const hasLegend = showLegend ?? false
  const isActiveVariant = variant === 'active'

  // Resolve axis visibility
  const xAxisVisible = showXAxis ?? true
  const yAxisVisible = showYAxis ?? false

  // Axis label color from theme
  const axisLabelColor = victoryTheme.axis?.style?.tickLabels?.fill ?? '#888'

  // Build rounded corners config for victory-native v41
  const roundedCorners = cornerRadius != null
    ? { topLeft: cornerRadius, topRight: cornerRadius, bottomLeft: 0, bottomRight: 0 }
    : undefined

  // Interactive press state
  const { state: pressState } = useChartPressState({
    x: '' as string | number,
    y: seriesKeys.reduce(
      (acc, key) => ({ ...acc, [key]: 0 }),
      {} as Record<string, number>
    ),
  })

  // Series color array for StackedBar
  const colorArray = seriesKeys.map((key) => resolvedColors[key])

  // CartesianChart has strict generics — cast through any for dynamic key usage
  const ChartComponent = CartesianChart as React.ComponentType<any>

  return (
    <>
      <ChartComponent
        data={data}
        xKey={xAxisKey}
        yKeys={seriesKeys}
        padding={victoryTheme.chart?.padding}
        domainPadding={{ left: 16, right: 16 }}
        chartPressState={isInteractive ? pressState : undefined}
        xAxis={
          xAxisVisible
            ? {
                labelColor: axisLabelColor,
                lineColor: victoryTheme.axis?.style?.axis?.stroke,
              }
            : undefined
        }
        yAxis={
          yAxisVisible
            ? [
                {
                  labelColor: axisLabelColor,
                  lineColor: victoryTheme.axis?.style?.axis?.stroke,
                },
              ]
            : undefined
        }
      >
        {(args: any) => {
          const { points, chartBounds } = args

          // Stacked bars
          if (isStacked) {
            const allPoints = seriesKeys.map((key) => points[key])
            return (
              <StackedBar
                points={allPoints}
                chartBounds={chartBounds}
                colors={colorArray}
                barWidth={barWidth}
                barOptions={
                  isActiveVariant
                    ? ({ columnIndex }: any) => ({
                        opacity: columnIndex === activeBarIndex ? 1 : 0.25,
                        roundedCorners,
                      })
                    : roundedCorners
                      ? () => ({ roundedCorners })
                      : undefined
                }
              />
            )
          }

          // Grouped bars
          if (isGrouped) {
            return (
              <BarGroup
                chartBounds={chartBounds}
                barWidth={barWidth}
                roundedCorners={roundedCorners}
              >
                {seriesKeys.map((key) => (
                  <BarGroup.Bar
                    key={key}
                    points={points[key]}
                    color={resolvedColors[key]}
                  />
                ))}
              </BarGroup>
            )
          }

          // Default: render one Bar per series
          return (
            <>
              {seriesKeys.map((key) => (
                <Bar
                  key={key}
                  points={points[key]}
                  chartBounds={chartBounds}
                  color={resolvedColors[key]}
                  barWidth={barWidth}
                  roundedCorners={roundedCorners}
                  opacity={
                    isActiveVariant
                      ? 0.6
                      : undefined
                  }
                />
              ))}
            </>
          )
        }}
      </ChartComponent>

      {hasLegend && <ChartLegend config={config} />}
    </>
  )
}
