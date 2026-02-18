import { render, screen } from '../../__test-utils__/render'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('renders without crashing', () => {
    render(<LoginForm testID="loginform" />)
    expect(screen.getByTestId('loginform')).toBeTruthy()
  })
})
