import React from 'react'
import { useTheme } from 'tamagui'
import type { TooltipVariant, TooltipIndicator } from './types'
import { useChartContext } from './Chart'

interface TooltipPayloadItem {
  name: string
  value: number
  color: string
}

export interface ChartTooltipProps {
  /** Tooltip display variant */
  variant?: TooltipVariant
  /** Whether the tooltip is currently visible */
  active?: boolean
  /** Data items to display */
  payload?: TooltipPayloadItem[]
  /** Category label (e.g., month name, date) */
  label?: string
  /** Custom label formatter */
  labelFormatter?: (label: string) => string
  /** Custom value formatter */
  valueFormatter?: (value: number) => string
  /** Hide the label */
  hideLabel?: boolean
  /** Hide the color indicator */
  hideIndicator?: boolean
  /** Indicator style */
  indicator?: TooltipIndicator
  /** Key to use for item names */
  nameKey?: string
  /** Custom content (used with variant="custom") */
  children?: React.ReactNode
}

const indicatorStyles: Record<
  TooltipIndicator,
  (color: string) => React.CSSProperties
> = {
  dot: (color) => ({
    display: 'inline-block',
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: color,
    flexShrink: 0,
  }),
  line: (color) => ({
    display: 'inline-block',
    width: 12,
    height: 2,
    backgroundColor: color,
    flexShrink: 0,
  }),
  dashed: (color) => ({
    display: 'inline-block',
    width: 12,
    height: 0,
    borderBottom: `2px dashed ${color}`,
    flexShrink: 0,
  }),
}

export function ChartTooltip({
  variant = 'default',
  active,
  payload,
  label,
  labelFormatter,
  valueFormatter,
  hideLabel,
  hideIndicator,
  indicator = 'dot',
  nameKey,
  children,
}: ChartTooltipProps) {
  const theme = useTheme()
  const chartCtx = useChartContext()

  if (!active || (!payload?.length && variant !== 'custom' && variant !== 'label')) {
    return null
  }

  const containerStyle: React.CSSProperties = {
    background: theme.background?.val || '#ffffff',
    border: `1px solid ${theme.borderColor?.val || '#e8e8e8'}`,
    borderRadius: 7,
    padding: '8px 12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    fontSize: 12,
    color: theme.color?.val || '#111111',
    minWidth: 120,
    pointerEvents: 'none',
  }

  const subtitleColor =
    (theme as Record<string, { val?: string }>).color8?.val || '#6a6a6a'

  const formattedLabel =
    label != null && labelFormatter ? labelFormatter(label) : label

  const showLabel = !hideLabel && label != null
  const showPayload =
    variant !== 'label' && variant !== 'custom' && payload?.length

  const config = (variant === 'icons' || variant === 'advanced')
    ? chartCtx.config
    : undefined

  return (
    <div style={containerStyle}>
      {showLabel && (
        <div
          style={{
            color: subtitleColor,
            marginBottom: 4,
            fontWeight: 500,
          }}
        >
          {formattedLabel}
        </div>
      )}

      {variant === 'custom' && children}

      {showPayload &&
        payload!.map((item, i) => {
          const itemName =
            nameKey && nameKey in item
              ? String((item as unknown as Record<string, unknown>)[nameKey])
              : item.name
          const formattedValue = valueFormatter
            ? valueFormatter(item.value)
            : String(item.value)

          const IconComponent =
            (variant === 'icons' || variant === 'advanced') && config
              ? config[item.name]?.icon
              : undefined

          return (
            <div
              key={`${itemName}-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '2px 0',
              }}
            >
              {!hideIndicator && (
                <span style={indicatorStyles[indicator](item.color)} />
              )}
              {IconComponent && (
                <IconComponent />
              )}
              <span style={{ flex: 1 }}>{itemName}</span>
              <span
                style={{
                  fontVariantNumeric: 'tabular-nums',
                  marginLeft: 'auto',
                }}
              >
                {formattedValue}
              </span>
            </div>
          )
        })}
    </div>
  )
}
