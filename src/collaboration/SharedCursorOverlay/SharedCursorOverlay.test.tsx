import { render, screen } from '../../__test-utils__/render'
import { SharedCursorOverlay } from './SharedCursorOverlay'

describe('SharedCursorOverlay', () => {
  it('renders without crashing', () => {
    render(<SharedCursorOverlay testID="sharedcursoroverlay" />)
    expect(screen.getByTestId('sharedcursoroverlay')).toBeTruthy()
  })
})
