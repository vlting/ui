import { render, screen } from '../../__test-utils__/render'
import { PhotoGalleryUploader } from './PhotoGalleryUploader'

describe('PhotoGalleryUploader', () => {
  it('renders without crashing', () => {
    render(<PhotoGalleryUploader testID="photogalleryuploader" />)
    expect(screen.getByTestId('photogalleryuploader')).toBeTruthy()
  })
})
