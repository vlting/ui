import { render, screen } from '../../__test-utils__/render'
import { ContactCard } from './ContactCard'

describe('ContactCard', () => {
  it('renders without crashing', () => {
    render(<ContactCard testID="contactcard" />)
    expect(screen.getByTestId('contactcard')).toBeTruthy()
  })
})
