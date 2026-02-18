import { render, screen } from '../../__test-utils__/render'
import { LocationRadiusSelector } from './LocationRadiusSelector'

describe('LocationRadiusSelector', () => {
  it('renders without crashing', () => {
    render(<LocationRadiusSelector testID="locationradiusselector" />)
    expect(screen.getByTestId('locationradiusselector')).toBeTruthy()
  })
})
