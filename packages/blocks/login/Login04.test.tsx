import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Login04 } from './Login04'

describe('Login04', () => {
  it('renders email and password fields', () => {
    render(<Login04 />)
    expect(screen.getByPlaceholderText('m@example.com')).toBeDefined()
    expect(screen.getByPlaceholderText('Password')).toBeDefined()
  })

  it('renders image when provided', () => {
    render(<Login04 image={<img src="/hero.jpg" alt="Hero" />} />)
    expect(screen.getByAltText('Hero')).toBeDefined()
  })

  it('calls onSubmit with email and password', () => {
    const onSubmit = jest.fn()
    render(<Login04 onSubmit={onSubmit} />)

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
    render(<Login04 error="Invalid credentials" />)
    expect(screen.getByText('Invalid credentials')).toBeDefined()
    expect(screen.getByRole('alert')).toBeDefined()
  })

  it('renders with custom title and description', () => {
    render(<Login04 title="Welcome Back" description="Please sign in" />)
    expect(screen.getByText('Welcome Back')).toBeDefined()
    expect(screen.getByText('Please sign in')).toBeDefined()
  })

  it('renders social providers when provided', () => {
    const providers = [{ name: 'GitHub', icon: <span>GH</span>, onPress: jest.fn() }]
    render(<Login04 socialProviders={providers} />)
    expect(screen.getByText(/GitHub/)).toBeDefined()
  })

  it('renders forgot password link when configured', () => {
    render(<Login04 onForgotPassword={jest.fn()} />)
    expect(screen.getByText('Forgot your password?')).toBeDefined()
  })

  it('renders signup footer link when configured', () => {
    render(<Login04 signupHref="/signup" />)
    expect(screen.getByText('Sign up')).toBeDefined()
  })
})
