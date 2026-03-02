import React from 'react'
import type { ChartConfig } from './types'

export interface ChartDataTableProps {
  /** Raw chart data rows */
  data: Record<string, unknown>[]
  /** Chart config mapping series keys to labels */
  config: ChartConfig
  /** Key used for the x-axis / row label column (default: 'x') */
  xAxisKey?: string
}

/**
 * Visually-hidden HTML table that exposes chart data to screen readers.
 * Rendered inside <Chart> when the `data` prop is provided.
 */
export function ChartDataTable({ data, config, xAxisKey = 'x' }: ChartDataTableProps) {
  const seriesKeys = Object.keys(config)

  return (
    <div
      style={{
        position: 'absolute',
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: 0,
      }}
    >
      <table>
        <caption>Chart data</caption>
        <thead>
          <tr>
            <th scope="col">{xAxisKey}</th>
            {seriesKeys.map((key) => (
              <th key={key} scope="col">
                {config[key].label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{String(row[xAxisKey] ?? '')}</td>
              {seriesKeys.map((key) => (
                <td key={key}>{String(row[key] ?? '')}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
