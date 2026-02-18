import { render, screen } from '../../__test-utils__/render'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  it('renders without crashing', () => {
    render(<EmptyState testID="emptystate" />)
    expect(screen.getByTestId('emptystate')).toBeTruthy()
  })
})
