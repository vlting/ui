import React from 'react'
import { render, screen, fireEvent } from '../../../src/__test-utils__/render'
import { Signup03 } from './Signup03'

describe('Signup03', () => {
  it('renders name, email, and password fields', () => {
    render(<Signup03 />)
    expect(screen.getByLabelText('Name')).toBeDefined()
    expect(screen.getByLabelText('Email')).toBeDefined()
    expect(screen.getByLabelText('Password')).toBeDefined()
  })

  it('calls onSubmit with name, email, and password', () => {
    const onSubmit = jest.fn()
    render(<Signup03 onSubmit={onSubmit} />)

    fireEvent.changeText(screen.getByLabelText('Name'), 'Alex')
    fireEvent.changeText(screen.getByLabelText('Email'), 'alex@example.com')
    fireEvent.changeText(screen.getByLabelText('Password'), 'pass456')
    fireEvent.press(screen.getByText('Create account'))

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Alex',
      email: 'alex@example.com',
      password: 'pass456',
    })
  })

  it('displays error message when provided', () => {
    render(<Signup03 error="Server error" />)
    expect(screen.getByText('Server error')).toBeDefined()
    expect(screen.getByRole('alert')).toBeDefined()
  })

  it('renders with custom title and description', () => {
    render(<Signup03 title="Join Us" description="Start your journey" />)
    expect(screen.getByText('Join Us')).toBeDefined()
    expect(screen.getByText('Start your journey')).toBeDefined()
  })

  it('renders terms checkbox when configured', () => {
    render(<Signup03 termsHref="/terms" privacyHref="/privacy" />)
    expect(screen.getByText(/Terms of Service/)).toBeDefined()
    expect(screen.getByText(/Privacy Policy/)).toBeDefined()
  })

  it('renders login footer link', () => {
    render(<Signup03 onLogin={jest.fn()} />)
    expect(screen.getByText('Sign in')).toBeDefined()
  })

  it('shows loading state', () => {
    render(<Signup03 loading />)
    expect(screen.getByText('Loading')).toBeDefined()
  })
})
