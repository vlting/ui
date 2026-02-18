import { render, screen } from '../../__test-utils__/render'
import { AccessControlBadge } from './AccessControlBadge'

describe('AccessControlBadge', () => {
  it('renders without crashing', () => {
    render(<AccessControlBadge testID="accesscontrolbadge" />)
    expect(screen.getByTestId('accesscontrolbadge')).toBeTruthy()
  })
})
