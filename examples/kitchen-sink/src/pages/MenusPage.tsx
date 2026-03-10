import {
  Box,
  Button,
  Command,
  ContextMenu,
  DropdownMenu,
  HStack,
  Heading,
  Menubar,
  NavigationMenu,
  Resizable,
  ScrollArea,
  Sidebar,
  Tabs,
  Text,
  VStack,
} from '@vlting/ui'
import { useState } from 'react'
import { DemoCard, Section } from '../components/Section'

export function MenusPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <VStack style={{ padding: 24, gap: 8, maxWidth: 900, marginInline: 'auto', width: '100%' }}>
      <Heading level={1}>Menus & Navigation</Heading>
      <Text tone="muted" style={{ marginBottom: 16 }}>
        Command, ContextMenu, DropdownMenu, Menubar, NavigationMenu, Resizable,
        ScrollArea, Sidebar, and Tabs.
      </Text>

      <Section title="Command">
        <DemoCard label="Command palette">
          <Box style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--vlt-color-5)' }}>
            <Command.Root>
              <Command.Input placeholder="Type a command or search..." />
              <Command.List>
                <Command.Group heading="Suggestions">
                  <Command.Item value="calendar" onSelect={() => {}}><Text size="sm">Calendar</Text></Command.Item>
                  <Command.Item value="search" onSelect={() => {}}><Text size="sm">Search</Text></Command.Item>
                  <Command.Item value="settings" onSelect={() => {}}><Text size="sm">Settings</Text></Command.Item>
                </Command.Group>
              </Command.List>
            </Command.Root>
          </Box>
        </DemoCard>
      </Section>

      <Section title="ContextMenu">
        <DemoCard label="Right-click the area below">
          <ContextMenu.Root>
            <ContextMenu.Trigger>
              <Box
                centered
                style={{
                  backgroundColor: 'var(--vlt-color-3)',
                  borderRadius: 8,
                  padding: 24,
                  border: '1px dashed var(--vlt-color-5)',
                }}
              >
                <Text size="sm" tone="muted">Right-click here</Text>
              </Box>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
              <ContextMenu.Item onSelect={() => {}}><Text size="sm">Cut</Text></ContextMenu.Item>
              <ContextMenu.Item onSelect={() => {}}><Text size="sm">Copy</Text></ContextMenu.Item>
              <ContextMenu.Item onSelect={() => {}}><Text size="sm">Paste</Text></ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>
        </DemoCard>
      </Section>

      <Section title="DropdownMenu">
        <DemoCard label="Basic dropdown">
          <DropdownMenu.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenu.Trigger>
              <Button onPress={() => setDropdownOpen(true)}><Button.Text>Open Menu</Button.Text></Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item onSelect={() => {}}><Text size="sm">Profile</Text></DropdownMenu.Item>
              <DropdownMenu.Item onSelect={() => {}}><Text size="sm">Settings</Text></DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item onSelect={() => {}}><Text size="sm" tone="danger">Log out</Text></DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </DemoCard>
      </Section>

      <Section title="Menubar">
        <DemoCard label="Horizontal menu bar">
          <Menubar.Root>
            <Menubar.Menu>
              <Menubar.Trigger>File</Menubar.Trigger>
              <Menubar.Content>
                <Menubar.Item onSelect={() => {}}><Text size="sm">New File</Text></Menubar.Item>
                <Menubar.Item onSelect={() => {}}><Text size="sm">Open</Text></Menubar.Item>
                <Menubar.Item onSelect={() => {}}><Text size="sm">Save</Text></Menubar.Item>
              </Menubar.Content>
            </Menubar.Menu>
            <Menubar.Menu>
              <Menubar.Trigger>Edit</Menubar.Trigger>
              <Menubar.Content>
                <Menubar.Item onSelect={() => {}}><Text size="sm">Undo</Text></Menubar.Item>
                <Menubar.Item onSelect={() => {}}><Text size="sm">Redo</Text></Menubar.Item>
              </Menubar.Content>
            </Menubar.Menu>
            <Menubar.Menu>
              <Menubar.Trigger>View</Menubar.Trigger>
              <Menubar.Content>
                <Menubar.Item onSelect={() => {}}><Text size="sm">Zoom In</Text></Menubar.Item>
                <Menubar.Item onSelect={() => {}}><Text size="sm">Zoom Out</Text></Menubar.Item>
              </Menubar.Content>
            </Menubar.Menu>
          </Menubar.Root>
        </DemoCard>
      </Section>

      <Section title="NavigationMenu">
        <DemoCard label="Site navigation with panels">
          <NavigationMenu.Root>
            <NavigationMenu.List>
              <NavigationMenu.Item value="products">
                <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                  <NavigationMenu.Link href="#">Analytics</NavigationMenu.Link>
                  <NavigationMenu.Link href="#">Automation</NavigationMenu.Link>
                  <NavigationMenu.Link href="#">Reports</NavigationMenu.Link>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
              <NavigationMenu.Item value="resources">
                <NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                  <NavigationMenu.Link href="#">Documentation</NavigationMenu.Link>
                  <NavigationMenu.Link href="#">Blog</NavigationMenu.Link>
                  <NavigationMenu.Link href="#">Community</NavigationMenu.Link>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </DemoCard>
      </Section>

      <Section title="Resizable">
        <DemoCard label="Resizable panels">
          <Box style={{ height: 200, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--vlt-color-5)' }}>
            <Resizable.PanelGroup direction="horizontal">
              <Resizable.Panel defaultSize={50}>
                <Box centered style={{ flex: 1, backgroundColor: 'var(--vlt-color-3)', padding: 12, height: '100%' }}>
                  <Text size="sm">Panel A</Text>
                </Box>
              </Resizable.Panel>
              <Resizable.Handle />
              <Resizable.Panel defaultSize={50}>
                <Box centered style={{ flex: 1, backgroundColor: 'var(--vlt-color-2)', padding: 12, height: '100%' }}>
                  <Text size="sm">Panel B</Text>
                </Box>
              </Resizable.Panel>
            </Resizable.PanelGroup>
          </Box>
        </DemoCard>
      </Section>

      <Section title="ScrollArea">
        <DemoCard label="Scrollable area with custom scrollbar">
          <ScrollArea.Root height={200}>
            <ScrollArea.Viewport>
              <VStack style={{ gap: 8, padding: 8 }}>
                {Array.from({ length: 20 }, (_, i) => (
                  <Text
                    key={i}
                    size="sm"
                    style={{
                      padding: 8,
                      backgroundColor: 'var(--vlt-color-3)',
                      borderRadius: 4,
                    }}
                  >
                    Item {i + 1}
                  </Text>
                ))}
              </VStack>
            </ScrollArea.Viewport>
          </ScrollArea.Root>
        </DemoCard>
      </Section>

      <Section title="Sidebar">
        <DemoCard label="App sidebar with groups">
          <Box style={{ height: 300, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--vlt-color-5)' }}>
            <HStack style={{ flex: 1, height: '100%' }}>
              <Sidebar.Root>
                <Sidebar.Content>
                  <Sidebar.Group>
                    <Sidebar.GroupLabel>Dashboard</Sidebar.GroupLabel>
                    <Sidebar.GroupContent>
                      <Sidebar.Menu>
                        <Sidebar.MenuButton active>Overview</Sidebar.MenuButton>
                        <Sidebar.MenuButton>Analytics</Sidebar.MenuButton>
                        <Sidebar.MenuButton>Reports</Sidebar.MenuButton>
                      </Sidebar.Menu>
                    </Sidebar.GroupContent>
                  </Sidebar.Group>
                  <Sidebar.Group>
                    <Sidebar.GroupLabel>Settings</Sidebar.GroupLabel>
                    <Sidebar.GroupContent>
                      <Sidebar.Menu>
                        <Sidebar.MenuButton>General</Sidebar.MenuButton>
                        <Sidebar.MenuButton>Team</Sidebar.MenuButton>
                        <Sidebar.MenuButton>Billing</Sidebar.MenuButton>
                      </Sidebar.Menu>
                    </Sidebar.GroupContent>
                  </Sidebar.Group>
                </Sidebar.Content>
              </Sidebar.Root>
              <Box centered style={{ flex: 1, backgroundColor: 'var(--vlt-color-1)', padding: 16 }}>
                <Text size="sm" tone="muted">Main content area</Text>
              </Box>
            </HStack>
          </Box>
        </DemoCard>
      </Section>

      <Section title="Tabs">
        <DemoCard label="Multi-tab">
          <Tabs.Root defaultValue="tab1">
            <Tabs.List>
              <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
              <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
              <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab1"><Text size="sm">Content for the first tab.</Text></Tabs.Content>
            <Tabs.Content value="tab2"><Text size="sm">Content for the second tab.</Text></Tabs.Content>
            <Tabs.Content value="tab3"><Text size="sm">Content for the third tab.</Text></Tabs.Content>
          </Tabs.Root>
        </DemoCard>
      </Section>
    </VStack>
  )
}
