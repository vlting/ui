import { render, screen } from '../../__test-utils__/render'
import { LoadingOverlay } from './LoadingOverlay'

describe('LoadingOverlay', () => {
  it('renders without crashing', () => {
    render(<LoadingOverlay testID="loadingoverlay" />)
    expect(screen.getByTestId('loadingoverlay')).toBeTruthy()
  })
})
