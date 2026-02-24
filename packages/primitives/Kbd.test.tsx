import React from 'react'
import { render } from '../../src/__test-utils__/render'
import { Kbd } from './Kbd'

describe('Kbd', () => {
  it('renders a <kbd> element', () => {
    const { container } = render(<Kbd>Ctrl</Kbd>)
    const kbd = container.querySelector('kbd')
    expect(kbd).toBeTruthy()
    expect(kbd!.textContent).toBe('Ctrl')
  })

  it('renders text content', () => {
    const { getByText } = render(<Kbd>Enter</Kbd>)
    expect(getByText('Enter')).toBeTruthy()
  })

  it('accepts size="sm"', () => {
    const { container } = render(<Kbd size="sm">K</Kbd>)
    expect(container.querySelector('kbd')).toBeTruthy()
  })

  it('accepts size="md" (default)', () => {
    const { container } = render(<Kbd size="md">K</Kbd>)
    expect(container.querySelector('kbd')).toBeTruthy()
  })

  it('renders without size prop (defaults to md)', () => {
    const { container } = render(<Kbd>K</Kbd>)
    expect(container.querySelector('kbd')).toBeTruthy()
  })
})
