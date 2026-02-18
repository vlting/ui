import { render, screen } from '../../__test-utils__/render'
import { CheckoutForm } from './CheckoutForm'

describe('CheckoutForm', () => {
  it('renders without crashing', () => {
    render(<CheckoutForm testID="checkoutform" />)
    expect(screen.getByTestId('checkoutform')).toBeTruthy()
  })
})
