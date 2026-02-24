import React from 'react'
import { render, screen } from '../../../src/__test-utils__/render'
import { ContextMenu } from './ContextMenu'

describe('ContextMenu', () => {
  it('renders trigger area', () => {
    render(
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <div>Right click here</div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>Copy</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
    )
    expect(screen.getByText('Right click here')).toBeTruthy()
  })

  it.skip('shows menu on right click', () => {
    // TODO: contextmenu event may not trigger JSDOM portal rendering
    render(
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <div>Right click</div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>Copy</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
    )
  })

  it('renders without errors with all sub-components', () => {
    render(
      <ContextMenu.Root>
        <ContextMenu.Trigger><div>Trigger</div></ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Label>Actions</ContextMenu.Label>
          <ContextMenu.Item>Cut</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.CheckboxItem checked={true} onCheckedChange={() => {}}>
            Bold
          </ContextMenu.CheckboxItem>
        </ContextMenu.Content>
      </ContextMenu.Root>
    )
    expect(screen.getByText('Trigger')).toBeTruthy()
  })
})
