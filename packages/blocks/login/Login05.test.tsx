import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Login05 } from './Login05'

describe('Login05', () => {
  it('renders email field only (no password field)', () => {
    render(<Login05 />)
    expect(screen.getByPlaceholderText('m@example.com')).toBeDefined()
    expect(screen.queryByPlaceholderText('Password')).toBeNull()
  })

  it('calls onSubmit with email only', () => {
    const onSubmit = jest.fn()
    render(<Login05 onSubmit={onSubmit} />)

    fireEvent.change(screen.getByPlaceholderText('m@example.com'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.click(screen.getByText('Sign in with email'))

    expect(onSubmit).toHaveBeenCalledWith({ email: 'test@example.com' })
  })

  it('does not render forgot password link', () => {
    render(<Login05 />)
    expect(screen.queryByText('Forgot your password?')).toBeNull()
  })

  it('displays error message when provided', () => {
    render(<Login05 error="Email not found" />)
    expect(screen.getByText('Email not found')).toBeDefined()
    expect(screen.getByRole('alert')).toBeDefined()
  })

  it('displays custom submit text', () => {
    render(<Login05 submitText="Send magic link" />)
    expect(screen.getByText('Send magic link')).toBeDefined()
  })

  it('renders with custom title and description', () => {
    render(<Login05 title="Magic Link Login" description="We'll email you a link" />)
    expect(screen.getByText('Magic Link Login')).toBeDefined()
    expect(screen.getByText("We'll email you a link")).toBeDefined()
  })

  it('renders social providers when provided', () => {
    const providers = [{ name: 'Google', icon: <span>G</span>, onPress: jest.fn() }]
    render(<Login05 socialProviders={providers} />)
    expect(screen.getByText(/Google/)).toBeDefined()
  })

  it('renders signup footer link when configured', () => {
    render(<Login05 onSignup={jest.fn()} />)
    expect(screen.getByText('Sign up')).toBeDefined()
  })

  it('shows loading state on submit button', () => {
    render(<Login05 loading />)
    expect(screen.getByText('Loading')).toBeDefined()
  })
})
