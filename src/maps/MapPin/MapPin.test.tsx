import { render, screen } from '../../__test-utils__/render'
import { MapPin } from './MapPin'

describe('MapPin', () => {
  it('renders without crashing', () => {
    render(<MapPin testID="mappin" />)
    expect(screen.getByTestId('mappin')).toBeTruthy()
  })
})
