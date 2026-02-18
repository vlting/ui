import { render, screen } from '../../__test-utils__/render'
import { PaymentMethodForm } from './PaymentMethodForm'

describe('PaymentMethodForm', () => {
  it('renders without crashing', () => {
    render(<PaymentMethodForm testID="paymentmethodform" />)
    expect(screen.getByTestId('paymentmethodform')).toBeTruthy()
  })
})
