import { render, screen } from '../../__test-utils__/render'
import { AttachmentPreview } from './AttachmentPreview'

describe('AttachmentPreview', () => {
  it('renders without crashing', () => {
    render(<AttachmentPreview testID="attachmentpreview" />)
    expect(screen.getByTestId('attachmentpreview')).toBeTruthy()
  })
})
