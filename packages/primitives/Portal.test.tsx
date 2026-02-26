import { render, screen } from '../../src/__test-utils__/render'
import { Portal } from './Portal'

describe('Portal', () => {
  it('renders children', () => {
    render(
      <Portal>
        <div data-testid="portal-child">Portal Content</div>
      </Portal>,
    )
    // Portal renders children — they may be in a portal container
    expect(screen.getByTestId('portal-child')).toBeTruthy()
  })

  it('renders without errors when empty', () => {
    expect(() => render(<Portal>{null}</Portal>)).not.toThrow()
  })
})
