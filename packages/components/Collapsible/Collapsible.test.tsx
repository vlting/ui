import React from 'react'
import { render, screen } from '../../../src/__test-utils__/render'
import { Collapsible } from './Collapsible'

describe('Collapsible', () => {
  it('renders trigger', () => {
    render(
      <Collapsible.Root>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content</Collapsible.Content>
      </Collapsible.Root>
    )
    expect(screen.getByText('Toggle')).toBeTruthy()
  })

  it.skip('shows content when open', () => {
    // TODO: Tamagui Collapsible rendering in JSDOM
    render(
      <Collapsible.Root open>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Visible Content</Collapsible.Content>
      </Collapsible.Root>
    )
    expect(screen.getByText('Visible Content')).toBeTruthy()
  })

  it('accepts controlled open prop', () => {
    const { rerender } = render(
      <Collapsible.Root open={false}>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content</Collapsible.Content>
      </Collapsible.Root>
    )
    rerender(
      <Collapsible.Root open={true}>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content</Collapsible.Content>
      </Collapsible.Root>
    )
    expect(screen.getByText('Toggle')).toBeTruthy()
  })
})
