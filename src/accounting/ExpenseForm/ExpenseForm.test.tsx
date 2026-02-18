import { render, screen } from '../../__test-utils__/render'
import { ExpenseForm } from './ExpenseForm'

describe('ExpenseForm', () => {
  it('renders without crashing', () => {
    render(<ExpenseForm testID="expenseform" />)
    expect(screen.getByTestId('expenseform')).toBeTruthy()
  })
})
