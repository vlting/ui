import React, { useMemo, useCallback, useState } from 'react'
import Svg, { Path, G, Text as SvgText, Line } from 'react-native-svg'
import type { ChartConfig, ChartDataPoint, TooltipVariant } from './types'
import { useChartContext } from './Chart'
import { ChartLegend } from './ChartLegend'
import { ChartTooltip } from './ChartTooltip'

export type PieChartVariant =
  | 'default'
  | 'donut'
  | 'donut-text'
  | 'donut-active'
  | 'label'
  | 'custom-label'
  | 'label-list'
  | 'legend'
  | 'separator'
  | 'interactive'
  | 'stacked'

export interface PieChartProps {
  data: ChartDataPoint[]
  variant?: PieChartVariant
  config: ChartConfig
  xAxisKey?: string
  showLabels?: boolean
  showTooltip?: boolean
  interactive?: boolean
  showLegend?: boolean
  tooltipVariant?: TooltipVariant
  innerRadius?: number
  outerRadius?: number
  padAngle?: number
  cornerRadius?: number
  startAngle?: number
  endAngle?: number
  activeIndex?: number | null
  customLabel?: React.ComponentType<any>
  labelPosition?: 'inside' | 'outside'
  /** Text shown in the center of donut-text variant */
  centerText?: string
}

// -- Pie math utilities --

interface SliceData {
  key: string
  value: number
  percentage: number
  startAngle: number
  endAngle: number
  color: string
  label: string
}

function getSliceData(
  data: ChartDataPoint[],
  xAxisKey: string,
  config: ChartConfig,
  resolvedColors: Record<string, string>,
  startAngle: number,
  endAngle: number,
  padAngle: number,
): SliceData[] {
  const seriesKeys = Object.keys(config)

  // For pie charts, each data point becomes a slice
  // We use the first series key's value, or the 'y' field
  const slices: Array<{ key: string; value: number; label: string; color: string }> = []

  if (seriesKeys.length === 1) {
    // Single series: each data point is a slice
    const seriesKey = seriesKeys[0]
    for (const point of data) {
      const key = String(point[xAxisKey] ?? point.x)
      const value = typeof point[seriesKey] === 'number'
        ? (point[seriesKey] as number)
        : typeof point.y === 'number' ? point.y : 0
      slices.push({
        key,
        value: Math.max(0, value),
        label: key,
        color: resolvedColors[key] || resolvedColors[seriesKey] || '#888888',
      })
    }
  } else {
    // Multiple series: each series key is a slice (sum across data points)
    for (const seriesKey of seriesKeys) {
      let total = 0
      for (const point of data) {
        const val = typeof point[seriesKey] === 'number' ? (point[seriesKey] as number) : 0
        total += Math.max(0, val)
      }
      slices.push({
        key: seriesKey,
        value: total,
        label: config[seriesKey]?.label ?? seriesKey,
        color: resolvedColors[seriesKey] || '#888888',
      })
    }
  }

  const grandTotal = slices.reduce((sum, s) => sum + s.value, 0)
  if (grandTotal === 0) return []

  const totalAngle = endAngle - startAngle
  const totalPad = padAngle * slices.length
  const availableAngle = totalAngle - totalPad

  let currentAngle = startAngle
  return slices.map((slice) => {
    const percentage = slice.value / grandTotal
    const sliceAngle = percentage * availableAngle
    const s: SliceData = {
      key: slice.key,
      value: slice.value,
      percentage,
      startAngle: currentAngle,
      endAngle: currentAngle + sliceAngle,
      color: slice.color,
      label: slice.label,
    }
    currentAngle += sliceAngle + padAngle
    return s
  })
}

