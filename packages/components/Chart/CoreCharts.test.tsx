import React from 'react'
import { render, screen } from '../../../src/__test-utils__/render'
import { Chart } from './Chart'
import { AreaChart } from './AreaChart'
import { BarChart } from './BarChart'
import { LineChart } from './LineChart'
import type { ChartConfig, ChartDataPoint } from './types'

// -- Mocks --
// NOTE: jest.mock factories are hoisted before Babel runs, so we use
// React.createElement instead of JSX to avoid transform issues.

// Mock react-native-svg (used by AreaChart)
jest.mock('react-native-svg', () => {
  const R = require('react')
  const Svg = R.forwardRef((props: any, ref: any) =>
    R.createElement('svg', { ref, 'data-testid': 'svg-root' }, props.children)
  )
  Svg.displayName = 'Svg'
  return {
    __esModule: true,
    default: Svg,
    Path: () => R.createElement('path', { 'data-testid': 'svg-path' }),
    Defs: (p: any) => R.createElement('defs', null, p.children),
    LinearGradient: (p: any) => R.createElement('lineargradient', null, p.children),
    Stop: () => R.createElement('stop'),
    G: (p: any) => R.createElement('g', null, p.children),
    Line: () => R.createElement('line', { 'data-testid': 'svg-line' }),
    Text: (p: any) => R.createElement('text', { 'data-testid': 'svg-text' }, p.children),
  }
})

// Mock victory-native (used by BarChart)
jest.mock('victory-native', () => {
  const R = require('react')
  const BarGroupBar = () => R.createElement('div', { 'data-testid': 'victory-group-bar' })
  const BarGroupComp = (p: any) => R.createElement('div', { 'data-testid': 'victory-group' }, p.children)
  BarGroupComp.Bar = BarGroupBar
  return {
    CartesianChart: (p: any) => {
      const mockPoints: Record<string, any[]> = {}
      const mockBounds = { left: 0, right: 400, top: 0, bottom: 300 }
      if (p.yKeys) {
        for (const key of p.yKeys) {
          mockPoints[key] = (p.data || []).map((d: any, i: number) => ({
            x: i * 50, xValue: d[p.xKey || 'x'], y: 200, yValue: d[key] || 0,
          }))
        }
      }
      const content = typeof p.children === 'function'
        ? p.children({ points: mockPoints, chartBounds: mockBounds })
        : p.children
      return R.createElement('div', { 'data-testid': 'victory-chart' }, content)
    },
    Bar: () => R.createElement('div', { 'data-testid': 'victory-bar' }),
    StackedBar: () => R.createElement('div', { 'data-testid': 'victory-stack' }),
    BarGroup: BarGroupComp,
    useChartPressState: (init: any) => ({ state: init, isActive: false }),
  }
})

// Mock victory (used by LineChart)
jest.mock('victory', () => {
  const R = require('react')
  return {
    VictoryChart: (p: any) => R.createElement('div', { 'data-testid': 'victory-chart' }, p.children),
    VictoryLine: () => R.createElement('div', { 'data-testid': 'victory-line' }),
    VictoryScatter: () => R.createElement('div', { 'data-testid': 'victory-scatter' }),
    VictoryAxis: () => R.createElement('div', { 'data-testid': 'victory-axis' }),
    VictoryVoronoiContainer: () => R.createElement('div'),
    VictoryLabel: () => R.createElement('span'),
  }
}, { virtual: true })

// -- Test data --

const mockConfig: ChartConfig = {
  revenue: { label: 'Revenue', color: '$blue8' },
  expenses: { label: 'Expenses', color: '$red8' },
}

const mockData: ChartDataPoint[] = [
  { x: 'Jan', y: 100, revenue: 100, expenses: 80 },
  { x: 'Feb', y: 200, revenue: 200, expenses: 120 },
  { x: 'Mar', y: 150, revenue: 150, expenses: 90 },
]

function chartWrapper(children: React.ReactNode) {
  return (
    <Chart config={mockConfig} accessibilityLabel="Test chart" width={400} height={300}>
      {children}
    </Chart>
  )
}

// -- AreaChart --

describe('AreaChart', () => {
  it('renders without crashing', () => {
    render(chartWrapper(
      <AreaChart data={mockData} config={mockConfig} />
    ))
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('renders with stacked variant', () => {
    const { container } = render(chartWrapper(
      <AreaChart data={mockData} config={mockConfig} variant="stacked" />
    ))
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders with axes', () => {
    const { container } = render(chartWrapper(
      <AreaChart data={mockData} config={mockConfig} variant="axes" />
    ))
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders with legend', () => {
    render(chartWrapper(
      <AreaChart data={mockData} config={mockConfig} variant="legend" />
    ))
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('Expenses')).toBeInTheDocument()
  })
})

// -- BarChart --

describe('BarChart', () => {
  it('renders without crashing', () => {
    render(chartWrapper(
      <BarChart data={mockData} config={mockConfig} />
    ))
    expect(screen.getByTestId('victory-chart')).toBeInTheDocument()
  })

  it('renders with stacked variant', () => {
    render(chartWrapper(
      <BarChart data={mockData} config={mockConfig} variant="stacked" />
    ))
    expect(screen.getByTestId('victory-stack')).toBeInTheDocument()
  })

  it('renders with grouped variant', () => {
    render(chartWrapper(
      <BarChart data={mockData} config={mockConfig} variant="grouped" />
    ))
    expect(screen.getByTestId('victory-group')).toBeInTheDocument()
  })

  it('renders with labels', () => {
    render(chartWrapper(
      <BarChart data={mockData} config={mockConfig} showLabels />
    ))
    expect(screen.getByTestId('victory-chart')).toBeInTheDocument()
  })
})

// -- LineChart --

describe('LineChart', () => {
  it('renders without crashing', () => {
    render(chartWrapper(
      <LineChart data={mockData} config={mockConfig} />
    ))
    expect(screen.getByTestId('victory-chart')).toBeInTheDocument()
  })

  it('renders with dots variant', () => {
    render(chartWrapper(
      <LineChart data={mockData} config={mockConfig} variant="dots" />
    ))
    expect(screen.getByTestId('victory-chart')).toBeInTheDocument()
  })

  it('renders with multiple lines', () => {
    render(chartWrapper(
      <LineChart data={mockData} config={mockConfig} variant="multiple" />
    ))
    expect(screen.getByTestId('victory-chart')).toBeInTheDocument()
  })

  it('renders with legend', () => {
    render(chartWrapper(
      <LineChart data={mockData} config={mockConfig} variant="legend" />
    ))
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('Expenses')).toBeInTheDocument()
  })
})
