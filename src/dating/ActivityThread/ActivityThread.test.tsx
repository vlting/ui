import { fireEvent, render, screen } from '../../__test-utils__/render'
import { ActivityThread, type ThreadMessage } from './ActivityThread'

describe('ActivityThread', () => {
  const sampleMessages: ThreadMessage[] = [
    {
      id: '1',
      authorName: 'Alice',
      authorPhotoSrc: 'https://example.com/alice.jpg',
      content: 'Hello everyone!',
      timestamp: '10:00 AM',
      isCurrentUser: false,
    },
    {
      id: '2',
      authorName: 'You',
      content: 'Hey Alice!',
      timestamp: '10:01 AM',
      isCurrentUser: true,
    },
    {
      id: '3',
      authorName: 'Bob',
      content: 'Welcome to the group!',
      timestamp: '10:02 AM',
      isCurrentUser: false,
    },
  ]

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <ActivityThread
          messages={sampleMessages}
          testID="thread"
        />,
      )
      expect(screen.getByTestId('thread')).toBeTruthy()
    })

    it('displays the title when provided', () => {
      render(
        <ActivityThread
          messages={sampleMessages}
          title="Pod Discussion"
          testID="thread"
        />,
      )
      expect(screen.getByText('Pod Discussion')).toBeTruthy()
    })

    it('renders without title when not provided', () => {
      render(
        <ActivityThread
          messages={sampleMessages}
          testID="thread"
        />,
      )
      expect(screen.queryByText('Pod Discussion')).toBeNull()
    })

    it('displays all message contents', () => {
      render(
        <ActivityThread
          messages={sampleMessages}
          testID="thread"
        />,
      )
      expect(screen.getByText('Hello everyone!')).toBeTruthy()
      expect(screen.getByText('Hey Alice!')).toBeTruthy()
      expect(screen.getByText('Welcome to the group!')).toBeTruthy()
    })

    it('displays author names for non-current-user messages', () => {
      render(
        <ActivityThread
          messages={sampleMessages}
          testID="thread"
        />,
      )
      expect(screen.getByText('Alice')).toBeTruthy()
      expect(screen.getByText('Bob')).toBeTruthy()
    })

    it('displays timestamps', () => {
      render(
        <ActivityThread
          messages={sampleMessages}
          testID="thread"
        />,
      )
      expect(screen.getByText('10:00 AM')).toBeTruthy()
      expect(screen.getByText('10:01 AM')).toBeTruthy()
    })

    it('renders empty message list', () => {
      render(
        <ActivityThread
          messages={[]}
          testID="thread"
        />,
      )
      expect(screen.getByTestId('thread')).toBeTruthy()
    })
  })

  describe('input', () => {
    it('renders input with placeholder', () => {
      render(
        <ActivityThread
          messages={sampleMessages}
          onSendMessage={() => {}}
          testID="thread"
        />,
      )
      expect(screen.getByPlaceholderText('Write a response...')).toBeTruthy()
    })

    it('renders send button', () => {
      render(
        <ActivityThread
          messages={sampleMessages}
          onSendMessage={() => {}}
          testID="thread"
        />,
      )
      expect(screen.getByLabelText('Send message')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('message area has role="log"', () => {
      render(
        <ActivityThread
          messages={sampleMessages}
          testID="thread"
        />,
      )
      expect(screen.getByRole('log')).toBeTruthy()
    })

    it('message area has aria-live="polite"', () => {
      render(
        <ActivityThread
          messages={sampleMessages}
          testID="thread"
        />,
      )
      const log = screen.getByRole('log')
      expect(log.getAttribute?.('aria-live')).toBe('polite')
    })

    it('has aria-label on the container', () => {
      render(
        <ActivityThread
          messages={sampleMessages}
          title="Pod Discussion"
          testID="thread"
        />,
      )
      expect(
        screen.getByLabelText('Activity thread: Pod Discussion'),
      ).toBeTruthy()
    })

    it('send button has aria-label', () => {
      render(
        <ActivityThread
          messages={sampleMessages}
          onSendMessage={() => {}}
          testID="thread"
        />,
      )
      expect(screen.getByLabelText('Send message')).toBeTruthy()
    })

    it('message input has aria-label', () => {
      render(
        <ActivityThread
          messages={sampleMessages}
          onSendMessage={() => {}}
          testID="thread"
        />,
      )
      expect(screen.getByLabelText('Message input')).toBeTruthy()
    })
  })

  describe('compound sub-components', () => {
    it('exposes Header sub-component', () => {
      expect(ActivityThread.Header).toBeDefined()
    })

    it('exposes Messages sub-component', () => {
      expect(ActivityThread.Messages).toBeDefined()
    })

    it('exposes Input sub-component', () => {
      expect(ActivityThread.Input).toBeDefined()
    })
  })
})
