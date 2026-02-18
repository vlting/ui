import { render, screen } from '../../__test-utils__/render'
import { ThreadCard } from './ThreadCard'

describe('ThreadCard', () => {
  it('renders without crashing', () => {
    render(<ThreadCard testID="threadcard" />)
    expect(screen.getByTestId('threadcard')).toBeTruthy()
  })
})
