import { fireEvent, render, screen } from '../../__test-utils__/render'
import { DirectMessageThread, type DMMessage } from './DirectMessageThread'

describe('DirectMessageThread', () => {
  const sampleMessages: DMMessage[] = [
    {
      id: '1',
      content: 'Hey, how are you?',
      timestamp: '3:00 PM',
      isCurrentUser: false,
    },
    {
      id: '2',
      content: 'Doing great, thanks!',
      timestamp: '3:01 PM',
      isCurrentUser: true,
    },
    {
      id: '3',
      content: 'Want to grab coffee sometime?',
      timestamp: '3:02 PM',
      isCurrentUser: false,
    },
  ]

  const defaultProps = {
    messages: sampleMessages,
    recipientName: 'Jamie',
  }

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <DirectMessageThread {...defaultProps} testID="dm-thread" />,
      )
      expect(screen.getByTestId('dm-thread')).toBeTruthy()
    })

    it('displays the recipient name', () => {
      render(
        <DirectMessageThread {...defaultProps} testID="dm-thread" />,
      )
      expect(screen.getByText('Jamie')).toBeTruthy()
    })

    it('displays all message contents', () => {
      render(
        <DirectMessageThread {...defaultProps} testID="dm-thread" />,
      )
      expect(screen.getByText('Hey, how are you?')).toBeTruthy()
      expect(screen.getByText('Doing great, thanks!')).toBeTruthy()
      expect(screen.getByText('Want to grab coffee sometime?')).toBeTruthy()
    })

    it('displays timestamps', () => {
      render(
        <DirectMessageThread {...defaultProps} testID="dm-thread" />,
      )
      expect(screen.getByText('3:00 PM')).toBeTruthy()
      expect(screen.getByText('3:01 PM')).toBeTruthy()
      expect(screen.getByText('3:02 PM')).toBeTruthy()
    })

    it('renders empty message list', () => {
      render(
        <DirectMessageThread
          messages={[]}
          recipientName="Jamie"
          testID="dm-thread"
        />,
      )
      expect(screen.getByTestId('dm-thread')).toBeTruthy()
    })

    it('renders without recipient name', () => {
      render(
        <DirectMessageThread
          messages={sampleMessages}
          testID="dm-thread"
        />,
      )
      expect(screen.getByTestId('dm-thread')).toBeTruthy()
    })
  })

  describe('back button', () => {
    it('renders back button when onBack is provided', () => {
      const onBack = jest.fn()
      render(
        <DirectMessageThread
          {...defaultProps}
          onBack={onBack}
          testID="dm-thread"
        />,
      )
      expect(screen.getByLabelText('Go back')).toBeTruthy()
    })

    it('does not render back button when onBack is not provided', () => {
      render(
        <DirectMessageThread {...defaultProps} testID="dm-thread" />,
      )
      expect(screen.queryByLabelText('Go back')).toBeNull()
    })

    it('calls onBack when back button is pressed', () => {
      const onBack = jest.fn()
      render(
        <DirectMessageThread
          {...defaultProps}
          onBack={onBack}
          testID="dm-thread"
        />,
      )
      fireEvent.click(screen.getByLabelText('Go back'))
      expect(onBack).toHaveBeenCalledTimes(1)
    })
  })

  describe('input', () => {
    it('renders input with placeholder', () => {
      render(
        <DirectMessageThread
          {...defaultProps}
          onSendMessage={() => {}}
          testID="dm-thread"
        />,
      )
      expect(screen.getByPlaceholderText('Write a message...')).toBeTruthy()
    })

    it('renders send button', () => {
      render(
        <DirectMessageThread
          {...defaultProps}
          onSendMessage={() => {}}
          testID="dm-thread"
        />,
      )
      expect(screen.getByLabelText('Send message')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('message area has role="log"', () => {
      render(
        <DirectMessageThread {...defaultProps} testID="dm-thread" />,
      )
      expect(screen.getByRole('log')).toBeTruthy()
    })

    it('message area has aria-live="polite"', () => {
      render(
        <DirectMessageThread {...defaultProps} testID="dm-thread" />,
      )
      const log = screen.getByRole('log')
      expect(log.getAttribute?.('aria-live')).toBe('polite')
    })

    it('has aria-label with recipient name', () => {
      render(
        <DirectMessageThread {...defaultProps} testID="dm-thread" />,
      )
      expect(
        screen.getByLabelText('Conversation with Jamie'),
      ).toBeTruthy()
    })

    it('has fallback aria-label without recipient name', () => {
      render(
        <DirectMessageThread
          messages={sampleMessages}
          testID="dm-thread"
        />,
      )
      expect(
        screen.getByLabelText('Direct message thread'),
      ).toBeTruthy()
    })

    it('send button has aria-label', () => {
      render(
        <DirectMessageThread
          {...defaultProps}
          onSendMessage={() => {}}
          testID="dm-thread"
        />,
      )
      expect(screen.getByLabelText('Send message')).toBeTruthy()
    })

    it('message input has aria-label', () => {
      render(
        <DirectMessageThread
          {...defaultProps}
          onSendMessage={() => {}}
          testID="dm-thread"
        />,
      )
      expect(screen.getByLabelText('Message input')).toBeTruthy()
    })

    it('back button has aria-label', () => {
      render(
        <DirectMessageThread
          {...defaultProps}
          onBack={() => {}}
          testID="dm-thread"
        />,
      )
      expect(screen.getByLabelText('Go back')).toBeTruthy()
    })
  })

  describe('compound sub-components', () => {
    it('exposes Header sub-component', () => {
      expect(DirectMessageThread.Header).toBeDefined()
    })

    it('exposes Messages sub-component', () => {
      expect(DirectMessageThread.Messages).toBeDefined()
    })

    it('exposes Input sub-component', () => {
      expect(DirectMessageThread.Input).toBeDefined()
    })
  })
})
