import React, { useMemo, useCallback, useState } from 'react'
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  G,
  Line,
  Text as SvgText,
} from 'react-native-svg'
import type { ChartConfig, ChartDataPoint, TooltipVariant } from './types'
import { useChartContext } from './Chart'
import { ChartLegend } from './ChartLegend'
import { ChartTooltip } from './ChartTooltip'

export type AreaChartVariant =
  | 'default'
  | 'gradient'
  | 'stacked'
  | 'expanded'
  | 'step'
  | 'axes'
  | 'interactive'
  | 'legend'
  | 'linear'
  | 'icons'

export interface AreaChartProps {
  data: ChartDataPoint[]
  variant?: AreaChartVariant
  config: ChartConfig
  xAxisKey?: string
  showXAxis?: boolean
  showYAxis?: boolean
  showGrid?: boolean
  stacked?: boolean
  expanded?: boolean
  stepped?: boolean
  interactive?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  tooltipVariant?: TooltipVariant
  customTooltip?: React.ReactNode
  curveType?: 'natural' | 'linear' | 'step'
  gradientFill?: boolean
  fillOpacity?: number
}

// -- Chart math utilities --

const TICK_COUNT = 5

function linearScale(
  domain: [number, number],
  range: [number, number],
): (value: number) => number {
  const [d0, d1] = domain
  const [r0, r1] = range
  const span = d1 - d0 || 1
  return (value: number) => r0 + ((value - d0) / span) * (r1 - r0)
}

function pointScale(
  domain: string[],
  range: [number, number],
): (value: string) => number {
  const step = domain.length > 1 ? (range[1] - range[0]) / (domain.length - 1) : 0
  const map = new Map(domain.map((d, i) => [d, range[0] + i * step]))
  return (value: string) => map.get(value) ?? range[0]
}

function niceTickValues(min: number, max: number, count: number): number[] {
  if (min === max) return [min]
  const range = max - min
  const rough = range / (count - 1)
  const magnitude = Math.pow(10, Math.floor(Math.log10(rough)))
  const residual = rough / magnitude
  let nice: number
  if (residual <= 1.5) nice = magnitude
  else if (residual <= 3) nice = 2 * magnitude
  else if (residual <= 7) nice = 5 * magnitude
  else nice = 10 * magnitude

  const niceMin = Math.floor(min / nice) * nice
  const niceMax = Math.ceil(max / nice) * nice
  const ticks: number[] = []
  for (let v = niceMin; v <= niceMax + nice * 0.5; v += nice) {
    ticks.push(Math.round(v * 1e10) / 1e10)
  }
  return ticks
}

// -- Path generators --

type CurveMode = 'linear' | 'monotoneX' | 'natural' | 'stepAfter'

function buildAreaPath(
  points: Array<{ px: number; py: number }>,
  baseline: number,
  curve: CurveMode,
): string {
  if (points.length === 0) return ''

  const linePart = buildLinePath(points, curve)
  // Close back along the baseline
  const last = points[points.length - 1]
  const first = points[0]
  return `${linePart}L${last.px},${baseline}L${first.px},${baseline}Z`
}

function buildLinePath(
  points: Array<{ px: number; py: number }>,
  curve: CurveMode,
): string {
  if (points.length === 0) return ''
  if (points.length === 1) return `M${points[0].px},${points[0].py}`

  switch (curve) {
    case 'stepAfter':
      return buildStepAfterPath(points)
    case 'natural':
      return buildNaturalPath(points)
    case 'monotoneX':
      return buildMonotoneXPath(points)
    case 'linear':
    default:
      return points
        .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.px},${p.py}`)
        .join('')
  }
}

function buildStepAfterPath(points: Array<{ px: number; py: number }>): string {
  let d = `M${points[0].px},${points[0].py}`
  for (let i = 1; i < points.length; i++) {
    d += `H${points[i].px}V${points[i].py}`
  }
  return d
}

function buildNaturalPath(points: Array<{ px: number; py: number }>): string {
  const n = points.length
  if (n < 3) {
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.px},${p.py}`).join('')
  }

  // Natural cubic spline interpolation
  const xs = points.map((p) => p.px)
  const ys = points.map((p) => p.py)
  const cxs = naturalSpline(xs)
  const cys = naturalSpline(ys)

  let d = `M${xs[0]},${ys[0]}`
  for (let i = 1; i < n; i++) {
    d += `C${cxs.c1[i - 1]},${cys.c1[i - 1]},${cxs.c2[i - 1]},${cys.c2[i - 1]},${xs[i]},${ys[i]}`
  }
  return d
}

