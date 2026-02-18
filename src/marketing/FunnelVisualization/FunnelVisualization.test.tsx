import { render, screen } from '../../__test-utils__/render'
import { FunnelVisualization } from './FunnelVisualization'

describe('FunnelVisualization', () => {
  it('renders without crashing', () => {
    render(<FunnelVisualization testID="funnelvisualization" />)
    expect(screen.getByTestId('funnelvisualization')).toBeTruthy()
  })
})
