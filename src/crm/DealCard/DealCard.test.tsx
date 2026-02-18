import { render, screen } from '../../__test-utils__/render'
import { DealCard } from './DealCard'

describe('DealCard', () => {
  it('renders without crashing', () => {
    render(<DealCard testID="dealcard" />)
    expect(screen.getByTestId('dealcard')).toBeTruthy()
  })
})
