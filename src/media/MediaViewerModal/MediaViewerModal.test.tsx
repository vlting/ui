import { render, screen } from '../../__test-utils__/render'
import { MediaViewerModal } from './MediaViewerModal'

describe('MediaViewerModal', () => {
  it('renders without crashing', () => {
    render(<MediaViewerModal testID="mediaviewermodal" />)
    expect(screen.getByTestId('mediaviewermodal')).toBeTruthy()
  })
})
