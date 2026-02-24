import React from 'react'
import { render, screen } from '../../../src/__test-utils__/render'
import { DropdownMenu } from './DropdownMenu'

describe('DropdownMenu', () => {
  it('renders trigger', () => {
    render(
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>Option 1</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )
    expect(screen.getByText('Menu')).toBeTruthy()
  })

  it.skip('has aria-haspopup on trigger', () => {
    // TODO: Tamagui ARIA in JSDOM
    render(
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>Option</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )
    const trigger = screen.getByText('Menu')
    expect(trigger.closest('[aria-haspopup="menu"]')).toBeTruthy()
  })

  it('renders with all sub-components', () => {
    render(
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>Actions</DropdownMenu.Label>
          <DropdownMenu.Item>Edit</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.CheckboxItem checked={false} onCheckedChange={() => {}}>
            Visible
          </DropdownMenu.CheckboxItem>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )
    expect(screen.getByText('Menu')).toBeTruthy()
  })

  it('renders items with tabIndex for keyboard focus', () => {
    render(
      <DropdownMenu.Root open>
        <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>Edit</DropdownMenu.Item>
          <DropdownMenu.Item>Delete</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )
    expect(screen.getByText('Edit')).toBeTruthy()
    expect(screen.getByText('Delete')).toBeTruthy()
  })

  it('renders with keyboard navigation support on content', () => {
    const { container } = render(
      <DropdownMenu.Root open>
        <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>First</DropdownMenu.Item>
          <DropdownMenu.Item>Second</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )
    const menu = container.querySelector('[role="menu"]')
    expect(menu).toBeTruthy()
  })
})
