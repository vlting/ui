import { render, screen } from '../../__test-utils__/render'
import { ActivityTimeline } from './ActivityTimeline'

describe('ActivityTimeline', () => {
  it('renders without crashing', () => {
    render(<ActivityTimeline testID="activitytimeline" />)
    expect(screen.getByTestId('activitytimeline')).toBeTruthy()
  })
})
