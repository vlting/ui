import { render, screen } from '../../__test-utils__/render'
import { TeamMemberTable } from './TeamMemberTable'

describe('TeamMemberTable', () => {
  it('renders without crashing', () => {
    render(<TeamMemberTable testID="teammembertable" />)
    expect(screen.getByTestId('teammembertable')).toBeTruthy()
  })
})
