import { render, screen } from '../../__test-utils__/render'
import { LeadStatusBadge } from './LeadStatusBadge'

describe('LeadStatusBadge', () => {
  it('renders without crashing', () => {
    render(<LeadStatusBadge testID="leadstatusbadge" />)
    expect(screen.getByTestId('leadstatusbadge')).toBeTruthy()
  })
})
