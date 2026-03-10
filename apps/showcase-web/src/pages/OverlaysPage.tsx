import { useState } from 'react'
import { Section, DemoCard, DemoRow } from '../components/Section'
import { Dialog } from '@vlting/ui/components'
import { AlertDialog } from '@vlting/ui/components'
import { Sheet } from '@vlting/ui/components'
import { Drawer } from '@vlting/ui/components'
import { Popover } from '@vlting/ui/components'
import { Tooltip } from '@vlting/ui/components'
import { HoverCard } from '@vlting/ui/components'
import { Collapsible } from '@vlting/ui/components'
import { Button } from '@vlting/ui/components'

export function OverlaysPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [collapsibleOpen, setCollapsibleOpen] = useState(false)

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Overlays & Modals</h1>

      <Section title="Dialog">
        <DemoCard label="Modal dialog">
          <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
          <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Edit Profile</Dialog.Title>
                <Dialog.Description>Make changes to your profile here.</Dialog.Description>
              </Dialog.Header>
              <div style={{ padding: '16px 0' }}>
                <p>Dialog body content</p>
              </div>
              <Dialog.Footer>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setDialogOpen(false)}>Save</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Root>
        </DemoCard>
      </Section>

      <Section title="AlertDialog">
        <DemoCard label="Confirmation dialog">
          <Button variant="destructive" onClick={() => setAlertOpen(true)}>Delete Item</Button>
          <AlertDialog.Root open={alertOpen} onOpenChange={setAlertOpen}>
            <AlertDialog.Content>
              <AlertDialog.Title>Are you sure?</AlertDialog.Title>
              <AlertDialog.Description>
                This action cannot be undone. This will permanently delete the item.
              </AlertDialog.Description>
              <AlertDialog.Footer>
                <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                <AlertDialog.Action>Delete</AlertDialog.Action>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Root>
        </DemoCard>
      </Section>

      <Section title="Sheet">
        <DemoCard label="Side panel">
          <Button onClick={() => setSheetOpen(true)}>Open Sheet</Button>
          <Sheet.Root open={sheetOpen} onOpenChange={setSheetOpen}>
            <Sheet.Frame>
              <Sheet.Handle />
              <div style={{ padding: 16 }}>
                <h3 style={{ margin: '0 0 8px' }}>Sheet Title</h3>
                <p style={{ color: '#666', margin: '0 0 16px' }}>Sheet description goes here.</p>
                <p>Sheet body content. This slides in from the side.</p>
              </div>
            </Sheet.Frame>
          </Sheet.Root>
        </DemoCard>
      </Section>

      <Section title="Drawer">
        <DemoCard label="Bottom drawer">
          <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
          <Drawer.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Drawer Title</Drawer.Title>
                <Drawer.Description>Pull up to expand.</Drawer.Description>
              </Drawer.Header>
              <div style={{ padding: 16 }}>
                <p>Drawer content that slides up from the bottom.</p>
              </div>
            </Drawer.Content>
          </Drawer.Root>
        </DemoCard>
      </Section>

      <Section title="Popover">
        <DemoCard label="Popover panel">
          <Popover.Root>
            <Popover.Trigger>
              <Button variant="outline">Open Popover</Button>
            </Popover.Trigger>
            <Popover.Content>
              <div style={{ padding: 8 }}>
                <p style={{ fontWeight: 600, marginBottom: 8 }}>Popover Content</p>
                <p style={{ fontSize: 14, color: '#666' }}>This is a popover with custom content.</p>
              </div>
            </Popover.Content>
          </Popover.Root>
        </DemoCard>
      </Section>

      <Section title="Tooltip">
        <DemoCard label="Tooltip on hover">
          <DemoRow>
            <Tooltip content="This is a tooltip">
              <Button variant="outline">Hover me</Button>
            </Tooltip>
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="HoverCard">
        <DemoCard label="Rich hover preview">
          <HoverCard.Root>
            <HoverCard.Trigger>
              <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>@vlting</span>
            </HoverCard.Trigger>
            <HoverCard.Content>
              <div style={{ padding: 8 }}>
                <p style={{ fontWeight: 600 }}>@vlting</p>
                <p style={{ fontSize: 14, color: '#666' }}>Open-source design system for React & React Native.</p>
              </div>
            </HoverCard.Content>
          </HoverCard.Root>
        </DemoCard>
      </Section>

      <Section title="Collapsible">
        <DemoCard label="Expandable section">
          <Collapsible.Root open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
            <Collapsible.Trigger>
              <Button variant="outline">
                {collapsibleOpen ? 'Hide' : 'Show'} Content
              </Button>
            </Collapsible.Trigger>
            <Collapsible.Content>
              <div style={{ padding: '12px 0' }}>
                <p>This content is collapsible. Click the button to toggle.</p>
              </div>
            </Collapsible.Content>
          </Collapsible.Root>
        </DemoCard>
      </Section>

      <Section title="Toast">
        <DemoCard label="Toast notifications">
          <DemoRow>
            <p style={{ fontSize: 14, color: '#666' }}>
              Use useToastController() hook to trigger toasts programmatically.
            </p>
          </DemoRow>
        </DemoCard>
      </Section>
    </div>
  )
}
