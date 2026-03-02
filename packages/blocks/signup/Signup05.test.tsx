import React from 'react'
import { render, screen, fireEvent } from '../../../src/__test-utils__/render'
import { Signup05 } from './Signup05'

describe('Signup05', () => {
  it('renders email and password fields but no name field', () => {
    render(<Signup05 />)
    expect(screen.getByLabelText('Email')).toBeDefined()
    expect(screen.getByLabelText('Password')).toBeDefined()
    expect(screen.queryByLabelText('Name')).toBeNull()
  })

  it('calls onSubmit with email and password (no name)', () => {
    const onSubmit = jest.fn()
    render(<Signup05 onSubmit={onSubmit} />)

    fireEvent.changeText(screen.getByLabelText('Email'), 'test@example.com')
    fireEvent.changeText(screen.getByLabelText('Password'), 'secret123')
    fireEvent.press(screen.getByText('Create account'))

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'secret123',
    })
  })

  it('renders social providers above the form', () => {
    const providers = [
      { name: 'Google', icon: <span>G</span>, onPress: jest.fn() },
      { name: 'GitHub', icon: <span>GH</span>, onPress: jest.fn() },
    ]
    render(<Signup05 socialProviders={providers} />)
    expect(screen.getByText(/Continue with Google/)).toBeDefined()
    expect(screen.getByText(/Continue with GitHub/)).toBeDefined()
  })

  it('displays error message when provided', () => {
    render(<Signup05 error="Something went wrong" />)
    expect(screen.getByText('Something went wrong')).toBeDefined()
    expect(screen.getByRole('alert')).toBeDefined()
  })

  it('renders login footer link', () => {
    render(<Signup05 loginHref="/login" />)
    expect(screen.getByText('Sign in')).toBeDefined()
    expect(screen.getByText(/Already have an account/)).toBeDefined()
  })

  it('shows loading state', () => {
    render(<Signup05 loading />)
    expect(screen.getByText('Loading')).toBeDefined()
  })

  it('renders with custom title and description', () => {
    render(<Signup05 title="Get Started" description="Choose your sign-up method" />)
    expect(screen.getByText('Get Started')).toBeDefined()
    expect(screen.getByText('Choose your sign-up method')).toBeDefined()
  })
})