function naturalSpline(values: number[]): { c1: number[]; c2: number[] } {
  const n = values.length - 1
  const a = values.slice()
  const b = new Array(n).fill(0)
  const d = new Array(n).fill(0)
  const h = new Array(n).fill(0)
  const alpha = new Array(n).fill(0)
  const c = new Array(n + 1).fill(0)
  const l = new Array(n + 1).fill(0)
  const mu = new Array(n + 1).fill(0)
  const z = new Array(n + 1).fill(0)

  for (let i = 0; i < n; i++) h[i] = i + 1 - i // simplify: h[i] = 1 for uniform
  // Recompute h properly based on index spacing
  for (let i = 0; i < n; i++) h[i] = 1

  for (let i = 1; i < n; i++) {
    alpha[i] = (3 / h[i]) * (a[i + 1] - a[i]) - (3 / h[i - 1]) * (a[i] - a[i - 1])
  }

  l[0] = 1
  for (let i = 1; i < n; i++) {
    l[i] = 2 * (h[i - 1] + h[i]) - h[i - 1] * mu[i - 1]
    mu[i] = h[i] / l[i]
    z[i] = (alpha[i] - h[i - 1] * z[i - 1]) / l[i]
  }
  l[n] = 1

  for (let j = n - 1; j >= 0; j--) {
    c[j] = z[j] - mu[j] * c[j + 1]
    b[j] = (a[j + 1] - a[j]) / h[j] - h[j] * (c[j + 1] + 2 * c[j]) / 3
    d[j] = (c[j + 1] - c[j]) / (3 * h[j])
  }

  const c1: number[] = []
  const c2: number[] = []
  for (let i = 0; i < n; i++) {
    c1.push(a[i] + b[i] / 3)
    c2.push(a[i + 1] - (b[i] + 2 * d[i]) / 3)
  }
  return { c1, c2 }
}

