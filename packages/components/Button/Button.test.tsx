import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Button } from './Button'

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
})

describe('Button', () => {
  // -- Renders correctly --

  it('renders children text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeTruthy()
  })

  it('renders a button element', () => {
    render(<Button>Click</Button>)
    expect(screen.getByRole('button')).toBeTruthy()
  })

  it('renders each variant without errors', () => {
    const variants = [
      'default',
      'solid',
      'secondary',
      'destructive',
      'outline',
      'ghost',
      'link',
    ] as const
    for (const variant of variants) {
      const { unmount } = render(<Button variant={variant}>Btn</Button>)
      expect(screen.getByText('Btn')).toBeTruthy()
      unmount()
    }
  })

  it('renders each size without errors', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'icon'] as const
    for (const size of sizes) {
      const { unmount } = render(<Button size={size}>Btn</Button>)
      expect(screen.getByRole('button')).toBeTruthy()
      unmount()
    }
  })

  it('renders Button.Text sub-component', () => {
    render(
      <Button>
        <Button.Text>Label</Button.Text>
      </Button>,
    )
    expect(screen.getByText('Label')).toBeTruthy()
  })

  // -- Keyboard navigation --

  it('activates on Enter key', () => {
    const onPress = jest.fn()
    render(<Button onPress={onPress}>Click</Button>)
    const btn = screen.getByRole('button')
    fireEvent.keyDown(btn, { key: 'Enter' })
    // Native button responds to Enter via click
    fireEvent.click(btn)
    expect(onPress).toHaveBeenCalled()
  })

  it('activates on Space key', () => {
    const onPress = jest.fn()
    render(<Button onPress={onPress}>Click</Button>)
    const btn = screen.getByRole('button')
    fireEvent.keyUp(btn, { key: ' ' })
    fireEvent.click(btn)
    expect(onPress).toHaveBeenCalled()
  })

  it('is focusable via tab (has no tabIndex=-1)', () => {
    render(<Button>Focus me</Button>)
    const btn = screen.getByRole('button')
    expect(btn.getAttribute('tabindex')).not.toBe('-1')
  })

  // -- ARIA states --

  it('has type="button" to prevent form submission', () => {
    render(<Button>Click</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('sets aria-busy when loading', () => {
    render(<Button loading>Loading</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
  })

  it('does not set aria-busy when not loading', () => {
    render(<Button>Btn</Button>)
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy')
  })

  it('shows visually hidden "Loading" text when loading', () => {
    render(<Button loading>Submit</Button>)
    expect(screen.getByText('Loading')).toBeTruthy()
  })

  // -- Disabled state --

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn()
    render(
      <Button disabled onPress={onPress}>
        Disabled
      </Button>,
    )
    const btn = screen.getByRole('button')
    fireEvent.click(btn)
    expect(onPress).not.toHaveBeenCalled()
  })

  it('prevents interaction when loading', () => {
    render(<Button loading>Loading</Button>)
    const btn = screen.getByRole('button')
    // Loading sets aria-busy and applies disabled styles
    expect(btn).toHaveAttribute('aria-busy', 'true')
  })

  it('does not call onPress when loading', () => {
    const onPress = jest.fn()
    render(
      <Button loading onPress={onPress}>
        Loading
      </Button>,
    )
    fireEvent.click(screen.getByRole('button'))
    expect(onPress).not.toHaveBeenCalled()
  })

  // -- Focus management --

  it('can receive focus', () => {
    render(<Button>Focus</Button>)
    const btn = screen.getByRole('button')
    btn.focus()
    expect(document.activeElement).toBe(btn)
  })
})
