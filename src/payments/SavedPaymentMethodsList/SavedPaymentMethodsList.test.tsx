import { render, screen } from '../../__test-utils__/render'
import { SavedPaymentMethodsList } from './SavedPaymentMethodsList'

describe('SavedPaymentMethodsList', () => {
  it('renders without crashing', () => {
    render(<SavedPaymentMethodsList testID="savedpaymentmethodslist" />)
    expect(screen.getByTestId('savedpaymentmethodslist')).toBeTruthy()
  })
})
