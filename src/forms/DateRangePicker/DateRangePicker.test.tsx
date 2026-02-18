import { render, screen } from '../../__test-utils__/render'
import { DateRangePicker } from './DateRangePicker'

describe('DateRangePicker', () => {
  it('renders without crashing', () => {
    render(<DateRangePicker testID="daterangepicker" />)
    expect(screen.getByTestId('daterangepicker')).toBeTruthy()
  })
})
