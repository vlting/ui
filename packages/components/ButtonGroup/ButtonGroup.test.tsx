import React from 'react'
import { render, screen } from '../../../src/__test-utils__/render'
import { ButtonGroup } from './ButtonGroup'
import { Button } from '../Button/Button'

describe('ButtonGroup', () => {
  it('renders children buttons', () => {
    render(
      <ButtonGroup.Root>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup.Root>
    )
    expect(screen.getByText('A')).toBeTruthy()
    expect(screen.getByText('B')).toBeTruthy()
  })

  it('renders with horizontal orientation', () => {
    render(
      <ButtonGroup.Root orientation="horizontal">
        <Button>Horizontal</Button>
      </ButtonGroup.Root>
    )
    expect(screen.getByText('Horizontal')).toBeTruthy()
  })

  it('renders with vertical orientation', () => {
    render(
      <ButtonGroup.Root orientation="vertical">
        <Button>Vertical</Button>
      </ButtonGroup.Root>
    )
    expect(screen.getByText('Vertical')).toBeTruthy()
  })
})
