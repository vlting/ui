import { render, screen } from '../../__test-utils__/render'
import { MultiImageUploader } from './MultiImageUploader'

describe('MultiImageUploader', () => {
  it('renders without crashing', () => {
    render(<MultiImageUploader testID="multiimageuploader" />)
    expect(screen.getByTestId('multiimageuploader')).toBeTruthy()
  })
})
