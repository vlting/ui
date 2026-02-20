import { render, screen } from '../../__test-utils__/render'
import { StatCard } from './StatCard'

describe('StatCard', () => {
  it('renders without crashing', () => {
    render(<StatCard testID="statcard" />)
    expect(screen.getByTestId('statcard')).toBeTruthy()
  })

  it('renders Label content correctly', () => {
    render(
      <StatCard testID="statcard">
        <StatCard.Label testID="label">Total Revenue</StatCard.Label>
      </StatCard>,
    )
    expect(screen.getByTestId('label')).toBeTruthy()
    expect(screen.getByText('Total Revenue')).toBeTruthy()
  })

  it('renders Value content correctly', () => {
    render(
      <StatCard testID="statcard">
        <StatCard.Value testID="value">$24,500</StatCard.Value>
      </StatCard>,
    )
    expect(screen.getByTestId('value')).toBeTruthy()
    expect(screen.getByText('$24,500')).toBeTruthy()
  })

  it('renders Trend with up direction', () => {
    render(
      <StatCard testID="statcard">
        <StatCard.Trend direction="up" value="12%" testID="trend" />
      </StatCard>,
    )
    expect(screen.getByTestId('trend')).toBeTruthy()
    expect(screen.getByText('Up 12%')).toBeTruthy()
  })

  it('renders Trend with down direction', () => {
    render(
      <StatCard testID="statcard">
        <StatCard.Trend direction="down" value="5%" testID="trend" />
      </StatCard>,
    )
    expect(screen.getByText('Down 5%')).toBeTruthy()
  })

  it('renders Trend with neutral direction', () => {
    render(
      <StatCard testID="statcard">
        <StatCard.Trend direction="neutral" testID="trend" />
      </StatCard>,
    )
    expect(screen.getByText('No change')).toBeTruthy()
  })

  it('does not throw when Trend is omitted', () => {
    expect(() =>
      render(
        <StatCard testID="statcard">
          <StatCard.Label>Revenue</StatCard.Label>
          <StatCard.Value>$1,000</StatCard.Value>
        </StatCard>,
      ),
    ).not.toThrow()
  })

  it('renders in dark theme without errors', () => {
    render(<StatCard testID="statcard-dark" />)
    expect(screen.getByTestId('statcard-dark')).toBeTruthy()
  })
})
