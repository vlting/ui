'use client'

import { useEffect, useState, type ComponentType } from 'react'

// Sample data for each chart type — matches the format expected by chart components
const sampleBarData = [
  { x: 'Jan', desktop: 186, mobile: 80 },
  { x: 'Feb', desktop: 305, mobile: 200 },
  { x: 'Mar', desktop: 237, mobile: 120 },
  { x: 'Apr', desktop: 73, mobile: 190 },
  { x: 'May', desktop: 209, mobile: 130 },
  { x: 'Jun', desktop: 214, mobile: 140 },
]

const sampleLineData = sampleBarData
const sampleAreaData = sampleBarData

const samplePieData = [
  { x: 'Chrome', Chrome: 275 },
  { x: 'Safari', Safari: 200 },
  { x: 'Firefox', Firefox: 187 },
  { x: 'Edge', Edge: 173 },
  { x: 'Other', Other: 90 },
]

const sampleRadarData = [
  { x: 'Design', desktop: 80, mobile: 65 },
  { x: 'Frontend', desktop: 95, mobile: 70 },
  { x: 'Backend', desktop: 70, mobile: 85 },
  { x: 'DevOps', desktop: 60, mobile: 75 },
  { x: 'Testing', desktop: 85, mobile: 60 },
]

const sampleRadialData = [{ visitors: 1260, bounced: 340 }]

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
  radial: { visitors: { label: 'Visitors', color: '$blue9' }, bounced: { label: 'Bounced', color: '$red9' } },
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
