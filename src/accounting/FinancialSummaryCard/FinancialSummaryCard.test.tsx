import { render, screen } from '../../__test-utils__/render'
import { FinancialSummaryCard } from './FinancialSummaryCard'

describe('FinancialSummaryCard', () => {
  it('renders without crashing', () => {
    render(<FinancialSummaryCard testID="financialsummarycard" />)
    expect(screen.getByTestId('financialsummarycard')).toBeTruthy()
  })
})
