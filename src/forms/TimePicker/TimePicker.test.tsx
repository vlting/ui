import { render, screen } from '../../__test-utils__/render'
import { TimePicker } from './TimePicker'

describe('TimePicker', () => {
  it('renders without crashing', () => {
    render(<TimePicker testID="timepicker" />)
    expect(screen.getByTestId('timepicker')).toBeTruthy()
  })
})
