import React from 'react'
import { render, screen } from '../../../src/__test-utils__/render'
import { Menu } from './Menu'

describe('Menu', () => {
  it('renders without crashing', () => {
    expect(() =>
      render(
        <Menu.Root>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Content>
              <Menu.Item><Menu.ItemTitle>Item 1</Menu.ItemTitle></Menu.Item>
            </Menu.Content>
          </Menu.Portal>
        </Menu.Root>
      )
    ).not.toThrow()
  })

  it('renders without errors with groups', () => {
    expect(() =>
      render(
        <Menu.Root>
          <Menu.Trigger>Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Content>
              <Menu.Group>
                <Menu.Label>Section</Menu.Label>
                <Menu.Item><Menu.ItemTitle>A</Menu.ItemTitle></Menu.Item>
              </Menu.Group>
              <Menu.Separator />
            </Menu.Content>
          </Menu.Portal>
        </Menu.Root>
      )
    ).not.toThrow()
  })
})
