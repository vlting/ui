import { render, screen } from '../../__test-utils__/render'
import { PostCard } from './PostCard'

describe('PostCard', () => {
  it('renders without crashing', () => {
    render(<PostCard testID="postcard" />)
    expect(screen.getByTestId('postcard')).toBeTruthy()
  })
})
