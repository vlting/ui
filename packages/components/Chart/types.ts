import type { ComponentType } from 'react'

/** Configuration for a single data series in a chart */
export interface ChartConfigEntry {
  /** Human-readable label for this series */
  label: string
  /** Tamagui token reference for the series color (e.g., "$blue8", "$color9") */
  color: string
  /** Optional icon component for this series */
  icon?: ComponentType
}

/** Maps data series keys to their configuration */
export type ChartConfig = Record<string, ChartConfigEntry>

/** A single data point in a chart dataset */
export interface ChartDataPoint {
  x: string | number
  y: number
  [key: string]: unknown
}

/** Tooltip display variants matching shadcn chart tooltips */
export type TooltipVariant =
  | 'default'
  | 'cursor'
  | 'dot'
  | 'line'
  | 'label'
  | 'custom'
  | 'advanced'
  | 'icons'
  | 'formatter'

/** Legend layout direction */
export type LegendLayout = 'horizontal' | 'vertical'

/** Tooltip indicator style */
export type TooltipIndicator = 'line' | 'dot' | 'dashed'

/** Area chart display variants */
export type AreaChartVariant = 'default' | 'gradient' | 'stacked' | 'expanded' | 'step' | 'axes' | 'interactive' | 'legend' | 'linear' | 'icons'

/** Bar chart display variants */
export type BarChartVariant = 'default' | 'horizontal' | 'stacked' | 'grouped' | 'negative' | 'label' | 'mixed' | 'custom-label' | 'active' | 'interactive'

/** Line chart display variants */
export type LineChartVariant = 'default' | 'dots' | 'multiple' | 'labels' | 'stepped' | 'custom-dots' | 'interactive' | 'linear' | 'legend' | 'icons'
