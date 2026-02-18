import { render, screen } from '../../__test-utils__/render'
import { ExpenseCategoryBadge } from './ExpenseCategoryBadge'

describe('ExpenseCategoryBadge', () => {
  it('renders without crashing', () => {
    render(<ExpenseCategoryBadge testID="expensecategorybadge" />)
    expect(screen.getByTestId('expensecategorybadge')).toBeTruthy()
  })
})
