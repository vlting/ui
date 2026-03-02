import React from 'react'
import { render, screen, fireEvent } from '../../../src/__test-utils__/render'
import { Signup02 } from './Signup02'

describe('Signup02', () => {
  it('renders name, email, and password fields', () => {
    render(<Signup02 />)
    expect(screen.getByLabelText('Name')).toBeDefined()
    expect(screen.getByLabelText('Email')).toBeDefined()
    expect(screen.getByLabelText('Password')).toBeDefined()
  })

  it('renders image when provided', () => {
    render(<Signup02 image={<img src="/hero.jpg" alt="Hero" />} />)
    expect(screen.getByAltText('Hero')).toBeDefined()
  })

  it('calls onSubmit with name, email, and password', () => {
    const onSubmit = jest.fn()
    render(<Signup02 onSubmit={onSubmit} />)

    fireEvent.changeText(screen.getByLabelText('Name'), 'Jane Smith')
    fireEvent.changeText(screen.getByLabelText('Email'), 'jane@example.com')
    fireEvent.changeText(screen.getByLabelText('Password'), 'password123')
    fireEvent.press(screen.getByText('Create account'))

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password123',
    })
  })

  it('displays error message when provided', () => {
    render(<Signup02 error="Registration failed" />)
    expect(screen.getByText('Registration failed')).toBeDefined()
    expect(screen.getByRole('alert')).toBeDefined()
  })

  it('renders terms checkbox when configured', () => {
    render(<Signup02 termsHref="/terms" />)
    expect(screen.getByText(/Terms of Service/)).toBeDefined()
  })

  it('renders login footer link', () => {
    render(<Signup02 loginHref="/login" />)
    expect(screen.getByText('Sign in')).toBeDefined()
  })

  it('shows loading state', () => {
    render(<Signup02 loading />)
    expect(screen.getByText('Loading')).toBeDefined()
  })
})
