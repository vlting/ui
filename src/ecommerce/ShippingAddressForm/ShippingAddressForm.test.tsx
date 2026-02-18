import { render, screen } from '../../__test-utils__/render'
import { ShippingAddressForm } from './ShippingAddressForm'

describe('ShippingAddressForm', () => {
  it('renders without crashing', () => {
    render(<ShippingAddressForm testID="shippingaddressform" />)
    expect(screen.getByTestId('shippingaddressform')).toBeTruthy()
  })
})
