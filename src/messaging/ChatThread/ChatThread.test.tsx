import { render, screen } from '../../__test-utils__/render'
import { ChatThread } from './ChatThread'

describe('ChatThread', () => {
  it('renders without crashing', () => {
    render(<ChatThread testID="chatthread" />)
    expect(screen.getByTestId('chatthread')).toBeTruthy()
  })
})
