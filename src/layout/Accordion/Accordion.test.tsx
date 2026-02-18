import { render, screen } from '../../__test-utils__/render'
import { Accordion } from './Accordion'

describe('Accordion', () => {
  it('renders without crashing', () => {
    render(<Accordion testID="accordion" />)
    expect(screen.getByTestId('accordion')).toBeTruthy()
  })
})
