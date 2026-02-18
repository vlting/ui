import { render, screen } from '../../__test-utils__/render'
import { PostComposer } from './PostComposer'

describe('PostComposer', () => {
  it('renders without crashing', () => {
    render(<PostComposer testID="postcomposer" />)
    expect(screen.getByTestId('postcomposer')).toBeTruthy()
  })
})
