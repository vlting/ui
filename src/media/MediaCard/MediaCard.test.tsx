import { render, screen } from '../../__test-utils__/render'
import { MediaCard } from './MediaCard'

describe('MediaCard', () => {
  it('renders without crashing', () => {
    render(<MediaCard testID="mediacard" />)
    expect(screen.getByTestId('mediacard')).toBeTruthy()
  })
})
