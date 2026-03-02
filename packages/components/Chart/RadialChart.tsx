import React, { useMemo } from 'react'
import { Svg, Path, G, Text as SvgText } from 'react-native-svg'
import { useChartContext } from './Chart'
import { ChartLegend } from './ChartLegend'
import type { ChartDataPoint, TooltipVariant } from './types'

/** Radial chart display variants */
export type RadialChartVariant = 'default' | 'grid' | 'label' | 'stacked' | 'text' | 'shape'

export interface RadialChartProps {
  data: ChartDataPoint[]
  variant?: RadialChartVariant
  xAxisKey?: string
  showLabels?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  showLegend?: boolean
  tooltipVariant?: TooltipVariant
  innerRadius?: number
  outerRadius?: number
  startAngle?: number
  endAngle?: number
  barWidth?: number
  barGap?: number
  maxValue?: number
  showText?: boolean
  centerText?: string
  customShape?: React.ComponentType<any>
}

// -- Geometry helpers --

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number,
): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  }
}

function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startDeg: number,
  endDeg: number,
): string {
  const start = polarToCartesian(cx, cy, radius, endDeg)
  const end = polarToCartesian(cx, cy, radius, startDeg)
  const sweep = endDeg - startDeg
  const largeArc = sweep > 180 ? 1 : 0

  return [
    `M ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}`,
  ].join(' ')
}

// -- Component --

