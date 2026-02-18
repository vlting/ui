import { render, screen } from '../../__test-utils__/render'
import { DatePicker } from './DatePicker'

describe('DatePicker', () => {
  it('renders without crashing', () => {
    render(<DatePicker testID="datepicker" />)
    expect(screen.getByTestId('datepicker')).toBeTruthy()
  })
})
