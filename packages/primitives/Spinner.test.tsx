import React from 'react'
import { render } from '../../src/__test-utils__/render'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('renders with role="status"', () => {
    const { getByRole } = render(<Spinner />)
    expect(getByRole('status')).toBeTruthy()
  })

  it('has aria-label="Loading"', () => {
    const { getByRole } = render(<Spinner />)
    expect(getByRole('status').getAttribute('aria-label')).toBe('Loading')
  })

  it.skip('renders 8 dot elements', () => {
    // TODO: requires browser environment — Tamagui style serialization differs in JSDOM
    const { container } = render(<Spinner />)
    const statusEl = container.querySelector('[role="status"]')
    const dots = statusEl!.querySelectorAll('[style*="position: absolute"]')
    expect(dots.length).toBe(8)
  })

  it('accepts size="sm"', () => {
    const { getByRole } = render(<Spinner size="sm" />)
    expect(getByRole('status')).toBeTruthy()
  })

  it('accepts size="md"', () => {
    const { getByRole } = render(<Spinner size="md" />)
    expect(getByRole('status')).toBeTruthy()
  })

  it('accepts size="lg"', () => {
    const { getByRole } = render(<Spinner size="lg" />)
    expect(getByRole('status')).toBeTruthy()
  })

  it('accepts custom color', () => {
    const { getByRole } = render(<Spinner color="red" />)
    expect(getByRole('status')).toBeTruthy()
  })
})
