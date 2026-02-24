import React from 'react'
import { render, screen } from '../../../src/__test-utils__/render'
import { Avatar } from './Avatar'

describe('Avatar', () => {
  it('renders with fallback text', () => {
    render(<Avatar fallback="JD" />)
    expect(screen.getByText('JD')).toBeTruthy()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const
    for (const size of sizes) {
      const { unmount } = render(<Avatar size={size} fallback="A" />)
      expect(screen.getByText('A')).toBeTruthy()
      unmount()
    }
  })

  it.skip('renders compound pattern with Fallback', () => {
    // TODO: Avatar compound pattern sub-components may not render in JSDOM
    render(
      <Avatar>
        <Avatar.Fallback>AB</Avatar.Fallback>
      </Avatar>
    )
    expect(screen.getByText('AB')).toBeTruthy()
  })

  it.skip('renders image when src is provided', () => {
    // TODO: Image loading behavior in JSDOM is limited
    render(<Avatar src="https://example.com/photo.jpg" alt="User" />)
    expect(screen.getByRole('img')).toBeTruthy()
  })
})
