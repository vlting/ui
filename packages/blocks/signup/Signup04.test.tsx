import React from 'react'
import { render, screen, fireEvent } from '../../../src/__test-utils__/render'
import { Signup04 } from './Signup04'

describe('Signup04', () => {
  it('renders name, email, and password fields', () => {
    render(<Signup04 />)
    expect(screen.getByLabelText('Name')).toBeDefined()
    expect(screen.getByLabelText('Email')).toBeDefined()
    expect(screen.getByLabelText('Password')).toBeDefined()
  })

  it('renders image when provided', () => {
    render(<Signup04 image={<img src="/hero.jpg" alt="Hero" />} />)
    expect(screen.getByAltText('Hero')).toBeDefined()
  })

  it('calls onSubmit with name, email, and password', () => {
    const onSubmit = jest.fn()
    render(<Signup04 onSubmit={onSubmit} />)

    fireEvent.changeText(screen.getByLabelText('Name'), 'Sam')
    fireEvent.changeText(screen.getByLabelText('Email'), 'sam@example.com')
    fireEvent.changeText(screen.getByLabelText('Password'), 'secure789')
    fireEvent.press(screen.getByText('Create account'))

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
