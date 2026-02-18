import { render, screen } from '../../__test-utils__/render'
import { UploadProgressItem } from './UploadProgressItem'

describe('UploadProgressItem', () => {
  it('renders without crashing', () => {
    render(<UploadProgressItem testID="uploadprogressitem" />)
    expect(screen.getByTestId('uploadprogressitem')).toBeTruthy()
  })
})
