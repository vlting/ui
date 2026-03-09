import { useState } from 'react'
import { Section, DemoCard, DemoRow } from '../components/Section'
import { Dialog } from '@vlting/ui/components'
import { AlertDialog } from '@vlting/ui/components'
import { Sheet } from '@vlting/ui/components'
import { Drawer } from '@vlting/ui/components'
import { Popover } from '@vlting/ui/components'
import { Tooltip } from '@vlting/ui/components'
import { HoverCard } from '@vlting/ui/components'
import { Toast } from '@vlting/ui/components'
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
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
          </Dialog>
        </DemoCard>
      </Section>

      <Section title="AlertDialog">
        <DemoCard label="Confirmation dialog">
          <Button variant="destructive" onClick={() => setAlertOpen(true)}>Delete Item</Button>
          <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
            <AlertDialog.Content>
              <AlertDialog.Header>
                <AlertDialog.Title>Are you sure?</AlertDialog.Title>
                <AlertDialog.Description>
                  This action cannot be undone. This will permanently delete the item.
                </AlertDialog.Description>
              </AlertDialog.Header>
              <AlertDialog.Footer>
                <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                <AlertDialog.Action onClick={() => setAlertOpen(false)}>Delete</AlertDialog.Action>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </DemoCard>
      </Section>

      <Section title="Sheet">
        <DemoCard label="Side panel">
          <Button onClick={() => setSheetOpen(true)}>Open Sheet</Button>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <Sheet.Content side="right">
              <Sheet.Header>
                <Sheet.Title>Sheet Title</Sheet.Title>
                <Sheet.Description>Sheet description goes here.</Sheet.Description>
              </Sheet.Header>
              <div style={{ padding: 16 }}>
                <p>Sheet body content. This slides in from the side.</p>
              </div>
            </Sheet.Content>
          </Sheet>
        </DemoCard>
      </Section>

      <Section title="Drawer">
        <DemoCard label="Bottom drawer">
          <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Drawer Title</Drawer.Title>
                <Drawer.Description>Pull up to expand.</Drawer.Description>
              </Drawer.Header>
              <div style={{ padding: 16 }}>
                <p>Drawer content that slides up from the bottom.</p>
              </div>
            </Drawer.Content>
          </Drawer>
        </DemoCard>
      </Section>

      <Section title="Popover">
        <DemoCard label="Popover panel">
          <Popover>
            <Popover.Trigger asChild>
              <Button variant="outline">Open Popover</Button>
            </Popover.Trigger>
            <Popover.Content>
              <div style={{ padding: 8 }}>
                <p style={{ fontWeight: 600, marginBottom: 8 }}>Popover Content</p>
                <p style={{ fontSize: 14, color: '#666' }}>This is a popover with custom content.</p>
              </div>
            </Popover.Content>
          </Popover>
        </DemoCard>
      </Section>

      <Section title="Tooltip">
        <DemoCard label="Tooltip on hover">
          <DemoRow>
            <Tooltip>
              <Tooltip.Trigger asChild>
                <Button variant="outline">Hover me</Button>
              </Tooltip.Trigger>
              <Tooltip.Content>This is a tooltip</Tooltip.Content>
            </Tooltip>
          </DemoRow>
        </DemoCard>
      </Section>

      <Section title="HoverCard">
        <DemoCard label="Rich hover preview">
          <HoverCard>
            <HoverCard.Trigger asChild>
              <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>@vlting</span>
            </HoverCard.Trigger>
            <HoverCard.Content>
              <div style={{ padding: 8 }}>
                <p style={{ fontWeight: 600 }}>@vlting</p>
                <p style={{ fontSize: 14, color: '#666' }}>Open-source design system for React & React Native.</p>
              </div>
            </HoverCard.Content>
          </HoverCard>
        </DemoCard>
      </Section>

      <Section title="Collapsible">
        <DemoCard label="Expandable section">
          <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
            <Collapsible.Trigger asChild>
              <Button variant="outline">
                {collapsibleOpen ? 'Hide' : 'Show'} Content
              </Button>
            </Collapsible.Trigger>
            <Collapsible.Content>
              <div style={{ padding: '12px 0' }}>
                <p>This content is collapsible. Click the button to toggle.</p>
              </div>
            </Collapsible.Content>
          </Collapsible>
        </DemoCard>
      </Section>

      <Section title="Toast">
        <DemoCard label="Toast notifications">
          <DemoRow>
            <Button onClick={() => Toast.show?.({ title: 'Success!', description: 'Your changes have been saved.' })}>
              Show Toast
            </Button>
          </DemoRow>
        </DemoCard>
      </Section>
    </div>
  )
}
