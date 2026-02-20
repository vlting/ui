import { fireEvent, render, screen } from '../../__test-utils__/render'
import { ConversationList } from './ConversationList'
import type { ConversationItem } from './ConversationList'

describe('ConversationList', () => {
  const conversations: ConversationItem[] = [
    {
      id: '1',
      name: 'Alice',
      photoSrc: 'https://example.com/alice.jpg',
      lastMessage: 'Hey, how are you?',
      lastMessageTime: '2:30 PM',
      unread: true,
    },
    {
      id: '2',
      name: 'Bob',
      lastMessage: 'See you later!',
      lastMessageTime: 'Yesterday',
      unread: false,
    },
  ]

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <ConversationList
          conversations={conversations}
          testID="convos"
        />,
      )
      expect(screen.getByTestId('convos')).toBeTruthy()
    })

    it('renders all conversation rows', () => {
      render(
        <ConversationList
          conversations={conversations}
          testID="convos"
        />,
      )
      expect(screen.getByText('Alice')).toBeTruthy()
      expect(screen.getByText('Bob')).toBeTruthy()
    })

    it('shows last message preview text', () => {
      render(
        <ConversationList
          conversations={conversations}
          testID="convos"
        />,
      )
      expect(screen.getByText('Hey, how are you?')).toBeTruthy()
      expect(screen.getByText('See you later!')).toBeTruthy()
    })

    it('shows last message time', () => {
      render(
        <ConversationList
          conversations={conversations}
          testID="convos"
        />,
      )
      expect(screen.getByText('2:30 PM')).toBeTruthy()
      expect(screen.getByText('Yesterday')).toBeTruthy()
    })

    it('shows unread indicator for unread conversations', () => {
      render(
        <ConversationList
          conversations={conversations}
          testID="convos"
        />,
      )
      // Alice is unread, so we should find an "Unread" label
      expect(screen.getByLabelText('Unread')).toBeTruthy()
    })
  })

  describe('loading state', () => {
    it('shows skeleton rows when loading', () => {
      render(
        <ConversationList
          conversations={[]}
          isLoading={true}
          testID="convos"
        />,
      )
      const el = screen.getByTestId('convos')
      expect(el.getAttribute?.('aria-busy')).toBe('true')
    })

    it('has role="list" when loading', () => {
      render(
        <ConversationList
          conversations={[]}
          isLoading={true}
          testID="convos"
        />,
      )
      const el = screen.getByTestId('convos')
      expect(el.getAttribute?.('role')).toBe('list')
    })
  })

  describe('empty state', () => {
    it('shows default empty message when no conversations', () => {
      render(
        <ConversationList
          conversations={[]}
          testID="convos"
        />,
      )
      expect(screen.getByText('No conversations yet')).toBeTruthy()
    })

    it('shows custom empty message', () => {
      render(
        <ConversationList
          conversations={[]}
          emptyMessage="Start a conversation!"
          testID="convos"
        />,
      )
      expect(screen.getByText('Start a conversation!')).toBeTruthy()
    })
  })

  describe('callbacks', () => {
    it('calls onSelect with conversation id when row is pressed', () => {
      const onSelect = jest.fn()
      render(
        <ConversationList
          conversations={conversations}
          onSelect={onSelect}
          testID="convos"
        />,
      )
      fireEvent.click(screen.getByTestId('convos-row-1'))
      expect(onSelect).toHaveBeenCalledWith('1')
    })

    it('calls onSelect with correct id for second row', () => {
      const onSelect = jest.fn()
      render(
        <ConversationList
          conversations={conversations}
          onSelect={onSelect}
          testID="convos"
        />,
      )
      fireEvent.click(screen.getByTestId('convos-row-2'))
      expect(onSelect).toHaveBeenCalledWith('2')
    })
  })

  describe('accessibility', () => {
    it('list container has role="list"', () => {
      render(
        <ConversationList
          conversations={conversations}
          testID="convos"
        />,
      )
      const list = screen.getByRole('list')
      expect(list).toBeTruthy()
    })

    it('each row has role="listitem"', () => {
      render(
        <ConversationList
          conversations={conversations}
          testID="convos"
        />,
      )
      const items = screen.getAllByRole('listitem')
      expect(items.length).toBe(2)
    })

    it('unread row has accessible label including unread status', () => {
      render(
        <ConversationList
          conversations={conversations}
          testID="convos"
        />,
      )
      expect(
        screen.getByLabelText('Conversation with Alice, unread'),
      ).toBeTruthy()
    })

    it('read row has accessible label without unread status', () => {
      render(
        <ConversationList
          conversations={conversations}
          testID="convos"
        />,
      )
      expect(
        screen.getByLabelText('Conversation with Bob'),
      ).toBeTruthy()
    })
  })
})
