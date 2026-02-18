import { render, screen } from '../../__test-utils__/render'
import { MatchList } from './MatchList'

describe('MatchList', () => {
  it('renders without crashing', () => {
    render(<MatchList testID="matchlist" />)
    expect(screen.getByTestId('matchlist')).toBeTruthy()
  })
})
