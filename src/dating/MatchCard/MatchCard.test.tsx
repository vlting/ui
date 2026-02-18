import { render, screen } from '../../__test-utils__/render'
import { MatchCard } from './MatchCard'

describe('MatchCard', () => {
  it('renders without crashing', () => {
    render(<MatchCard testID="matchcard" />)
    expect(screen.getByTestId('matchcard')).toBeTruthy()
  })
})
