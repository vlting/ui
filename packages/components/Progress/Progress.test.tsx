import React from 'react'
import { render } from '../../../src/__test-utils__/render'
import { Progress } from './Progress'

describe('Progress', () => {
  it('renders without crashing', () => {
    expect(() => render(<Progress value={50} />)).not.toThrow()
  })

  it('renders with value 0', () => {
    expect(() => render(<Progress value={0} />)).not.toThrow()
  })

  it('renders with value 100', () => {
    expect(() => render(<Progress value={100} />)).not.toThrow()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<Progress value={50} size={size} />)
      unmount()
    }
  })

  it('accepts aria-label', () => {
    expect(() =>
      render(<Progress value={75} aria-label="Upload progress" />)
    ).not.toThrow()
  })

  it('renders with custom max', () => {
    expect(() => render(<Progress value={50} max={200} />)).not.toThrow()
  })
})
