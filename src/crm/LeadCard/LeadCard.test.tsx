import { render, screen } from '../../__test-utils__/render'
import { LeadCard } from './LeadCard'

describe('LeadCard', () => {
  it('renders without crashing', () => {
    render(<LeadCard testID="leadcard" />)
    expect(screen.getByTestId('leadcard')).toBeTruthy()
  })
})
