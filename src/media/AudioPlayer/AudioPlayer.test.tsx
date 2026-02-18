import { render, screen } from '../../__test-utils__/render'
import { AudioPlayer } from './AudioPlayer'

describe('AudioPlayer', () => {
  it('renders without crashing', () => {
    render(<AudioPlayer testID="audioplayer" />)
    expect(screen.getByTestId('audioplayer')).toBeTruthy()
  })
})
