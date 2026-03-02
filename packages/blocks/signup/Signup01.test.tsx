import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Signup01 } from './Signup01'

describe('Signup01', () => {
  it('renders name, email, and password fields', () => {
    render(<Signup01 />)
    expect(screen.getByPlaceholderText('John Doe')).toBeDefined()
    expect(screen.getByPlaceholderText('m@example.com')).toBeDefined()
    expect(screen.getByPlaceholderText('Password')).toBeDefined()
  })

  it('calls onSubmit with name, email, and password', () => {
    const onSubmit = jest.fn()
    render(<Signup01 onSubmit={onSubmit} />)

    fireEvent.change(screen.getByPlaceholderText('John Doe'), {
      target: { value: 'John Doe' },
    })
    fireEvent.change(screen.getByPlaceholderText('m@example.com'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'secret123' },
    })
    fireEvent.click(screen.getByText('Create account'))

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'test@example.com',
      password: 'secret123',
    })
  })

  it('displays error message when provided', () => {
    render(<Signup01 error="Email already exists" />)
    expect(screen.getByText('Email already exists')).toBeDefined()
    expect(screen.getByRole('alert')).toBeDefined()
  })

  it('renders social providers when provided', () => {
    const providers = [{ name: 'Google', icon: <span>G</span>, onPress: jest.fn() }]
    render(<Signup01 socialProviders={providers} />)
    expect(screen.getByText(/Google/)).toBeDefined()
  })

  it('renders terms checkbox when termsHref is provided', () => {
    render(<Signup01 termsHref="/terms" privacyHref="/privacy" />)
    expect(screen.getByText(/Terms of Service/)).toBeDefined()
    expect(screen.getByText(/Privacy Policy/)).toBeDefined()
  })

  it('renders login footer link', () => {
    render(<Signup01 loginHref="/login" />)
    expect(screen.getByText('Sign in')).toBeDefined()
    expect(screen.getByText(/Already have an account/)).toBeDefined()
  })

  it('shows loading state on submit button', () => {
    render(<Signup01 loading />)
    expect(screen.getByText('Loading')).toBeDefined()
  })
})
