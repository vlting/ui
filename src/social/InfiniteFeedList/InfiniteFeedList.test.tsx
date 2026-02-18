import { render, screen } from '../../__test-utils__/render'
import { InfiniteFeedList } from './InfiniteFeedList'

describe('InfiniteFeedList', () => {
  it('renders without crashing', () => {
    render(<InfiniteFeedList testID="infinitefeedlist" />)
    expect(screen.getByTestId('infinitefeedlist')).toBeTruthy()
  })
})
