import { render, screen } from '../../__test-utils__/render'
import { RoleBadge } from './RoleBadge'

describe('RoleBadge', () => {
  it('renders without crashing', () => {
    render(<RoleBadge testID="rolebadge" />)
    expect(screen.getByTestId('rolebadge')).toBeTruthy()
  })
})
