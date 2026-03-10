'use client'

import type { ComponentType, ReactNode } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFC = ComponentType<any>

import {
  Accordion as _Accordion,
  Alert as _Alert,
  AlertDialog as _AlertDialog,
  AspectRatio as _AspectRatio,
  Avatar as _Avatar,
  Badge as _Badge,
  Breadcrumb as _Breadcrumb,
  Button as _Button,
  ButtonGroup as _ButtonGroup,
  Calendar as _Calendar,
  Card as _Card,
  Carousel as _Carousel,
  Checkbox as _Checkbox,
  Collapsible as _Collapsible,
  Combobox as _Combobox,
  Command as _Command,
  ContextMenu as _ContextMenu,
  DatePicker as _DatePicker,
  Dialog as _Dialog,
  Drawer as _Drawer,
  DropdownMenu as _DropdownMenu,
  Empty as _Empty,
  Field as _Field,
  Form as _Form,
  HoverCard as _HoverCard,
  Input as _Input,
  InputGroup as _InputGroup,
  InputOTP as _InputOTP,
  Item as _Item,
  Kbd as _Kbd,
  Label as _Label,
  Loader as _Loader,
  Menubar as _Menubar,
  NativeSelect as _NativeSelect,
  NavigationMenu as _NavigationMenu,
  Pagination as _Pagination,
  Popover as _Popover,
  Progress as _Progress,
  RadioGroup as _RadioGroup,
  Resizable as _Resizable,
  ScrollArea as _ScrollArea,
  Select as _Select,
  Separator as _Separator,
  Sheet as _Sheet,
  Skeleton as _Skeleton,
  Slider as _Slider,
  Spinner as _Spinner,
  Switch as _Switch,
  Table as _Table,
  Tabs as _Tabs,
  Textarea as _Textarea,
  Toast as _Toast,
  Toggle as _Toggle,
  ToggleGroup as _ToggleGroup,
  Tooltip as _Tooltip,
  TooltipProvider as _TooltipProvider,
} from '@vlting/ui'

