import type React from 'react'
import { render, screen } from '../../../src/__test-utils__/render'
import { Chart } from './Chart'
import { PieChart } from './PieChart'
import { RadarChart } from './RadarChart'
import { RadialChart } from './RadialChart'
import type { ChartConfig, ChartDataPoint } from './types'

// -- Mocks --

jest.mock('react-native-svg', () => {
  const R = require('react')
  const Svg = R.forwardRef((props: any, ref: any) =>
    R.createElement('svg', { ref, 'data-testid': 'svg-root' }, props.children),
  )
  Svg.displayName = 'Svg'
  return {
    __esModule: true,
    default: Svg,
    Svg,
    Path: (props: any) => R.createElement('path', { 'data-testid': 'svg-path', ...props }),
    G: (props: any) => R.createElement('g', null, props.children),
    Circle: (props: any) => R.createElement('circle', { 'data-testid': 'svg-circle', ...props }),
    Line: (props: any) => R.createElement('line', { 'data-testid': 'svg-line', ...props }),
    Polygon: (props: any) => R.createElement('polygon', props),
    Text: (props: any) => R.createElement('text', { 'data-testid': 'svg-text' }, props.children),
    Rect: (props: any) => R.createElement('rect', props),
    Defs: (props: any) => R.createElement('defs', null, props.children),
    LinearGradient: (props: any) => R.createElement('lineargradient', null, props.children),
    Stop: (props: any) => R.createElement('stop', props),
  }
})

// -- Test data --

const mockConfig: ChartConfig = {
  revenue: { label: 'Revenue', color: '$blue8' },
  expenses: { label: 'Expenses', color: '$red8' },
  profit: { label: 'Profit', color: '$green8' },
}

const mockPieData: ChartDataPoint[] = [
  { x: 'Revenue', y: 400, revenue: 400 },
  { x: 'Expenses', y: 300, expenses: 300 },
  { x: 'Profit', y: 200, profit: 200 },
]

const mockRadarData: ChartDataPoint[] = [
  { x: 'Speed', y: 80, revenue: 80, expenses: 60, profit: 70 },
  { x: 'Power', y: 90, revenue: 90, expenses: 70, profit: 80 },
  { x: 'Range', y: 70, revenue: 70, expenses: 85, profit: 65 },
  { x: 'Efficiency', y: 60, revenue: 60, expenses: 90, profit: 75 },
  { x: 'Cost', y: 50, revenue: 50, expenses: 40, profit: 55 },
]

const mockRadialData: ChartDataPoint[] = [
  { x: 'Progress', y: 75, revenue: 75, expenses: 50, profit: 60 },
]

// -- Helpers --

function chartWrapper(children: React.ReactNode) {
  return (
    <Chart config={mockConfig} accessibilityLabel="Test chart" width={400} height={300}>
      {children}
    </Chart>
  )
}

// -- PieChart tests --

describe('PieChart', () => {
  it('renders without crashing', () => {
    const { container } = render(chartWrapper(<PieChart data={mockPieData} config={mockConfig} />))
    expect(container).toBeTruthy()
  })

  it('renders donut variant', () => {
    const { container } = render(
      chartWrapper(<PieChart data={mockPieData} config={mockConfig} variant="donut" />),
    )
    expect(container).toBeTruthy()
  })

  it('renders donut-text variant with center text', () => {
    render(
      chartWrapper(<PieChart data={mockPieData} config={mockConfig} variant="donut-text" />),
    )
    const textElements = screen.getAllByTestId('svg-text')
    expect(textElements.length).toBeGreaterThan(0)
  })

  it('renders label variant', () => {
    render(
      chartWrapper(<PieChart data={mockPieData} config={mockConfig} variant="label" />),
    )
    const textElements = screen.getAllByTestId('svg-text')
    expect(textElements.length).toBeGreaterThan(0)
  })

  it('renders with legend', () => {
    render(
      chartWrapper(<PieChart data={mockPieData} config={mockConfig} variant="legend" />),
    )
    expect(screen.getByText('Revenue')).toBeTruthy()
    expect(screen.getByText('Expenses')).toBeTruthy()
    expect(screen.getByText('Profit')).toBeTruthy()
  })

  it('renders separator variant', () => {
    const { container } = render(
      chartWrapper(<PieChart data={mockPieData} config={mockConfig} variant="separator" />),
    )
    expect(container).toBeTruthy()
  })

  it('renders interactive variant', () => {
    const { container } = render(
      chartWrapper(<PieChart data={mockPieData} config={mockConfig} variant="interactive" />),
    )
    expect(container).toBeTruthy()
  })

  it('renders stacked variant', () => {
    const { container } = render(
      chartWrapper(<PieChart data={mockPieData} config={mockConfig} variant="stacked" />),
    )
    expect(container).toBeTruthy()
  })
})

