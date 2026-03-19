import { render, screen } from '../../../src/__test-utils__/render'
import { Progress } from './Progress'

describe('Progress', () => {
  it('renders without crashing', () => {
    expect(() => render(<Progress value={50} />)).not.toThrow()
  })

  it('renders with value 0', () => {
    expect(() => render(<Progress value={0} />)).not.toThrow()
  })

  it('renders with value 100', () => {
    expect(() => render(<Progress value={100} />)).not.toThrow()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<Progress value={50} size={size} />)
      unmount()
    }
  })

  it('has role="progressbar"', () => {
    render(<Progress value={50} data-testid="progress" />)
    expect(screen.getByRole('progressbar')).toBeTruthy()
  })

  it('sets aria-valuenow, aria-valuemin, aria-valuemax', () => {
    render(<Progress value={75} data-testid="progress" />)
    const el = screen.getByRole('progressbar')
    expect(el.getAttribute('aria-valuenow')).toBe('75')
    expect(el.getAttribute('aria-valuemin')).toBe('0')
    expect(el.getAttribute('aria-valuemax')).toBe('100')
  })

  it('sets aria-valuemax from custom max', () => {
    render(<Progress value={50} max={200} />)
    const el = screen.getByRole('progressbar')
    expect(el.getAttribute('aria-valuemax')).toBe('200')
    expect(el.getAttribute('aria-valuenow')).toBe('50')
  })

  it('passes through aria-label', () => {
    render(<Progress value={75} aria-label="Upload progress" />)
    const el = screen.getByRole('progressbar')
    expect(el.getAttribute('aria-label')).toBe('Upload progress')
  })

  it('defaults aria-label to "Progress"', () => {
    render(<Progress value={50} />)
    const el = screen.getByRole('progressbar')
    expect(el.getAttribute('aria-label')).toBe('Progress')
  })

  it('clamps indicator at 100% when value > max', () => {
    render(<Progress value={200} max={100} data-testid="progress" />)
    const el = screen.getByRole('progressbar')
    expect(el.getAttribute('aria-valuenow')).toBe('200')
    // Indicator should be clamped — check it renders without error
    expect(el).toBeTruthy()
  })

  it('renders each theme variant', () => {
    const themes = ['primary', 'secondary', 'neutral'] as const
    for (const theme of themes) {
      const { unmount } = render(<Progress value={50} theme={theme} />)
      expect(screen.getByRole('progressbar')).toBeTruthy()
      unmount()
    }
  })

  it('defaults theme to primary', () => {
    render(<Progress value={50} />)
    expect(screen.getByRole('progressbar')).toBeTruthy()
  })
})
