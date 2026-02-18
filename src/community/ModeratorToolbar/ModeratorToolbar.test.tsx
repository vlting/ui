import { render, screen } from '../../__test-utils__/render'
import { ModeratorToolbar } from './ModeratorToolbar'

describe('ModeratorToolbar', () => {
  it('renders without crashing', () => {
    render(<ModeratorToolbar testID="moderatortoolbar" />)
    expect(screen.getByTestId('moderatortoolbar')).toBeTruthy()
  })
})
