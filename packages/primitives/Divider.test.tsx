import React from 'react'
import { render, screen } from '../../src/__test-utils__/render'

// @ts-expect-error Tamagui v2 RC GetProps bug
import { Divider } from './Divider'

describe('Divider', () => {
  it('renders without errors', () => {
    render(<Divider testID="divider" />)
    expect(screen.getByTestId('divider')).toBeTruthy()
  })

  it.skip('defaults to horizontal orientation', () => {
    // TODO: requires browser environment for computed styles
    render(<Divider testID="divider" />)
    expect(screen.getByTestId('divider')).toBeTruthy()
  })

  it('accepts vertical orientation', () => {
    render(<Divider orientation="vertical" testID="divider" />)
    expect(screen.getByTestId('divider')).toBeTruthy()
  })
})
