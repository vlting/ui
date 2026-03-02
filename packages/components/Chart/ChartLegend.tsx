import React from 'react'
import { useTheme } from 'tamagui'
import type { ChartConfig, LegendLayout } from './types'
import { getSeriesColors } from './utils'

export interface ChartLegendProps {
  /** Legend layout direction */
  layout?: LegendLayout
  /** Chart configuration (provides labels and colors) */
  config: ChartConfig
  /** Vertical alignment hint (for container positioning) */
  verticalAlign?: 'top' | 'bottom'
  /** Key to use for item names (defaults to 'label' from config) */
  nameKey?: string
}

export function ChartLegend({
  layout = 'horizontal',
  config,
  nameKey,
}: ChartLegendProps) {
  const theme = useTheme()

  // Build a flat theme lookup for color resolution
  const themeFlat: Record<string, string> = {}
  for (const [key, val] of Object.entries(theme)) {
    if (val && typeof val === 'object' && 'val' in val && typeof val.val === 'string') {
      themeFlat[key] = val.val
    }
  }

  const resolvedColors = getSeriesColors(config, themeFlat)
  const keys = Object.keys(config)

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
      <ul
        role="list"
        style={{
          display: 'flex',
          flexDirection: layout === 'vertical' ? 'column' : 'row',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          gap: layout === 'vertical' ? 8 : 16,
        }}
      >
        {keys.map((key) => {
          const entry = config[key]
          const label =
            nameKey && nameKey in entry
              ? String((entry as unknown as Record<string, unknown>)[nameKey])
              : entry.label

          return (
            <li
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 12,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: resolvedColors[key],
                  flexShrink: 0,
                }}
              />
              <span style={{ color: theme.color?.val || '#111111' }}>
                {label}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
