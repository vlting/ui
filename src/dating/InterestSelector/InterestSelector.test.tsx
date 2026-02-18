import { render, screen } from '../../__test-utils__/render'
import { InterestSelector } from './InterestSelector'

describe('InterestSelector', () => {
  it('renders without crashing', () => {
    render(<InterestSelector testID="interestselector" />)
    expect(screen.getByTestId('interestselector')).toBeTruthy()
  })
})
