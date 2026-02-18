import { render, screen } from '../../__test-utils__/render'
import { ClusterMarker } from './ClusterMarker'

describe('ClusterMarker', () => {
  it('renders without crashing', () => {
    render(<ClusterMarker testID="clustermarker" />)
    expect(screen.getByTestId('clustermarker')).toBeTruthy()
  })
})
