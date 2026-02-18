import { render, screen } from '../../__test-utils__/render'
import { PriceDisplay } from './PriceDisplay'

describe('PriceDisplay', () => {
  it('renders without crashing', () => {
    render(<PriceDisplay testID="pricedisplay" />)
    expect(screen.getByTestId('pricedisplay')).toBeTruthy()
  })
})
