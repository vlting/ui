import React, { useMemo, useState, useCallback } from 'react'
import { Svg, Path, G, Circle, Line, Text as SvgText } from 'react-native-svg'
import { useChartContext } from './Chart'
import { ChartLegend } from './ChartLegend'
import { ChartTooltip } from './ChartTooltip'
import type {
  ChartDataPoint,
  TooltipVariant,
} from './types'

/** Radar chart display variants */
export type RadarChartVariant = 'default' | 'dots' | 'lines' | 'custom' | 'multiple' | 'grid-circle' | 'grid-filled' | 'grid-none' | 'legend' | 'icons' | 'radius-axis' | 'label' | 'custom-shape' | 'interactive'

export interface RadarChartProps {
  data: ChartDataPoint[]
  variant?: RadarChartVariant
  xAxisKey?: string
  showDots?: boolean
  showLabels?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  interactive?: boolean
  showLegend?: boolean
  tooltipVariant?: TooltipVariant
  gridType?: 'polygon' | 'circle'
  gridFill?: boolean
  gridLevels?: number
  showRadiusAxis?: boolean
  fillOpacity?: number
  strokeWidth?: number
  dotSize?: number
  customShape?: React.ComponentType<any>
  maxValue?: number
}

// -- Geometry helpers --

function getVertexPosition(
  cx: number,
  cy: number,
  radius: number,
  index: number,
  total: number,
): { x: number; y: number } {
  const angle = (2 * Math.PI * index) / total - Math.PI / 2
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  }
}

function buildPolygonPoints(
  cx: number,
  cy: number,
  radius: number,
  count: number,
): string {
  const pts: string[] = []
  for (let i = 0; i < count; i++) {
    const { x, y } = getVertexPosition(cx, cy, radius, i, count)
    pts.push(`${x},${y}`)
  }
  return pts.join(' ')
}

function buildRadarPath(
  cx: number,
  cy: number,
  values: number[],
  maxVal: number,
  outerR: number,
  total: number,
): string {
  const parts: string[] = []
  for (let i = 0; i < total; i++) {
    const val = typeof values[i] === 'number' ? values[i] : 0
    const r = (val / maxVal) * outerR
    const { x, y } = getVertexPosition(cx, cy, r, i, total)
    parts.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)
  }
  parts.push('Z')
  return parts.join(' ')
}

// -- Component --

