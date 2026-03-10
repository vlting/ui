import { Section, DemoCard, DemoRow } from '../components/Section'
import { Breadcrumb } from '@vlting/ui/components'
import { ContextMenu } from '@vlting/ui/components'
import { DropdownMenu } from '@vlting/ui/components'
import { Menubar } from '@vlting/ui/components'
import { NavigationMenu } from '@vlting/ui/components'
import { Pagination } from '@vlting/ui/components'
import { Command } from '@vlting/ui/components'
import { Button } from '@vlting/ui/components'

export function NavigationPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Navigation</h1>

      <Section title="Breadcrumb">
        <DemoCard label="Navigation breadcrumbs">
          <Breadcrumb.Root>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.Root>
        </DemoCard>
      </Section>

      <Section title="DropdownMenu">
        <DemoCard label="Dropdown menu">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="outline">Open Menu</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>My Account</DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>Profile</DropdownMenu.Item>
              <DropdownMenu.Item>Settings</DropdownMenu.Item>
              <DropdownMenu.Item>Billing</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>Sign Out</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </DemoCard>
      </Section>

      <Section title="ContextMenu">
        <DemoCard label="Right-click context menu">
          <ContextMenu.Root>
            <ContextMenu.Trigger>
              <div style={{
                border: '2px dashed #ccc',
                borderRadius: 8,
                padding: 40,
                textAlign: 'center',
                color: '#888',
              }}>
                Right-click here
              </div>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
              <ContextMenu.Item>Cut</ContextMenu.Item>
              <ContextMenu.Item>Copy</ContextMenu.Item>
              <ContextMenu.Item>Paste</ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Item>Delete</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>
        </DemoCard>
      </Section>

      <Section title="Menubar">
        <DemoCard label="Application menubar">
          <Menubar.Root>
            <Menubar.Menu>
              <Menubar.Trigger>File</Menubar.Trigger>
              <Menubar.Content>
                <Menubar.Item>New File</Menubar.Item>
                <Menubar.Item>Open</Menubar.Item>
                <Menubar.Separator />
                <Menubar.Item>Save</Menubar.Item>
                <Menubar.Item>Save As...</Menubar.Item>
              </Menubar.Content>
            </Menubar.Menu>
            <Menubar.Menu>
              <Menubar.Trigger>Edit</Menubar.Trigger>
              <Menubar.Content>
                <Menubar.Item>Undo</Menubar.Item>
                <Menubar.Item>Redo</Menubar.Item>
                <Menubar.Separator />
                <Menubar.Item>Cut</Menubar.Item>
                <Menubar.Item>Copy</Menubar.Item>
                <Menubar.Item>Paste</Menubar.Item>
              </Menubar.Content>
            </Menubar.Menu>
          </Menubar.Root>
        </DemoCard>
      </Section>

      <Section title="Pagination">
        <DemoCard label="Page navigation">
          <Pagination.Root
            currentPage={1}
            totalPages={5}
            onPageChange={() => {}}
          />
        </DemoCard>
      </Section>

      <Section title="NavigationMenu">
        <DemoCard label="Horizontal navigation with dropdown">
          <NavigationMenu.Root>
            <NavigationMenu.List>
              <NavigationMenu.Item>
                <NavigationMenu.Link href="#" active>Home</NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item value="products">
                <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                  <NavigationMenu.Link href="#">Product A</NavigationMenu.Link>
                  <NavigationMenu.Link href="#">Product B</NavigationMenu.Link>
                  <NavigationMenu.Link href="#">Product C</NavigationMenu.Link>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link href="#">About</NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link href="#">Contact</NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </DemoCard>
      </Section>

      <Section title="Command">
        <DemoCard label="Command palette / search">
          <div style={{ maxWidth: 400, border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
            <Command.Root>
              <Command.Input placeholder="Type a command or search..." />
              <Command.List>
                <Command.Empty>No results found.</Command.Empty>
                <Command.Group heading="Suggestions">
                  <Command.Item value="calendar">Calendar</Command.Item>
                  <Command.Item value="search">Search</Command.Item>
                  <Command.Item value="settings">Settings</Command.Item>
                </Command.Group>
                <Command.Separator />
                <Command.Group heading="Actions">
                  <Command.Item value="new-file">New File</Command.Item>
                  <Command.Item value="new-folder">New Folder</Command.Item>
                </Command.Group>
              </Command.List>
            </Command.Root>
          </div>
        </DemoCard>
      </Section>
    </div>
  )
}
