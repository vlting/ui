'use client'

import { useEffect, useState, type ComponentType } from 'react'

// Sample data for each chart type — matches the format expected by chart components
const sampleBarData = [
  { x: 'Jan', y: 186, desktop: 186, mobile: 80 },
  { x: 'Feb', y: 305, desktop: 305, mobile: 200 },
  { x: 'Mar', y: 237, desktop: 237, mobile: 120 },
  { x: 'Apr', y: 73, desktop: 73, mobile: 190 },
  { x: 'May', y: 209, desktop: 209, mobile: 130 },
  { x: 'Jun', y: 214, desktop: 214, mobile: 140 },
]

const sampleLineData = sampleBarData
const sampleAreaData = sampleBarData

const samplePieData = [
  { x: 'Chrome', y: 275, fill: '#3b8fdb' },
  { x: 'Safari', y: 200, fill: '#22c55e' },
  { x: 'Firefox', y: 187, fill: '#f97316' },
  { x: 'Edge', y: 173, fill: '#9333ea' },
  { x: 'Other', y: 90, fill: '#888888' },
]

const sampleRadarData = [
  { x: 'Design', y: 80, desktop: 80, mobile: 65 },
  { x: 'Frontend', y: 95, desktop: 95, mobile: 70 },
  { x: 'Backend', y: 70, desktop: 70, mobile: 85 },
  { x: 'DevOps', y: 60, desktop: 60, mobile: 75 },
  { x: 'Testing', y: 85, desktop: 85, mobile: 60 },
]

const sampleRadialData = [{ x: 'Progress', y: 75, fill: '#3b8fdb' }]

const chartDataMap: Record<string, Record<string, unknown>[]> = {
  area: sampleAreaData,
  bar: sampleBarData,
  line: sampleLineData,
  pie: samplePieData,
  radar: sampleRadarData,
  radial: sampleRadialData,
}

const defaultConfig = {
  desktop: { label: 'Desktop', color: '$blue9' },
  mobile: { label: 'Mobile', color: '$green9' },
}

const pieConfig = {
  Chrome: { label: 'Chrome', color: '$blue9' },
  Safari: { label: 'Safari', color: '$green9' },
  Firefox: { label: 'Firefox', color: '$orange9' },
  Edge: { label: 'Edge', color: '$purple9' },
  Other: { label: 'Other', color: '$color7' },
}

const chartConfigMap: Record<string, Record<string, { label: string; color: string }>> = {
  area: defaultConfig,
  bar: defaultConfig,
  line: defaultConfig,
  pie: pieConfig,
  radar: defaultConfig,
  radial: { Progress: { label: 'Progress', color: '$blue9' } },
}

interface ChartPreviewProps {
  type: string
}

export function ChartPreview({ type }: ChartPreviewProps) {
  const [ChartComponent, setChartComponent] = useState<ComponentType<any> | null>(null)
  const [ChartContainer, setChartContainer] = useState<ComponentType<any> | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadChart() {
      try {
        const chartModule = await import(`../../../../../packages/components/Chart`)
        const componentName = `${type.charAt(0).toUpperCase()}${type.slice(1)}Chart`
        const Component = chartModule[componentName]
        const Container = chartModule.Chart

        if (!Component || !Container) {
          setError(`Chart component "${componentName}" not found`)
          return
        }

        setChartComponent(() => Component)
        setChartContainer(() => Container)
      } catch (err) {
        setError(`Failed to load chart: ${err instanceof Error ? err.message : String(err)}`)
      }
    }

    loadChart()
  }, [type])

  if (error) {
    return (
      <div className="border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4">
        <p className="text-sm text-amber-800 dark:text-amber-300">
          <strong>Preview unavailable:</strong> {error}
        </p>
      </div>
    )
  }

  if (!ChartComponent || !ChartContainer) {
    return (
      <div className="border border-border rounded-lg p-8 flex items-center justify-center bg-surface-muted">
        <p className="text-sm text-foreground-secondary">Loading chart preview...</p>
      </div>
    )
  }

  const data = chartDataMap[type] ?? sampleBarData
  const config = chartConfigMap[type] ?? defaultConfig

  return (
    <div className="border border-border rounded-lg p-6 bg-background">
      <ChartContainer
        config={config}
        accessibilityLabel={`${type} chart preview`}
        height={300}
        data={data}
        xAxisKey="x"
      >
        <ChartComponent data={data} />
      </ChartContainer>
    </div>
  )
}
