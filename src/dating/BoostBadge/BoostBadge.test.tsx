import { render, screen } from '../../__test-utils__/render'
import { BoostBadge } from './BoostBadge'

describe('BoostBadge', () => {
  it('renders without crashing', () => {
    render(<BoostBadge testID="boostbadge" />)
    expect(screen.getByTestId('boostbadge')).toBeTruthy()
  })
})
