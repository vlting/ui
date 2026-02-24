import React from 'react'
import { render, screen } from '../../src/__test-utils__/render'

// @ts-expect-error Tamagui v2 RC GetProps bug
import { Box } from './Box'

describe('Box', () => {
  it('renders without errors', () => {
    render(<Box testID="box" />)
    expect(screen.getByTestId('box')).toBeTruthy()
  })

  it('renders children', () => {
    render(<Box>Hello</Box>)
    expect(screen.getByText('Hello')).toBeTruthy()
  })

  it.skip('applies centered variant styles', () => {
    // TODO: requires browser environment for computed styles
    render(<Box centered testID="box" />)
    expect(screen.getByTestId('box')).toBeTruthy()
  })

  it('accepts style props', () => {
    render(<Box padding="$4" testID="box" />)
    expect(screen.getByTestId('box')).toBeTruthy()
  })
})
