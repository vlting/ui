'use client'

import { useState, type ReactNode, type ComponentType } from 'react'
import { ComponentPreview } from './component-preview'
import type { ComponentExample } from '@/lib/registry'

// Tamagui v2 RC GetFinalProps bug — all token props resolve to `undefined`.
// Cast re-exported components to a loose type for docs example rendering.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFC = ComponentType<any>

import {
  Button as _Button,
  Input as _Input,
  Card as _Card,
  Tabs as _Tabs,
  Select as _Select,
  Accordion as _Accordion,
  Table as _Table,
  Tooltip as _Tooltip,
  Field as _Field,
  Alert as _Alert,
  AlertDialog as _AlertDialog,
  AspectRatio as _AspectRatio,
  Avatar as _Avatar,
  Badge as _Badge,
  Breadcrumb as _Breadcrumb,
  ButtonGroup as _ButtonGroup,
  Calendar as _Calendar,
  Carousel as _Carousel,
  Checkbox as _Checkbox,
  Collapsible as _Collapsible,
  Combobox as _Combobox,
  Command as _Command,
  ContextMenu as _ContextMenu,
  DataTable as _DataTable,
  DatePicker as _DatePicker,
  Dialog as _Dialog,
  Drawer as _Drawer,
  DropdownMenu as _DropdownMenu,
  Empty as _Empty,
  HoverCard as _HoverCard,
  InputGroup as _InputGroup,
  InputOTP as _InputOTP,
  Item as _Item,
  Kbd as _Kbd,
  Label as _Label,
  Loader as _Loader,
  Menubar as _Menubar,
  NavigationMenu as _NavigationMenu,
  NativeSelect as _NativeSelect,
  Pagination as _Pagination,
  Popover as _Popover,
  Progress as _Progress,
  RadioGroup as _RadioGroup,
  Resizable as _Resizable,
  ScrollArea as _ScrollArea,
  Separator as _Separator,
  Sheet as _Sheet,
  Sidebar as _Sidebar,
  Skeleton as _Skeleton,
  Slider as _Slider,
  Spinner as _Spinner,
  Switch as _Switch,
  Textarea as _Textarea,
  Toast as _Toast,
  Toggle as _Toggle,
  ToggleGroup as _ToggleGroup,
} from '@vlting/ui'

