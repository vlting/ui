import { render, screen } from '../../__test-utils__/render'
import { VideoPlayer } from './VideoPlayer'

describe('VideoPlayer', () => {
  it('renders without crashing', () => {
    render(<VideoPlayer testID="videoplayer" />)
    expect(screen.getByTestId('videoplayer')).toBeTruthy()
  })
})
