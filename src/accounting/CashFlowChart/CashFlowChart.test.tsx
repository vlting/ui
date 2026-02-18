import { render, screen } from '../../__test-utils__/render'
import { CashFlowChart } from './CashFlowChart'

describe('CashFlowChart', () => {
  it('renders without crashing', () => {
    render(<CashFlowChart testID="cashflowchart" />)
    expect(screen.getByTestId('cashflowchart')).toBeTruthy()
  })
})
