import { render, screen } from '../../__test-utils__/render'
import { CartItemRow } from './CartItemRow'

describe('CartItemRow', () => {
  it('renders without crashing', () => {
    render(<CartItemRow testID="cartitemrow" />)
    expect(screen.getByTestId('cartitemrow')).toBeTruthy()
  })
})
