import { render, screen } from '../../__test-utils__/render'
import { SupplierCard } from './SupplierCard'

describe('SupplierCard', () => {
  it('renders without crashing', () => {
    render(<SupplierCard testID="suppliercard" />)
    expect(screen.getByTestId('suppliercard')).toBeTruthy()
  })
})
