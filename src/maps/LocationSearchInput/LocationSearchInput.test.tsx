import { render, screen } from '../../__test-utils__/render'
import { LocationSearchInput } from './LocationSearchInput'

describe('LocationSearchInput', () => {
  it('renders without crashing', () => {
    render(<LocationSearchInput testID="locationsearchinput" />)
    expect(screen.getByTestId('locationsearchinput')).toBeTruthy()
  })
})
