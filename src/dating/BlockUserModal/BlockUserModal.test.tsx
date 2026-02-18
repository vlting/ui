import { render, screen } from '../../__test-utils__/render'
import { BlockUserModal } from './BlockUserModal'

describe('BlockUserModal', () => {
  it('renders without crashing', () => {
    render(<BlockUserModal testID="blockusermodal" />)
    expect(screen.getByTestId('blockusermodal')).toBeTruthy()
  })
})
