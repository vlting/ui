import { render, screen } from '../../__test-utils__/render'
import { HeatmapOverlay } from './HeatmapOverlay'

describe('HeatmapOverlay', () => {
  it('renders without crashing', () => {
    render(<HeatmapOverlay testID="heatmapoverlay" />)
    expect(screen.getByTestId('heatmapoverlay')).toBeTruthy()
  })
})
