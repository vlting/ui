import React from 'react'
import { render, screen, fireEvent } from '../../../src/__test-utils__/render'
import { Login02 } from './Login02'

describe('Login02', () => {
  it('renders a form element', () => {
    const { container } = render(<Login02 />)
    expect(container.querySelector('form')).toBeTruthy()
  })

  it('renders email and password inputs', () => {
    render(<Login02 />)
    expect(screen.getByPlaceholderText('name@example.com')).toBeTruthy()
    expect(screen.getByPlaceholderText('Password')).toBeTruthy()
  })

  it('renders labels for inputs', () => {
    render(<Login02 />)
    expect(screen.getByText('Email')).toBeTruthy()
    expect(screen.getByText('Password')).toBeTruthy()
  })

  it('renders with default title and description', () => {
    render(<Login02 />)
    expect(screen.getByText('Sign in to your account')).toBeTruthy()
    expect(screen.getByText('Enter your email and password')).toBeTruthy()
  })

  it('renders with custom title and description', () => {
    render(<Login02 title="Welcome back" description="Log in to continue" />)
    expect(screen.getByText('Welcome back')).toBeTruthy()
    expect(screen.getByText('Log in to continue')).toBeTruthy()
  })

  it('calls onSubmit with email and password', () => {
    const onSubmit = jest.fn()
    const { container } = render(<Login02 onSubmit={onSubmit} />)

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
    render(<Login02 socialProviders={providers} />)
    expect(screen.getByText(/Google/)).toBeTruthy()
    expect(screen.getByText(/GitHub/)).toBeTruthy()
  })

  it('renders forgot password link', () => {
    render(<Login02 forgotPasswordHref="/forgot" />)
    expect(screen.getByText('Forgot password?')).toBeTruthy()
  })

  it('renders signup footer link', () => {
    render(<Login02 signupHref="/signup" />)
    expect(screen.getByText('Sign up')).toBeTruthy()
  })

  it('shows error message when error prop is set', () => {
    render(<Login02 error="Invalid credentials" />)
    const errorEl = screen.getByRole('alert')
    expect(errorEl).toBeTruthy()
    expect(errorEl.textContent).toContain('Invalid credentials')
  })

  it('shows loading state on submit button', () => {
    render(<Login02 loading />)
    const submitButton = screen.getByRole('button', { name: /loading/i })
    expect(submitButton).toBeTruthy()
  })

  it('renders image when provided', () => {
    render(<Login02 image={<img src="/hero.jpg" alt="Hero" data-testid="cover-image" />} />)
    expect(screen.getByTestId('cover-image')).toBeTruthy()
  })

  it('renders without image', () => {
    render(<Login02 />)
    expect(screen.queryByTestId('cover-image')).toBeNull()
  })

  it('renders logo when provided', () => {
    render(<Login02 logo={<div data-testid="logo">Logo</div>} />)
    expect(screen.getByTestId('logo')).toBeTruthy()
  })
})
