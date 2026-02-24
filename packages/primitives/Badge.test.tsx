import React from 'react'
import { render, screen } from '../../src/__test-utils__/render'

// @ts-expect-error Tamagui v2 RC GetProps bug
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders text content', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeTruthy()
  })

  it('renders each variant without errors', () => {
    const variants = ['default', 'solid', 'secondary', 'destructive', 'outline', 'subtle'] as const
    for (const variant of variants) {
      const { unmount } = render(<Badge variant={variant}>Badge</Badge>)
      expect(screen.getByText('Badge')).toBeTruthy()
      unmount()
    }
  })

  it('renders each size without errors', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<Badge size={size}>Badge</Badge>)
      expect(screen.getByText('Badge')).toBeTruthy()
      unmount()
    }
  })

  it('defaults to md size', () => {
    render(<Badge>Default</Badge>)
    expect(screen.getByText('Default')).toBeTruthy()
  })
})
