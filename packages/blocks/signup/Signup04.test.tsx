import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Signup04 } from './Signup04'

describe('Signup04', () => {
  it('renders name, email, and password fields', () => {
    render(<Signup04 />)
    expect(screen.getByPlaceholderText('John Doe')).toBeDefined()
    expect(screen.getByPlaceholderText('m@example.com')).toBeDefined()
    expect(screen.getByPlaceholderText('Password')).toBeDefined()
  })

  it('renders image when provided', () => {
    render(<Signup04 image={<img src="/hero.jpg" alt="Hero" />} />)
    expect(screen.getByAltText('Hero')).toBeDefined()
  })

  it('calls onSubmit with name, email, and password', () => {
    const onSubmit = jest.fn()
    render(<Signup04 onSubmit={onSubmit} />)

    fireEvent.change(screen.getByPlaceholderText('John Doe'), {
      target: { value: 'Sam' },
    })
    fireEvent.change(screen.getByPlaceholderText('m@example.com'), {
      target: { value: 'sam@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'secure789' },
    })
    fireEvent.click(screen.getByText('Create account'))

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Sam',
      email: 'sam@example.com',
      password: 'secure789',
    })
  })

  it('displays error message when provided', () => {
    render(<Signup04 error="Validation error" />)
    expect(screen.getByText('Validation error')).toBeDefined()
    expect(screen.getByRole('alert')).toBeDefined()
  })

  it('renders terms checkbox when configured', () => {
    render(<Signup04 termsHref="/terms" />)
    expect(screen.getByText(/Terms of Service/)).toBeDefined()
  })

  it('renders login footer link', () => {
    render(<Signup04 loginHref="/login" />)
    expect(screen.getByText('Sign in')).toBeDefined()
  })

  it('shows loading state', () => {
    render(<Signup04 loading />)
    expect(screen.getByText('Loading')).toBeDefined()
  })
})
