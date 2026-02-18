import { render, screen } from '../../__test-utils__/render'
import { ActivityFeed } from './ActivityFeed'

describe('ActivityFeed', () => {
  it('renders without crashing', () => {
    render(<ActivityFeed testID="activityfeed" />)
    expect(screen.getByTestId('activityfeed')).toBeTruthy()
  })
})
