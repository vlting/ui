import { render, screen } from '../../__test-utils__/render'
import { MessageBubble } from './MessageBubble'

describe('MessageBubble', () => {
  it('renders without crashing', () => {
    render(<MessageBubble testID="messagebubble" />)
    expect(screen.getByTestId('messagebubble')).toBeTruthy()
  })
})
