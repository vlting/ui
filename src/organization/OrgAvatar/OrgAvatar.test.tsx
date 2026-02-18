import { render, screen } from '../../__test-utils__/render'
import { OrgAvatar } from './OrgAvatar'

describe('OrgAvatar', () => {
  it('renders without crashing', () => {
    render(<OrgAvatar testID="orgavatar" />)
    expect(screen.getByTestId('orgavatar')).toBeTruthy()
  })
})
