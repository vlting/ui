import { render, screen } from '../../__test-utils__/render'
import { ProductGallery } from './ProductGallery'

describe('ProductGallery', () => {
  it('renders without crashing', () => {
    render(<ProductGallery testID="productgallery" />)
    expect(screen.getByTestId('productgallery')).toBeTruthy()
  })
})
