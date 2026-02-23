import React, { useState } from 'react'
import { YStack, XStack, Text, Heading, Separator, View } from 'tamagui'
import {
  Command,
  ContextMenu,
  DropdownMenu,
  Menubar,
  NavigationMenu,
  Resizable,
  ScrollArea,
  Sidebar,
  Tabs,
  Button,
} from '@vlting/ui'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <YStack gap="$3" paddingVertical="$4">
      <Heading fontFamily="$heading" fontSize="$6" fontWeight="$4">{title}</Heading>
      <Separator />
      <YStack gap="$3" paddingTop="$2">{children}</YStack>
    </YStack>
  )
}

function DemoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <YStack backgroundColor="$background" borderRadius="$4" borderWidth={1} borderColor="$borderColor" padding="$4" gap="$3">
      <Text fontFamily="$body" fontSize="$2" fontWeight="$3" color="$colorSubtitle">{label}</Text>
      {children}
    </YStack>
  )
}

export function MenusPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <YStack padding="$6" gap="$2" maxWidth={900} marginHorizontal="auto" width="100%">
      <Heading fontFamily="$heading" fontSize="$8" fontWeight="$5">Menus & Navigation</Heading>
      <Text fontFamily="$body" fontSize="$4" color="$colorSubtitle" marginBottom="$4">
        Command, ContextMenu, DropdownMenu, Menubar, NavigationMenu, Resizable, ScrollArea, Sidebar, and Tabs.
      </Text>

      {/* Command */}
      <Section title="Command">
        <DemoCard label="Command palette">
          <View borderRadius="$4" overflow="hidden" borderWidth={1} borderColor="$borderColor">
            <Command.Root>
              <Command.Input placeholder="Type a command or search..." />
              <Command.List>
                <Command.Group heading="Suggestions">
                  <Command.Item value="calendar" onSelect={() => {}}>
                    <Text fontFamily="$body" fontSize="$3">Calendar</Text>
                  </Command.Item>
                  <Command.Item value="search" onSelect={() => {}}>
                    <Text fontFamily="$body" fontSize="$3">Search</Text>
                  </Command.Item>
                  <Command.Item value="settings" onSelect={() => {}}>
                    <Text fontFamily="$body" fontSize="$3">Settings</Text>
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command.Root>
          </View>
        </DemoCard>
      </Section>

      {/* ContextMenu */}
      <Section title="ContextMenu">
        <DemoCard label="Right-click the area below">
          <ContextMenu.Root>
            <ContextMenu.Trigger>
              <View
                backgroundColor="$color3"
                borderRadius="$4"
                padding="$6"
                borderWidth={1}
                borderColor="$borderColor"
                borderStyle="dashed"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">
                  Right-click here
                </Text>
              </View>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
              <ContextMenu.Item onSelect={() => {}}>
                <Text fontFamily="$body" fontSize="$3">Cut</Text>
              </ContextMenu.Item>
              <ContextMenu.Item onSelect={() => {}}>
                <Text fontFamily="$body" fontSize="$3">Copy</Text>
              </ContextMenu.Item>
              <ContextMenu.Item onSelect={() => {}}>
                <Text fontFamily="$body" fontSize="$3">Paste</Text>
              </ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>
        </DemoCard>
      </Section>

      {/* DropdownMenu */}
      <Section title="DropdownMenu">
        <DemoCard label="Basic dropdown">
          <DropdownMenu.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenu.Trigger>
              <Button onPress={() => setDropdownOpen(true)}>
                <Button.Text>Open Menu</Button.Text>
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item onSelect={() => {}}>
                <Text fontFamily="$body" fontSize="$3">Profile</Text>
              </DropdownMenu.Item>
              <DropdownMenu.Item onSelect={() => {}}>
                <Text fontFamily="$body" fontSize="$3">Settings</Text>
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item onSelect={() => {}}>
                <Text fontFamily="$body" fontSize="$3" color="$red10">Log out</Text>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </DemoCard>
      </Section>

      {/* Menubar */}
      <Section title="Menubar">
        <DemoCard label="Horizontal menu bar">
          <Menubar.Root>
            <Menubar.Menu>
              <Menubar.Trigger>File</Menubar.Trigger>
              <Menubar.Content>
                <Menubar.Item onSelect={() => {}}><Text fontFamily="$body" fontSize="$3">New File</Text></Menubar.Item>
                <Menubar.Item onSelect={() => {}}><Text fontFamily="$body" fontSize="$3">Open</Text></Menubar.Item>
                <Menubar.Item onSelect={() => {}}><Text fontFamily="$body" fontSize="$3">Save</Text></Menubar.Item>
              </Menubar.Content>
            </Menubar.Menu>
            <Menubar.Menu>
              <Menubar.Trigger>Edit</Menubar.Trigger>
              <Menubar.Content>
                <Menubar.Item onSelect={() => {}}><Text fontFamily="$body" fontSize="$3">Undo</Text></Menubar.Item>
                <Menubar.Item onSelect={() => {}}><Text fontFamily="$body" fontSize="$3">Redo</Text></Menubar.Item>
              </Menubar.Content>
            </Menubar.Menu>
            <Menubar.Menu>
              <Menubar.Trigger>View</Menubar.Trigger>
              <Menubar.Content>
                <Menubar.Item onSelect={() => {}}><Text fontFamily="$body" fontSize="$3">Zoom In</Text></Menubar.Item>
                <Menubar.Item onSelect={() => {}}><Text fontFamily="$body" fontSize="$3">Zoom Out</Text></Menubar.Item>
              </Menubar.Content>
            </Menubar.Menu>
          </Menubar.Root>
        </DemoCard>
      </Section>

      {/* NavigationMenu */}
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

      {/* Resizable */}
      <Section title="Resizable">
        <DemoCard label="Resizable panels">
          <View height={200} borderRadius="$4" overflow="hidden" borderWidth={1} borderColor="$borderColor">
            <Resizable.PanelGroup direction="horizontal">
              <Resizable.Panel defaultSize={50}>
                <View flex={1} backgroundColor="$color3" alignItems="center" justifyContent="center" padding="$3">
                  <Text fontFamily="$body" fontSize="$3">Panel A</Text>
                </View>
              </Resizable.Panel>
              <Resizable.Handle />
              <Resizable.Panel defaultSize={50}>
                <View flex={1} backgroundColor="$color2" alignItems="center" justifyContent="center" padding="$3">
                  <Text fontFamily="$body" fontSize="$3">Panel B</Text>
                </View>
              </Resizable.Panel>
            </Resizable.PanelGroup>
          </View>
        </DemoCard>
      </Section>

      {/* ScrollArea */}
      <Section title="ScrollArea">
        <DemoCard label="Scrollable area with custom scrollbar">
          <ScrollArea.Root style={{ height: 200 }}>
            <ScrollArea.Viewport>
              <YStack gap="$2" padding="$2">
                {Array.from({ length: 20 }, (_, i) => (
                  <Text key={i} fontFamily="$body" fontSize="$3" padding="$2" backgroundColor="$color3" borderRadius="$2">
                    Item {i + 1}
                  </Text>
                ))}
              </YStack>
            </ScrollArea.Viewport>
          </ScrollArea.Root>
        </DemoCard>
      </Section>

      {/* Sidebar */}
      <Section title="Sidebar">
        <DemoCard label="App sidebar with groups">
          <View height={300} borderRadius="$4" overflow="hidden" borderWidth={1} borderColor="$borderColor">
            <XStack flex={1}>
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
              <View flex={1} backgroundColor="$background" padding="$4" alignItems="center" justifyContent="center">
                <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">Main content area</Text>
              </View>
            </XStack>
          </View>
        </DemoCard>
      </Section>

      {/* Tabs */}
      <Section title="Tabs">
        <DemoCard label="Multi-tab">
          <Tabs.Root defaultValue="tab1">
            <Tabs.List>
              <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
              <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
              <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab1">
              <Text fontFamily="$body" fontSize="$3">Content for the first tab.</Text>
            </Tabs.Content>
            <Tabs.Content value="tab2">
              <Text fontFamily="$body" fontSize="$3">Content for the second tab.</Text>
            </Tabs.Content>
            <Tabs.Content value="tab3">
              <Text fontFamily="$body" fontSize="$3">Content for the third tab.</Text>
            </Tabs.Content>
          </Tabs.Root>
        </DemoCard>
      </Section>
    </YStack>
  )
}
