import type { ChartConfig, ChartDataPoint } from '@vlting/ui/components'
import {
  AreaChart,
  BarChart,
  Chart,
  LineChart,
  PieChart,
  RadarChart,
  RadialChart,
} from '@vlting/ui/components'
import { DemoCard, Section } from '../components/Section'

// -- Shared sample data --

const monthlyData: ChartDataPoint[] = [
  { x: 'Jan', y: 186, desktop: 186, mobile: 80 },
  { x: 'Feb', y: 305, desktop: 305, mobile: 200 },
  { x: 'Mar', y: 237, desktop: 237, mobile: 120 },
  { x: 'Apr', y: 73, desktop: 73, mobile: 190 },
  { x: 'May', y: 209, desktop: 209, mobile: 130 },
  { x: 'Jun', y: 214, desktop: 214, mobile: 140 },
]

const twoSeriesConfig: ChartConfig = {
  desktop: { label: 'Desktop', color: '$aqua8' },
  mobile: { label: 'Mobile', color: '$forest8' },
}

const singleSeriesConfig: ChartConfig = {
  y: { label: 'Revenue', color: '$primary8' },
}

const pieData: ChartDataPoint[] = [
  { x: 'Chrome', y: 275 },
  { x: 'Safari', y: 200 },
  { x: 'Firefox', y: 187 },
  { x: 'Edge', y: 173 },
  { x: 'Other', y: 90 },
]

const pieConfig: ChartConfig = {
  Chrome: { label: 'Chrome', color: '$aqua8' },
  Safari: { label: 'Safari', color: '$forest8' },
  Firefox: { label: 'Firefox', color: '$amber8' },
  Edge: { label: 'Edge', color: '$plum8' },
  Other: { label: 'Other', color: '$tomato8' },
}

const radarData: ChartDataPoint[] = [
  { x: 'Speed', y: 86, competitor: 65 },
  { x: 'Reliability', y: 90, competitor: 78 },
  { x: 'Features', y: 72, competitor: 84 },
  { x: 'Support', y: 95, competitor: 70 },
  { x: 'Price', y: 60, competitor: 88 },
  { x: 'UX', y: 88, competitor: 75 },
]

const radarConfig: ChartConfig = {
  y: { label: 'Our Product', color: '$aqua8' },
  competitor: { label: 'Competitor', color: '$tomato8' },
}

const radialData: ChartDataPoint[] = [{ x: 'Progress', y: 72 }]

const radialConfig: ChartConfig = {
  y: { label: 'Completion', color: '$primary8' },
}

