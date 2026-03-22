import { useState } from 'react'
import { Button, Card, ContextMenu, DropdownMenu, Menubar } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { SectionTitle, StackY, type SectionProps } from './shared'

const ContextArea = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  py: '$32',
  px: '$16',
  radius: '$4',
  borderWidth: '$widthMin',
  borderStyle: 'dashed',
  borderColor: '$neutralAlpha5',
  color: '$neutral9',
  fontSize: '$small',
}, { name: 'ContextArea' })

export function MenuSection({ sectionRef }: SectionProps) {
  const [bookmarks, setBookmarks] = useState(true)
  const [urls, setUrls] = useState(false)

  return (
    <Card ref={sectionRef} data-section="Menu">
      <Card.Header>
        <Card.Title>Menu</Card.Title>
      </Card.Header>
      <Card.Content>
        <StackY>
          <SectionTitle stl={{ mt: '$0' }}>DropdownMenu</SectionTitle>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button theme="primary" variant="outline">Open menu</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>Account</DropdownMenu.Label>
              <DropdownMenu.Item>Profile</DropdownMenu.Item>
              <DropdownMenu.Item>Settings <DropdownMenu.Shortcut>Cmd+,</DropdownMenu.Shortcut></DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.CheckboxItem checked={bookmarks} onCheckedChange={setBookmarks}>
                Show bookmarks
              </DropdownMenu.CheckboxItem>
              <DropdownMenu.CheckboxItem checked={urls} onCheckedChange={setUrls}>
                Show full URLs
              </DropdownMenu.CheckboxItem>
              <DropdownMenu.Separator />
              <DropdownMenu.Item disabled>Invite team (coming soon)</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>Log out <DropdownMenu.Shortcut>Cmd+Q</DropdownMenu.Shortcut></DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          <SectionTitle stl={{ mt: '$24' }}>ContextMenu</SectionTitle>
          <ContextMenu.Root>
            <ContextMenu.Trigger>
              <ContextArea>Right-click this area</ContextArea>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
              <ContextMenu.Item>Cut <ContextMenu.Shortcut>Cmd+X</ContextMenu.Shortcut></ContextMenu.Item>
              <ContextMenu.Item>Copy <ContextMenu.Shortcut>Cmd+C</ContextMenu.Shortcut></ContextMenu.Item>
              <ContextMenu.Item>Paste <ContextMenu.Shortcut>Cmd+V</ContextMenu.Shortcut></ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Item>Select all <ContextMenu.Shortcut>Cmd+A</ContextMenu.Shortcut></ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Item disabled>Delete</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>

          <SectionTitle stl={{ mt: '$24' }}>Menubar</SectionTitle>
          <Menubar.Root>
            <Menubar.Menu>
              <Menubar.Trigger>File</Menubar.Trigger>
              <Menubar.Content>
                <Menubar.Item>New file <Menubar.Shortcut>Cmd+N</Menubar.Shortcut></Menubar.Item>
                <Menubar.Item>Open <Menubar.Shortcut>Cmd+O</Menubar.Shortcut></Menubar.Item>
                <Menubar.Separator />
                <Menubar.Item>Save <Menubar.Shortcut>Cmd+S</Menubar.Shortcut></Menubar.Item>
                <Menubar.Item>Save as... <Menubar.Shortcut>Cmd+Shift+S</Menubar.Shortcut></Menubar.Item>
                <Menubar.Separator />
                <Menubar.Item>Quit <Menubar.Shortcut>Cmd+Q</Menubar.Shortcut></Menubar.Item>
              </Menubar.Content>
            </Menubar.Menu>
            <Menubar.Menu>
              <Menubar.Trigger>Edit</Menubar.Trigger>
              <Menubar.Content>
                <Menubar.Item>Undo <Menubar.Shortcut>Cmd+Z</Menubar.Shortcut></Menubar.Item>
                <Menubar.Item>Redo <Menubar.Shortcut>Cmd+Shift+Z</Menubar.Shortcut></Menubar.Item>
                <Menubar.Separator />
                <Menubar.Item>Cut <Menubar.Shortcut>Cmd+X</Menubar.Shortcut></Menubar.Item>
                <Menubar.Item>Copy <Menubar.Shortcut>Cmd+C</Menubar.Shortcut></Menubar.Item>
                <Menubar.Item>Paste <Menubar.Shortcut>Cmd+V</Menubar.Shortcut></Menubar.Item>
              </Menubar.Content>
            </Menubar.Menu>
            <Menubar.Menu>
              <Menubar.Trigger>View</Menubar.Trigger>
              <Menubar.Content>
                <Menubar.Item>Zoom in <Menubar.Shortcut>Cmd++</Menubar.Shortcut></Menubar.Item>
                <Menubar.Item>Zoom out <Menubar.Shortcut>Cmd+-</Menubar.Shortcut></Menubar.Item>
                <Menubar.Separator />
                <Menubar.Item disabled>Full screen</Menubar.Item>
              </Menubar.Content>
            </Menubar.Menu>
          </Menubar.Root>
        </StackY>
      </Card.Content>
    </Card>
  )
}