// Cast all components and sub-components to AnyFC
const Button = _Button as AnyFC & {
  Text: AnyFC
  Icon: AnyFC
}
const Input = _Input as AnyFC
const Card = _Card as AnyFC & {
  Header: AnyFC
  Content: AnyFC
  Footer: AnyFC
  Title: AnyFC
  Description: AnyFC
}
const Tabs = _Tabs as unknown as {
  Root: AnyFC
  List: AnyFC
  Trigger: AnyFC
  Content: AnyFC
}
const Select = _Select as AnyFC & {
  Item: AnyFC
  Value: AnyFC
  Group: AnyFC
  Label: AnyFC
  Separator: AnyFC
}
const Accordion = _Accordion as unknown as {
  Root: AnyFC
  Item: AnyFC
  Trigger: AnyFC
  Content: AnyFC
}
const Table = _Table as unknown as {
  Root: AnyFC
  Header: AnyFC
  Body: AnyFC
  Footer: AnyFC
  Row: AnyFC
  Head: AnyFC
  Cell: AnyFC
  Caption: AnyFC
}
const Tooltip = _Tooltip as AnyFC
const Field = _Field as unknown as {
  Root: AnyFC
  Label: AnyFC
  Control: AnyFC
  Description: AnyFC
  Error: AnyFC
}
const Alert = _Alert as unknown as {
  Root: AnyFC
  Title: AnyFC
  Description: AnyFC
  Icon: AnyFC
}
const AlertDialog = _AlertDialog as unknown as {
  Root: AnyFC
  Trigger: AnyFC
  Overlay: AnyFC
  Content: AnyFC
  Title: AnyFC
  Description: AnyFC
  Footer: AnyFC
  Cancel: AnyFC
  Action: AnyFC
}
const AspectRatio = _AspectRatio as AnyFC
const Avatar = _Avatar as AnyFC & {
  Image: AnyFC
  Fallback: AnyFC
}
const Badge = _Badge as AnyFC
const Breadcrumb = _Breadcrumb as unknown as {
  Root: AnyFC
  Item: AnyFC
  Link: AnyFC
  Page: AnyFC
  Separator: AnyFC
}
const ButtonGroup = _ButtonGroup as unknown as {
  Root: AnyFC
}
const Calendar = _Calendar as unknown as {
  Root: AnyFC
}
const Carousel = _Carousel as unknown as {
  Root: AnyFC
  Item: AnyFC
}
const Checkbox = _Checkbox as unknown as {
  Root: AnyFC
  Indicator: AnyFC
}
const Collapsible = _Collapsible as unknown as {
  Root: AnyFC
  Trigger: AnyFC
  Content: AnyFC
}
const Combobox = _Combobox as unknown as {
  Root: AnyFC
}
const Command = _Command as unknown as {
  Root: AnyFC
  Input: AnyFC
  List: AnyFC
  Empty: AnyFC
  Group: AnyFC
  Item: AnyFC
}
const ContextMenu = _ContextMenu as unknown as {
  Root: AnyFC
  Trigger: AnyFC
  Content: AnyFC
  Item: AnyFC
  Separator: AnyFC
  Label: AnyFC
}
const DataTable = _DataTable as AnyFC
const DatePicker = _DatePicker as AnyFC
const Dialog = _Dialog as unknown as {
  Root: AnyFC
  Trigger: AnyFC
  Overlay: AnyFC
  Content: AnyFC
  Title: AnyFC
  Description: AnyFC
  Footer: AnyFC
  Close: AnyFC
}
const Drawer = _Drawer as unknown as {
  Root: AnyFC
  Trigger: AnyFC
  Content: AnyFC
  Header: AnyFC
  Footer: AnyFC
  Title: AnyFC
  Description: AnyFC
  Close: AnyFC
}
const DropdownMenu = _DropdownMenu as unknown as {
  Root: AnyFC
  Trigger: AnyFC
  Content: AnyFC
  Item: AnyFC
  CheckboxItem: AnyFC
  Separator: AnyFC
  Label: AnyFC
}
const Empty = _Empty as unknown as {
  Root: AnyFC
  Media: AnyFC
  Title: AnyFC
  Description: AnyFC
  Action: AnyFC
}
const HoverCard = _HoverCard as unknown as {
  Root: AnyFC
  Trigger: AnyFC
  Content: AnyFC
}
const InputGroup = _InputGroup as unknown as {
  Root: AnyFC
  Addon: AnyFC
  Element: AnyFC
  Input: AnyFC
}
const InputOTP = _InputOTP as unknown as {
  Root: AnyFC
  Slot: AnyFC
}
const Item = _Item as unknown as {
  Root: AnyFC
  Leading: AnyFC
  Content: AnyFC
  Title: AnyFC
  Description: AnyFC
  Trailing: AnyFC
}
const Kbd = _Kbd as AnyFC
const Label = _Label as AnyFC
const Loader = _Loader as AnyFC
const Menubar = _Menubar as unknown as {
  Root: AnyFC
  Menu: AnyFC
  Trigger: AnyFC
  Content: AnyFC
  Item: AnyFC
  Separator: AnyFC
}
const NavigationMenu = _NavigationMenu as unknown as {
  Root: AnyFC
  Item: AnyFC
  Trigger: AnyFC
  Content: AnyFC
  Link: AnyFC
}
const NativeSelect = _NativeSelect as unknown as {
  Root: AnyFC
  Option: AnyFC
}
const Pagination = _Pagination as unknown as {
  Root: AnyFC
  Content: AnyFC
  Previous: AnyFC
  Next: AnyFC
  Item: AnyFC
  Ellipsis: AnyFC
}
const Popover = _Popover as unknown as {
  Root: AnyFC
  Trigger: AnyFC
  Content: AnyFC
  Arrow: AnyFC
  Close: AnyFC
}
const Progress = _Progress as AnyFC
const RadioGroup = _RadioGroup as unknown as {
  Root: AnyFC
  Item: AnyFC
}
const Resizable = _Resizable as unknown as {
  PanelGroup: AnyFC
  Panel: AnyFC
  Handle: AnyFC
}
const ScrollArea = _ScrollArea as unknown as {
  Root: AnyFC
  Viewport: AnyFC
}
const Separator = _Separator as AnyFC
const Sheet = _Sheet as unknown as {
  Root: AnyFC
  Overlay: AnyFC
  Handle: AnyFC
  Frame: AnyFC
  ScrollView: AnyFC
}
const Sidebar = _Sidebar as unknown as {
  Root: AnyFC
  Group: AnyFC
  MenuItem: AnyFC
}
const Skeleton = _Skeleton as AnyFC
const Slider = _Slider as AnyFC
const Spinner = _Spinner as AnyFC
const Switch = _Switch as AnyFC
const Textarea = _Textarea as AnyFC
const Toast = _Toast as unknown as {
  Root: AnyFC
  Title: AnyFC
  Description: AnyFC
  Action: AnyFC
  Close: AnyFC
}
const Toggle = _Toggle as AnyFC
const ToggleGroup = _ToggleGroup as unknown as {
  Root: AnyFC
  Item: AnyFC
}

