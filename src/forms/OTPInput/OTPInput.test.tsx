import { render, screen } from '../../__test-utils__/render'
import { OTPInput } from './OTPInput'

describe('OTPInput', () => {
  it('renders without crashing', () => {
    render(<OTPInput testID="otpinput" />)
    expect(screen.getByTestId('otpinput')).toBeTruthy()
  })
})
