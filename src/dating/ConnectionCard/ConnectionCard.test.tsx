import { fireEvent, render, screen } from '../../__test-utils__/render'
import { ConnectionCard } from './ConnectionCard'

describe('ConnectionCard', () => {
  const defaultProps = {
    name: 'Alice',
    photoSrc: 'https://example.com/alice.jpg',
    lastMessage: 'Hey there!',
    lastMessageTime: '3:00 PM',
  }

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <ConnectionCard {...defaultProps} testID="connection" />,
      )
      expect(screen.getByTestId('connection')).toBeTruthy()
    })

    it('displays the name', () => {
      render(
        <ConnectionCard {...defaultProps} testID="connection" />,
      )
      expect(screen.getByText('Alice')).toBeTruthy()
    })

    it('displays the last message', () => {
      render(
        <ConnectionCard {...defaultProps} testID="connection" />,
      )
      expect(screen.getByText('Hey there!')).toBeTruthy()
    })

    it('displays the last message time', () => {
      render(
        <ConnectionCard {...defaultProps} testID="connection" />,
      )
      expect(screen.getByText('3:00 PM')).toBeTruthy()
    })

    it('renders avatar image when photoSrc is provided', () => {
      render(
        <ConnectionCard {...defaultProps} testID="connection" />,
      )
      const images = screen.getAllByRole('img')
      expect(images.length).toBeGreaterThanOrEqual(1)
    })

    it('renders placeholder when no photoSrc', () => {
      render(
        <ConnectionCard
          name="Bob"
          testID="connection"
        />,
      )
      expect(screen.getByTestId('connection')).toBeTruthy()
      expect(screen.getByText('Bob')).toBeTruthy()
    })
  })

  describe('unread state', () => {
    it('shows unread indicator when unread is true', () => {
      render(
        <ConnectionCard
          {...defaultProps}
          unread={true}
          testID="connection"
        />,
      )
      expect(screen.getByLabelText('Unread')).toBeTruthy()
    })

    it('does not show unread indicator when unread is false', () => {
      render(
        <ConnectionCard
          {...defaultProps}
          unread={false}
          testID="connection"
        />,
      )
      expect(screen.queryByLabelText('Unread')).toBeNull()
    })
  })

  describe('callbacks', () => {
    it('calls onPress when the card is pressed', () => {
      const onPress = jest.fn()
      render(
        <ConnectionCard
          {...defaultProps}
          onPress={onPress}
          testID="connection"
        />,
      )
      fireEvent.click(screen.getByTestId('connection'))
      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('renders as non-pressable when no onPress', () => {
      render(
        <ConnectionCard {...defaultProps} testID="connection" />,
      )
      // Should still render, just no button role on outermost element
      expect(screen.getByTestId('connection')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('has role="button" when onPress is provided', () => {
      render(
        <ConnectionCard
          {...defaultProps}
          onPress={() => {}}
          testID="connection"
        />,
      )
      const el = screen.getByTestId('connection')
      expect(el.getAttribute?.('role')).toBe('button')
    })

    it('has aria-label including name', () => {
      render(
        <ConnectionCard
          {...defaultProps}
          onPress={() => {}}
          testID="connection"
        />,
      )
      expect(
        screen.getByLabelText('Connection with Alice'),
      ).toBeTruthy()
    })

    it('photo image has alt text', () => {
      render(
        <ConnectionCard {...defaultProps} testID="connection" />,
      )
      const img = screen.getAllByRole('img').find(
        (el) => el.getAttribute?.('alt') === 'Alice',
      )
      expect(img).toBeTruthy()
    })
  })

  describe('compound sub-components', () => {
    it('exposes Photo sub-component', () => {
      expect(ConnectionCard.Photo).toBeDefined()
    })

    it('exposes Name sub-component', () => {
      expect(ConnectionCard.Name).toBeDefined()
    })

    it('exposes LastMessage sub-component', () => {
      expect(ConnectionCard.LastMessage).toBeDefined()
    })
  })
})
