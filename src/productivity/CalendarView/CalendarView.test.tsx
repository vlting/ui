import { render, screen } from '../../__test-utils__/render'
import { CalendarView } from './CalendarView'

describe('CalendarView', () => {
  it('renders without crashing', () => {
    render(<CalendarView testID="calendarview" />)
    expect(screen.getByTestId('calendarview')).toBeTruthy()
  })
})
