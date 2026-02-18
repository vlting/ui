import { render, screen } from '../../__test-utils__/render'
import { ProductCard } from './ProductCard'

describe('ProductCard', () => {
  it('renders without crashing', () => {
    render(<ProductCard testID="productcard" />)
    expect(screen.getByTestId('productcard')).toBeTruthy()
  })
})