const Accordion = _Accordion as unknown as {
  Root: AnyFC
  Item: AnyFC
  Trigger: AnyFC
  Content: AnyFC
}
const Alert = _Alert as unknown as { Root: AnyFC; Title: AnyFC; Description: AnyFC }
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
const Avatar = _Avatar as unknown as AnyFC & { Image: AnyFC; Fallback: AnyFC }
const Badge = _Badge as AnyFC
const Breadcrumb = _Breadcrumb as unknown as {
  Root: AnyFC
  Item: AnyFC
  Link: AnyFC
  Separator: AnyFC
  Page: AnyFC
}
const Button = _Button as AnyFC & { Text: AnyFC }
const ButtonGroup = _ButtonGroup as unknown as { Root: AnyFC }
const Calendar = _Calendar as unknown as { Root: AnyFC }
const Card = _Card as AnyFC & {
  Header: AnyFC
  Content: AnyFC
  Title: AnyFC
  Description: AnyFC
  Footer: AnyFC
}
const Carousel = _Carousel as unknown as {
  Root: AnyFC
  Content: AnyFC
  Item: AnyFC
  Previous: AnyFC
  Next: AnyFC
}
const Checkbox = _Checkbox as unknown as { Root: AnyFC; Indicator: AnyFC }
const Collapsible = _Collapsible as unknown as {
  Root: AnyFC
  Trigger: AnyFC
  Content: AnyFC
}
const Combobox = _Combobox as unknown as { Root: AnyFC }
const Command = _Command as unknown as {
  Root: AnyFC
  Input: AnyFC
  List: AnyFC
  Empty: AnyFC
  Group: AnyFC
  Item: AnyFC
  Separator: AnyFC
}
const ContextMenu = _ContextMenu as unknown as {
  Root: AnyFC
  Trigger: AnyFC
  Content: AnyFC
  Item: AnyFC
  Separator: AnyFC
}
const DatePicker = _DatePicker as AnyFC
const Dialog = _Dialog as unknown as {
  Root: AnyFC
  Trigger: AnyFC
  Overlay: AnyFC
  Content: AnyFC
  Title: AnyFC
  Description: AnyFC
  Close: AnyFC
}
const Drawer = _Drawer as unknown as {
  Root: AnyFC
  Trigger: AnyFC
  Content: AnyFC
  Header: AnyFC
  Title: AnyFC
  Description: AnyFC
  Footer: AnyFC
  Close: AnyFC
}
const DropdownMenu = _DropdownMenu as unknown as {
  Root: AnyFC
  Trigger: AnyFC
  Content: AnyFC
  Item: AnyFC
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
const Field = _Field as unknown as {
  Root: AnyFC
  Label: AnyFC
  Control: AnyFC
  Description: AnyFC
  Error: AnyFC
}
const Form = _Form as unknown as {
  Root: AnyFC
  Field: AnyFC
  Label: AnyFC
  Description: AnyFC
  ErrorMessage: AnyFC
}
const HoverCard = _HoverCard as unknown as { Root: AnyFC; Trigger: AnyFC; Content: AnyFC }
const Input = _Input as AnyFC
const InputGroup = _InputGroup as unknown as AnyFC & {
  Addon: AnyFC
  Element: AnyFC
  Input: AnyFC
}
const InputOTP = _InputOTP as unknown as {
  Root: AnyFC
  Group: AnyFC
  Slot: AnyFC
  Separator: AnyFC
}
const Item = _Item as unknown as AnyFC & {
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
  Label: AnyFC
}
const NativeSelect = _NativeSelect as unknown as { Root: AnyFC; Option: AnyFC }
const NavigationMenu = _NavigationMenu as unknown as {
  Root: AnyFC
  List: AnyFC
  Item: AnyFC
  Link: AnyFC
  Trigger: AnyFC
  Content: AnyFC
}
const Pagination = _Pagination as unknown as {
  Root: AnyFC
  Content: AnyFC
  Item: AnyFC
  Previous: AnyFC
  Next: AnyFC
  Ellipsis: AnyFC
}
const Popover = _Popover as unknown as {
  Root: AnyFC
  Trigger: AnyFC
  Content: AnyFC
  Close: AnyFC
}
const Progress = _Progress as AnyFC
const RadioGroup = _RadioGroup as unknown as { Root: AnyFC; Item: AnyFC }
const Resizable = _Resizable as unknown as {
  PanelGroup: AnyFC
  Panel: AnyFC
  Handle: AnyFC
}
const ScrollArea = _ScrollArea as unknown as { Root: AnyFC; Viewport: AnyFC }
const Select = _Select as AnyFC & {
  Item: AnyFC
  Group: AnyFC
  Label: AnyFC
  Separator: AnyFC
}
const Separator = _Separator as AnyFC
const Sheet = _Sheet as unknown as {
  Root: AnyFC
  Overlay: AnyFC
  Handle: AnyFC
  Frame: AnyFC
}
const Skeleton = _Skeleton as AnyFC
const Slider = _Slider as AnyFC
const Spinner = _Spinner as AnyFC
const Switch = _Switch as AnyFC
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
const Tabs = _Tabs as unknown as {
  Root: AnyFC
  List: AnyFC
  Trigger: AnyFC
  Content: AnyFC
}
const Textarea = _Textarea as AnyFC
const Toggle = _Toggle as AnyFC
const ToggleGroup = _ToggleGroup as unknown as AnyFC & { Item: AnyFC }
const Toast = _Toast as unknown as {
  Root: AnyFC
  Title: AnyFC
  Description: AnyFC
  Action: AnyFC
  Close: AnyFC
  Viewport: AnyFC
  Provider: AnyFC
}
const Tooltip = _Tooltip as AnyFC
const TooltipProvider = _TooltipProvider as AnyFC

type ExampleMap = Record<string, Record<string, ReactNode>>

const liveExamples: ExampleMap = {
  accordion: {
    Basic: (
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
          <Accordion.Content>Yes. Smooth expand/collapse animations.</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    ),
  },
  alert: {
    Basic: (
      <Alert.Root>
        <Alert.Title>Heads up!</Alert.Title>
        <Alert.Description>
          You can add components to your app using the CLI.
        </Alert.Description>
      </Alert.Root>
    ),
    Destructive: (
      <Alert.Root variant="destructive">
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>
          Your session has expired. Please log in again.
        </Alert.Description>
      </Alert.Root>
    ),
  },
  'alert-dialog': {
    Basic: (
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button variant="destructive">
            <Button.Text>Delete Account</Button.Text>
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Overlay>
          <AlertDialog.Content>
            <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
            <AlertDialog.Description>
              This action cannot be undone.
            </AlertDialog.Description>
            <AlertDialog.Footer>
              <AlertDialog.Cancel>
                <Button variant="outline">
                  <Button.Text>Cancel</Button.Text>
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button variant="destructive">
                  <Button.Text>Delete</Button.Text>
                </Button>
              </AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Overlay>
      </AlertDialog.Root>
    ),
  },
  'aspect-ratio': {
    Basic: (
      <AspectRatio ratio={16 / 9}>
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--color3, #f1f5f9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            fontSize: 14,
            color: 'var(--color, inherit)',
          }}
        >
          16 : 9
        </div>
      </AspectRatio>
    ),
  },
  avatar: {
    Basic: (
      <Avatar size="lg">
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar>
    ),
    Sizes: (
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
        <Avatar size="xl">
          <Avatar.Fallback>XL</Avatar.Fallback>
        </Avatar>
      </div>
    ),
  },
  badge: {
    Basic: (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    ),
  },
  breadcrumb: {
    Basic: (
      <Breadcrumb.Root>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Components</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.Root>
    ),
  },
  button: {
    Basic: (
      <Button>
        <Button.Text>Click me</Button.Text>
      </Button>
    ),
    Variants: (
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
    Sizes: (
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
    Loading: (
      <Button loading>
        <Button.Text>Loading</Button.Text>
      </Button>
    ),
  },
  'button-group': {
    Basic: (
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
  calendar: { Basic: <Calendar.Root /> },
  card: {
    Basic: (
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
    Elevated: (
      <Card elevated>
        <Card.Header>
          <Card.Title>Elevated Card</Card.Title>
          <Card.Description>This card has a raised shadow.</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Use elevated cards to draw attention.</p>
        </Card.Content>
      </Card>
    ),
    Interactive: (
      <Card interactive>
        <Card.Header>
          <Card.Title>Interactive Card</Card.Title>
          <Card.Description>Hover to see the effect.</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Interactive cards respond to hover and press.</p>
        </Card.Content>
      </Card>
    ),
  },
  carousel: {
    Basic: (
      <Carousel.Root>
        <Carousel.Content>
          <Carousel.Item>
            <div
              style={{
                padding: 24,
                textAlign: 'center',
                backgroundColor: 'var(--color3, #f1f5f9)',
                borderRadius: 8,
              }}
            >
              Slide 1
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              style={{
                padding: 24,
                textAlign: 'center',
                backgroundColor: 'var(--color3, #f1f5f9)',
                borderRadius: 8,
              }}
            >
              Slide 2
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              style={{
                padding: 24,
                textAlign: 'center',
                backgroundColor: 'var(--color3, #f1f5f9)',
                borderRadius: 8,
              }}
            >
              Slide 3
            </div>
          </Carousel.Item>
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel.Root>
    ),
  },
  checkbox: {
    Basic: (
      <Checkbox.Root defaultChecked>
        <Checkbox.Indicator />
        Accept terms and conditions
      </Checkbox.Root>
    ),
    Sizes: (
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Checkbox.Root size="sm" defaultChecked>
          <Checkbox.Indicator />
          Small
        </Checkbox.Root>
        <Checkbox.Root size="md" defaultChecked>
          <Checkbox.Indicator />
          Medium
        </Checkbox.Root>
        <Checkbox.Root size="lg" defaultChecked>
          <Checkbox.Indicator />
          Large
        </Checkbox.Root>
      </div>
    ),
  },
  collapsible: {
    Basic: (
      <Collapsible.Root>
        <Collapsible.Trigger>
          <Button variant="outline">
            <Button.Text>Toggle</Button.Text>
          </Button>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <p style={{ padding: '8px 0' }}>This content can be collapsed and expanded.</p>
        </Collapsible.Content>
      </Collapsible.Root>
    ),
  },
  combobox: {
    Basic: (
      <Combobox.Root
        options={[
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' },
          { value: 'angular', label: 'Angular' },
          { value: 'svelte', label: 'Svelte' },
        ]}
        placeholder="Select framework..."
      />
    ),
  },
  command: {
    Basic: (
      <Command.Root>
        <Command.Input placeholder="Type a command or search..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Suggestions">
            <Command.Item>Calendar</Command.Item>
            <Command.Item>Search Emoji</Command.Item>
            <Command.Item>Calculator</Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Root>
    ),
  },
  'context-menu': {
    Basic: (
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <div
            style={{
              padding: '32px 48px',
              border: '2px dashed var(--borderColor, #e2e8f0)',
              borderRadius: 8,
              textAlign: 'center',
              fontSize: 14,
              color: 'var(--color7, #94a3b8)',
            }}
          >
            Right click here
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>Back</ContextMenu.Item>
          <ContextMenu.Item>Forward</ContextMenu.Item>
          <ContextMenu.Item>Reload</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>View Source</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
    ),
  },
  'data-table': {
    Basic: (
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Status</Table.Head>
            <Table.Head>Email</Table.Head>
            <Table.Head>Amount</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Success</Table.Cell>
            <Table.Cell>ken@example.com</Table.Cell>
            <Table.Cell>$316.00</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Processing</Table.Cell>
            <Table.Cell>abe@example.com</Table.Cell>
            <Table.Cell>$242.00</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    ),
  },
  'date-picker': { Basic: <DatePicker placeholder="Pick a date" /> },
  dialog: {
    Basic: (
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>
            <Button.Text>Open Dialog</Button.Text>
          </Button>
        </Dialog.Trigger>
        <Dialog.Overlay>
          <Dialog.Content>
            <Dialog.Title>Edit profile</Dialog.Title>
            <Dialog.Description>Make changes to your profile here.</Dialog.Description>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                padding: '16px 0',
              }}
            >
              <Input placeholder="Name" />
              <Input placeholder="Username" />
            </div>
            <Dialog.Close>
              <Button>
                <Button.Text>Save changes</Button.Text>
              </Button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Root>
    ),
    'With Form': (
      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant="outline">
            <Button.Text>Edit Settings</Button.Text>
          </Button>
        </Dialog.Trigger>
        <Dialog.Overlay>
          <Dialog.Content>
            <Dialog.Title>Account Settings</Dialog.Title>
            <Dialog.Description>Update your account preferences.</Dialog.Description>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                padding: '16px 0',
              }}
            >
              <Field.Root>
                <Field.Label>Display Name</Field.Label>
                <Field.Control>
                  <Input placeholder="Your name" />
                </Field.Control>
              </Field.Root>
              <Field.Root>
                <Field.Label>Email</Field.Label>
                <Field.Control>
                  <Input type="email" placeholder="you@example.com" />
                </Field.Control>
                <Field.Description>Used for notifications.</Field.Description>
              </Field.Root>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Dialog.Close>
                <Button variant="outline">
                  <Button.Text>Cancel</Button.Text>
                </Button>
              </Dialog.Close>
              <Button>
                <Button.Text>Save</Button.Text>
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Root>
    ),
  },
  drawer: {
    Basic: (
      <Drawer.Root>
        <Drawer.Trigger>
          <Button variant="outline">
            <Button.Text>Open Drawer</Button.Text>
          </Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Drawer Title</Drawer.Title>
            <Drawer.Description>Drawer description text.</Drawer.Description>
          </Drawer.Header>
          <div style={{ padding: 16, fontSize: 14 }}>Drawer body content goes here.</div>
          <Drawer.Footer>
            <Drawer.Close>
              <Button variant="outline">
                <Button.Text>Close</Button.Text>
              </Button>
            </Drawer.Close>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>
    ),
  },
  'dropdown-menu': {
    Basic: (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline">
            <Button.Text>Open Menu</Button.Text>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Profile</DropdownMenu.Item>
          <DropdownMenu.Item>Settings</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Log out</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    ),
  },
  empty: {
    Basic: (
      <Empty.Root>
        <Empty.Title>No results found</Empty.Title>
        <Empty.Description>Try adjusting your search or filters.</Empty.Description>
        <Empty.Action>
          <Button variant="outline">
            <Button.Text>Clear filters</Button.Text>
          </Button>
        </Empty.Action>
      </Empty.Root>
    ),
  },
  field: {
    Basic: (
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Control>
          <Input placeholder="you@example.com" />
        </Field.Control>
        <Field.Description>We will never share your email.</Field.Description>
      </Field.Root>
    ),
  },
  form: {
    Basic: (
      <Form.Root>
        <Form.Field name="email">
          <Form.Label>Email</Form.Label>
          <Input placeholder="you@example.com" />
          <Form.Description>Your email address.</Form.Description>
        </Form.Field>
      </Form.Root>
    ),
  },
  'hover-card': {
    Basic: (
      <HoverCard.Root>
        <HoverCard.Trigger>
          <Button variant="link">
            <Button.Text>@vlting</Button.Text>
          </Button>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <div style={{ padding: 8, fontSize: 14 }}>
            <p style={{ fontWeight: 600, margin: '0 0 4px' }}>@vlting/ui</p>
            <p style={{ margin: 0, color: 'var(--color7, #94a3b8)' }}>
              Cross-platform design system.
            </p>
          </div>
        </HoverCard.Content>
      </HoverCard.Root>
    ),
  },
  input: {
    Basic: <Input placeholder="Enter your email..." />,
    'With Field': (
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Control>
          <Input placeholder="you@example.com" />
        </Field.Control>
        <Field.Description>We will never share your email.</Field.Description>
      </Field.Root>
    ),
    Sizes: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Input size="sm" placeholder="Small" />
        <Input size="md" placeholder="Medium" />
        <Input size="lg" placeholder="Large" />
      </div>
    ),
  },
  'input-group': {
    Basic: (
      <InputGroup>
        <InputGroup.Addon>https://</InputGroup.Addon>
        <InputGroup.Input placeholder="example.com" />
      </InputGroup>
    ),
  },
  'input-otp': {
    Basic: (
      <InputOTP.Root maxLength={6}>
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
          <InputOTP.Slot index={1} />
          <InputOTP.Slot index={2} />
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          <InputOTP.Slot index={3} />
          <InputOTP.Slot index={4} />
          <InputOTP.Slot index={5} />
        </InputOTP.Group>
      </InputOTP.Root>
    ),
  },
  item: {
    Basic: (
      <Item>
        <Item.Content>
          <Item.Title>List item title</Item.Title>
          <Item.Description>Description text goes here</Item.Description>
        </Item.Content>
      </Item>
    ),
  },
  kbd: {
    Basic: (
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <Kbd>Ctrl</Kbd>
        <span style={{ fontSize: 12, color: 'var(--color7, #94a3b8)' }}>+</span>
        <Kbd>C</Kbd>
      </div>
    ),
  },
  label: {
    Basic: <Label>Email address</Label>,
    Required: <Label required>Password</Label>,
  },
  loader: {
    Basic: <Loader />,
    Sizes: (
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Loader size="sm" />
        <Loader size="md" />
        <Loader size="lg" />
      </div>
    ),
  },
  menubar: {
    Basic: (
      <Menubar.Root>
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>New Tab</Menubar.Item>
            <Menubar.Item>New Window</Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item>Print</Menubar.Item>
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
  'native-select': {
    Basic: (
      <NativeSelect.Root>
        <NativeSelect.Option value="">Select a fruit...</NativeSelect.Option>
        <NativeSelect.Option value="apple">Apple</NativeSelect.Option>
        <NativeSelect.Option value="banana">Banana</NativeSelect.Option>
        <NativeSelect.Option value="cherry">Cherry</NativeSelect.Option>
      </NativeSelect.Root>
    ),
  },
  'navigation-menu': {
    Basic: (
      <NavigationMenu.Root>
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavigationMenu.Link href="#">Getting Started</NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link href="#">Components</NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link href="#">Documentation</NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    ),
  },
  pagination: {
    Basic: (
      <Pagination.Root>
        <Pagination.Content>
          <Pagination.Previous href="#" />
          <Pagination.Item href="#" isActive>
            1
          </Pagination.Item>
          <Pagination.Item href="#">2</Pagination.Item>
          <Pagination.Item href="#">3</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Next href="#" />
        </Pagination.Content>
      </Pagination.Root>
    ),
  },
  popover: {
    Basic: (
      <Popover.Root>
        <Popover.Trigger>
          <Button variant="outline">
            <Button.Text>Open Popover</Button.Text>
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          <div style={{ padding: 8, fontSize: 14 }}>
            <p style={{ fontWeight: 600, margin: '0 0 4px' }}>Dimensions</p>
            <p style={{ margin: 0, color: 'var(--color7, #94a3b8)' }}>
              Set the dimensions for the layer.
            </p>
          </div>
        </Popover.Content>
      </Popover.Root>
    ),
  },
  progress: { Basic: <Progress value={60} /> },
  'radio-group': {
    Basic: (
      <RadioGroup.Root defaultValue="option-1">
        <RadioGroup.Item value="option-1">Option 1</RadioGroup.Item>
        <RadioGroup.Item value="option-2">Option 2</RadioGroup.Item>
        <RadioGroup.Item value="option-3">Option 3</RadioGroup.Item>
      </RadioGroup.Root>
    ),
  },
  resizable: {
    Basic: (
      <Resizable.PanelGroup
        direction="horizontal"
        style={{
          minHeight: 100,
          border: '1px solid var(--borderColor, #e2e8f0)',
          borderRadius: 8,
        }}
      >
        <Resizable.Panel defaultSize={50}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              fontSize: 14,
            }}
          >
            Panel A
          </div>
        </Resizable.Panel>
        <Resizable.Handle />
        <Resizable.Panel defaultSize={50}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              fontSize: 14,
            }}
          >
            Panel B
          </div>
        </Resizable.Panel>
      </Resizable.PanelGroup>
    ),
  },
  'scroll-area': {
    Basic: (
      <ScrollArea.Root
        style={{
          height: 150,
          border: '1px solid var(--borderColor, #e2e8f0)',
          borderRadius: 8,
        }}
      >
        <ScrollArea.Viewport style={{ padding: 16 }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              style={{
                padding: '4px 0',
                fontSize: 14,
                borderBottom: '1px solid var(--borderColor, #e2e8f0)',
              }}
            >
              Item {i + 1}
            </div>
          ))}
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    ),
  },
  select: {
    Basic: (
      <Select placeholder="Select a fruit">
        <Select.Item value="apple">Apple</Select.Item>
        <Select.Item value="banana">Banana</Select.Item>
        <Select.Item value="orange">Orange</Select.Item>
      </Select>
    ),
    'With Groups': (
      <Select placeholder="Select a food">
        <Select.Group>
          <Select.Label>Fruits</Select.Label>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="banana">Banana</Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.Label>Vegetables</Select.Label>
          <Select.Item value="carrot">Carrot</Select.Item>
          <Select.Item value="potato">Potato</Select.Item>
        </Select.Group>
      </Select>
    ),
    Sizes: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Select size="sm" placeholder="Small">
          <Select.Item value="a">Option A</Select.Item>
        </Select>
        <Select size="md" placeholder="Medium">
          <Select.Item value="a">Option A</Select.Item>
        </Select>
        <Select size="lg" placeholder="Large">
          <Select.Item value="a">Option A</Select.Item>
        </Select>
      </div>
    ),
  },
  separator: {
    Basic: (
      <div>
        <p>Above separator</p>
        <Separator />
        <p>Below separator</p>
      </div>
    ),
  },
  sheet: {
    Basic: (
      <Sheet.Root>
        <Button variant="outline" onClick={() => {}}>
          <Button.Text>Open Sheet</Button.Text>
        </Button>
      </Sheet.Root>
    ),
  },
  skeleton: {
    Basic: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
        <Skeleton style={{ width: '100%', height: 20, borderRadius: 4 }} />
        <Skeleton style={{ width: '80%', height: 20, borderRadius: 4 }} />
        <Skeleton style={{ width: '60%', height: 20, borderRadius: 4 }} />
      </div>
    ),
    Circle: (
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Skeleton circle style={{ width: 40, height: 40 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Skeleton style={{ width: 120, height: 16, borderRadius: 4 }} />
          <Skeleton style={{ width: 80, height: 12, borderRadius: 4 }} />
        </div>
      </div>
    ),
  },
  slider: { Basic: <Slider value={50} /> },
  spinner: {
    Basic: (
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </div>
    ),
  },
  switch: {
    Basic: <Switch aria-label="Airplane mode" />,
    Sizes: (
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Switch size="sm" aria-label="Small" />
        <Switch size="md" aria-label="Medium" />
        <Switch size="lg" aria-label="Large" />
      </div>
    ),
    Disabled: (
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Switch disabled aria-label="Disabled off" />
        <Switch disabled defaultChecked aria-label="Disabled on" />
      </div>
    ),
  },
  table: {
    Basic: (
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Invoice</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head>Method</Table.Head>
            <Table.Head>Amount</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>INV001</Table.Cell>
            <Table.Cell>Paid</Table.Cell>
            <Table.Cell>Credit Card</Table.Cell>
            <Table.Cell>$250.00</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>INV002</Table.Cell>
            <Table.Cell>Pending</Table.Cell>
            <Table.Cell>PayPal</Table.Cell>
            <Table.Cell>$150.00</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>INV003</Table.Cell>
            <Table.Cell>Unpaid</Table.Cell>
            <Table.Cell>Bank Transfer</Table.Cell>
            <Table.Cell>$350.00</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    ),
  },
  tabs: {
    Basic: (
      <Tabs.Root defaultValue="tab1">
        <Tabs.List>
          <Tabs.Trigger value="tab1">Account</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Password</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">
          <p style={{ padding: '16px 0' }}>Make changes to your account here.</p>
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <p style={{ padding: '16px 0' }}>Change your password here.</p>
        </Tabs.Content>
      </Tabs.Root>
    ),
    'With Cards': (
      <Tabs.Root defaultValue="overview">
        <Tabs.List>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">
          <div style={{ paddingTop: 16 }}>
            <Card>
              <Card.Header>
                <Card.Title>Overview</Card.Title>
                <Card.Description>A summary of your activity.</Card.Description>
              </Card.Header>
              <Card.Content>
                <p>Your dashboard overview content.</p>
              </Card.Content>
            </Card>
          </div>
        </Tabs.Content>
        <Tabs.Content value="analytics">
          <div style={{ paddingTop: 16 }}>
            <Card>
              <Card.Header>
                <Card.Title>Analytics</Card.Title>
                <Card.Description>Detailed metrics and charts.</Card.Description>
              </Card.Header>
              <Card.Content>
                <p>Charts and data visualization here.</p>
              </Card.Content>
            </Card>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    ),
  },
  textarea: { Basic: <Textarea placeholder="Type your message here." /> },
  toast: {
    Basic: (
      <Toast.Provider>
        <Button onClick={() => {}}>
          <Button.Text>Show Toast</Button.Text>
        </Button>
        <Toast.Viewport />
      </Toast.Provider>
    ),
  },
  toggle: { Basic: <Toggle aria-label="Toggle italic">Italic</Toggle> },
  'toggle-group': {
    Basic: (
      <ToggleGroup type="single" defaultValue="center">
        <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
        <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
        <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
      </ToggleGroup>
    ),
  },
  tooltip: {
    Basic: (
      <TooltipProvider>
        <Tooltip content="Add to library">
          <Button variant="outline">
            <Button.Text>Hover me</Button.Text>
          </Button>
        </Tooltip>
      </TooltipProvider>
    ),
  },
}

export function getLiveExample(slug: string, exampleName: string): ReactNode | null {
  return liveExamples[slug]?.[exampleName] ?? null
}

export function hasLiveExamples(slug: string): boolean {
  return slug in liveExamples
}
