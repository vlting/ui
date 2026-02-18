import { render, screen } from '../../__test-utils__/render'
import { CommunityHeader } from './CommunityHeader'

describe('CommunityHeader', () => {
  it('renders without crashing', () => {
    render(<CommunityHeader testID="communityheader" />)
    expect(screen.getByTestId('communityheader')).toBeTruthy()
  })
})