function buildMonotoneXPath(points: Array<{ px: number; py: number }>): string {
  const n = points.length
  if (n < 3) {
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.px},${p.py}`).join('')
  }

  // Fritsch-Carlson monotone interpolation
  const dx: number[] = []
  const dy: number[] = []
  const m: number[] = []
  for (let i = 0; i < n - 1; i++) {
    dx.push(points[i + 1].px - points[i].px)
    dy.push(points[i + 1].py - points[i].py)
    m.push(dy[i] / (dx[i] || 1))
  }

  const tangents: number[] = [m[0]]
  for (let i = 1; i < n - 1; i++) {
    if (m[i - 1] * m[i] <= 0) {
      tangents.push(0)
    } else {
      tangents.push((m[i - 1] + m[i]) / 2)
    }
  }
  tangents.push(m[n - 2])

  // Enforce monotonicity
  for (let i = 0; i < n - 1; i++) {
    if (Math.abs(m[i]) < 1e-10) {
      tangents[i] = 0
      tangents[i + 1] = 0
    } else {
      const alpha = tangents[i] / m[i]
      const beta = tangents[i + 1] / m[i]
      const s = alpha * alpha + beta * beta
      if (s > 9) {
        const t = 3 / Math.sqrt(s)
        tangents[i] = t * alpha * m[i]
        tangents[i + 1] = t * beta * m[i]
      }
    }
  }

  let d = `M${points[0].px},${points[0].py}`
  for (let i = 0; i < n - 1; i++) {
    const seg = dx[i] / 3
    const cp1x = points[i].px + seg
    const cp1y = points[i].py + tangents[i] * seg
    const cp2x = points[i + 1].px - seg
    const cp2y = points[i + 1].py - tangents[i + 1] * seg
    d += `C${cp1x},${cp1y},${cp2x},${cp2y},${points[i + 1].px},${points[i + 1].py}`
  }
  return d
}

// -- Data processing --

function normalizeToPercentages(
  data: ChartDataPoint[],
  seriesKeys: string[],
): ChartDataPoint[] {
  return data.map((point) => {
    const total = seriesKeys.reduce(
      (sum, key) => sum + (typeof point[key] === 'number' ? (point[key] as number) : 0),
      0,
    )
    if (total === 0) return point
    const normalized: ChartDataPoint = { x: point.x, y: point.y }
    for (const key of seriesKeys) {
      const val = typeof point[key] === 'number' ? (point[key] as number) : 0
      normalized[key] = (val / total) * 100
    }
    return normalized
  })
}

function resolveCurveMode(
  variant: AreaChartVariant | undefined,
  curveType: 'natural' | 'linear' | 'step' | undefined,
  stepped: boolean | undefined,
): CurveMode {
  if (curveType === 'step' || stepped || variant === 'step') return 'stepAfter'
  if (curveType === 'linear' || variant === 'linear') return 'linear'
  if (curveType === 'natural') return 'natural'
  return 'monotoneX'
}

// -- Component --

export function AreaChart({
  data,
  variant = 'default',
  config,
  xAxisKey = 'x',
  showXAxis,
  showYAxis,
  showGrid = false,
  stacked,
  expanded,
  stepped,
  interactive,
  showLegend,
  showTooltip,
  tooltipVariant,
  customTooltip,
  curveType,
  gradientFill,
  fillOpacity,
}: AreaChartProps) {
  const { resolvedColors, victoryTheme, dimensions } = useChartContext()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const seriesKeys = useMemo(() => Object.keys(config), [config])

  // Resolve variant-driven flags
  const isStacked = stacked || variant === 'stacked' || variant === 'expanded'
  const isExpanded = expanded || variant === 'expanded'
  const isInteractive = interactive || variant === 'interactive'
  const hasLegend = showLegend || variant === 'legend'
  const hasGradient = gradientFill || variant === 'gradient'
  const hasXAxis = showXAxis || variant === 'axes'
  const hasYAxis = showYAxis || variant === 'axes'

  const curve = resolveCurveMode(variant, curveType, stepped)
  const defaultOpacity = hasGradient ? 1.0 : 0.4
  const resolvedFillOpacity = fillOpacity ?? defaultOpacity

  const legendHeight = hasLegend ? 32 : 0
  const chartWidth = dimensions.width
  const chartHeight = dimensions.height - legendHeight

  const padding = victoryTheme.chart.padding

  const plotLeft = padding.left
  const plotRight = chartWidth - padding.right
  const plotTop = padding.top
  const plotBottom = chartHeight - padding.bottom
  const plotWidth = plotRight - plotLeft

  // Normalize data for expanded variant
  const chartData = useMemo(
    () => (isExpanded ? normalizeToPercentages(data, seriesKeys) : data),
    [data, isExpanded, seriesKeys],
  )

  // Compute x labels
  const xLabels = useMemo(
    () => chartData.map((d) => String(d[xAxisKey] ?? d.x)),
    [chartData, xAxisKey],
  )

  // Compute y domain
  const yDomain = useMemo<[number, number]>(() => {
    if (isExpanded) return [0, 100]

    let yMin = 0
    let yMax = 0

    if (isStacked) {
      // For stacked, sum all series at each data point
      for (const point of chartData) {
        let sum = 0
        for (const key of seriesKeys) {
          sum += typeof point[key] === 'number' ? (point[key] as number) : 0
        }
        if (sum > yMax) yMax = sum
      }
    } else {
      for (const point of chartData) {
        for (const key of seriesKeys) {
          const val = typeof point[key] === 'number' ? (point[key] as number) : 0
          if (val > yMax) yMax = val
          if (val < yMin) yMin = val
        }
      }
    }

    // Add 10% headroom
    const range = yMax - yMin || 1
    return [Math.min(0, yMin), yMax + range * 0.1]
  }, [chartData, seriesKeys, isStacked, isExpanded])

  const xScale = useMemo(
    () => pointScale(xLabels, [plotLeft, plotRight]),
    [xLabels, plotLeft, plotRight],
  )
  const yScale = useMemo(
    () => linearScale(yDomain, [plotBottom, plotTop]),
    [yDomain, plotBottom, plotTop],
  )

  const yTicks = useMemo(
    () => niceTickValues(yDomain[0], yDomain[1], TICK_COUNT),
    [yDomain],
  )

  // Build area paths for each series
  const areaPaths = useMemo(() => {
    if (isStacked) {
      const cumulative = new Array(chartData.length).fill(0)

      return seriesKeys.map((key) => {
        const points: Array<{ px: number; py: number }> = []
        const basePoints: Array<{ px: number; py: number }> = []

        chartData.forEach((point, di) => {
          const val = typeof point[key] === 'number' ? (point[key] as number) : 0
          const px = xScale(xLabels[di])
          const topY = yScale(cumulative[di] + val)
          const botY = yScale(cumulative[di])
          points.push({ px, py: topY })
          basePoints.push({ px, py: botY })
          cumulative[di] += val
        })

        // Build path: line across top, then reverse along bottom baseline
        const topLine = buildLinePath(points, curve)
        const reversedBase = [...basePoints].reverse()
        const botLine = reversedBase
          .map((p, i) => `${i === 0 ? 'L' : 'L'}${p.px},${p.py}`)
          .join('')
        return topLine + botLine + 'Z'
      })
    }

    // Non-stacked: each series has its own area from baseline (y=0)
    return seriesKeys.map((key) => {
      const points = chartData.map((point, di) => ({
        px: xScale(xLabels[di]),
        py: yScale(typeof point[key] === 'number' ? (point[key] as number) : 0),
      }))
      return buildAreaPath(points, yScale(0), curve)
    })
  }, [chartData, seriesKeys, xLabels, xScale, yScale, isStacked, curve])

  // Stroke paths (top line only)
  const strokePaths = useMemo(() => {
    if (isStacked) {
      const cumulative = new Array(chartData.length).fill(0)
      return seriesKeys.map((key) => {
        const points = chartData.map((point, di) => {
          const val = typeof point[key] === 'number' ? (point[key] as number) : 0
          const px = xScale(xLabels[di])
          const py = yScale(cumulative[di] + val)
          cumulative[di] += val
          return { px, py }
        })
        return buildLinePath(points, curve)
      })
    }

    return seriesKeys.map((key) => {
      const points = chartData.map((point, di) => ({
        px: xScale(xLabels[di]),
        py: yScale(typeof point[key] === 'number' ? (point[key] as number) : 0),
      }))
      return buildLinePath(points, curve)
    })
  }, [chartData, seriesKeys, xLabels, xScale, yScale, isStacked, curve])

  // Interactive tooltip state
  const handlePress = useCallback(
    (index: number) => {
      if (!isInteractive) return
      setActiveIndex((prev) => (prev === index ? null : index))
    },
    [isInteractive],
  )

  const tooltipPayload = useMemo(() => {
    if (activeIndex == null) return undefined
    const point = chartData[activeIndex]
    if (!point) return undefined
    return seriesKeys.map((key) => ({
      name: config[key]?.label ?? key,
      value: typeof point[key] === 'number' ? (point[key] as number) : 0,
      color: resolvedColors[key],
    }))
  }, [activeIndex, chartData, seriesKeys, config, resolvedColors])

  const axisColor = victoryTheme.axis.style.axis.stroke
  const gridColor = victoryTheme.axis.style.grid.stroke
  const labelColor = victoryTheme.axis.style.tickLabels.fill
  const labelFontSize = victoryTheme.axis.style.tickLabels.fontSize

  return (
    <>
      <Svg width={chartWidth} height={chartHeight}>
        {hasGradient && (
          <Defs>
            {seriesKeys.map((key) => (
              <LinearGradient
                key={key}
                id={`area-gradient-${key}`}
                x1="0"
                y1="0"
                x2="0"
                y2={String(chartHeight)}
                gradientUnits="userSpaceOnUse"
              >
                <Stop offset="0%" stopColor={resolvedColors[key]} stopOpacity={0.8} />
                <Stop offset="100%" stopColor={resolvedColors[key]} stopOpacity={0.1} />
              </LinearGradient>
            ))}
          </Defs>
        )}

        {/* Grid lines */}
        {showGrid && (
          <G>
            {yTicks.map((tick) => {
              const y = yScale(tick)
              return (
                <Line
                  key={`grid-${tick}`}
                  x1={plotLeft}
                  y1={y}
                  x2={plotRight}
                  y2={y}
                  stroke={gridColor}
                  strokeOpacity={0.3}
                />
              )
            })}
          </G>
        )}

        {/* Y axis */}
        {hasYAxis && (
          <G>
            <Line
              x1={plotLeft}
              y1={plotTop}
              x2={plotLeft}
              y2={plotBottom}
              stroke={axisColor}
              strokeWidth={1}
            />
            {yTicks.map((tick) => {
              const y = yScale(tick)
              const label = isExpanded ? `${tick}%` : String(tick)
              return (
                <SvgText
                  key={`ytick-${tick}`}
                  x={plotLeft - 8}
                  y={y + labelFontSize / 3}
                  textAnchor="end"
                  fill={labelColor}
                  fontSize={labelFontSize}
                >
                  {label}
                </SvgText>
              )
            })}
          </G>
        )}

        {/* X axis */}
        {hasXAxis && (
          <G>
            <Line
              x1={plotLeft}
              y1={plotBottom}
              x2={plotRight}
              y2={plotBottom}
              stroke={axisColor}
              strokeWidth={1}
            />
            {xLabels.map((label) => {
              const x = xScale(label)
              return (
                <SvgText
                  key={`xtick-${label}`}
                  x={x}
                  y={plotBottom + labelFontSize + 6}
                  textAnchor="middle"
                  fill={labelColor}
                  fontSize={labelFontSize}
                >
                  {label}
                </SvgText>
              )
            })}
          </G>
        )}

        {/* Area fills */}
        {seriesKeys.map((key, i) => (
          <Path
            key={`area-${key}`}
            d={areaPaths[i]}
            fill={hasGradient ? `url(#area-gradient-${key})` : resolvedColors[key]}
            fillOpacity={hasGradient ? 1 : resolvedFillOpacity}
          />
        ))}

        {/* Stroke lines */}
        {seriesKeys.map((key, i) => (
          <Path
            key={`stroke-${key}`}
            d={strokePaths[i]}
            fill="none"
            stroke={resolvedColors[key]}
            strokeWidth={2}
          />
        ))}

        {/* Interactive hit areas */}
        {isInteractive &&
          xLabels.map((label, di) => {
            const x = xScale(label)
            const barWidth = plotWidth / xLabels.length
            return (
              <React.Fragment key={`hit-${di}`}>
                {/* Invisible hit area */}
                <Path
                  d={`M${x - barWidth / 2},${plotTop}L${x + barWidth / 2},${plotTop}L${x + barWidth / 2},${plotBottom}L${x - barWidth / 2},${plotBottom}Z`}
                  fill="transparent"
                  onPress={() => handlePress(di)}
                />
                {/* Active indicator line */}
                {activeIndex === di && (
                  <Line
                    x1={x}
                    y1={plotTop}
                    x2={x}
                    y2={plotBottom}
                    stroke={axisColor}
                    strokeWidth={1}
                    strokeDasharray="4,4"
                  />
                )}
              </React.Fragment>
            )
          })}
      </Svg>

      {/* Tooltip */}
      {isInteractive && activeIndex != null && tooltipPayload && (
        <ChartTooltip
          variant={tooltipVariant ?? (variant === 'icons' ? 'icons' : 'default')}
          active
          payload={tooltipPayload}
          label={xLabels[activeIndex]}
        >
          {customTooltip}
        </ChartTooltip>
      )}

      {showTooltip && !isInteractive && tooltipVariant && (
        <ChartTooltip variant={tooltipVariant}>
          {customTooltip}
        </ChartTooltip>
      )}

      {hasLegend && <ChartLegend config={config} />}
    </>
  )
}
