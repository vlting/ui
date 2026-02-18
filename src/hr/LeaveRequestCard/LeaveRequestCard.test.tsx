import { render, screen } from '../../__test-utils__/render'
import { LeaveRequestCard } from './LeaveRequestCard'

describe('LeaveRequestCard', () => {
  it('renders without crashing', () => {
    render(<LeaveRequestCard testID="leaverequestcard" />)
    expect(screen.getByTestId('leaverequestcard')).toBeTruthy()
  })
})
