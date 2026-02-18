import { render, screen } from '../../__test-utils__/render'
import { AvatarUploader } from './AvatarUploader'

describe('AvatarUploader', () => {
  it('renders without crashing', () => {
    render(<AvatarUploader testID="avataruploader" />)
    expect(screen.getByTestId('avataruploader')).toBeTruthy()
  })
})