// -- RadarChart tests --

describe('RadarChart', () => {
  it('renders without crashing', () => {
    const { container } = render(chartWrapper(<RadarChart data={mockRadarData} />))
    expect(container).toBeTruthy()
  })

  it('renders dots variant', () => {
    render(chartWrapper(<RadarChart data={mockRadarData} variant="dots" />))
    const circles = screen.getAllByTestId('svg-circle')
    expect(circles.length).toBeGreaterThan(0)
  })

  it('renders lines variant (no fill)', () => {
    const { container } = render(
      chartWrapper(<RadarChart data={mockRadarData} variant="lines" />),
    )
    expect(container).toBeTruthy()
  })

  it('renders multiple series', () => {
    const { container } = render(
      chartWrapper(<RadarChart data={mockRadarData} variant="multiple" />),
    )
    expect(container).toBeTruthy()
  })

  it('renders circle grid variant', () => {
    render(
      chartWrapper(<RadarChart data={mockRadarData} variant="grid-circle" />),
    )
    const circles = screen.getAllByTestId('svg-circle')
    expect(circles.length).toBeGreaterThan(0)
  })

  it('renders grid-filled variant', () => {
    const { container } = render(
      chartWrapper(<RadarChart data={mockRadarData} variant="grid-filled" />),
    )
    expect(container).toBeTruthy()
  })

  it('renders with labels', () => {
    render(
      chartWrapper(<RadarChart data={mockRadarData} variant="label" />),
    )
    const textElements = screen.getAllByTestId('svg-text')
    expect(textElements.length).toBeGreaterThan(0)
  })

  it('renders with legend', () => {
    render(
      chartWrapper(<RadarChart data={mockRadarData} variant="legend" />),
    )
    expect(screen.getByText('Revenue')).toBeTruthy()
    expect(screen.getByText('Expenses')).toBeTruthy()
  })

  it('renders radius-axis variant', () => {
    render(
      chartWrapper(<RadarChart data={mockRadarData} variant="radius-axis" />),
    )
    const textElements = screen.getAllByTestId('svg-text')
    expect(textElements.length).toBeGreaterThan(0)
  })

  it('renders interactive variant', () => {
    const { container } = render(
      chartWrapper(<RadarChart data={mockRadarData} variant="interactive" />),
    )
    expect(container).toBeTruthy()
  })
})

// -- RadialChart tests --

describe('RadialChart', () => {
  it('renders without crashing', () => {
    const { container } = render(chartWrapper(<RadialChart data={mockRadialData} />))
    expect(container).toBeTruthy()
  })

  it('renders grid variant with background tracks', () => {
    render(chartWrapper(<RadialChart data={mockRadialData} variant="grid" />))
    const paths = screen.getAllByTestId('svg-path')
    // Grid variant renders track arcs + data arcs
    expect(paths.length).toBeGreaterThan(0)
  })

  it('renders label variant', () => {
    render(chartWrapper(<RadialChart data={mockRadialData} variant="label" />))
    const textElements = screen.getAllByTestId('svg-text')
    expect(textElements.length).toBeGreaterThan(0)
  })

  it('renders text variant with center text', () => {
    render(chartWrapper(<RadialChart data={mockRadialData} variant="text" />))
    const textElements = screen.getAllByTestId('svg-text')
    expect(textElements.length).toBeGreaterThan(0)
  })

  it('renders stacked variant', () => {
    const { container } = render(
      chartWrapper(<RadialChart data={mockRadialData} variant="stacked" />),
    )
    expect(container).toBeTruthy()
  })

  it('renders shape variant with rounded caps', () => {
    const { container } = render(
      chartWrapper(<RadialChart data={mockRadialData} variant="shape" />),
    )
    expect(container).toBeTruthy()
  })
})
