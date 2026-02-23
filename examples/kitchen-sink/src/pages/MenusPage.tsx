import React, { useState } from 'react'
import { YStack, XStack, Text, Heading, Separator, View } from 'tamagui'
import {
  DropdownMenu,
  ContextMenu,
  Menubar,
  NavigationMenu,
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
      <Heading fontFamily="$heading" fontSize="$8" fontWeight="$5">Menus</Heading>
      <Text fontFamily="$body" fontSize="$4" color="$colorSubtitle" marginBottom="$4">
        DropdownMenu, ContextMenu, Menubar, and NavigationMenu components.
      </Text>

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

      {/* Menubar */}
      <Section title="Menubar">
        <DemoCard label="Horizontal menu bar">
          <Menubar.Root>
            <Menubar.Menu label="File">
              <Menubar.Item onSelect={() => {}}>
                <Text fontFamily="$body" fontSize="$3">New File</Text>
              </Menubar.Item>
              <Menubar.Item onSelect={() => {}}>
                <Text fontFamily="$body" fontSize="$3">Open</Text>
              </Menubar.Item>
              <Menubar.Item onSelect={() => {}}>
                <Text fontFamily="$body" fontSize="$3">Save</Text>
              </Menubar.Item>
            </Menubar.Menu>
            <Menubar.Menu label="Edit">
              <Menubar.Item onSelect={() => {}}>
                <Text fontFamily="$body" fontSize="$3">Undo</Text>
              </Menubar.Item>
              <Menubar.Item onSelect={() => {}}>
                <Text fontFamily="$body" fontSize="$3">Redo</Text>
              </Menubar.Item>
            </Menubar.Menu>
            <Menubar.Menu label="View">
              <Menubar.Item onSelect={() => {}}>
                <Text fontFamily="$body" fontSize="$3">Zoom In</Text>
              </Menubar.Item>
              <Menubar.Item onSelect={() => {}}>
                <Text fontFamily="$body" fontSize="$3">Zoom Out</Text>
              </Menubar.Item>
            </Menubar.Menu>
          </Menubar.Root>
        </DemoCard>
      </Section>

      {/* NavigationMenu */}
      <Section title="NavigationMenu">
        <DemoCard label="Site navigation with panels">
          <NavigationMenu.Root>
            <NavigationMenu.Item label="Products">
              <NavigationMenu.Link href="#">Analytics</NavigationMenu.Link>
              <NavigationMenu.Link href="#">Automation</NavigationMenu.Link>
              <NavigationMenu.Link href="#">Reports</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item label="Resources">
              <NavigationMenu.Link href="#">Documentation</NavigationMenu.Link>
              <NavigationMenu.Link href="#">Blog</NavigationMenu.Link>
              <NavigationMenu.Link href="#">Community</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.Root>
        </DemoCard>
      </Section>
    </YStack>
  )
}
