import React, { useEffect, useRef, useState, useCallback } from 'react'
import type { ChartConfig, LegendLayout } from './types'
import { getSeriesColors } from './utils'

function useResolvedTokens() {
  const ref = useRef<HTMLDivElement>(null)
  const [tokens, setTokens] = useState<Record<string, string>>({})

  const resolve = useCallback(() => {
    const el = ref.current
    if (!el) return
    const cs = getComputedStyle(el)
    setTokens({
      color: cs.getPropertyValue('--stl-foreground').trim() || cs.getPropertyValue('--color').trim() || '#111111',
    })
  }, [])

  useEffect(() => { resolve() }, [resolve])

  return { ref, tokens }
}

export interface ChartLegendProps {
  layout?: LegendLayout
  config: ChartConfig
  verticalAlign?: 'top' | 'bottom'
  nameKey?: string
}

export function ChartLegend({
  layout = 'horizontal',
  config,
  nameKey,
}: ChartLegendProps) {
  const { ref, tokens } = useResolvedTokens()
  const resolvedColors = getSeriesColors(config, tokens)
  const keys = Object.keys(config)

  return (
    <div ref={ref} style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
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
              <span style={{ color: tokens.color || 'var(--stl-foreground, #111111)' }}>
                {label}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
