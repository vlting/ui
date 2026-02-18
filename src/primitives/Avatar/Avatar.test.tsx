import { render, screen } from '../../__test-utils__/render'
import { Avatar } from './Avatar'

describe('Avatar', () => {
  it('renders without crashing', () => {
    render(<Avatar testID="avatar" />)
    expect(screen.getByTestId('avatar')).toBeTruthy()
  })
})
