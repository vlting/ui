import { render, screen } from '../../__test-utils__/render'
import { ValidationMessage } from './ValidationMessage'

describe('ValidationMessage', () => {
  it('renders without crashing', () => {
    render(<ValidationMessage testID="validationmessage" />)
    expect(screen.getByTestId('validationmessage')).toBeTruthy()
  })
})
