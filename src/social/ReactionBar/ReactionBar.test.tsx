import { render, screen } from '../../__test-utils__/render'
import { ReactionBar } from './ReactionBar'

describe('ReactionBar', () => {
  it('renders without crashing', () => {
    render(<ReactionBar testID="reactionbar" />)
    expect(screen.getByTestId('reactionbar')).toBeTruthy()
  })
})
