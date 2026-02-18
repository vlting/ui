import { render, screen } from '../../__test-utils__/render'
import { SwipeCard } from './SwipeCard'

describe('SwipeCard', () => {
  it('renders without crashing', () => {
    render(<SwipeCard testID="swipecard" />)
    expect(screen.getByTestId('swipecard')).toBeTruthy()
  })
})
