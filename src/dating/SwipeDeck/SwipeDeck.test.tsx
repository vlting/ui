import { render, screen } from '../../__test-utils__/render'
import { SwipeDeck } from './SwipeDeck'

describe('SwipeDeck', () => {
  it('renders without crashing', () => {
    render(<SwipeDeck testID="swipedeck" />)
    expect(screen.getByTestId('swipedeck')).toBeTruthy()
  })
})
