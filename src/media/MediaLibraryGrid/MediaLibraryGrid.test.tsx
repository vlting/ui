import { render, screen } from '../../__test-utils__/render'
import { MediaLibraryGrid } from './MediaLibraryGrid'

describe('MediaLibraryGrid', () => {
  it('renders without crashing', () => {
    render(<MediaLibraryGrid testID="medialibrarygrid" />)
    expect(screen.getByTestId('medialibrarygrid')).toBeTruthy()
  })
})
