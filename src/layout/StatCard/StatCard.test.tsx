import { render, screen } from '../../__test-utils__/render'
import { StatCard } from './StatCard'

describe('StatCard', () => {
  it('renders without crashing', () => {
    render(<StatCard testID="statcard" />)
    expect(screen.getByTestId('statcard')).toBeTruthy()
  })
})
