import { render, screen } from '../../../src/__test-utils__/render'
import { Slider } from './Slider'

beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver

  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
})

describe('Slider', () => {
  // -- Renders correctly --

  it('renders without crashing', () => {
    expect(() => render(<Slider />)).not.toThrow()
  })

  it('renders with explicit value', () => {
    expect(() => render(<Slider value={50} />)).not.toThrow()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<Slider size={size} />)
      unmount()
    }
  })

  // -- ARIA states --

  it('has slider role', () => {
    render(<Slider aria-label="Volume" />)
    expect(screen.getByRole('slider')).toBeTruthy()
  })

  it('has aria-valuenow matching value', () => {
    render(<Slider value={42} aria-label="Volume" />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '42')
  })

  it('has aria-valuemin and aria-valuemax', () => {
    render(<Slider min={10} max={90} aria-label="Volume" />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('aria-valuemin', '10')
    expect(slider).toHaveAttribute('aria-valuemax', '90')
  })

  it('has aria-label when provided', () => {
    render(<Slider aria-label="Brightness" />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-label', 'Brightness')
  })

  // -- Focus management --

  it('is focusable (tabIndex=0)', () => {
    render(<Slider aria-label="Volume" />)
    expect(screen.getByRole('slider').getAttribute('tabindex')).toBe('0')
  })

  it('is not focusable when disabled (tabIndex=-1)', () => {
    render(<Slider disabled aria-label="Volume" />)
    expect(screen.getByRole('slider').getAttribute('tabindex')).toBe('-1')
  })

  // -- Disabled state --

  it('renders disabled state', () => {
    expect(() => render(<Slider disabled />)).not.toThrow()
  })
})
