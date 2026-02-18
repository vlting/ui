import { render, screen } from '../../__test-utils__/render'
import { DirectionsPanel } from './DirectionsPanel'

describe('DirectionsPanel', () => {
  it('renders without crashing', () => {
    render(<DirectionsPanel testID="directionspanel" />)
    expect(screen.getByTestId('directionspanel')).toBeTruthy()
  })
})
