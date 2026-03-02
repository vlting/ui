import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Login03 } from './Login03'

describe('Login03', () => {
  it('renders email and password fields', () => {
    render(<Login03 />)
    expect(screen.getByPlaceholderText('m@example.com')).toBeDefined()
    expect(screen.getByPlaceholderText('Password')).toBeDefined()
  })

  it('calls onSubmit with email and password', () => {
    const onSubmit = jest.fn()
    render(<Login03 onSubmit={onSubmit} />)

    fireEvent.change(screen.getByPlaceholderText('m@example.com'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'secret123' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'secret123',
    })
  })

  it('displays error message when provided', () => {
    render(<Login03 error="Invalid credentials" />)
    expect(screen.getByText('Invalid credentials')).toBeDefined()
    expect(screen.getByRole('alert')).toBeDefined()
  })

  it('renders with custom title and description', () => {
    render(<Login03 title="Welcome Back" description="Please sign in" />)
    expect(screen.getByText('Welcome Back')).toBeDefined()
    expect(screen.getByText('Please sign in')).toBeDefined()
  })

  it('renders social providers when provided', () => {
    const providers = [{ name: 'Google', icon: <span>G</span>, onPress: jest.fn() }]
    render(<Login03 socialProviders={providers} />)
    expect(screen.getByText(/Google/)).toBeDefined()
  })

  it('renders forgot password link when configured', () => {
    render(<Login03 forgotPasswordHref="/forgot" />)
    expect(screen.getByText('Forgot your password?')).toBeDefined()
  })

  it('renders signup footer link when configured', () => {
    render(<Login03 signupHref="/signup" />)
    expect(screen.getByText('Sign up')).toBeDefined()
  })

  it('shows loading state on submit button', () => {
    render(<Login03 loading />)
    expect(screen.getByText('Loading')).toBeDefined()
  })
})
