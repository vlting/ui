import { useState } from 'react'
import { ScrollView, StyleSheet, Text as RNText, View } from 'react-native'
import { Accordion } from '../../../../packages/components/Accordion/Accordion.native'
import { Button } from '../../../../packages/components/Button/Button.native'
import { Collapsible } from '../../../../packages/components/Collapsible/Collapsible.native'
import { Dialog } from '../../../../packages/components/Dialog/Dialog.native'
import { Drawer } from '../../../../packages/components/Drawer/Drawer.native'
import { Sheet } from '../../../../packages/components/Sheet/Sheet.native'
import { Toaster, toast } from '../../../../packages/components/Toast/Toast.native'
import { Switch } from '../../../../packages/components/Switch/Switch.native'
import { Text, Row, Column, Spacer } from '../../../../packages/stl-native/src/primitives'

export function DisclosureScreen() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <RNText style={styles.title}>Disclosure Components</RNText>
        <RNText style={styles.subtitle}>
          Accordion, Collapsible, Dialog, Sheet, Drawer, Toast
        </RNText>

        <View style={styles.section}>
          <RNText style={styles.sectionTitle}>Accordion</RNText>
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
        </View>

        <View style={styles.section}>
          <RNText style={styles.sectionTitle}>Collapsible</RNText>
          <Collapsible>
            <Collapsible.Trigger>Toggle details</Collapsible.Trigger>
            <Collapsible.Content>
              <Text>This content is hidden by default and revealed on press.</Text>
              <Spacer size="sm" />
              <Text>It uses animated height transitions for smooth expand/collapse.</Text>
            </Collapsible.Content>
          </Collapsible>
        </View>

        <View style={styles.section}>
          <RNText style={styles.sectionTitle}>Dialog</RNText>
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
        </View>

        <View style={styles.section}>
          <RNText style={styles.sectionTitle}>Sheet</RNText>
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
              <Column stl={{ gap: 12, padding: 16 }}>
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
        </View>

        <View style={styles.section}>
          <RNText style={styles.sectionTitle}>Drawer</RNText>
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
              <Column stl={{ padding: 16, gap: 16 }}>
                <Text>Home</Text>
                <Text>Settings</Text>
                <Text>Profile</Text>
                <Text>About</Text>
              </Column>
              <Drawer.Close />
            </Drawer.Content>
          </Drawer>
        </View>

        <View style={styles.section}>
          <RNText style={styles.sectionTitle}>Toast</RNText>
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
        </View>

        <Spacer size="xl" />
      </ScrollView>

      <Toaster position="bottom" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 24 },
  section: { marginBottom: 28 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
})
