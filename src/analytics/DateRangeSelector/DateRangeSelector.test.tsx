import { render, screen } from '../../__test-utils__/render'
import { DateRangeSelector } from './DateRangeSelector'

describe('DateRangeSelector', () => {
  it('renders without crashing', () => {
    render(<DateRangeSelector testID="daterangeselector" />)
    expect(screen.getByTestId('daterangeselector')).toBeTruthy()
  })
})
