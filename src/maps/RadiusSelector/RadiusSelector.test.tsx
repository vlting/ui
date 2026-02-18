import { render, screen } from '../../__test-utils__/render'
import { RadiusSelector } from './RadiusSelector'

describe('RadiusSelector', () => {
  it('renders without crashing', () => {
    render(<RadiusSelector testID="radiusselector" />)
    expect(screen.getByTestId('radiusselector')).toBeTruthy()
  })
})
