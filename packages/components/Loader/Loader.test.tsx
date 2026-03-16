import { render, screen } from '../../../src/__test-utils__/render'
import { Loader } from './Loader'

describe('Loader', () => {
  it('renders without crashing', () => {
    expect(() => render(<Loader />)).not.toThrow()
  })

  it('has role="status"', () => {
    render(<Loader data-testid="loader" />)
    expect(screen.getByRole('status')).toBeTruthy()
  })

  it('has default aria-label "Loading"', () => {
    render(<Loader />)
    expect(screen.getByRole('status').getAttribute('aria-label')).toBe('Loading')
  })

  it('accepts custom aria-label', () => {
    render(<Loader aria-label="Fetching data" />)
    expect(screen.getByRole('status').getAttribute('aria-label')).toBe('Fetching data')
  })

  it('renders each variant', () => {
    const variants = ['primary', 'min', 'max'] as const
    for (const variant of variants) {
      const { unmount } = render(<Loader variant={variant} />)
      expect(screen.getByRole('status')).toBeTruthy()
      unmount()
    }
  })

  it('renders each size', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<Loader size={size} />)
      expect(screen.getByRole('status')).toBeTruthy()
      unmount()
    }
  })

  it('renders Spinner internally (SVG present)', () => {
    const { container } = render(<Loader />)
    expect(container.querySelector('svg')).toBeTruthy()
  })
})
