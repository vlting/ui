import { render, screen } from '../../__test-utils__/render'
import { ContactForm } from './ContactForm'

describe('ContactForm', () => {
  it('renders without crashing', () => {
    render(<ContactForm testID="contactform" />)
    expect(screen.getByTestId('contactform')).toBeTruthy()
  })
})
