import { render, screen } from '../../__test-utils__/render'
import { ProgressTracker } from './ProgressTracker'

describe('ProgressTracker', () => {
  it('renders without crashing', () => {
    render(<ProgressTracker testID="progresstracker" />)
    expect(screen.getByTestId('progresstracker')).toBeTruthy()
  })
})
