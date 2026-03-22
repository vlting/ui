import { useState } from 'react'
import { Accordion } from '../../../../packages/components/Accordion/Accordion.native'
import { Button } from '../../../../packages/components/Button/Button.native'
import { Collapsible } from '../../../../packages/components/Collapsible/Collapsible.native'
import { Dialog } from '../../../../packages/components/Dialog/Dialog.native'
import { Drawer } from '../../../../packages/components/Drawer/Drawer.native'
import { Sheet } from '../../../../packages/components/Sheet/Sheet.native'
import { Toaster, toast } from '../../../../packages/components/Toast/Toast.native'
import { Switch } from '../../../../packages/components/Switch/Switch.native'
import { Box, Column, Heading, Row, ScrollView, Spacer, Text } from '../../../../packages/stl-native/src/primitives'

export function DisclosureScreen() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <Box stl={{ flex: 1 }}>
      <ScrollView stl={{ flex: 1, p: 20 }}>
        <Heading stl={{ fontSize: 24, fontWeight: '$700', mb: 4 }}>
          Disclosure Components
        </Heading>
        <Text stl={{ fontSize: 14, color: '$neutral6', mb: 24 }}>
          Accordion, Collapsible, Dialog, Sheet, Drawer, Toast
        </Text>

        <Box stl={{ mb: 28 }}>
          <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Accordion</Text>
          <Accordion type="single">
            <Accordion.Item value="item-1">
              <Accordion.Trigger>What is @vlting/ui?</Accordion.Trigger>
              <Accordion.Content>
                <Text>A cross-platform design system for web and React Native.</Text>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-2">
              <Accordion.Trigger>How does styling work?</Accordion.Trigger>
              <Accordion.Content>
                <Text>Uses stl-native styled() with token references for all values.</Text>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-3">
              <Accordion.Trigger>Is it open source?</Accordion.Trigger>
              <Accordion.Content>
                <Text>Yes, MIT licensed and available on GitHub.</Text>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </Box>

        <Box stl={{ mb: 28 }}>
          <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Collapsible</Text>
          <Collapsible>
            <Collapsible.Trigger>Toggle details</Collapsible.Trigger>
            <Collapsible.Content>
              <Text>This content is hidden by default and revealed on press.</Text>
              <Spacer size="sm" />
              <Text>It uses animated height transitions for smooth expand/collapse.</Text>
            </Collapsible.Content>
          </Collapsible>
        </Box>

        <Box stl={{ mb: 28 }}>
          <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Dialog</Text>
          <Button onPress={() => setDialogOpen(true)}>
            <Button.Text>Open Dialog</Button.Text>
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Confirm Action</Dialog.Title>
                <Dialog.Description>Are you sure you want to proceed?</Dialog.Description>
              </Dialog.Header>
              <Dialog.Footer>
                <Button variant="outline" onPress={() => setDialogOpen(false)}>
                  <Button.Text>Cancel</Button.Text>
                </Button>
                <Button onPress={() => setDialogOpen(false)}>
                  <Button.Text>Confirm</Button.Text>
                </Button>
              </Dialog.Footer>
              <Dialog.Close />
            </Dialog.Content>
          </Dialog>
        </Box>

        <Box stl={{ mb: 28 }}>
          <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Sheet</Text>
          <Button onPress={() => setSheetOpen(true)}>
            <Button.Text>Open Sheet</Button.Text>
          </Button>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <Sheet.Content>
              <Sheet.Handle />
              <Sheet.Header>
                <Sheet.Title>Settings</Sheet.Title>
                <Sheet.Description>Adjust your preferences</Sheet.Description>
              </Sheet.Header>
              <Column stl={{ gap: 12, p: 16 }}>
                <Row stl={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text>Dark Mode</Text>
                  <Switch checked={false} onCheckedChange={() => {}} />
                </Row>
                <Row stl={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text>Notifications</Text>
                  <Switch checked={true} onCheckedChange={() => {}} />
                </Row>
              </Column>
              <Sheet.Footer>
                <Button variant="outline" onPress={() => setSheetOpen(false)}>
                  <Button.Text>Done</Button.Text>
                </Button>
              </Sheet.Footer>
            </Sheet.Content>
          </Sheet>
        </Box>

        <Box stl={{ mb: 28 }}>
          <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Drawer</Text>
          <Row stl={{ gap: 8, flexWrap: 'wrap' }}>
            <Button variant="outline" onPress={() => setDrawerOpen(true)}>
              <Button.Text>Open Drawer</Button.Text>
            </Button>
          </Row>
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="right">
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Navigation</Drawer.Title>
                <Drawer.Description>Main menu</Drawer.Description>
              </Drawer.Header>
              <Column stl={{ p: 16, gap: 16 }}>
                <Text>Home</Text>
                <Text>Settings</Text>
                <Text>Profile</Text>
                <Text>About</Text>
              </Column>
              <Drawer.Close />
            </Drawer.Content>
          </Drawer>
        </Box>

        <Box stl={{ mb: 28 }}>
          <Text stl={{ fontSize: 16, fontWeight: '$600', mb: 10 }}>Toast</Text>
          <Row stl={{ gap: 8, flexWrap: 'wrap' }}>
            <Button onPress={() => toast('Default toast')}>
              <Button.Text>Default</Button.Text>
            </Button>
            <Button
              variant="outline"
              onPress={() => toast.success('Operation completed!')}
            >
              <Button.Text>Success</Button.Text>
            </Button>
            <Button
              theme="destructive"
              onPress={() => toast.error('Something failed')}
            >
              <Button.Text>Error</Button.Text>
            </Button>
          </Row>
        </Box>

        <Spacer size="xl" />
      </ScrollView>

      <Toaster position="bottom" />
    </Box>
  )
}
