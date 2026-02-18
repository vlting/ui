import { render, screen } from '../../__test-utils__/render'
import { PlaceAutocompleteDropdown } from './PlaceAutocompleteDropdown'

describe('PlaceAutocompleteDropdown', () => {
  it('renders without crashing', () => {
    render(<PlaceAutocompleteDropdown testID="placeautocompletedropdown" />)
    expect(screen.getByTestId('placeautocompletedropdown')).toBeTruthy()
  })
})