export function RadialChart({
  data,
  variant = 'default',
  xAxisKey: _xAxisKey = 'x',
  showLabels: showLabelsProp,
  showGrid: showGridProp,
  showTooltip: _showTooltip,
  showLegend: showLegendProp,
  tooltipVariant: _tooltipVariant,
  innerRadius: _innerRadiusProp,
  outerRadius: outerRadiusProp,
  startAngle = 0,
  endAngle = 360,
  barWidth: barWidthProp,
  barGap = 4,
  maxValue: maxValueProp,
  showText: showTextProp,
  centerText,
  customShape: _customShape,
}: RadialChartProps) {
  const { config, resolvedColors, victoryTheme, dimensions } = useChartContext()
  const seriesKeys = Object.keys(config)

  // Resolve variant flags
  const hasGrid = showGridProp ?? variant === 'grid'
  const hasLabels = showLabelsProp ?? variant === 'label'
  const hasLegend = showLegendProp ?? false
  const hasText = showTextProp ?? ['text'].includes(variant)
  const isStacked = variant === 'stacked'
  const isShape = variant === 'shape'

  // Layout
  const { width, height } = dimensions
  const legendSpace = hasLegend ? 40 : 0
  const cx = width / 2
  const cy = (height - legendSpace) / 2
  const maxR = Math.min(width, height - legendSpace) / 2 - 20
  const outerR = outerRadiusProp ?? maxR
  const barWidth = barWidthProp ?? 20
  // Determine max value
  const maxVal = useMemo(() => {
    if (maxValueProp != null) return maxValueProp
    let m = 0
    for (const d of data) {
      for (const k of seriesKeys) {
        const v = Number(d[k])
        if (!Number.isNaN(v) && v > m) m = v
      }
    }
    return m || 1
  }, [data, seriesKeys, maxValueProp])

  // Colors from theme
  const trackColor = victoryTheme.axis.style.grid.stroke || '#e0e0e0'
  const labelColor = victoryTheme.axis.style.tickLabels.fill || '#666'

  // Compute total for stacked variant
  const stackTotal = useMemo(() => {
    if (!isStacked) return 0
    let total = 0
    for (const d of data) {
      for (const k of seriesKeys) {
        total += Number(d[k]) || 0
      }
    }
    return total || 1
  }, [isStacked, data, seriesKeys])

  // -- Render arcs --
  const arcElements = useMemo(() => {
    const elements: React.ReactNode[] = []

    if (isStacked) {
      // Stacked: arcs end-to-end in a single ring
      const ringRadius = outerR - barWidth / 2
      let currentAngle = startAngle

      for (const d of data) {
        for (const key of seriesKeys) {
          const val = Number(d[key]) || 0
          const arcSpan = (val / stackTotal) * (endAngle - startAngle)
          const arcEnd = currentAngle + arcSpan
          const color = resolvedColors[key] || '#999'

          if (hasGrid) {
            elements.push(
              <Path
                key={`track-stacked-${key}`}
                d={describeArc(cx, cy, ringRadius, startAngle, endAngle)}
                fill="none"
                stroke={trackColor}
                strokeWidth={barWidth}
                strokeOpacity={0.2}
                strokeLinecap="butt"
              />,
            )
          }

          elements.push(
            <Path
              key={`arc-stacked-${key}-${currentAngle}`}
              d={describeArc(cx, cy, ringRadius, currentAngle, arcEnd)}
              fill="none"
              stroke={color}
              strokeWidth={barWidth}
              strokeLinecap={isShape ? 'round' : 'butt'}
            />,
          )

          currentAngle = arcEnd
        }
      }
    } else {
      // Concentric: each series gets its own ring
      seriesKeys.forEach((key, i) => {
        const ringRadius = outerR - i * (barWidth + barGap) - barWidth / 2
        if (ringRadius <= 0) return

        // Sum values for this series across data points
        let seriesVal = 0
        for (const d of data) {
          seriesVal += Number(d[key]) || 0
        }
        const arcSpan = (seriesVal / maxVal) * (endAngle - startAngle)
        const arcEnd = startAngle + arcSpan
        const color = resolvedColors[key] || '#999'

        // Background track
        if (hasGrid) {
          elements.push(
            <Path
              key={`track-${key}`}
              d={describeArc(cx, cy, ringRadius, startAngle, endAngle)}
              fill="none"
              stroke={trackColor}
              strokeWidth={barWidth}
              strokeOpacity={0.2}
              strokeLinecap="butt"
            />,
          )
        }

        // Data arc
        elements.push(
          <Path
            key={`arc-${key}`}
            d={describeArc(cx, cy, ringRadius, startAngle, arcEnd)}
            fill="none"
            stroke={color}
            strokeWidth={barWidth}
            strokeLinecap={isShape ? 'round' : 'butt'}
          />,
        )

        // Label at arc end
        if (hasLabels) {
          const labelPos = polarToCartesian(cx, cy, ringRadius, arcEnd)
          elements.push(
            <SvgText
              key={`label-${key}`}
              x={labelPos.x}
              y={labelPos.y - barWidth / 2 - 4}
              textAnchor="middle"
              fill={labelColor}
              fontSize={10}
            >
              {Math.round(seriesVal)}
            </SvgText>,
          )
        }
      })
    }

    return elements
  }, [
    isStacked,
    seriesKeys,
    data,
    outerR,
    barWidth,
    barGap,
    maxVal,
    startAngle,
    endAngle,
    cx,
    cy,
    resolvedColors,
    hasGrid,
    hasLabels,
    trackColor,
    labelColor,
    stackTotal,
    isShape,
  ])

  // -- Center text --
  const centerTextElement = useMemo(() => {
    if (!hasText) return null
    let text = centerText
    if (!text) {
      // Default: sum of first series or total
      let total = 0
      for (const d of data) {
        for (const k of seriesKeys) {
          total += Number(d[k]) || 0
        }
      }
      text = String(Math.round(total))
    }

    return (
      <G>
        <SvgText
          x={cx}
          y={cy}
          textAnchor="middle"
          alignmentBaseline="central"
          fill={labelColor}
          fontSize={24}
          fontWeight="bold"
        >
          {text}
        </SvgText>
      </G>
    )
  }, [hasText, centerText, data, seriesKeys, cx, cy, labelColor])

  const svgHeight = height - legendSpace

  return (
    <>
      <Svg width={width} height={svgHeight}>
        <G>{arcElements}</G>
        {centerTextElement}
      </Svg>
      {hasLegend && <ChartLegend config={config} />}
    </>
  )
}
