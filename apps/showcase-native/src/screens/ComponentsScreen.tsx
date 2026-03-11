import { useState } from 'react'
import {
  Alert as RNAlert,
  Text as RNText,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { Accordion } from '../../../../packages/components/Accordion/Accordion.native'
import { Alert } from '../../../../packages/components/Alert/Alert.native'
import { Avatar } from '../../../../packages/components/Avatar/Avatar.native'
import { Badge } from '../../../../packages/components/Badge/Badge.native'
// Tier 1
import { Button } from '../../../../packages/components/Button/Button.native'
import { Card } from '../../../../packages/components/Card/Card.native'
import { Checkbox } from '../../../../packages/components/Checkbox/Checkbox.native'
// Tier 2
import { Dialog } from '../../../../packages/components/Dialog/Dialog.native'
import { DropdownMenu } from '../../../../packages/components/DropdownMenu/DropdownMenu.native'
import { Input } from '../../../../packages/components/Input/Input.native'
import { Label } from '../../../../packages/components/Label/Label.native'
import { Select } from '../../../../packages/components/Select/Select.native'
import { Separator } from '../../../../packages/components/Separator/Separator.native'
import { Sheet } from '../../../../packages/components/Sheet/Sheet.native'
import { Switch } from '../../../../packages/components/Switch/Switch.native'
import { Tabs } from '../../../../packages/components/Tabs/Tabs.native'
import { Toast, useNativeToast } from '../../../../packages/components/Toast/Toast.native'
import { Tooltip } from '../../../../packages/components/Tooltip/Tooltip.native'

// Primitives for layout
import { Column, Row, Spacer, Text } from '../../../../packages/stl-native/src/primitives'

function ToastDemo() {
  const { add } = useNativeToast()
  return (
    <Button
      onPress={() => add({ message: `Hello at ${Date.now() % 1000}`, duration: 3000 })}
    >
      <Button.Text>Show Toast</Button.Text>
    </Button>
  )
}

export function ComponentsScreen() {
  const [checked, setChecked] = useState(false)
  const [switchOn, setSwitchOn] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  return (
    <ScrollView style={styles.container}>
      <RNText style={styles.title}>Components</RNText>
      <RNText style={styles.subtitle}>
        Ported @vlting/ui components for React Native.
      </RNText>

      {/* ---- Tier 1 ---- */}
      <RNText style={styles.tierTitle}>Tier 1</RNText>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Button</RNText>
        <Row css={{ gap: 8, flexWrap: 'wrap' }}>
          <Button onPress={() => RNAlert.alert('Pressed!')}>
            <Button.Text>Default</Button.Text>
          </Button>
          <Button variant="secondary">
            <Button.Text>Secondary</Button.Text>
          </Button>
          <Button variant="destructive">
            <Button.Text>Destructive</Button.Text>
          </Button>
          <Button variant="outline">
            <Button.Text>Outline</Button.Text>
          </Button>
          <Button variant="ghost">
            <Button.Text>Ghost</Button.Text>
          </Button>
        </Row>
        <Spacer size="sm" />
        <Row css={{ gap: 8 }}>
          <Button size="sm">
            <Button.Text>Small</Button.Text>
          </Button>
          <Button size="md">
            <Button.Text>Medium</Button.Text>
          </Button>
          <Button size="lg">
            <Button.Text>Large</Button.Text>
          </Button>
        </Row>
        <Spacer size="sm" />
        <Button loading>
          <Button.Text>Loading</Button.Text>
        </Button>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Input</RNText>
        <Input
          placeholder="Type something..."
          value={inputValue}
          onChangeText={setInputValue}
        />
        <Spacer size="sm" />
        <Input placeholder="Disabled" disabled />
        <Spacer size="sm" />
        <Input placeholder="Error state" error errorMessage="This field is required" />
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Checkbox</RNText>
        <Checkbox.Root
          checked={checked}
          onCheckedChange={(v: boolean | 'indeterminate') => setChecked(v === true)}
        >
          <Text>Accept terms and conditions</Text>
        </Checkbox.Root>
        <RNText style={styles.label}>Checked: {String(checked)}</RNText>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Switch</RNText>
        <Row css={{ gap: 12, alignItems: 'center' }}>
          <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
          <Text>Notifications {switchOn ? 'on' : 'off'}</Text>
        </Row>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Card</RNText>
        <Card>
          <Card.Header>
            <Card.Title>Project Update</Card.Title>
            <Card.Description>Latest changes and improvements</Card.Description>
          </Card.Header>
          <Card.Content>
            <Text>Card content goes here with any layout.</Text>
          </Card.Content>
          <Card.Footer>
            <Button variant="outline" size="sm">
              <Button.Text>View Details</Button.Text>
            </Button>
          </Card.Footer>
        </Card>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Avatar</RNText>
        <Row css={{ gap: 12 }}>
          <Avatar src="https://i.pravatar.cc/100?img=1" size="sm" fallback="JD" />
          <Avatar src="https://i.pravatar.cc/100?img=2" size="md" fallback="AB" />
          <Avatar src="https://invalid-url.test" size="lg" fallback="XY" />
        </Row>
        <RNText style={styles.label}>sm / md / lg (last one shows fallback)</RNText>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Badge</RNText>
        <Row css={{ gap: 8, flexWrap: 'wrap' }}>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Error</Badge>
          <Badge variant="outline">Outline</Badge>
        </Row>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Alert</RNText>
        <Alert.Root>
          <Alert.Title>Info</Alert.Title>
          <Alert.Description>This is a default alert message.</Alert.Description>
        </Alert.Root>
        <Spacer size="sm" />
        <Alert.Root variant="destructive">
          <Alert.Title>Error</Alert.Title>
          <Alert.Description>Something went wrong.</Alert.Description>
        </Alert.Root>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Separator</RNText>
        <Text>Above</Text>
        <Separator />
        <Text>Below</Text>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Label</RNText>
        <Label>Username</Label>
        <Spacer size="xs" />
        <Label required>Email address</Label>
        <Spacer size="xs" />
        <Label disabled>Disabled field</Label>
      </View>

      {/* ---- Tier 2 ---- */}
      <RNText style={styles.tierTitle}>Tier 2</RNText>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Dialog</RNText>
        <Button onPress={() => setDialogOpen(true)}>
          <Button.Text>Open Dialog</Button.Text>
        </Button>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Dialog.Title>Confirm Action</Dialog.Title>
          <Dialog.Description>Are you sure you want to proceed?</Dialog.Description>
          <Dialog.Footer>
            <Button variant="outline" onPress={() => setDialogOpen(false)}>
              <Button.Text>Cancel</Button.Text>
            </Button>
            <Button onPress={() => setDialogOpen(false)}>
              <Button.Text>Confirm</Button.Text>
            </Button>
          </Dialog.Footer>
        </Dialog>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Sheet</RNText>
        <Button onPress={() => setSheetOpen(true)}>
          <Button.Text>Open Sheet</Button.Text>
        </Button>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <Sheet.Header>
            <Sheet.Title>Settings</Sheet.Title>
            <Sheet.Description>Adjust your preferences</Sheet.Description>
          </Sheet.Header>
          <Sheet.Content>
            <Column css={{ gap: 12 }}>
              <Row css={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>Dark Mode</Text>
                <Switch checked={false} onCheckedChange={() => {}} />
              </Row>
              <Row css={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>Notifications</Text>
                <Switch checked={true} onCheckedChange={() => {}} />
              </Row>
            </Column>
          </Sheet.Content>
        </Sheet>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Tabs</RNText>
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Details</Tabs.Trigger>
            <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">
            <Text>Overview content goes here.</Text>
          </Tabs.Content>
          <Tabs.Content value="tab2">
            <Text>Detailed information panel.</Text>
          </Tabs.Content>
          <Tabs.Content value="tab3">
            <Text>Settings and configuration.</Text>
          </Tabs.Content>
        </Tabs>
      </View>

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
        </Accordion>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Select</RNText>
        <Select placeholder="Choose a fruit...">
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="banana">Banana</Select.Item>
          <Select.Item value="cherry">Cherry</Select.Item>
          <Select.Item value="date">Date</Select.Item>
        </Select>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Toast</RNText>
        <Toast>
          <ToastDemo />
        </Toast>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>DropdownMenu</RNText>
        <DropdownMenu>
          <DropdownMenu.Trigger>
            <Button variant="outline">
              <Button.Text>Open Menu</Button.Text>
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>Actions</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Item onPress={() => RNAlert.alert('Edit')}>
              <Text>Edit</Text>
            </DropdownMenu.Item>
            <DropdownMenu.Item onPress={() => RNAlert.alert('Duplicate')}>
              <Text>Duplicate</Text>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item onPress={() => RNAlert.alert('Delete')}>
              <Text>Delete</Text>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionTitle}>Tooltip</RNText>
        <Tooltip content="This is helpful info">
          <Button variant="outline">
            <Button.Text>Long press for tooltip</Button.Text>
          </Button>
        </Tooltip>
      </View>

      <Spacer size="xl" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 24 },
  tierTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 12,
    color: '#0066ff',
  },
  section: { marginBottom: 28 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  label: { fontSize: 12, color: '#888', marginTop: 4 },
})
