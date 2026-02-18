import { render, screen } from '../../__test-utils__/render'
import { BillingSummary } from './BillingSummary'

describe('BillingSummary', () => {
  it('renders without crashing', () => {
    render(<BillingSummary testID="billingsummary" />)
    expect(screen.getByTestId('billingsummary')).toBeTruthy()
  })
})
