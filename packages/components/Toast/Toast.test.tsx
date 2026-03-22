import { act } from '@testing-library/react'
import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Toast, Toaster } from './Toast'
import { __resetStore, toast } from './toast-imperative'

beforeEach(() => {
  __resetStore()
})

describe('Toast compound component', () => {
  it('renders title and description', () => {
    render(
      <Toast.Root>
        <Toast.Title>Saved</Toast.Title>
        <Toast.Description>Your changes have been saved.</Toast.Description>
      </Toast.Root>,
    )
    expect(screen.getByText('Saved')).toBeTruthy()
    expect(screen.getByText('Your changes have been saved.')).toBeTruthy()
  })

  it('renders with theme variants', () => {
    const themes = ['neutral', 'success', 'error', 'warning', 'info'] as const
    for (const theme of themes) {
      const { unmount } = render(
        <Toast.Root theme={theme}>
          <Toast.Title>{theme}</Toast.Title>
        </Toast.Root>,
      )
      expect(screen.getByText(theme)).toBeTruthy()
      unmount()
    }
  })

  it('renders close button and responds to click', () => {
    const onClose = jest.fn()
    render(
      <Toast.Root>
        <Toast.Title>Test</Toast.Title>
        <Toast.Close onClose={onClose} />
      </Toast.Root>,
    )
    fireEvent.click(screen.getByLabelText('Dismiss'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders action button that is clickable', () => {
    const onAction = jest.fn()
    render(
      <Toast.Root>
        <Toast.Title>Deleted</Toast.Title>
        <Toast.Action onClick={onAction}>Undo</Toast.Action>
      </Toast.Root>,
    )
    fireEvent.click(screen.getByText('Undo'))
    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it('has role="status" on root', () => {
    render(
      <Toast.Root data-testid="toast-root">
        <Toast.Title>Test</Toast.Title>
      </Toast.Root>,
    )
    expect(screen.getByTestId('toast-root').getAttribute('role')).toBe('status')
  })
})

describe('toast() imperative API', () => {
  it('adds a toast to the queue', () => {
    const id = toast('Hello')
    expect(id).toBe('toast-1')
  })

  it('toast.success sets correct variant', () => {
    toast.success('Done')
    let toasts: any[] = []
    function Spy() {
      const { useImperativeToasts } = require('./toast-imperative')
      toasts = useImperativeToasts()
      return null
    }
    render(<Spy />)
    expect(toasts).toHaveLength(1)
    expect(toasts[0].variant).toBe('success')
    expect(toasts[0].title).toBe('Done')
  })

  it('toast.error sets correct variant', () => {
    toast.error('Failed')
    let toasts: any[] = []
    function Spy() {
      const { useImperativeToasts } = require('./toast-imperative')
      toasts = useImperativeToasts()
      return null
    }
    render(<Spy />)
    expect(toasts).toHaveLength(1)
    expect(toasts[0].variant).toBe('error')
  })

  it('toast.warning sets correct variant', () => {
    toast.warning('Caution')
    let toasts: any[] = []
    function Spy() {
      const { useImperativeToasts } = require('./toast-imperative')
      toasts = useImperativeToasts()
      return null
    }
    render(<Spy />)
    expect(toasts[0].variant).toBe('warning')
  })

  it('toast.info sets correct variant', () => {
    toast.info('FYI')
    let toasts: any[] = []
    function Spy() {
      const { useImperativeToasts } = require('./toast-imperative')
      toasts = useImperativeToasts()
      return null
    }
    render(<Spy />)
    expect(toasts[0].variant).toBe('info')
  })

  it('toast.dismiss removes a toast', () => {
    const id = toast('Temp')
    toast.dismiss(id)
    let toasts: any[] = []
    function Spy() {
      const { useImperativeToasts } = require('./toast-imperative')
      toasts = useImperativeToasts()
      return null
    }
    render(<Spy />)
    expect(toasts).toHaveLength(0)
  })

  it('multiple toasts stack', () => {
    toast('One')
    toast.success('Two')
    toast.error('Three')
    let toasts: any[] = []
    function Spy() {
      const { useImperativeToasts } = require('./toast-imperative')
      toasts = useImperativeToasts()
      return null
    }
    render(<Spy />)
    expect(toasts).toHaveLength(3)
  })
})

describe('Toaster', () => {
  it('renders toasts from the queue in a portal', () => {
    toast('Portal toast')
    render(<Toaster />)
    expect(screen.getByText('Portal toast')).toBeTruthy()
  })

  it('renders nothing when queue is empty', () => {
    const { container } = render(<Toaster />)
    expect(container.querySelector('[aria-live]')).toBeNull()
  })

  it('dismiss button removes toast from queue', () => {
    toast('Dismissable')
    render(<Toaster />)
    expect(screen.getByText('Dismissable')).toBeTruthy()
    fireEvent.click(screen.getByLabelText('Dismiss'))
    expect(screen.queryByText('Dismissable')).toBeNull()
  })

  it('auto-dismisses after duration', () => {
    jest.useFakeTimers()
    toast({ title: 'Auto', duration: 2000 })
    render(<Toaster />)
    expect(screen.getByText('Auto')).toBeTruthy()
    act(() => { jest.advanceTimersByTime(2100) })
    expect(screen.queryByText('Auto')).toBeNull()
    jest.useRealTimers()
  })

  it('has aria-live="polite" on viewport', () => {
    toast('A11y check')
    render(<Toaster />)
    const viewport = screen.getByLabelText('Notifications')
    expect(viewport.getAttribute('aria-live')).toBe('polite')
  })
})
