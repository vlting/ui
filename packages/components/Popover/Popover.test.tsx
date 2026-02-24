import React from 'react'
import { render } from '../../../src/__test-utils__/render'
import { Popover } from './Popover'

describe('Popover', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <Popover.Root>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow />
            Content here
            <Popover.Close>Close</Popover.Close>
          </Popover.Content>
        </Popover.Root>
      )
    ).not.toThrow()
  })

  it('renders with placement prop', () => {
    const placements = ['top', 'bottom', 'left', 'right'] as const
    for (const placement of placements) {
      const { unmount } = render(
        <Popover.Root placement={placement}>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover.Root>
      )
      unmount()
    }
  })

  it('renders with defaultOpen', () => {
    expect(() =>
      render(
        <Popover.Root defaultOpen>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover.Root>
      )
    ).not.toThrow()
  })

  it('renders anchor', () => {
    expect(() =>
      render(
        <Popover.Root>
          <Popover.Anchor>Anchor</Popover.Anchor>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover.Root>
      )
    ).not.toThrow()
  })
})
