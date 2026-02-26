import { render, screen } from '../../src/__test-utils__/render'

// @ts-expect-error Tamagui v2 RC GetProps bug
import { Spacer } from './Spacer'

describe('Spacer', () => {
  it('renders without errors', () => {
    render(<Spacer testID="spacer" />)
    expect(screen.getByTestId('spacer')).toBeTruthy()
  })

  it('accepts size variant', () => {
    render(<Spacer size="md" testID="spacer" />)
    expect(screen.getByTestId('spacer')).toBeTruthy()
  })

  it.skip('applies flex:1 when no size is set', () => {
    // TODO: requires browser environment for computed styles
    render(<Spacer testID="spacer" />)
    expect(screen.getByTestId('spacer')).toBeTruthy()
  })

  it('renders each size variant without errors', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
    for (const size of sizes) {
      const { unmount } = render(<Spacer size={size} testID="spacer" />)
      expect(screen.getByTestId('spacer')).toBeTruthy()
      unmount()
    }
  })
})
