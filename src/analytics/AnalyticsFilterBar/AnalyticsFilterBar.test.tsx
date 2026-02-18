import { render, screen } from '../../__test-utils__/render'
import { AnalyticsFilterBar } from './AnalyticsFilterBar'

describe('AnalyticsFilterBar', () => {
  it('renders without crashing', () => {
    render(<AnalyticsFilterBar testID="analyticsfilterbar" />)
    expect(screen.getByTestId('analyticsfilterbar')).toBeTruthy()
  })
})
