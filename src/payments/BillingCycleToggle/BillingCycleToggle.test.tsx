import { render, screen } from '../../__test-utils__/render'
import { BillingCycleToggle } from './BillingCycleToggle'

describe('BillingCycleToggle', () => {
  it('renders without crashing', () => {
    render(<BillingCycleToggle testID="billingcycletoggle" />)
    expect(screen.getByTestId('billingcycletoggle')).toBeTruthy()
  })
})
