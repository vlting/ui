import { render, screen } from '../../__test-utils__/render'
import { Playlist } from './Playlist'

describe('Playlist', () => {
  it('renders without crashing', () => {
    render(<Playlist testID="playlist" />)
    expect(screen.getByTestId('playlist')).toBeTruthy()
  })
})
