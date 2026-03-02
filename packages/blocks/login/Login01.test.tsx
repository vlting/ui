import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Login01 } from './Login01'

describe('Login01', () => {
  it('renders a form element', () => {
    const { container } = render(<Login01 />)
    expect(container.querySelector('form')).toBeTruthy()
  })

  it('renders email and password inputs', () => {
    render(<Login01 />)
    expect(screen.getByPlaceholderText('name@example.com')).toBeTruthy()
    expect(screen.getByPlaceholderText('Password')).toBeTruthy()
  })

  it('renders labels for inputs', () => {
    render(<Login01 />)
    expect(screen.getByText('Email')).toBeTruthy()
    expect(screen.getByText('Password')).toBeTruthy()
  })

  it('renders with default title and description', () => {
    render(<Login01 />)
    expect(screen.getByText('Sign in to your account')).toBeTruthy()
    expect(screen.getByText('Enter your email and password')).toBeTruthy()
  })

  it('renders with custom title and description', () => {
    render(<Login01 title="Welcome back" description="Log in to continue" />)
    expect(screen.getByText('Welcome back')).toBeTruthy()
    expect(screen.getByText('Log in to continue')).toBeTruthy()
  })

  it('calls onSubmit with email and password', () => {
    const onSubmit = jest.fn()
    const { container } = render(<Login01 onSubmit={onSubmit} />)

    const emailInput = screen.getByPlaceholderText('name@example.com')
    const passwordInput = screen.getByPlaceholderText('Password')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'secret123' } })

    const form = container.querySelector('form')!
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'secret123',
    })
  })

  it('renders social providers when provided', () => {
    const providers = [
      { name: 'Google', icon: <span>G</span>, onPress: jest.fn() },
      { name: 'GitHub', icon: <span>GH</span>, onPress: jest.fn() },
    ]
    render(<Login01 socialProviders={providers} />)
    expect(screen.getByText(/Google/)).toBeTruthy()
    expect(screen.getByText(/GitHub/)).toBeTruthy()
    expect(screen.getByText('or continue with')).toBeTruthy()
  })

  it('does not render social section when no providers', () => {
    render(<Login01 />)
    expect(screen.queryByText('or continue with')).toBeNull()
  })

  it('renders forgot password link', () => {
    render(<Login01 forgotPasswordHref="/forgot" />)
    expect(screen.getByText('Forgot password?')).toBeTruthy()
  })

  it('renders forgot password button with handler', () => {
    const onForgotPassword = jest.fn()
    render(<Login01 onForgotPassword={onForgotPassword} />)
    fireEvent.click(screen.getByText('Forgot password?'))
    expect(onForgotPassword).toHaveBeenCalled()
  })

  it('renders signup footer link', () => {
    render(<Login01 signupHref="/signup" />)
    expect(screen.getByText('Sign up')).toBeTruthy()
  })

  it('shows error message when error prop is set', () => {
    render(<Login01 error="Invalid credentials" />)
    const errorEl = screen.getByRole('alert')
    expect(errorEl).toBeTruthy()
    expect(errorEl.textContent).toContain('Invalid credentials')
  })

  it('shows loading state on submit button', () => {
    render(<Login01 loading />)
    const submitButton = screen.getByRole('button', { name: /loading/i })
    expect(submitButton).toBeTruthy()
  })

  it('renders logo when provided', () => {
    render(<Login01 logo={<div data-testid="logo">Logo</div>} />)
    expect(screen.getByTestId('logo')).toBeTruthy()
  })
})
