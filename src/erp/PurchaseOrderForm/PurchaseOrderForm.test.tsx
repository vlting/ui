import { render, screen } from '../../__test-utils__/render'
import { PurchaseOrderForm } from './PurchaseOrderForm'

describe('PurchaseOrderForm', () => {
  it('renders without crashing', () => {
    render(<PurchaseOrderForm testID="purchaseorderform" />)
    expect(screen.getByTestId('purchaseorderform')).toBeTruthy()
  })
})
