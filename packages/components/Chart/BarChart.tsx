import React from 'react'
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryStack,
  VictoryVoronoiContainer,
} from 'victory'
import { useChartContext } from './Chart'
import { ChartLegend } from './ChartLegend'
import type { ChartDataPoint, TooltipVariant } from './types'

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
  xAxisKey = 'x',
  showXAxis = true,
  showYAxis = false,
  showGrid = false,
  horizontal,
  stacked,
  grouped,
  showLabels,
  interactive,
  showLegend,
  barWidth,
  cornerRadius,
  activeBarIndex,
  customLabel,
}: BarChartProps) {
  const { config, resolvedColors, victoryTheme, dimensions } = useChartContext()
  const seriesKeys = Object.keys(config)

  // Resolve variant-driven flags
  const isHorizontal = horizontal ?? variant === 'horizontal'
  const isStacked =
    stacked ?? (variant === 'stacked' || variant === 'negative' || variant === 'mixed')
  const isGrouped = grouped ?? variant === 'grouped'
  const isInteractive = interactive ?? variant === 'interactive'
  const hasLabels = showLabels ?? (variant === 'label' || variant === 'custom-label')
  const hasLegend = showLegend ?? false
  const isActiveVariant = variant === 'active'

  // Corner radius for Victory SVG bars
  const corners = cornerRadius ? { top: cornerRadius } : undefined

  // Label component
  const labelComponent =
    variant === 'custom-label' && customLabel ? (
      React.createElement(customLabel)
    ) : hasLabels ? (
      <VictoryLabel dy={-5} />
    ) : undefined

  return (
    <>
      <VictoryChart
        width={dimensions.width}
        height={dimensions.height}
        horizontal={isHorizontal}
        theme={victoryTheme as any}
        containerComponent={isInteractive ? <VictoryVoronoiContainer /> : undefined}
        padding={victoryTheme.chart.padding}
        domainPadding={{ x: 20 }}
      >
        {/* Axes */}
        {showXAxis && <VictoryAxis />}
        {showYAxis && <VictoryAxis dependentAxis />}

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

        {/* Bars */}
        {isStacked ? (
          <VictoryStack>
            {seriesKeys.map((key) => (
              <VictoryBar
                key={key}
                data={data}
                x={xAxisKey}
                y={key}
                style={{ data: { fill: resolvedColors[key] } }}
                barWidth={barWidth}
                cornerRadius={corners}
                labels={hasLabels ? ({ datum }: any) => datum[key] : undefined}
                labelComponent={labelComponent}
              />
            ))}
          </VictoryStack>
        ) : isGrouped ? (
          <VictoryGroup offset={barWidth ? barWidth + 4 : 20}>
            {seriesKeys.map((key) => (
              <VictoryBar
                key={key}
                data={data}
                x={xAxisKey}
                y={key}
                style={{ data: { fill: resolvedColors[key] } }}
                barWidth={barWidth}
                cornerRadius={corners}
              />
            ))}
          </VictoryGroup>
        ) : (
          seriesKeys.map((key) => (
            <VictoryBar
              key={key}
              data={data}
              x={xAxisKey}
              y={key}
              style={{
                data: {
                  fill: resolvedColors[key],
                  opacity: isActiveVariant
                    ? ({ index }: any) => (index === activeBarIndex ? 1 : 0.3)
                    : undefined,
                },
              }}
              barWidth={barWidth}
              cornerRadius={corners}
              labels={hasLabels ? ({ datum }: any) => datum[key] : undefined}
              labelComponent={labelComponent}
            />
          ))
        )}
      </VictoryChart>

      {hasLegend && <ChartLegend config={config} />}
    </>
  )
}
