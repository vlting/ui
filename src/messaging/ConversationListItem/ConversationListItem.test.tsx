import { render, screen } from '../../__test-utils__/render'
import { ConversationListItem } from './ConversationListItem'

describe('ConversationListItem', () => {
  it('renders without crashing', () => {
    render(<ConversationListItem testID="conversationlistitem" />)
    expect(screen.getByTestId('conversationlistitem')).toBeTruthy()
  })
})
