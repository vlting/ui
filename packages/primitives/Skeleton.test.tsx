import React from 'react'
import { render, screen } from '../../src/__test-utils__/render'

// @ts-expect-error Tamagui v2 RC GetProps bug
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('renders without errors', () => {
    render(<Skeleton testID="skeleton" />)
    expect(screen.getByTestId('skeleton')).toBeTruthy()
  })

  it.skip('has aria-hidden="true"', () => {
    // TODO: requires browser environment for ARIA attribute verification
    render(<Skeleton testID="skeleton" />)
    const el = screen.getByTestId('skeleton')
    expect(el.getAttribute('aria-hidden')).toBe('true')
  })

  it('accepts circle variant', () => {
    render(<Skeleton circle testID="skeleton" />)
    expect(screen.getByTestId('skeleton')).toBeTruthy()
  })

  it('accepts width and height props', () => {
    render(<Skeleton width={100} height={20} testID="skeleton" />)
    expect(screen.getByTestId('skeleton')).toBeTruthy()
  })
})
