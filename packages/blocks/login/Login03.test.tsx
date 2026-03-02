import React from 'react'
import { render, screen, fireEvent } from '../../../src/__test-utils__/render'
import { Login03 } from './Login03'

describe('Login03', () => {
  it('renders email and password fields', () => {
    render(<Login03 />)
    expect(screen.getByLabelText('Email')).toBeDefined()
    expect(screen.getByLabelText('Password')).toBeDefined()
  })

  it('calls onSubmit with email and password', () => {
    const onSubmit = jest.fn()
    render(<Login03 onSubmit={onSubmit} />)

    fireEvent.changeText(screen.getByLabelText('Email'), 'test@example.com')
    fireEvent.changeText(screen.getByLabelText('Password'), 'secret123')
    fireEvent.press(screen.getByText('Login'))

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
    const providers = [
      { name: 'Google', icon: <span>G</span>, onPress: jest.fn() },
    ]
    render(<Login03 socialProviders={providers} />)
    expect(screen.getByText(/Continue with Google/)).toBeDefined()
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
