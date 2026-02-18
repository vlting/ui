import { render, screen } from '../../__test-utils__/render'
import { MapContainer } from './MapContainer'

describe('MapContainer', () => {
  it('renders without crashing', () => {
    render(<MapContainer testID="mapcontainer" />)
    expect(screen.getByTestId('mapcontainer')).toBeTruthy()
  })
})
