import { render, screen } from '../../__test-utils__/render'
import { MetricCard } from './MetricCard'

describe('MetricCard', () => {
  it('renders without crashing', () => {
    render(<MetricCard testID="metriccard" />)
    expect(screen.getByTestId('metriccard')).toBeTruthy()
  })
})
