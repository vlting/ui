import { render, screen } from '../../__test-utils__/render'
import { OrderSummaryCard } from './OrderSummaryCard'

describe('OrderSummaryCard', () => {
  it('renders without crashing', () => {
    render(<OrderSummaryCard testID="ordersummarycard" />)
    expect(screen.getByTestId('ordersummarycard')).toBeTruthy()
  })
})
