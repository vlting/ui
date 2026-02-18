import { render, screen } from '../../__test-utils__/render'
import { OrderHistoryTable } from './OrderHistoryTable'

describe('OrderHistoryTable', () => {
  it('renders without crashing', () => {
    render(<OrderHistoryTable testID="orderhistorytable" />)
    expect(screen.getByTestId('orderhistorytable')).toBeTruthy()
  })
})
