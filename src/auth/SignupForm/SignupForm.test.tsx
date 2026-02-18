import { render, screen } from '../../__test-utils__/render'
import { SignupForm } from './SignupForm'

describe('SignupForm', () => {
  it('renders without crashing', () => {
    render(<SignupForm testID="signupform" />)
    expect(screen.getByTestId('signupform')).toBeTruthy()
  })
})
