import {
  AlertDialog,
  Box,
  Button,
  Dialog,
  Drawer,
  HStack,
  Heading,
  HoverCard,
  Text,
  Tooltip,
  VStack,
} from '@vlting/ui'
import { useState } from 'react'
import { DemoCard, Section } from '../components/Section'

export function OverlaysPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [rightPanelOpen, setRightPanelOpen] = useState(false)
  const [leftPanelOpen, setLeftPanelOpen] = useState(false)

  return (
    <VStack style={{ padding: 24, gap: 8, maxWidth: 900, marginInline: 'auto', width: '100%' }}>
      <Heading level={1}>Overlays</Heading>
      <Text tone="muted" style={{ marginBottom: 16 }}>
        AlertDialog, Dialog, Drawer, HoverCard, and Tooltip components.
      </Text>

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
              <VStack style={{ paddingTop: 16 }}>
                <Dialog.Close>
                  <Button variant="outline" onPress={() => setDialogOpen(false)}>
                    <Button.Text>Close</Button.Text>
                  </Button>
                </Dialog.Close>
              </VStack>
            </Dialog.Content>
          </Dialog.Root>
        </DemoCard>
      </Section>

      <Section title="Drawers & Panels">
        <HStack style={{ gap: 12, flexWrap: 'wrap' }}>
          <DemoCard label="Bottom drawer">
            <Drawer.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
              <Drawer.Trigger>
                <Button onPress={() => setDrawerOpen(true)}>
                  <Button.Text>Open Bottom</Button.Text>
                </Button>
              </Drawer.Trigger>
              <Drawer.Content>
                <VStack style={{ padding: 16, gap: 12 }}>
                  <Text size="lg" weight="semibold" style={{ fontFamily: 'var(--vlt-font-heading)' }}>
                    Bottom Drawer
                  </Text>
                  <Text size="sm" tone="muted">Slides up from the bottom.</Text>
                  <Button variant="outline" onPress={() => setDrawerOpen(false)}>
                    <Button.Text>Close</Button.Text>
                  </Button>
                </VStack>
              </Drawer.Content>
            </Drawer.Root>
          </DemoCard>

          <DemoCard label="Right panel">
            <Drawer.Root open={rightPanelOpen} onOpenChange={setRightPanelOpen} direction="right">
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
                <VStack style={{ padding: 14, gap: 12, flex: 1 }}>
                  <Text size="sm" tone="muted">
                    Right-side panel for detail views, settings, or inspectors.
                  </Text>
                </VStack>
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
            <Drawer.Root open={leftPanelOpen} onOpenChange={setLeftPanelOpen} direction="left">
              <Drawer.Trigger>
                <Button onPress={() => setLeftPanelOpen(true)}>
                  <Button.Text>Open Left</Button.Text>
                </Button>
              </Drawer.Trigger>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>Navigation</Drawer.Title>
                </Drawer.Header>
                <VStack style={{ padding: 14, gap: 8, flex: 1 }}>
                  {['Dashboard', 'Projects', 'Teams', 'Settings'].map((item) => (
                    <span
                      key={item}
                      style={{
                        fontFamily: 'var(--vlt-font-body)',
                        fontSize: 14,
                        color: 'var(--vlt-color-12)',
                        paddingBlock: 8,
                        paddingInline: 8,
                        borderRadius: 4,
                        cursor: 'pointer',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </VStack>
                <Drawer.Footer>
                  <Button variant="outline" onPress={() => setLeftPanelOpen(false)}>
                    <Button.Text>Close</Button.Text>
                  </Button>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Root>
          </DemoCard>
        </HStack>
      </Section>

      <Section title="HoverCard">
        <DemoCard label="Hover over the trigger">
          <HoverCard.Root>
            <HoverCard.Trigger>
              <Box
                style={{
                  backgroundColor: 'var(--vlt-color-4)',
                  paddingInline: 16,
                  paddingBlock: 8,
                  borderRadius: 6,
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                  display: 'inline-block',
                }}
              >
                <Text size="sm" weight="medium">@vlting</Text>
              </Box>
            </HoverCard.Trigger>
            <HoverCard.Content>
              <VStack style={{ gap: 8, padding: 12, maxWidth: 280 }}>
                <Text weight="medium">@vlting/ui</Text>
                <Text size="sm" tone="muted">A cross-platform, open-source design system.</Text>
                <Text size="xs" tone="muted">238 components · MIT licensed</Text>
              </VStack>
            </HoverCard.Content>
          </HoverCard.Root>
        </DemoCard>
      </Section>

      <Section title="Tooltip">
        <DemoCard label="All sides">
          <HStack style={{ gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
              <Tooltip key={side} content={`Tooltip on ${side}`} side={side}>
                <Box
                  style={{
                    backgroundColor: 'var(--vlt-color-4)',
                    paddingInline: 16,
                    paddingBlock: 8,
                    borderRadius: 6,
                    cursor: 'pointer',
                  }}
                >
                  <Text size="sm" style={{ textTransform: 'capitalize' }}>{side}</Text>
                </Box>
              </Tooltip>
            ))}
          </HStack>
        </DemoCard>
      </Section>
    </VStack>
  )
}