function describeArc(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startAngle: number,
  endAngle: number,
): string {
  // SVG arc uses clockwise convention, angles in radians from 12 o'clock position
  // We offset by -PI/2 so 0 is at the top
  const offset = -Math.PI / 2

  const outerStartX = cx + outerR * Math.cos(startAngle + offset)
  const outerStartY = cy + outerR * Math.sin(startAngle + offset)
  const outerEndX = cx + outerR * Math.cos(endAngle + offset)
  const outerEndY = cy + outerR * Math.sin(endAngle + offset)

  const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0

  if (innerR <= 0) {
    // Full pie slice (wedge)
    return [
      `M ${cx} ${cy}`,
      `L ${outerStartX} ${outerStartY}`,
      `A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}`,
      'Z',
    ].join(' ')
  }

  // Donut slice (annular sector)
  const innerStartX = cx + innerR * Math.cos(startAngle + offset)
  const innerStartY = cy + innerR * Math.sin(startAngle + offset)
  const innerEndX = cx + innerR * Math.cos(endAngle + offset)
  const innerEndY = cy + innerR * Math.sin(endAngle + offset)

  return [
    `M ${outerStartX} ${outerStartY}`,
    `A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}`,
    `L ${innerEndX} ${innerEndY}`,
    `A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`,
    'Z',
  ].join(' ')
}

function midAngle(startAngle: number, endAngle: number): number {
  return (startAngle + endAngle) / 2
}

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angle: number,
): { x: number; y: number } {
  const offset = -Math.PI / 2
  return {
    x: cx + radius * Math.cos(angle + offset),
    y: cy + radius * Math.sin(angle + offset),
  }
}

// -- Component --

