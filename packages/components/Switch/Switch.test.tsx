import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
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

  // -- Interaction --

  it('toggles on click', () => {
    const onChange = jest.fn()
    render(<Switch onCheckedChange={onChange} aria-label="Toggle" />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('fires onCheckedChange with correct value on toggle back', () => {
    const onChange = jest.fn()
    render(<Switch defaultChecked onCheckedChange={onChange} aria-label="Toggle" />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(false)
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
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')
  })

  it('has checked state when checked=true', () => {
    render(<Switch checked aria-label="Toggle" />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })

  it('supports defaultChecked', () => {
    render(<Switch defaultChecked aria-label="Toggle" />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
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

  // -- Controlled mode --

  it('respects controlled checked prop', () => {
    const { rerender } = render(<Switch checked={false} aria-label="Toggle" />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')
    rerender(<Switch checked={true} aria-label="Toggle" />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })

  // -- Disabled state --

  it('renders disabled state without crashing', () => {
    expect(() => render(<Switch disabled />)).not.toThrow()
  })

  it('does not call onCheckedChange when disabled', () => {
    const onChange = jest.fn()
    render(<Switch disabled onCheckedChange={onChange} aria-label="Toggle" />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).not.toHaveBeenCalled()
  })

  // -- Form name --

  it('renders hidden input with name when name prop provided', () => {
    const { container } = render(<Switch name="notifications" aria-label="Toggle" />)
    const hidden = container.querySelector('input[type="hidden"]')
    expect(hidden).toBeTruthy()
    expect(hidden).toHaveAttribute('name', 'notifications')
    expect(hidden).toHaveAttribute('value', 'off')
  })

  it('hidden input value reflects checked state', () => {
    const { container } = render(<Switch name="notifications" defaultChecked aria-label="Toggle" />)
    const hidden = container.querySelector('input[type="hidden"]')
    expect(hidden).toHaveAttribute('value', 'on')
  })
})
