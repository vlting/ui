import { fireEvent, render, screen } from '../../__test-utils__/render'
import { ConnectionList, type ConnectionItem } from './ConnectionList'

describe('ConnectionList', () => {
  const sampleConnections: ConnectionItem[] = [
    {
      id: '1',
      name: 'Alice',
      photoSrc: 'https://example.com/alice.jpg',
      lastMessage: 'See you later!',
      lastMessageTime: '3:00 PM',
      unread: false,
    },
    {
      id: '2',
      name: 'Bob',
      photoSrc: 'https://example.com/bob.jpg',
      lastMessage: 'Sounds good!',
      lastMessageTime: '2:30 PM',
      unread: true,
    },
    {
      id: '3',
      name: 'Charlie',
      lastMessage: 'Hey there',
      lastMessageTime: '1:00 PM',
      unread: false,
    },
  ]

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <ConnectionList
          connections={sampleConnections}
          testID="conn-list"
        />,
      )
      expect(screen.getByTestId('conn-list')).toBeTruthy()
    })

    it('displays all connection names', () => {
      render(
        <ConnectionList
          connections={sampleConnections}
          testID="conn-list"
        />,
      )
      expect(screen.getByText('Alice')).toBeTruthy()
      expect(screen.getByText('Bob')).toBeTruthy()
      expect(screen.getByText('Charlie')).toBeTruthy()
    })

    it('displays last messages', () => {
      render(
        <ConnectionList
          connections={sampleConnections}
          testID="conn-list"
        />,
      )
      expect(screen.getByText('See you later!')).toBeTruthy()
      expect(screen.getByText('Sounds good!')).toBeTruthy()
      expect(screen.getByText('Hey there')).toBeTruthy()
    })

    it('displays last message times', () => {
      render(
        <ConnectionList
          connections={sampleConnections}
          testID="conn-list"
        />,
      )
      expect(screen.getByText('3:00 PM')).toBeTruthy()
      expect(screen.getByText('2:30 PM')).toBeTruthy()
    })
  })

  describe('loading state', () => {
    it('renders skeleton rows when isLoading is true', () => {
      render(
        <ConnectionList
          connections={[]}
          isLoading={true}
          testID="conn-list"
        />,
      )
      expect(screen.getByTestId('conn-list')).toBeTruthy()
    })

    it('has aria-busy when loading', () => {
      render(
        <ConnectionList
          connections={[]}
          isLoading={true}
          testID="conn-list"
        />,
      )
      const el = screen.getByTestId('conn-list')
      expect(el.getAttribute?.('aria-busy')).toBe('true')
    })

    it('has aria-label describing loading state', () => {
      render(
        <ConnectionList
          connections={[]}
          isLoading={true}
          testID="conn-list"
        />,
      )
      expect(screen.getByLabelText('Loading connections')).toBeTruthy()
    })
  })

  describe('empty state', () => {
    it('shows default empty message when connections is empty', () => {
      render(
        <ConnectionList
          connections={[]}
          testID="conn-list"
        />,
      )
      expect(screen.getByText('No connections yet')).toBeTruthy()
    })

    it('shows custom empty message', () => {
      render(
        <ConnectionList
          connections={[]}
          emptyMessage="Start matching to see connections!"
          testID="conn-list"
        />,
      )
      expect(screen.getByText('Start matching to see connections!')).toBeTruthy()
    })
  })

  describe('callbacks', () => {
    it('calls onSelect with the connection id when a card is pressed', () => {
      const onSelect = jest.fn()
      render(
        <ConnectionList
          connections={sampleConnections}
          onSelect={onSelect}
          testID="conn-list"
        />,
      )
      fireEvent.click(screen.getByLabelText('Connection with Alice'))
      expect(onSelect).toHaveBeenCalledWith('1')
    })

    it('does not crash when no onSelect provided', () => {
      render(
        <ConnectionList
          connections={sampleConnections}
          testID="conn-list"
        />,
      )
      expect(screen.getByTestId('conn-list')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('has role="list" on the container', () => {
      render(
        <ConnectionList
          connections={sampleConnections}
          testID="conn-list"
        />,
      )
      expect(screen.getByRole('list')).toBeTruthy()
    })

    it('each item has role="listitem"', () => {
      render(
        <ConnectionList
          connections={sampleConnections}
          testID="conn-list"
        />,
      )
      const items = screen.getAllByRole('listitem')
      expect(items.length).toBe(3)
    })

    it('empty state has accessible label', () => {
      render(
        <ConnectionList
          connections={[]}
          testID="conn-list"
        />,
      )
      expect(screen.getByLabelText('No connections yet')).toBeTruthy()
    })
  })
})
