import { render, screen, fireEvent } from '../../../src/__test-utils__/render'
import { Switch } from './Switch'

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
})

describe('Switch', () => {
  // -- Renders correctly --

  it('renders without crashing', () => {
    expect(() => render(<Switch />)).not.toThrow()
  })

  it('renders a switch role element', () => {
    render(<Switch aria-label="Toggle" />)
    expect(screen.getByRole('switch')).toBeTruthy()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<Switch size={size} />)
      unmount()
    }
  })

  // -- Keyboard navigation --

  it('toggles on click', () => {
    const onChange = jest.fn()
    render(<Switch onCheckedChange={onChange} aria-label="Toggle" />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalled()
  })

  it('is focusable', () => {
    render(<Switch aria-label="Toggle" />)
    const el = screen.getByRole('switch')
    el.focus()
    expect(document.activeElement).toBe(el)
  })

  // -- ARIA states --

  it('has unchecked state by default', () => {
    render(<Switch aria-label="Toggle" />)
    expect(screen.getByRole('switch')).not.toBeChecked()
  })

  it('has checked state when checked=true', () => {
    render(<Switch checked aria-label="Toggle" />)
    expect(screen.getByRole('switch')).toBeChecked()
  })

  it('supports defaultChecked', () => {
    render(<Switch defaultChecked aria-label="Toggle" />)
    expect(screen.getByRole('switch')).toBeChecked()
  })

  it('has aria-checked="true" when checked', () => {
    render(<Switch checked aria-label="Toggle" />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })

  it('has aria-checked="false" when unchecked', () => {
    render(<Switch aria-label="Toggle" />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')
  })

  it('toggles aria-checked on click (uncontrolled)', () => {
    render(<Switch aria-label="Toggle" />)
    const sw = screen.getByRole('switch')
    expect(sw).toHaveAttribute('aria-checked', 'false')
    fireEvent.click(sw)
    expect(sw).toHaveAttribute('aria-checked', 'true')
    fireEvent.click(sw)
    expect(sw).toHaveAttribute('aria-checked', 'false')
  })

  // -- Disabled state --

  it('renders disabled state without crashing', () => {
    expect(() => render(<Switch disabled />)).not.toThrow()
  })

  it('applies disabled state when disabled prop is true', () => {
    const onChange = jest.fn()
    render(<Switch disabled onCheckedChange={onChange} aria-label="Toggle" />)
    const sw = screen.getByRole('switch')
    fireEvent.click(sw)
    // Disabled switch should not toggle
    expect(onChange).not.toHaveBeenCalled()
  })

  it('does not call onCheckedChange when disabled', () => {
    const onChange = jest.fn()
    render(<Switch disabled onCheckedChange={onChange} aria-label="Toggle" />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
