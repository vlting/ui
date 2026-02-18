import { render, screen } from '../../__test-utils__/render'
import { InvoiceTable } from './InvoiceTable'

describe('InvoiceTable', () => {
  it('renders without crashing', () => {
    render(<InvoiceTable testID="invoicetable" />)
    expect(screen.getByTestId('invoicetable')).toBeTruthy()
  })
})
