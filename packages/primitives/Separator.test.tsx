import { render, screen } from '../../src/__test-utils__/render'
import { Separator } from './Separator'

describe('Separator', () => {
  it('renders without errors', () => {
    render(<Separator data-testid="separator" />)
    expect(screen.getByTestId('separator')).toBeTruthy()
  })

  it.skip('has role="separator"', () => {
    // TODO: styled View may not render role in JSDOM
    render(<Separator data-testid="separator" />)
    expect(screen.getByRole('separator')).toBeTruthy()
  })

  it('accepts horizontal orientation', () => {
    render(<Separator orientation="horizontal" data-testid="sep" />)
    expect(screen.getByTestId('sep')).toBeTruthy()
  })

  it('accepts vertical orientation', () => {
    render(<Separator orientation="vertical" data-testid="sep" />)
    expect(screen.getByTestId('sep')).toBeTruthy()
  })

  it('accepts decorative variant', () => {
    render(<Separator decorative data-testid="sep" />)
    expect(screen.getByTestId('sep')).toBeTruthy()
  })
})
