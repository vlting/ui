import { render, screen } from '../../__test-utils__/render'
import { TypingIndicator } from './TypingIndicator'

describe('TypingIndicator', () => {
  it('renders without crashing', () => {
    render(<TypingIndicator testID="typingindicator" />)
    expect(screen.getByTestId('typingindicator')).toBeTruthy()
  })
})
