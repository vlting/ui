import { render, screen } from '../../__test-utils__/render'
import { CartDrawer } from './CartDrawer'

describe('CartDrawer', () => {
  it('renders without crashing', () => {
    render(<CartDrawer testID="cartdrawer" />)
    expect(screen.getByTestId('cartdrawer')).toBeTruthy()
  })
})
