import { render, screen } from '../../__test-utils__/render'
import { PostMediaGallery } from './PostMediaGallery'

describe('PostMediaGallery', () => {
  it('renders without crashing', () => {
    render(<PostMediaGallery testID="postmediagallery" />)
    expect(screen.getByTestId('postmediagallery')).toBeTruthy()
  })
})
