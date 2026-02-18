import { render, screen } from '../../__test-utils__/render'
import { SuperLikeIndicator } from './SuperLikeIndicator'

describe('SuperLikeIndicator', () => {
  it('renders without crashing', () => {
    render(<SuperLikeIndicator testID="superlikeindicator" />)
    expect(screen.getByTestId('superlikeindicator')).toBeTruthy()
  })
})