// Small stateful wrapper components for overlay/modal examples
function SheetDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onPress={() => setOpen(true)}>
        <Button.Text>Open Sheet</Button.Text>
      </Button>
      <Sheet.Root open={open} onOpenChange={setOpen}>
        <Sheet.Overlay />
        <Sheet.Frame>
          <Sheet.Handle />
          <div style={{ padding: 16 }}>
            <p>Sheet content goes here.</p>
          </div>
        </Sheet.Frame>
      </Sheet.Root>
    </>
  )
}

function DrawerDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onPress={() => setOpen(true)}>
        <Button.Text>Open Drawer</Button.Text>
      </Button>
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Drawer Title</Drawer.Title>
            <Drawer.Description>Drawer description goes here.</Drawer.Description>
          </Drawer.Header>
          <div style={{ padding: 16 }}>
            <p>Drawer content</p>
          </div>
          <Drawer.Footer>
            <Drawer.Close>
              <Button variant="outline">
                <Button.Text>Close</Button.Text>
              </Button>
            </Drawer.Close>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>
    </>
  )
}

function AlertDialogDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="destructive" onPress={() => setOpen(true)}>
        <Button.Text>Delete Account</Button.Text>
      </Button>
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. This will permanently delete your account.
          </AlertDialog.Description>
          <AlertDialog.Footer>
            <AlertDialog.Cancel>
              <Button variant="outline" onPress={() => setOpen(false)}>
                <Button.Text>Cancel</Button.Text>
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="destructive" onPress={() => setOpen(false)}>
                <Button.Text>Delete</Button.Text>
              </Button>
            </AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

function DialogDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onPress={() => setOpen(true)}>
        <Button.Text>Open Dialog</Button.Text>
      </Button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Edit Profile</Dialog.Title>
          <Dialog.Description>
            Make changes to your profile here. Click save when done.
          </Dialog.Description>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '16px 0' }}>
            <Input placeholder="Name" />
            <Input placeholder="Email" />
          </div>
          <Dialog.Footer>
            <Dialog.Close>
              <Button variant="outline" onPress={() => setOpen(false)}>
                <Button.Text>Cancel</Button.Text>
              </Button>
            </Dialog.Close>
            <Button onPress={() => setOpen(false)}>
              <Button.Text>Save</Button.Text>
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}

type ExampleRenderer = () => ReactNode

