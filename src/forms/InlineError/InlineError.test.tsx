import { render, screen } from '../../__test-utils__/render'
import { InlineError } from './InlineError'

describe('InlineError', () => {
  it('renders without crashing', () => {
    render(<InlineError testID="inlineerror" />)
    expect(screen.getByTestId('inlineerror')).toBeTruthy()
  })
})
