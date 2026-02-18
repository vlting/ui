import { render, screen } from '../../__test-utils__/render'
import { FileUploader } from './FileUploader'

describe('FileUploader', () => {
  it('renders without crashing', () => {
    render(<FileUploader testID="fileuploader" />)
    expect(screen.getByTestId('fileuploader')).toBeTruthy()
  })
})
