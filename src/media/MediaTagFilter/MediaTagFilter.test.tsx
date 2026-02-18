import { render, screen } from '../../__test-utils__/render'
import { MediaTagFilter } from './MediaTagFilter'

describe('MediaTagFilter', () => {
  it('renders without crashing', () => {
    render(<MediaTagFilter testID="mediatagfilter" />)
    expect(screen.getByTestId('mediatagfilter')).toBeTruthy()
  })
})
