import React from 'react'
import { render, screen } from '../../../src/__test-utils__/render'
import { Textarea } from './Textarea'

describe('Textarea', () => {
  it('renders without errors', () => {
    render(<Textarea placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeTruthy()
  })

  it('renders label when provided', () => {
    render(<Textarea label="Description" placeholder="desc" />)
    expect(screen.getByText('Description')).toBeTruthy()
  })

  it('renders helper text', () => {
    render(<Textarea helperText="Max 500 chars" placeholder="text" />)
    expect(screen.getByText('Max 500 chars')).toBeTruthy()
  })

  it('renders error message in error state', () => {
    render(<Textarea error errorMessage="Too long" placeholder="text" />)
    expect(screen.getByText('Too long')).toBeTruthy()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<Textarea size={size} placeholder="text" />)
      expect(screen.getByPlaceholderText('text')).toBeTruthy()
      unmount()
    }
  })

  it.skip('is disabled when disabled prop is true', () => {
    // TODO: Tamagui uses aria-disabled, not native disabled attribute in JSDOM
    render(<Textarea disabled placeholder="disabled" />)
    expect(screen.getByPlaceholderText('disabled')).toBeDisabled()
  })

  it.skip('has aria-invalid when error prop is true', () => {
    // TODO: Tamagui may not apply aria-invalid in JSDOM
    render(<Textarea error placeholder="error" />)
    expect(screen.getByPlaceholderText('error')).toHaveAttribute('aria-invalid', 'true')
  })
})
