import { render, screen } from '../../__test-utils__/render'
import { InvoiceDetailView } from './InvoiceDetailView'

describe('InvoiceDetailView', () => {
  it('renders without crashing', () => {
    render(<InvoiceDetailView testID="invoicedetailview" />)
    expect(screen.getByTestId('invoicedetailview')).toBeTruthy()
  })
})