const liveExamples: Record<string, Record<string, ExampleRenderer>> = {
  button: {
    Basic: () => (
      <Button>
        <Button.Text>Click me</Button.Text>
      </Button>
    ),
    Variants: () => (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button variant="default">
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
        <Button variant="link">
          <Button.Text>Link</Button.Text>
        </Button>
      </div>
    ),
    Sizes: () => (
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button size="xs">
          <Button.Text>Extra Small</Button.Text>
        </Button>
        <Button size="sm">
          <Button.Text>Small</Button.Text>
        </Button>
        <Button size="md">
          <Button.Text>Medium</Button.Text>
        </Button>
        <Button size="lg">
          <Button.Text>Large</Button.Text>
        </Button>
      </div>
    ),
    Loading: () => (
      <Button loading>
        <Button.Text>Loading</Button.Text>
      </Button>
    ),
  },
  input: {
    Basic: () => <Input placeholder="Type something..." />,
    'With Field': () => (
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Control>
          <Input placeholder="you@example.com" />
        </Field.Control>
        <Field.Description>We will never share your email.</Field.Description>
      </Field.Root>
    ),
    Disabled: () => <Input placeholder="Disabled" disabled />,
  },
  card: {
    Basic: () => (
      <Card>
        <Card.Header>
          <Card.Title>Card Title</Card.Title>
          <Card.Description>Card description goes here.</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Card content with details about the item.</p>
        </Card.Content>
        <Card.Footer>
          <Button variant="outline">
            <Button.Text>Cancel</Button.Text>
          </Button>
          <Button>
            <Button.Text>Save</Button.Text>
          </Button>
        </Card.Footer>
      </Card>
    ),
  },
  tabs: {
    Basic: () => (
      <Tabs.Root defaultValue="tab1">
        <Tabs.List>
          <Tabs.Trigger value="tab1">Account</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Password</Tabs.Trigger>
          <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">
          <p>Manage your account settings.</p>
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <p>Change your password here.</p>
        </Tabs.Content>
        <Tabs.Content value="tab3">
          <p>Configure your preferences.</p>
        </Tabs.Content>
      </Tabs.Root>
    ),
  },
  select: {
    Basic: () => (
      <Select placeholder="Select a fruit">
        <Select.Item value="apple">Apple</Select.Item>
        <Select.Item value="banana">Banana</Select.Item>
        <Select.Item value="cherry">Cherry</Select.Item>
        <Select.Item value="grape">Grape</Select.Item>
      </Select>
    ),
  },
  accordion: {
    Basic: () => (
      <Accordion.Root type="single" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
          <Accordion.Content>
            Yes. It adheres to the WAI-ARIA design pattern.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Is it styled?</Accordion.Trigger>
          <Accordion.Content>
            Yes. It uses design tokens for consistent theming.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3">
          <Accordion.Trigger>Is it animated?</Accordion.Trigger>
          <Accordion.Content>
            Yes. Smooth expand/collapse with Tamagui animations.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    ),
  },
  table: {
    Basic: () => (
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Email</Table.Head>
            <Table.Head>Role</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Alice Johnson</Table.Cell>
            <Table.Cell>alice@example.com</Table.Cell>
            <Table.Cell>Admin</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Bob Smith</Table.Cell>
            <Table.Cell>bob@example.com</Table.Cell>
            <Table.Cell>Editor</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Carol White</Table.Cell>
            <Table.Cell>carol@example.com</Table.Cell>
            <Table.Cell>Viewer</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    ),
  },
  tooltip: {
    Basic: () => (
      <Tooltip content="This is a tooltip">
        <Button>
          <Button.Text>Hover me</Button.Text>
        </Button>
      </Tooltip>
    ),
    Positions: () => (
      <div style={{ display: 'flex', gap: 16 }}>
        <Tooltip content="Top" side="top">
          <Button variant="outline">
            <Button.Text>Top</Button.Text>
          </Button>
        </Tooltip>
        <Tooltip content="Right" side="right">
          <Button variant="outline">
            <Button.Text>Right</Button.Text>
          </Button>
        </Tooltip>
        <Tooltip content="Bottom" side="bottom">
          <Button variant="outline">
            <Button.Text>Bottom</Button.Text>
          </Button>
        </Tooltip>
        <Tooltip content="Left" side="left">
          <Button variant="outline">
            <Button.Text>Left</Button.Text>
          </Button>
        </Tooltip>
      </div>
    ),
  },
  alert: {
    Basic: () => (
      <Alert.Root>
        <Alert.Title>Heads up!</Alert.Title>
        <Alert.Description>You can add components to your app using the CLI.</Alert.Description>
      </Alert.Root>
    ),
    Destructive: () => (
      <Alert.Root variant="destructive">
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>Your session has expired. Please log in again.</Alert.Description>
      </Alert.Root>
    ),
  },
  'alert-dialog': {
    Basic: () => <AlertDialogDemo />,
  },
  'aspect-ratio': {
    Basic: () => (
      <div style={{ width: 300 }}>
        <AspectRatio ratio={16 / 9}>
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }}
          >
            16:9
          </div>
        </AspectRatio>
      </div>
    ),
  },
  avatar: {
    Basic: () => (
      <Avatar>
        <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar>
    ),
    Sizes: () => (
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Avatar size="sm">
          <Avatar.Fallback>SM</Avatar.Fallback>
        </Avatar>
        <Avatar size="md">
          <Avatar.Fallback>MD</Avatar.Fallback>
        </Avatar>
        <Avatar size="lg">
          <Avatar.Fallback>LG</Avatar.Fallback>
        </Avatar>
      </div>
    ),
  },
  badge: {
    Basic: () => (
      <div style={{ display: 'flex', gap: 8 }}>
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    ),
  },
  breadcrumb: {
    Basic: () => (
      <Breadcrumb.Root>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.Root>
    ),
  },
  'button-group': {
    Basic: () => (
      <ButtonGroup.Root>
        <Button variant="outline">
          <Button.Text>Left</Button.Text>
        </Button>
        <Button variant="outline">
          <Button.Text>Center</Button.Text>
        </Button>
        <Button variant="outline">
          <Button.Text>Right</Button.Text>
        </Button>
      </ButtonGroup.Root>
    ),
  },
  calendar: {
    Basic: () => <Calendar.Root />,
  },
  carousel: {
    Basic: () => (
      <Carousel.Root>
        <Carousel.Item>
          <div
            style={{
              padding: 24,
              backgroundColor: '#e2e8f0',
              borderRadius: 8,
              textAlign: 'center',
            }}
          >
            Slide 1
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            style={{
              padding: 24,
              backgroundColor: '#e2e8f0',
              borderRadius: 8,
              textAlign: 'center',
            }}
          >
            Slide 2
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            style={{
              padding: 24,
              backgroundColor: '#e2e8f0',
              borderRadius: 8,
              textAlign: 'center',
            }}
          >
            Slide 3
          </div>
        </Carousel.Item>
      </Carousel.Root>
    ),
  },
  checkbox: {
    Basic: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Checkbox.Root id="terms" defaultChecked>
          <Checkbox.Indicator />
        </Checkbox.Root>
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    ),
  },
  collapsible: {
    Basic: () => (
      <Collapsible.Root>
        <Collapsible.Trigger>
          <Button variant="outline">
            <Button.Text>Toggle Content</Button.Text>
          </Button>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <div style={{ padding: '8px 0' }}>
            This content can be toggled open and closed.
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    ),
  },
  combobox: {
    Basic: () => (
      <Combobox.Root
        options={[
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' },
          { value: 'angular', label: 'Angular' },
          { value: 'svelte', label: 'Svelte' },
        ]}
        placeholder="Select a framework..."
      />
    ),
  },
  command: {
    Basic: () => (
      <Command.Root>
        <Command.Input placeholder="Type a command or search..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Suggestions">
            <Command.Item>Calendar</Command.Item>
            <Command.Item>Search</Command.Item>
            <Command.Item>Settings</Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Root>
    ),
  },
  'context-menu': {
    Basic: () => (
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <div
            style={{
              border: '2px dashed #ccc',
              borderRadius: 8,
              padding: 32,
              textAlign: 'center',
            }}
          >
            Right click here
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Label>Actions</ContextMenu.Label>
          <ContextMenu.Item>Copy</ContextMenu.Item>
          <ContextMenu.Item>Paste</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Delete</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
    ),
  },
  'data-table': {
    Basic: () => (
      <DataTable
        columns={[
          { accessorKey: 'name', header: 'Name' },
          { accessorKey: 'email', header: 'Email' },
          { accessorKey: 'role', header: 'Role' },
        ]}
        data={[
          { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
          { name: 'Bob', email: 'bob@example.com', role: 'User' },
        ]}
      />
    ),
  },
  'date-picker': {
    Basic: () => <DatePicker placeholder="Pick a date" />,
  },
  dialog: {
    Basic: () => <DialogDemo />,
  },
  drawer: {
    Basic: () => <DrawerDemo />,
  },
  'dropdown-menu': {
    Basic: () => (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline">
            <Button.Text>Open Menu</Button.Text>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Item>Profile</DropdownMenu.Item>
          <DropdownMenu.Item>Settings</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Log out</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    ),
  },
  empty: {
    Basic: () => (
      <Empty.Root>
        <Empty.Title>No results found</Empty.Title>
        <Empty.Description>Try adjusting your search or filters.</Empty.Description>
        <Empty.Action>
          <Button>
            <Button.Text>Clear Filters</Button.Text>
          </Button>
        </Empty.Action>
      </Empty.Root>
    ),
  },
  field: {
    Basic: () => (
      <Field.Root>
        <Field.Label>Username</Field.Label>
        <Field.Control>
          <Input placeholder="Enter username" />
        </Field.Control>
        <Field.Description>This is your public display name.</Field.Description>
      </Field.Root>
    ),
    'With Error': () => (
      <Field.Root invalid>
        <Field.Label>Email</Field.Label>
        <Field.Control>
          <Input placeholder="Enter email" />
        </Field.Control>
        <Field.Error>Please enter a valid email address.</Field.Error>
      </Field.Root>
    ),
  },
  form: {
    Basic: () => (
      <form
        onSubmit={(e: React.FormEvent) => e.preventDefault()}
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Field.Control>
            <Input placeholder="Your name" />
          </Field.Control>
        </Field.Root>
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Field.Control>
            <Input type="email" placeholder="you@example.com" />
          </Field.Control>
        </Field.Root>
        <Button>
          <Button.Text>Submit</Button.Text>
        </Button>
      </form>
    ),
  },
  'hover-card': {
    Basic: () => (
      <HoverCard.Root>
        <HoverCard.Trigger>
          <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Hover me</span>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <div style={{ padding: 8 }}>
            <p style={{ fontWeight: 600 }}>Card Title</p>
            <p style={{ fontSize: 14 }}>Additional information shown on hover.</p>
          </div>
        </HoverCard.Content>
      </HoverCard.Root>
    ),
  },
  'input-group': {
    Basic: () => (
      <InputGroup.Root>
        <InputGroup.Addon>https://</InputGroup.Addon>
        <InputGroup.Input placeholder="example.com" />
      </InputGroup.Root>
    ),
  },
  'input-otp': {
    Basic: () => (
      <InputOTP.Root maxLength={6}>
        <InputOTP.Slot index={0} />
        <InputOTP.Slot index={1} />
        <InputOTP.Slot index={2} />
        <InputOTP.Slot index={3} />
        <InputOTP.Slot index={4} />
        <InputOTP.Slot index={5} />
      </InputOTP.Root>
    ),
  },
  item: {
    Basic: () => (
      <Item.Root>
        <Item.Content>
          <Item.Title>List Item</Item.Title>
          <Item.Description>A description for this item.</Item.Description>
        </Item.Content>
        <Item.Trailing>
          <Badge variant="secondary">New</Badge>
        </Item.Trailing>
      </Item.Root>
    ),
  },
  kbd: {
    Basic: () => (
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </div>
    ),
  },
  label: {
    Basic: () => <Label htmlFor="email">Email address</Label>,
  },
  loader: {
    Basic: () => <Loader />,
  },
  menubar: {
    Basic: () => (
      <Menubar.Root>
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>New File</Menubar.Item>
            <Menubar.Item>Open</Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item>Save</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
        <Menubar.Menu>
          <Menubar.Trigger>Edit</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>Undo</Menubar.Item>
            <Menubar.Item>Redo</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar.Root>
    ),
  },
  'navigation-menu': {
    Basic: () => (
      <NavigationMenu.Root>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#">Home</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <div style={{ padding: 8 }}>Component library documentation</div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#">About</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.Root>
    ),
  },
  'native-select': {
    Basic: () => (
      <NativeSelect.Root>
        <NativeSelect.Option value="">Select an option</NativeSelect.Option>
        <NativeSelect.Option value="option1">Option 1</NativeSelect.Option>
        <NativeSelect.Option value="option2">Option 2</NativeSelect.Option>
        <NativeSelect.Option value="option3">Option 3</NativeSelect.Option>
      </NativeSelect.Root>
    ),
  },
  pagination: {
    Basic: () => (
      <Pagination.Root>
        <Pagination.Content>
          <Pagination.Previous href="#" />
          <Pagination.Item href="#">1</Pagination.Item>
          <Pagination.Item href="#" isActive>
            2
          </Pagination.Item>
          <Pagination.Item href="#">3</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Next href="#" />
        </Pagination.Content>
      </Pagination.Root>
    ),
  },
  popover: {
    Basic: () => (
      <Popover.Root>
        <Popover.Trigger>
          <Button variant="outline">
            <Button.Text>Open Popover</Button.Text>
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          <div style={{ padding: 8 }}>
            <p style={{ fontWeight: 600 }}>Popover Title</p>
            <p style={{ fontSize: 14 }}>Content inside the popover.</p>
          </div>
        </Popover.Content>
      </Popover.Root>
    ),
  },
  progress: {
    Basic: () => <Progress value={60} />,
  },
  'radio-group': {
    Basic: () => (
      <RadioGroup.Root defaultValue="option1">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <RadioGroup.Item value="option1" id="r1" />
            <Label htmlFor="r1">Option 1</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <RadioGroup.Item value="option2" id="r2" />
            <Label htmlFor="r2">Option 2</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <RadioGroup.Item value="option3" id="r3" />
            <Label htmlFor="r3">Option 3</Label>
          </div>
        </div>
      </RadioGroup.Root>
    ),
  },
  resizable: {
    Basic: () => (
      <Resizable.PanelGroup direction="horizontal" style={{ minHeight: 100, border: '1px solid #e2e8f0', borderRadius: 8 }}>
        <Resizable.Panel defaultSize={50}>
          <div style={{ padding: 16 }}>Panel 1</div>
        </Resizable.Panel>
        <Resizable.Handle />
        <Resizable.Panel defaultSize={50}>
          <div style={{ padding: 16 }}>Panel 2</div>
        </Resizable.Panel>
      </Resizable.PanelGroup>
    ),
  },
  'scroll-area': {
    Basic: () => (
      <ScrollArea.Root style={{ height: 150, width: 250, border: '1px solid #e2e8f0', borderRadius: 8 }}>
        <ScrollArea.Viewport style={{ padding: 16 }}>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} style={{ margin: '4px 0' }}>
              Item {i + 1}
            </p>
          ))}
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    ),
  },
  separator: {
    Basic: () => (
      <div>
        <p>Content above</p>
        <Separator style={{ margin: '8px 0' }} />
        <p>Content below</p>
      </div>
    ),
  },
  sheet: {
    Basic: () => <SheetDemo />,
  },
  sidebar: {
    Basic: () => (
      <Sidebar.Root style={{ width: 250, border: '1px solid #e2e8f0', borderRadius: 8, minHeight: 200 }}>
        <Sidebar.Group label="Navigation">
          <Sidebar.MenuItem>Dashboard</Sidebar.MenuItem>
          <Sidebar.MenuItem>Settings</Sidebar.MenuItem>
          <Sidebar.MenuItem>Profile</Sidebar.MenuItem>
        </Sidebar.Group>
      </Sidebar.Root>
    ),
  },
  skeleton: {
    Basic: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 250 }}>
        <Skeleton style={{ height: 16, width: '100%' }} />
        <Skeleton style={{ height: 16, width: '80%' }} />
        <Skeleton style={{ height: 16, width: '60%' }} />
      </div>
    ),
  },
  slider: {
    Basic: () => <Slider defaultValue={[50]} max={100} step={1} />,
  },
  spinner: {
    Basic: () => <Spinner />,
  },
  switch: {
    Basic: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Switch id="airplane" />
        <Label htmlFor="airplane">Airplane Mode</Label>
      </div>
    ),
  },
  textarea: {
    Basic: () => <Textarea placeholder="Type your message here..." />,
  },
  toast: {
    Basic: () => (
      <Toast.Root>
        <Toast.Title>Scheduled: Catch up</Toast.Title>
        <Toast.Description>Friday, February 10, 2025 at 5:57 PM</Toast.Description>
      </Toast.Root>
    ),
  },
  toggle: {
    Basic: () => <Toggle aria-label="Toggle bold">Bold</Toggle>,
  },
  'toggle-group': {
    Basic: () => (
      <ToggleGroup.Root type="single">
        <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
        <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
        <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
      </ToggleGroup.Root>
    ),
  },
}

interface ComponentExamplesProps {
  componentSlug: string
  examples: ComponentExample[]
}

export function ComponentExamples({
  componentSlug,
  examples,
}: ComponentExamplesProps) {
  const componentExamples = liveExamples[componentSlug]

  return (
    <div className="space-y-6">
      {examples.map((example) => {
        const renderer = componentExamples?.[example.name]
        return (
          <div key={example.name}>
            {example.description && (
              <p className="text-sm text-foreground-secondary mb-2">
                {example.description}
              </p>
            )}
            {renderer ? (
              <ComponentPreview code={example.code} title={example.name}>
                {renderer()}
              </ComponentPreview>
            ) : (
              <ComponentPreview code={example.code} title={example.name}>
                <p className="text-sm text-muted-foreground italic">
                  Live preview not available for this example.
                </p>
              </ComponentPreview>
            )}
          </div>
        )
      })}
    </div>
  )
}
