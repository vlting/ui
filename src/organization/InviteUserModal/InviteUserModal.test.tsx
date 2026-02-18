import { render, screen } from '../../__test-utils__/render'
import { InviteUserModal } from './InviteUserModal'

describe('InviteUserModal', () => {
  it('renders without crashing', () => {
    render(<InviteUserModal testID="inviteusermodal" />)
    expect(screen.getByTestId('inviteusermodal')).toBeTruthy()
  })
})
