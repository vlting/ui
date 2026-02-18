import { render, screen } from '../../__test-utils__/render'
import { ChatSidebar } from './ChatSidebar'

describe('ChatSidebar', () => {
  it('renders without crashing', () => {
    render(<ChatSidebar testID="chatsidebar" />)
    expect(screen.getByTestId('chatsidebar')).toBeTruthy()
  })
})
