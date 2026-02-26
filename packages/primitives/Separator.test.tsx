import { render, screen } from '../../src/__test-utils__/render'

// @ts-expect-error Tamagui v2 RC GetProps bug
import { Separator } from './Separator'

describe('Separator', () => {
  it('renders without errors', () => {
    render(<Separator testID="separator" />)
    expect(screen.getByTestId('separator')).toBeTruthy()
  })

  it.skip('has role="separator"', () => {
    // TODO: Tamagui styled View may not render role in JSDOM
    render(<Separator testID="separator" />)
    expect(screen.getByRole('separator')).toBeTruthy()
  })

  it('accepts horizontal orientation', () => {
    render(<Separator orientation="horizontal" testID="sep" />)
    expect(screen.getByTestId('sep')).toBeTruthy()
  })

  it('accepts vertical orientation', () => {
    render(<Separator orientation="vertical" testID="sep" />)
    expect(screen.getByTestId('sep')).toBeTruthy()
  })

  it('accepts decorative variant', () => {
    render(<Separator decorative testID="sep" />)
    expect(screen.getByTestId('sep')).toBeTruthy()
  })
})
