import { render, screen } from '../../__test-utils__/render'
import { MetricTile } from './MetricTile'

describe('MetricTile', () => {
  it('renders without crashing', () => {
    render(<MetricTile testID="metrictile" />)
    expect(screen.getByTestId('metrictile')).toBeTruthy()
  })

  it('renders Label content correctly', () => {
    render(
      <MetricTile testID="metrictile">
        <MetricTile.Label testID="label">Active Users</MetricTile.Label>
      </MetricTile>,
    )
    expect(screen.getByTestId('label')).toBeTruthy()
    expect(screen.getByText('Active Users')).toBeTruthy()
  })

  it('renders Value content correctly', () => {
    render(
      <MetricTile testID="metrictile">
        <MetricTile.Value testID="value">1,234</MetricTile.Value>
      </MetricTile>,
    )
    expect(screen.getByTestId('value')).toBeTruthy()
    expect(screen.getByText('1,234')).toBeTruthy()
  })

  it('renders Icon when provided', () => {
    render(
      <MetricTile testID="metrictile">
        <MetricTile.Icon testID="icon" decorative>
          <span>★</span>
        </MetricTile.Icon>
      </MetricTile>,
    )
    expect(screen.getByTestId('icon')).toBeTruthy()
  })

  it('does not render Icon region when no icon is supplied', () => {
    render(
      <MetricTile testID="metrictile">
        <MetricTile.Label>Label</MetricTile.Label>
      </MetricTile>,
    )
    expect(screen.queryByTestId('icon')).toBeNull()
  })

  it('does not throw when optional sub-components are omitted', () => {
    expect(() => render(<MetricTile testID="metrictile" />)).not.toThrow()
  })

  it('renders in small, medium, large sizes', () => {
    const { rerender } = render(<MetricTile testID="metrictile" size="small" />)
    expect(screen.getByTestId('metrictile')).toBeTruthy()

    rerender(<MetricTile testID="metrictile" size="medium" />)
    expect(screen.getByTestId('metrictile')).toBeTruthy()

    rerender(<MetricTile testID="metrictile" size="large" />)
    expect(screen.getByTestId('metrictile')).toBeTruthy()
  })

  it('renders in dark theme without errors', () => {
    render(<MetricTile testID="metrictile-dark" />)
    expect(screen.getByTestId('metrictile-dark')).toBeTruthy()
  })
})