export function ChartsPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Charts</h1>
      <p style={{ color: '#666', marginBottom: 24, fontSize: 14 }}>
        Six chart types built on Victory, wrapped in a unified <code>&lt;Chart&gt;</code>{' '}
        container that resolves design tokens.
      </p>

      {/* Area Chart */}
      <Section title="AreaChart">
        <DemoCard label="Default area chart">
          <Chart
            config={singleSeriesConfig}
            accessibilityLabel="Monthly revenue area chart"
          >
            <AreaChart data={monthlyData} config={singleSeriesConfig} />
          </Chart>
        </DemoCard>
        <DemoCard label="Stacked area (two series)">
          <Chart
            config={twoSeriesConfig}
            accessibilityLabel="Desktop vs mobile stacked area chart"
          >
            <AreaChart
              data={monthlyData}
              config={twoSeriesConfig}
              variant="stacked"
              showLegend
            />
          </Chart>
        </DemoCard>
        <DemoCard label="Gradient variant">
          <Chart config={singleSeriesConfig} accessibilityLabel="Gradient area chart">
            <AreaChart
              data={monthlyData}
              config={singleSeriesConfig}
              variant="gradient"
            />
          </Chart>
        </DemoCard>
      </Section>

      {/* Bar Chart */}
      <Section title="BarChart">
        <DemoCard label="Vertical bar chart">
          <Chart config={twoSeriesConfig} accessibilityLabel="Monthly bar chart">
            <BarChart data={monthlyData} xAxisKey="x" showXAxis showYAxis />
          </Chart>
        </DemoCard>
        <DemoCard label="Horizontal bar chart">
          <Chart config={twoSeriesConfig} accessibilityLabel="Horizontal bar chart">
            <BarChart data={monthlyData} variant="horizontal" xAxisKey="x" />
          </Chart>
        </DemoCard>
        <DemoCard label="Stacked bar chart">
          <Chart config={twoSeriesConfig} accessibilityLabel="Stacked bar chart">
            <BarChart data={monthlyData} variant="stacked" xAxisKey="x" showLegend />
          </Chart>
        </DemoCard>
      </Section>

      {/* Line Chart */}
      <Section title="LineChart">
        <DemoCard label="Line chart with dots">
          <Chart
            config={twoSeriesConfig}
            accessibilityLabel="Line chart with data points"
          >
            <LineChart
              data={monthlyData}
              variant="dots"
              xAxisKey="x"
              showXAxis
              showYAxis
            />
          </Chart>
        </DemoCard>
        <DemoCard label="Multiple series with legend">
          <Chart config={twoSeriesConfig} accessibilityLabel="Multi-series line chart">
            <LineChart
              data={monthlyData}
              variant="multiple"
              xAxisKey="x"
              showLegend
              showXAxis
            />
          </Chart>
        </DemoCard>
      </Section>

      {/* Pie Chart */}
      <Section title="PieChart">
        <DemoCard label="Default pie chart">
          <Chart config={pieConfig} accessibilityLabel="Browser usage pie chart">
            <PieChart data={pieData} config={pieConfig} xAxisKey="x" showLegend />
          </Chart>
        </DemoCard>
        <DemoCard label="Donut variant">
          <Chart config={pieConfig} accessibilityLabel="Browser usage donut chart">
            <PieChart
              data={pieData}
              config={pieConfig}
              xAxisKey="x"
              variant="donut"
              showLegend
            />
          </Chart>
        </DemoCard>
        <DemoCard label="Donut with center text">
          <Chart config={pieConfig} accessibilityLabel="Donut chart with total">
            <PieChart
              data={pieData}
              config={pieConfig}
              xAxisKey="x"
              variant="donut-text"
              centerText="925"
            />
          </Chart>
        </DemoCard>
      </Section>

      {/* Radar Chart */}
      <Section title="RadarChart">
        <DemoCard label="Product comparison radar">
          <Chart config={radarConfig} accessibilityLabel="Product comparison radar chart">
            <RadarChart data={radarData} xAxisKey="x" showDots showLabels showLegend />
          </Chart>
        </DemoCard>
        <DemoCard label="Circle grid variant">
          <Chart config={radarConfig} accessibilityLabel="Radar chart with circle grid">
            <RadarChart
              data={radarData}
              xAxisKey="x"
              variant="grid-circle"
              gridType="circle"
              showDots
              showLabels
            />
          </Chart>
        </DemoCard>
      </Section>

      {/* Radial Chart */}
      <Section title="RadialChart">
        <DemoCard label="Radial progress">
          <Chart config={radialConfig} accessibilityLabel="Completion radial chart">
            <RadialChart data={radialData} xAxisKey="x" showLabels maxValue={100} />
          </Chart>
        </DemoCard>
        <DemoCard label="Radial with center text">
          <Chart config={radialConfig} accessibilityLabel="Radial chart with text">
            <RadialChart
              data={radialData}
              xAxisKey="x"
              variant="text"
              centerText="72%"
              maxValue={100}
            />
          </Chart>
        </DemoCard>
      </Section>

      {/* Chart Composition */}
      <Section title="Chart API">
        <DemoCard label="How charts are structured">
          <pre
            style={{
              fontSize: 12,
              padding: 12,
              background: '#f5f5f5',
              borderRadius: 6,
              overflow: 'auto',
            }}
          >
            {`// Every chart type wraps in a <Chart> container
import { Chart, BarChart } from '@vlting/ui/components'
import type { ChartConfig, ChartDataPoint } from '@vlting/ui/components'

const config: ChartConfig = {
  revenue: { label: 'Revenue', color: '$aqua8' },
}

const data: ChartDataPoint[] = [
  { x: 'Jan', y: 186 },
  { x: 'Feb', y: 305 },
]

<Chart config={config} accessibilityLabel="Revenue chart">
  <BarChart data={data} xAxisKey="x" showXAxis showYAxis />
</Chart>

// Available chart types:
// AreaChart  — area/stacked/gradient/step variants
// BarChart   — vertical/horizontal/stacked/grouped variants
// LineChart  — dots/multiple/stepped/labels variants
// PieChart   — default/donut/donut-text/label variants
// RadarChart — polygon/circle grid, multi-series
// RadialChart — radial progress, stacked`}
          </pre>
        </DemoCard>
      </Section>
    </div>
  )
}
