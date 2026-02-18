import { render, screen } from '../../__test-utils__/render'
import { Section } from './Section'

describe('Section', () => {
  it('renders without crashing', () => {
    render(<Section testID="section" />)
    expect(screen.getByTestId('section')).toBeTruthy()
  })
})
