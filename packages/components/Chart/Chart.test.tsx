import React from 'react'
import { render, screen } from '../../../src/__test-utils__/render'
import { Chart, useChartContext } from './Chart'
import { ChartTooltip } from './ChartTooltip'
import { ChartLegend } from './ChartLegend'
import type { ChartConfig } from './types'

const mockConfig: ChartConfig = {
  revenue: { label: 'Revenue', color: '$blue8' },
  expenses: { label: 'Expenses', color: '$red8' },
}

// -- Chart (ChartContainer) --

describe('Chart', () => {
  it('renders without crashing', () => {
    render(
      <Chart config={mockConfig} accessibilityLabel="Test chart">
        <div>chart content</div>
      </Chart>
    )
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('applies role="img" with aria-label', () => {
    render(
      <Chart config={mockConfig} accessibilityLabel="Test chart">
        <div>chart content</div>
      </Chart>
    )
    const container = screen.getByRole('img')
    expect(container).toHaveAttribute('aria-label', 'Test chart')
  })

  it('accepts explicit width and height', () => {
    render(
      <Chart config={mockConfig} accessibilityLabel="Test chart" width={400} height={300}>
        <div>chart content</div>
      </Chart>
    )
    const container = screen.getByRole('img')
    expect(container.style.width).toBe('400px')
    expect(container.style.height).toBe('300px')
  })

  it('useChartContext throws outside Chart', () => {
    function BadConsumer() {
      useChartContext()
      return null
    }

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<BadConsumer />)).toThrow(
      'useChartContext must be used within a <Chart> component'
    )
    consoleSpy.mockRestore()
  })
})

// -- ChartTooltip --

describe('ChartTooltip', () => {
  it('returns null when not active', () => {
    const { container } = render(
      <Chart config={mockConfig} accessibilityLabel="Test chart" width={400} height={300}>
        <ChartTooltip active={false} />
      </Chart>
    )
    // Only the outer Chart div should be present
    const chartDiv = container.querySelector('[role="img"]')!
    // ChartTooltip renders nothing when not active
    expect(chartDiv.querySelector('div > div > div')).toBeNull()
  })

  it('returns null with empty payload', () => {
    const { container } = render(
      <Chart config={mockConfig} accessibilityLabel="Test chart" width={400} height={300}>
        <ChartTooltip active={true} payload={[]} />
      </Chart>
    )
    const chartDiv = container.querySelector('[role="img"]')!
    // Inner tooltip container should not render
    const children = chartDiv.querySelector('[role="img"] > div')
    // With active=true but empty payload, ChartTooltip returns null
    expect(container.querySelector('[style*="pointer-events"]')).toBeNull()
  })

  it('renders payload items', () => {
    render(
      <Chart config={mockConfig} accessibilityLabel="Test chart" width={400} height={300}>
        <ChartTooltip
          active={true}
          label="January"
          payload={[{ name: 'Revenue', value: 1000, color: '#3b8fdb' }]}
        />
      </Chart>
    )
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(screen.getByText('January')).toBeInTheDocument()
  })

  it('supports label variant', () => {
    render(
      <Chart config={mockConfig} accessibilityLabel="Test chart" width={400} height={300}>
        <ChartTooltip
          active={true}
          variant="label"
          label="February"
          payload={[{ name: 'Revenue', value: 500, color: '#3b8fdb' }]}
        />
      </Chart>
    )
    expect(screen.getByText('February')).toBeInTheDocument()
    // label variant does not render payload items
    expect(screen.queryByText('500')).toBeNull()
  })
})

// -- ChartLegend --

describe('ChartLegend', () => {
  it('renders legend items from config', () => {
    render(
      <Chart config={mockConfig} accessibilityLabel="Test chart" width={400} height={300}>
        <ChartLegend config={mockConfig} />
      </Chart>
    )
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('Expenses')).toBeInTheDocument()
  })

  it('uses semantic list markup', () => {
    const { container } = render(
      <Chart config={mockConfig} accessibilityLabel="Test chart" width={400} height={300}>
        <ChartLegend config={mockConfig} />
      </Chart>
    )
    expect(container.querySelector('ul')).toBeInTheDocument()
    expect(container.querySelectorAll('li')).toHaveLength(2)
  })

  it('renders in horizontal layout by default', () => {
    const { container } = render(
      <Chart config={mockConfig} accessibilityLabel="Test chart" width={400} height={300}>
        <ChartLegend config={mockConfig} />
      </Chart>
    )
    const list = container.querySelector('ul')!
    expect(list.style.flexDirection).toBe('row')
  })

  it('renders in vertical layout', () => {
    const { container } = render(
      <Chart config={mockConfig} accessibilityLabel="Test chart" width={400} height={300}>
        <ChartLegend config={mockConfig} layout="vertical" />
      </Chart>
    )
    const list = container.querySelector('ul')!
    expect(list.style.flexDirection).toBe('column')
  })
})
