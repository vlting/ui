import { useState } from 'react'
import { ScrollView, StyleSheet, Text as RNText, View } from 'react-native'
import { AlertDialog } from '../../../../packages/components/AlertDialog/AlertDialog.native'
import { Button } from '../../../../packages/components/Button/Button.native'
import { HoverCard } from '../../../../packages/components/HoverCard/HoverCard.native'
import { Popover } from '../../../../packages/components/Popover/Popover.native'
import { Tooltip } from '../../../../packages/components/Tooltip/Tooltip.native'
import { Text, Row, Spacer } from '../../../../packages/stl-native/src/primitives'

export function OverlayScreen() {
  const [alertOpen, setAlertOpen] = useState(false)

  return (
    <ScrollView style={styles.container}>
      <RNText style={styles.title}>Overlay Components</RNText>
      <RNText style={styles.subtitle}>
        Popover, Tooltip, HoverCard, AlertDialog
      </RNText>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Popover</RNText>
        <Popover>
          <Popover.Trigger>
            <Button variant="outline">
              <Button.Text>Open Popover</Button.Text>
            </Button>
          </Popover.Trigger>
          <Popover.Content>
            <RNText style={{ fontWeight: '600', fontSize: 14, marginBottom: 8 }}>
              Popover Title
            </RNText>
            <Text>This popover appears below the trigger with positioning.</Text>
            <Spacer size="sm" />
            <Button size="md" variant="outline" onPress={() => {}}>
              <Button.Text>Action</Button.Text>
            </Button>
          </Popover.Content>
        </Popover>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Tooltip</RNText>
        <RNText style={styles.label}>Long press to see tooltip</RNText>
        <Spacer size="sm" />
        <Row stl={{ gap: 12 }}>
          <Tooltip content="This is helpful information" placement="bottom">
            <Button variant="outline">
              <Button.Text>Bottom tooltip</Button.Text>
            </Button>
          </Tooltip>
          <Tooltip content="Appears above the trigger" placement="top">
            <Button variant="outline">
              <Button.Text>Top tooltip</Button.Text>
            </Button>
          </Tooltip>
        </Row>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>HoverCard</RNText>
        <RNText style={styles.label}>Long press to see card</RNText>
        <Spacer size="sm" />
        <HoverCard>
          <HoverCard.Trigger>
            <Button variant="outline">
              <Button.Text>@vlting</Button.Text>
            </Button>
          </HoverCard.Trigger>
          <HoverCard.Content>
            <RNText style={{ fontWeight: '600', fontSize: 15 }}>@vlting</RNText>
            <Spacer size="xs" />
            <Text>Open-source design system for cross-platform React applications.</Text>
            <Spacer size="sm" />
            <Row stl={{ gap: 16 }}>
              <Text>128 repos</Text>
              <Text>2.4k followers</Text>
            </Row>
          </HoverCard.Content>
        </HoverCard>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>AlertDialog</RNText>
        <Button theme="destructive" onPress={() => setAlertOpen(true)}>
          <Button.Text>Delete Account</Button.Text>
        </Button>
        <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
          <AlertDialog.Content>
            <AlertDialog.Title>Are you sure?</AlertDialog.Title>
            <AlertDialog.Description>
              This action cannot be undone. This will permanently delete your account
              and remove all associated data.
            </AlertDialog.Description>
            <AlertDialog.Footer>
              <AlertDialog.Cancel>
                <Button variant="outline" onPress={() => setAlertOpen(false)}>
                  <Button.Text>Cancel</Button.Text>
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button theme="destructive" onPress={() => setAlertOpen(false)}>
                  <Button.Text>Delete</Button.Text>
                </Button>
              </AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </View>

      <Spacer size="xl" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 24 },
  section: { marginBottom: 28 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  label: { fontSize: 12, color: '#888' },
})
