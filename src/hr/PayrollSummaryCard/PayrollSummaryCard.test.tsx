import { render, screen } from '../../__test-utils__/render'
import { PayrollSummaryCard } from './PayrollSummaryCard'

describe('PayrollSummaryCard', () => {
  it('renders without crashing', () => {
    render(<PayrollSummaryCard testID="payrollsummarycard" />)
    expect(screen.getByTestId('payrollsummarycard')).toBeTruthy()
  })
})
