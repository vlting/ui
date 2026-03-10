import { render, screen } from '../../src/__test-utils__/render'
import { Spacer } from './Spacer'

describe('Spacer', () => {
  it('renders without errors', () => {
    render(<Spacer data-testid="spacer" />)
    expect(screen.getByTestId('spacer')).toBeTruthy()
  })

  it('accepts size variant', () => {
    render(<Spacer size="md" data-testid="spacer" />)
    expect(screen.getByTestId('spacer')).toBeTruthy()
  })

  it.skip('applies flex:1 when no size is set', () => {
    // TODO: requires browser environment for computed styles
    render(<Spacer data-testid="spacer" />)
    expect(screen.getByTestId('spacer')).toBeTruthy()
  })

  it('renders each size variant without errors', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
    for (const size of sizes) {
      const { unmount } = render(<Spacer size={size} data-testid="spacer" />)
      expect(screen.getByTestId('spacer')).toBeTruthy()
      unmount()
    }
  })
})