export function PieChart({
  data,
  variant = 'default',
  config,
  xAxisKey = 'x',
  showLabels,
  showTooltip: _showTooltip,
  interactive,
  showLegend,
  tooltipVariant,
  innerRadius: innerRadiusProp,
  outerRadius: outerRadiusProp,
  padAngle: padAngleProp,
  cornerRadius: _cornerRadius,
  startAngle: startAngleProp = 0,
  endAngle: endAngleProp = Math.PI * 2,
  activeIndex: activeIndexProp,
  customLabel: CustomLabel,
  labelPosition,
  centerText,
}: PieChartProps) {
  const { resolvedColors, victoryTheme, dimensions, config: _ctxConfig } = useChartContext()
  const [internalActiveIndex, setInternalActiveIndex] = useState<number | null>(null)

  // Resolve variant-driven flags
  const isDonut =
    variant === 'donut' ||
    variant === 'donut-text' ||
    variant === 'donut-active'
  const isInteractive = interactive || variant === 'interactive' || variant === 'donut-active'
  const hasLegend = showLegend || variant === 'legend'
  const hasLabels =
    showLabels ||
    variant === 'label' ||
    variant === 'custom-label' ||
    variant === 'label-list'
  const hasSeparator = variant === 'separator'
  const isStacked = variant === 'stacked'

  const activeIndex = activeIndexProp ?? internalActiveIndex

  const padAngle = padAngleProp ?? (hasSeparator ? 0.04 : 0)

  const legendHeight = hasLegend ? 32 : 0
  const chartWidth = dimensions.width
  const chartHeight = dimensions.height - legendHeight

  const cx = chartWidth / 2
  const cy = chartHeight / 2
  const maxRadius = Math.min(chartWidth, chartHeight) / 2 - 20

  const outerRadius = outerRadiusProp ?? maxRadius
  const defaultInnerRadius = isDonut ? outerRadius * 0.6 : 0
  const innerRadius = innerRadiusProp ?? defaultInnerRadius

  const labelColor = victoryTheme.axis.style.tickLabels.fill
  const labelFontSize = victoryTheme.axis.style.tickLabels.fontSize

  // Compute slices
  const slices = useMemo(
    () =>
      getSliceData(
        data,
        xAxisKey,
        config,
        resolvedColors,
        startAngleProp,
        endAngleProp,
        padAngle,
      ),
    [data, xAxisKey, config, resolvedColors, startAngleProp, endAngleProp, padAngle],
  )

  // Stacked rings: each series key gets its own ring
  const stackedRings = useMemo(() => {
    if (!isStacked) return null
    const seriesKeys = Object.keys(config)
    if (seriesKeys.length <= 1) return null

    const ringWidth = outerRadius / (seriesKeys.length + 1)
    return seriesKeys.map((seriesKey, ringIndex) => {
      // Build per-ring data: each data point is a slice in this ring
      const ringOuterR = outerRadius - ringIndex * ringWidth
      const ringInnerR = ringOuterR - ringWidth + 4 // 4px gap between rings

      const ringSlices: SliceData[] = []
      let total = 0
      const values: Array<{ key: string; value: number }> = []

      for (const point of data) {
        const val = typeof point[seriesKey] === 'number' ? (point[seriesKey] as number) : 0
        const key = String(point[xAxisKey] ?? point.x)
        values.push({ key, value: Math.max(0, val) })
        total += Math.max(0, val)
      }

      if (total === 0) return { seriesKey, outerR: ringOuterR, innerR: ringInnerR, slices: [] }

      let currentAngle = startAngleProp
      const totalAngle = endAngleProp - startAngleProp
      for (const v of values) {
        const pct = v.value / total
        const sliceAngle = pct * totalAngle
        ringSlices.push({
          key: v.key,
          value: v.value,
          percentage: pct,
          startAngle: currentAngle,
          endAngle: currentAngle + sliceAngle,
          color: resolvedColors[seriesKey] || '#888888',
          label: v.key,
        })
        currentAngle += sliceAngle
      }

      return { seriesKey, outerR: ringOuterR, innerR: Math.max(0, ringInnerR), slices: ringSlices }
    })
  }, [isStacked, config, data, xAxisKey, resolvedColors, outerRadius, startAngleProp, endAngleProp])

  const handlePress = useCallback(
    (index: number) => {
      if (!isInteractive) return
      setInternalActiveIndex((prev) => (prev === index ? null : index))
    },
    [isInteractive],
  )

  // Tooltip data for the active slice
  const tooltipPayload = useMemo(() => {
    if (activeIndex == null || !slices[activeIndex]) return undefined
    const slice = slices[activeIndex]
    return [
      {
        name: slice.label,
        value: slice.value,
        color: slice.color,
      },
    ]
  }, [activeIndex, slices])

  // Total for center text
  const totalValue = useMemo(
    () => slices.reduce((sum, s) => sum + s.value, 0),
    [slices],
  )

  return (
    <>
      <Svg width={chartWidth} height={chartHeight}>
        {isStacked && stackedRings ? (
          // Stacked variant: nested rings
          <>
            {stackedRings.map((ring) =>
              ring.slices.map((slice, si) => (
                <Path
                  key={`ring-${ring.seriesKey}-${si}`}
                  d={describeArc(cx, cy, ring.outerR, ring.innerR, slice.startAngle, slice.endAngle)}
                  fill={slice.color}
                  fillOpacity={0.8 - si * 0.05}
                />
              )),
            )}
          </>
        ) : (
          // Standard pie/donut slices
          <G>
            {slices.map((slice, i) => {
              const isActive = activeIndex === i
              const expandRadius = isActive && variant === 'donut-active' ? 10 : 0
              const sliceOuterR = outerRadius + expandRadius
              const sliceInnerR = innerRadius > 0 ? innerRadius + expandRadius * 0.5 : 0

              return (
                <Path
                  key={`slice-${slice.key}-${i}`}
                  d={describeArc(cx, cy, sliceOuterR, sliceInnerR, slice.startAngle, slice.endAngle)}
                  fill={slice.color}
                  fillOpacity={isInteractive && activeIndex != null && !isActive ? 0.5 : 1}
                  stroke={hasSeparator ? victoryTheme.chart.padding ? '#ffffff' : '#ffffff' : 'none'}
                  strokeWidth={hasSeparator ? 2 : 0}
                  onPress={() => handlePress(i)}
                />
              )
            })}
          </G>
        )}

        {/* Center text for donut-text variant */}
        {variant === 'donut-text' && (
          <G>
            <SvgText
              x={cx}
              y={cy - 6}
              textAnchor="middle"
              fill={labelColor}
              fontSize={labelFontSize * 2}
              fontWeight="bold"
            >
              {centerText ?? String(totalValue)}
            </SvgText>
            <SvgText
              x={cx}
              y={cy + labelFontSize + 2}
              textAnchor="middle"
              fill={labelColor}
              fontSize={labelFontSize}
              fillOpacity={0.6}
            >
              Total
            </SvgText>
          </G>
        )}

        {/* Inside labels */}
        {hasLabels && (variant === 'label' || labelPosition === 'inside') && !CustomLabel && (
          <G>
            {slices.map((slice, i) => {
              const mid = midAngle(slice.startAngle, slice.endAngle)
              const labelR = innerRadius > 0
                ? (outerRadius + innerRadius) / 2
                : outerRadius * 0.65
              const pos = polarToCartesian(cx, cy, labelR, mid)
              return (
                <SvgText
                  key={`label-${i}`}
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  alignmentBaseline="central"
                  fill="#ffffff"
                  fontSize={labelFontSize}
                  fontWeight="500"
                >
                  {`${Math.round(slice.percentage * 100)}%`}
                </SvgText>
              )
            })}
          </G>
        )}

        {/* Custom labels */}
        {hasLabels && variant === 'custom-label' && CustomLabel && (
          <G>
            {slices.map((slice, i) => {
              const mid = midAngle(slice.startAngle, slice.endAngle)
              const labelR = innerRadius > 0
                ? (outerRadius + innerRadius) / 2
                : outerRadius * 0.65
              const pos = polarToCartesian(cx, cy, labelR, mid)
              return (
                <G key={`custom-label-${i}`} x={pos.x} y={pos.y}>
                  <CustomLabel
                    slice={slice}
                    index={i}
                    cx={pos.x}
                    cy={pos.y}
                  />
                </G>
              )
            })}
          </G>
        )}

        {/* Outside labels with connecting lines (label-list) */}
        {variant === 'label-list' && (
          <G>
            {slices.map((slice, i) => {
              const mid = midAngle(slice.startAngle, slice.endAngle)
              // Point on outer edge of slice
              const innerPoint = polarToCartesian(cx, cy, outerRadius, mid)
              // Point slightly outside the slice
              const outerPoint = polarToCartesian(cx, cy, outerRadius + 16, mid)
              // Label anchor point further out
              const labelPoint = polarToCartesian(cx, cy, outerRadius + 28, mid)
              // Determine text anchor based on which side of the pie
              const offset = -Math.PI / 2
              const anchorX = cx + Math.cos(mid + offset)
              const textAnchor = anchorX >= cx ? 'start' : 'end'

              return (
                <G key={`label-list-${i}`}>
                  <Line
                    x1={innerPoint.x}
                    y1={innerPoint.y}
                    x2={outerPoint.x}
                    y2={outerPoint.y}
                    stroke={labelColor}
                    strokeWidth={1}
                    strokeOpacity={0.5}
                  />
                  <SvgText
                    x={labelPoint.x}
                    y={labelPoint.y}
                    textAnchor={textAnchor}
                    alignmentBaseline="central"
                    fill={labelColor}
                    fontSize={labelFontSize}
                  >
                    {`${slice.label} (${Math.round(slice.percentage * 100)}%)`}
                  </SvgText>
                </G>
              )
            })}
          </G>
        )}
      </Svg>

      {/* Tooltip */}
      {isInteractive && activeIndex != null && tooltipPayload && (
        <ChartTooltip
          variant={tooltipVariant ?? 'default'}
          active
          payload={tooltipPayload}
          label={slices[activeIndex]?.label}
        />
      )}

      {hasLegend && <ChartLegend config={config} />}
    </>
  )
}
