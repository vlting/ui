import { render, screen } from '../../__test-utils__/render'
import { Card } from './Card'

describe('Card', () => {
  it('renders without crashing', () => {
    render(<Card testID="card" />)
    expect(screen.getByTestId('card')).toBeTruthy()
  })
})
