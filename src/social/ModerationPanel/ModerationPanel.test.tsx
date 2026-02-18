import { render, screen } from '../../__test-utils__/render'
import { ModerationPanel } from './ModerationPanel'

describe('ModerationPanel', () => {
  it('renders without crashing', () => {
    render(<ModerationPanel testID="moderationpanel" />)
    expect(screen.getByTestId('moderationpanel')).toBeTruthy()
  })
})
