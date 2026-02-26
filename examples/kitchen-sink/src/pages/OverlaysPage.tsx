import {
  AlertDialog,
  Button,
  Dialog,
  Drawer,
  Heading,
  HoverCard,
  Tooltip,
} from '@vlting/ui'
import { useState } from 'react'
import { Text, View, XStack, YStack } from 'tamagui'
import { DemoCard, Section } from '../components/Section'

export function OverlaysPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [rightPanelOpen, setRightPanelOpen] = useState(false)
  const [leftPanelOpen, setLeftPanelOpen] = useState(false)

  return (
    <YStack padding="$6" gap="$2" maxWidth={900} marginHorizontal="auto" width="100%">
      <Heading level={1}>Overlays</Heading>
      <Text fontFamily="$body" fontSize="$4" color="$colorSubtitle" marginBottom="$4">
        AlertDialog, Dialog, Drawer, HoverCard, and Tooltip components.
      </Text>

      {/* AlertDialog */}
      <Section title="AlertDialog">
        <DemoCard label="Confirmation dialog">
          <AlertDialog.Root open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
            <AlertDialog.Trigger>
              <Button variant="destructive" onPress={() => setAlertDialogOpen(true)}>
                <Button.Text>Delete Account</Button.Text>
              </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
              <AlertDialog.Description>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialog.Description>
              <AlertDialog.Footer>
                <AlertDialog.Cancel>
                  <Button variant="outline" onPress={() => setAlertDialogOpen(false)}>
                    <Button.Text>Cancel</Button.Text>
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button variant="destructive" onPress={() => setAlertDialogOpen(false)}>
                    <Button.Text>Delete</Button.Text>
                  </Button>
                </AlertDialog.Action>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Root>
        </DemoCard>
      </Section>

      {/* Dialog */}
      <Section title="Dialog">
        <DemoCard label="Open/Close">
          <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger>
              <Button onPress={() => setDialogOpen(true)}>
                <Button.Text>Open Dialog</Button.Text>
              </Button>
            </Dialog.Trigger>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Title>Example Dialog</Dialog.Title>
              <Dialog.Description>
                This is a styled dialog component with overlay, title, and close controls.
              </Dialog.Description>
              <YStack paddingTop="$4">
                <Dialog.Close>
                  <Button variant="outline" onPress={() => setDialogOpen(false)}>
                    <Button.Text>Close</Button.Text>
                  </Button>
                </Dialog.Close>
              </YStack>
            </Dialog.Content>
          </Dialog.Root>
        </DemoCard>
      </Section>

      {/* Drawers & Panels */}
      <Section title="Drawers & Panels">
        <XStack gap="$3" flexWrap="wrap">
          <DemoCard label="Bottom drawer">
            <Drawer.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
              <Drawer.Trigger>
                <Button onPress={() => setDrawerOpen(true)}>
                  <Button.Text>Open Bottom</Button.Text>
                </Button>
              </Drawer.Trigger>
              <Drawer.Content>
                <YStack padding="$4" gap="$3">
                  <Text fontFamily="$heading" fontSize="$5" fontWeight="$4">
                    Bottom Drawer
                  </Text>
                  <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">
                    Slides up from the bottom.
                  </Text>
                  <Button variant="outline" onPress={() => setDrawerOpen(false)}>
                    <Button.Text>Close</Button.Text>
                  </Button>
                </YStack>
              </Drawer.Content>
            </Drawer.Root>
          </DemoCard>

          <DemoCard label="Right panel">
            <Drawer.Root
              open={rightPanelOpen}
              onOpenChange={setRightPanelOpen}
              direction="right"
            >
              <Drawer.Trigger>
                <Button onPress={() => setRightPanelOpen(true)}>
                  <Button.Text>Open Right</Button.Text>
                </Button>
              </Drawer.Trigger>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>Settings</Drawer.Title>
                  <Drawer.Description>Adjust your preferences below.</Drawer.Description>
                </Drawer.Header>
                <YStack padding="$3.5" gap="$3" flex={1}>
                  <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">
                    Right-side panel for detail views, settings, or inspectors.
                  </Text>
                </YStack>
                <Drawer.Footer>
                  <Button variant="outline" onPress={() => setRightPanelOpen(false)}>
                    <Button.Text>Cancel</Button.Text>
                  </Button>
                  <Button onPress={() => setRightPanelOpen(false)}>
                    <Button.Text>Save</Button.Text>
                  </Button>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Root>
          </DemoCard>

          <DemoCard label="Left panel">
            <Drawer.Root
              open={leftPanelOpen}
              onOpenChange={setLeftPanelOpen}
              direction="left"
            >
              <Drawer.Trigger>
                <Button onPress={() => setLeftPanelOpen(true)}>
                  <Button.Text>Open Left</Button.Text>
                </Button>
              </Drawer.Trigger>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>Navigation</Drawer.Title>
                </Drawer.Header>
                <YStack padding="$3.5" gap="$2" flex={1}>
                  {['Dashboard', 'Projects', 'Teams', 'Settings'].map((item) => (
                    <Text
                      key={item}
                      fontFamily="$body"
                      fontSize="$3"
                      color="$color"
                      paddingVertical="$2"
                      paddingHorizontal="$2"
                      borderRadius="$2"
                      hoverStyle={{ backgroundColor: '$backgroundHover' }}
                      cursor="pointer"
                    >
                      {item}
                    </Text>
                  ))}
                </YStack>
                <Drawer.Footer>
                  <Button variant="outline" onPress={() => setLeftPanelOpen(false)}>
                    <Button.Text>Close</Button.Text>
                  </Button>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Root>
          </DemoCard>
        </XStack>
      </Section>

      {/* HoverCard */}
      <Section title="HoverCard">
        <DemoCard label="Hover over the trigger">
          <HoverCard.Root>
            <HoverCard.Trigger>
              <View
                backgroundColor="$color4"
                paddingHorizontal="$4"
                paddingVertical="$2"
                borderRadius="$3"
                cursor="pointer"
                alignSelf="flex-start"
              >
                <Text fontFamily="$body" fontSize="$3" fontWeight="$3">
                  @vlting
                </Text>
              </View>
            </HoverCard.Trigger>
            <HoverCard.Content>
              <YStack gap="$2" padding="$3" maxWidth={280}>
                <Text fontFamily="$body" fontSize="$4" fontWeight="$3">
                  @vlting/ui
                </Text>
                <Text fontFamily="$body" fontSize="$3" color="$colorSubtitle">
                  A cross-platform, open-source design system built on Tamagui.
                </Text>
                <Text fontFamily="$body" fontSize="$2" color="$colorSubtitle">
                  238 components · MIT licensed
                </Text>
              </YStack>
            </HoverCard.Content>
          </HoverCard.Root>
        </DemoCard>
      </Section>

      {/* Tooltip */}
      <Section title="Tooltip">
        <DemoCard label="All sides">
          <XStack gap="$4" flexWrap="wrap" justifyContent="center">
            {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
              <Tooltip key={side} content={`Tooltip on ${side}`} side={side}>
                <View
                  backgroundColor="$color4"
                  paddingHorizontal="$4"
                  paddingVertical="$2"
                  borderRadius="$3"
                  cursor="pointer"
                >
                  <Text fontFamily="$body" fontSize="$3" textTransform="capitalize">
                    {side}
                  </Text>
                </View>
              </Tooltip>
            ))}
          </XStack>
        </DemoCard>
      </Section>
    </YStack>
  )
}
