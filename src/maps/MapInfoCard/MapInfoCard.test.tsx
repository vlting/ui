import { render, screen } from '../../__test-utils__/render'
import { MapInfoCard } from './MapInfoCard'

describe('MapInfoCard', () => {
  it('renders without crashing', () => {
    render(<MapInfoCard testID="mapinfocard" />)
    expect(screen.getByTestId('mapinfocard')).toBeTruthy()
  })
})