export function RadarChart({
  data,
  variant = 'default',
  xAxisKey = 'x',
  showDots: showDotsProp,
  showLabels: showLabelsProp,
  showGrid: showGridProp,
  showTooltip: _showTooltip,
  interactive: interactiveProp,
  showLegend: showLegendProp,
  tooltipVariant,
  gridType: gridTypeProp,
  gridFill: gridFillProp,
  gridLevels = 5,
  showRadiusAxis: showRadiusAxisProp,
  fillOpacity: fillOpacityProp,
  strokeWidth: strokeWidthProp,
  dotSize: dotSizeProp,
  customShape: CustomShape,
  maxValue: maxValueProp,
}: RadarChartProps) {
  const { config, resolvedColors, victoryTheme, dimensions } = useChartContext()
  const seriesKeys = Object.keys(config)
  const categories = data.map((d) => String(d[xAxisKey] ?? d.x))
  const catCount = categories.length

  // Resolve variant flags
  const hasDots = showDotsProp ?? ['dots', 'custom-shape'].includes(variant)
  const hasLabels = showLabelsProp ?? ['label', 'radius-axis'].includes(variant)
  const hasGrid =
    showGridProp ?? !['grid-none'].includes(variant)
  const isInteractive = interactiveProp ?? variant === 'interactive'
  const hasLegend = showLegendProp ?? ['legend', 'icons'].includes(variant)
  const hasRadiusAxis =
    showRadiusAxisProp ?? variant === 'radius-axis'
  const isLinesOnly = variant === 'lines'
  const gridType: 'polygon' | 'circle' =
    gridTypeProp ??
    (variant === 'grid-circle' ? 'circle' : 'polygon')
  const gridFilled = gridFillProp ?? variant === 'grid-filled'
  const fillOpacity = isLinesOnly ? 0 : (fillOpacityProp ?? 0.25)
  const sw = strokeWidthProp ?? 2
  const ds = dotSizeProp ?? 4

  // Layout
  const { width, height } = dimensions
  const legendSpace = hasLegend ? 40 : 0
  const labelMargin = hasLabels ? 30 : 20
  const cx = width / 2
  const cy = (height - legendSpace) / 2
  const outerR = Math.min(width, height - legendSpace) / 2 - labelMargin

  // Determine max value across all series
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

  // Interactive state
  const [activeVertex, setActiveVertex] = useState<number | null>(null)

  const handleVertexPress = useCallback(
    (index: number) => {
      if (!isInteractive) return
      setActiveVertex((prev) => (prev === index ? null : index))
    },
    [isInteractive],
  )

  // Axis tick colors from theme
  const labelColor =
    victoryTheme.axis.style.tickLabels.fill || '#666'
  const gridColor =
    victoryTheme.axis.style.grid.stroke || '#e0e0e0'

  // -- Render grid --
  const gridElements = useMemo(() => {
    if (!hasGrid) return null
    const elements: React.ReactNode[] = []

    for (let level = 1; level <= gridLevels; level++) {
      const r = (level / gridLevels) * outerR

      if (gridFilled && level % 2 === 0) {
        // Zebra fill between this level and previous
        const rPrev = ((level - 1) / gridLevels) * outerR
        if (gridType === 'circle') {
          // Donut ring via two circles + clipPath (simplified: just fill circle at lower opacity)
          elements.push(
            <Circle
              key={`fill-${level}`}
              cx={cx}
              cy={cy}
              r={r}
              fill={gridColor}
              fillOpacity={0.08}
            />,
          )
          elements.push(
            <Circle
              key={`fill-clear-${level}`}
              cx={cx}
              cy={cy}
              r={rPrev}
              fill={victoryTheme.tooltip.flyoutStyle.fill || '#fff'}
            />,
          )
        } else {
          elements.push(
            <Path
              key={`fill-${level}`}
              d={buildRadarPath(
                cx,
                cy,
                Array(catCount).fill(level) as number[],
                gridLevels,
                outerR,
                catCount,
              )}
              fill={gridColor}
              fillOpacity={0.08}
            />,
          )
          if (rPrev > 0) {
            elements.push(
              <Path
                key={`fill-clear-${level}`}
                d={buildRadarPath(
                  cx,
                  cy,
                  Array(catCount).fill(level - 1) as number[],
                  gridLevels,
                  outerR,
                  catCount,
                )}
                fill={victoryTheme.tooltip.flyoutStyle.fill || '#fff'}
              />,
            )
          }
        }
      }

      if (gridType === 'circle') {
        elements.push(
          <Circle
            key={`grid-${level}`}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={gridColor}
            strokeOpacity={0.5}
            strokeWidth={0.5}
          />,
        )
      } else {
        const pts = buildPolygonPoints(cx, cy, r, catCount)
        elements.push(
          <Path
            key={`grid-${level}`}
            d={`M ${pts.split(',').join(' ').replace(/ (\d)/g, ' L $1').replace('M', 'M ')} Z`
              .replace('M  ', 'M ')}
            fill="none"
            stroke={gridColor}
            strokeOpacity={0.5}
            strokeWidth={0.5}
          />,
        )
      }
    }

    // Spoke lines from center to each vertex
    for (let i = 0; i < catCount; i++) {
      const { x, y } = getVertexPosition(cx, cy, outerR, i, catCount)
      elements.push(
        <Line
          key={`spoke-${i}`}
          x1={cx}
          y1={cy}
          x2={x}
          y2={y}
          stroke={gridColor}
          strokeOpacity={0.3}
          strokeWidth={0.5}
        />,
      )
    }

    return elements
  }, [hasGrid, gridLevels, gridType, gridFilled, outerR, cx, cy, catCount, gridColor, victoryTheme])

  // -- Render data series --
  const seriesElements = useMemo(() => {
    return seriesKeys.map((key) => {
      const values = data.map((d) => Number(d[key]) || 0)
      const pathD = buildRadarPath(cx, cy, values, maxVal, outerR, catCount)
      const color = resolvedColors[key] || '#999'

      return (
        <G key={key}>
          <Path
            d={pathD}
            fill={color}
            fillOpacity={fillOpacity}
            stroke={color}
            strokeWidth={sw}
          />
          {hasDots &&
            values.map((val, i) => {
              const r = (val / maxVal) * outerR
              const pos = getVertexPosition(cx, cy, r, i, catCount)
              if (CustomShape && variant === 'custom-shape') {
                return (
                  <CustomShape
                    key={`dot-${key}-${i}`}
                    x={pos.x}
                    y={pos.y}
                    color={color}
                    value={val}
                  />
                )
              }
              return (
                <Circle
                  key={`dot-${key}-${i}`}
                  cx={pos.x}
                  cy={pos.y}
                  r={activeVertex === i ? ds + 2 : ds}
                  fill={color}
                  stroke="#fff"
                  strokeWidth={1.5}
                />
              )
            })}
        </G>
      )
    })
  }, [seriesKeys, data, cx, cy, maxVal, outerR, catCount, resolvedColors, fillOpacity, sw, hasDots, ds, activeVertex, CustomShape, variant])

  // -- Render labels --
  const labelElements = useMemo(() => {
    if (!hasLabels) return null
    return categories.map((cat, i) => {
      const pos = getVertexPosition(cx, cy, outerR + 14, i, catCount)
      const angle = (2 * Math.PI * i) / catCount - Math.PI / 2
      let anchor: 'start' | 'middle' | 'end' = 'middle'
      if (Math.cos(angle) > 0.1) anchor = 'start'
      else if (Math.cos(angle) < -0.1) anchor = 'end'

      return (
        <SvgText
          key={`label-${i}`}
          x={pos.x}
          y={pos.y}
          textAnchor={anchor}
          alignmentBaseline="central"
          fill={labelColor}
          fontSize={11}
        >
          {cat}
        </SvgText>
      )
    })
  }, [hasLabels, categories, cx, cy, outerR, catCount, labelColor])

  // -- Render radius axis --
  const radiusAxisElements = useMemo(() => {
    if (!hasRadiusAxis) return null
    const elements: React.ReactNode[] = []
    for (let level = 1; level <= gridLevels; level++) {
      const r = (level / gridLevels) * outerR
      const val = Math.round((level / gridLevels) * maxVal)
      const pos = getVertexPosition(cx, cy, r, 0, catCount)
      elements.push(
        <SvgText
          key={`raxis-${level}`}
          x={pos.x + 4}
          y={pos.y - 4}
          fill={labelColor}
          fontSize={9}
          fillOpacity={0.7}
        >
          {val}
        </SvgText>,
      )
    }
    return elements
  }, [hasRadiusAxis, gridLevels, outerR, maxVal, cx, cy, catCount, labelColor])

  // -- Interactive hit areas --
  const hitAreas = useMemo(() => {
    if (!isInteractive) return null
    return categories.map((_, i) => {
      const pos = getVertexPosition(cx, cy, outerR, i, catCount)
      return (
        <Circle
          key={`hit-${i}`}
          cx={pos.x}
          cy={pos.y}
          r={16}
          fill="transparent"
          onPress={() => handleVertexPress(i)}
        />
      )
    })
  }, [isInteractive, categories, cx, cy, outerR, catCount, handleVertexPress])

  // -- Tooltip data --
  const tooltipPayload = useMemo(() => {
    if (activeVertex == null) return null
    return seriesKeys.map((key) => ({
      name: config[key].label,
      value: Number(data[activeVertex]?.[key]) || 0,
      color: resolvedColors[key] || '#999',
    }))
  }, [activeVertex, seriesKeys, config, data, resolvedColors])

  const svgHeight = height - legendSpace

  return (
    <>
      <Svg width={width} height={svgHeight}>
        <G>{gridElements}</G>
        <G>{seriesElements}</G>
        <G>{labelElements}</G>
        <G>{radiusAxisElements}</G>
        <G>{hitAreas}</G>
      </Svg>
      {isInteractive && activeVertex != null && tooltipPayload && (
        <ChartTooltip
          active
          variant={tooltipVariant}
          label={categories[activeVertex]}
          payload={tooltipPayload}
        />
      )}
      {hasLegend && <ChartLegend config={config} />}
    </>
  )
}
