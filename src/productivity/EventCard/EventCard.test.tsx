import { render, screen } from '../../__test-utils__/render'
import { EventCard } from './EventCard'

describe('EventCard', () => {
  it('renders without crashing', () => {
    render(<EventCard testID="eventcard" />)
    expect(screen.getByTestId('eventcard')).toBeTruthy()
  })
})
