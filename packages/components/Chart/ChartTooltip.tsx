import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useChartContext } from './Chart'
import type { TooltipIndicator, TooltipVariant } from './types'

function useResolvedTokens() {
  const ref = useRef<HTMLDivElement>(null)
  const [tokens, setTokens] = useState<Record<string, string>>({})

  const resolve = useCallback(() => {
    const el = ref.current
    if (!el) return
    const cs = getComputedStyle(el)
    setTokens({
      background:
        cs.getPropertyValue('--stl-background').trim() ||
        cs.getPropertyValue('--background').trim() ||
        'transparent',
      color:
        cs.getPropertyValue('--stl-foreground').trim() ||
        cs.getPropertyValue('--color').trim() ||
        'currentColor',
      color8:
        cs.getPropertyValue('--stl-color8').trim() ||
        cs.getPropertyValue('--color8').trim() ||
        'currentColor',
      borderColor:
        cs.getPropertyValue('--stl-border').trim() ||
        cs.getPropertyValue('--borderColor').trim() ||
        'currentColor',
    })
  }, [])

  useEffect(() => {
    resolve()
  }, [resolve])

  return { ref, tokens }
}

interface TooltipPayloadItem {
  name: string
  value: number
  color: string
}

export interface ChartTooltipProps {
  variant?: TooltipVariant
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: string
  labelFormatter?: (label: string) => string
  valueFormatter?: (value: number) => string
  hideLabel?: boolean
  hideIndicator?: boolean
  indicator?: TooltipIndicator
  nameKey?: string
  children?: React.ReactNode
}

const indicatorStyles: Record<TooltipIndicator, (color: string) => React.CSSProperties> =
  {
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
  const { ref, tokens } = useResolvedTokens()
  const chartCtx = useChartContext()

  if (!active || (!payload?.length && variant !== 'custom' && variant !== 'label')) {
    return <div ref={ref} style={{ display: 'none' }} />
  }

  const containerStyle: React.CSSProperties = {
    background: tokens.background || 'var(--stl-background, transparent)',
    border: `1px solid ${tokens.borderColor || 'var(--stl-border, currentColor)'}`,
    borderRadius: 'var(--stl-radius3, 7px)',
    padding: 'var(--stl-space4, 8px) var(--stl-space5, 12px)',
    boxShadow: 'var(--stl-shadow-sm, 0 2px 8px rgba(0,0,0,0.08))',
    fontSize: 12,
    color: tokens.color || 'var(--stl-foreground, currentColor)',
    minWidth: 120,
    pointerEvents: 'none',
  }

  const subtitleColor = tokens.color8 || 'var(--stl-color8, currentColor)'

  const formattedLabel = label != null && labelFormatter ? labelFormatter(label) : label

  const showLabel = !hideLabel && label != null
  const showPayload = variant !== 'label' && variant !== 'custom' && payload?.length

  const config =
    variant === 'icons' || variant === 'advanced' ? chartCtx.config : undefined

  return (
    <div ref={ref} style={containerStyle}>
      {showLabel && (
        <div
          style={{
            color: subtitleColor,
            marginBottom: 'var(--stl-space0.5, 4px)',
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
                padding: 'var(--stl-space1, 2px) 0',
              }}
            >
              {!hideIndicator && <span style={indicatorStyles[indicator](item.color)} />}
              {IconComponent && <IconComponent />}
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
