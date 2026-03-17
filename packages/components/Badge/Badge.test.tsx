import { render, screen } from '../../../src/__test-utils__/render'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders with default props', () => {
    render(<Badge data-testid="badge">Default</Badge>)
    expect(screen.getByTestId('badge')).toBeTruthy()
  })

  it('renders text content', () => {
    render(<Badge>Active</Badge>)
    expect(screen.getByText('Active')).toBeTruthy()
  })

  it('renders each theme variant', () => {
    const themes = ['primary', 'secondary', 'neutral', 'success', 'warning', 'error', 'info'] as const
    for (const theme of themes) {
      const { unmount } = render(
        <Badge theme={theme} data-testid="badge">
          {theme}
        </Badge>,
      )
      expect(screen.getByTestId('badge')).toBeTruthy()
      unmount()
    }
  })

  it('renders each style variant', () => {
    const variants = ['solid', 'subtle', 'outline'] as const
    for (const variant of variants) {
      const { unmount } = render(
        <Badge variant={variant} data-testid="badge">
          {variant}
        </Badge>,
      )
      expect(screen.getByTestId('badge')).toBeTruthy()
      unmount()
    }
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(
        <Badge size={size} data-testid="badge">
          {size}
        </Badge>,
      )
      expect(screen.getByTestId('badge')).toBeTruthy()
      unmount()
    }
  })
})
