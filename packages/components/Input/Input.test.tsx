import React from 'react'
import { render, screen } from '../../../src/__test-utils__/render'
import { Input } from './Input'

describe('Input', () => {
  it('renders without errors', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeTruthy()
  })

  it('renders label when provided', () => {
    render(<Input label="Email" placeholder="email" />)
    expect(screen.getByText('Email')).toBeTruthy()
  })

  it('renders helper text', () => {
    render(<Input helperText="Required field" placeholder="input" />)
    expect(screen.getByText('Required field')).toBeTruthy()
  })

  it('renders error message in error state', () => {
    render(<Input error errorMessage="Invalid" placeholder="input" />)
    expect(screen.getByText('Invalid')).toBeTruthy()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<Input size={size} placeholder="input" />)
      expect(screen.getByPlaceholderText('input')).toBeTruthy()
      unmount()
    }
  })

  it.skip('is disabled when disabled prop is true', () => {
    // TODO: Tamagui uses aria-disabled, not native disabled attribute in JSDOM
    render(<Input disabled placeholder="disabled" />)
    expect(screen.getByPlaceholderText('disabled')).toBeDisabled()
  })

  it.skip('has aria-invalid when error prop is true', () => {
    // TODO: Tamagui may not apply aria-invalid in JSDOM
    render(<Input error placeholder="error" />)
    expect(screen.getByPlaceholderText('error')).toHaveAttribute('aria-invalid', 'true')
  })
})
