'use client'

import { type ReactNode, type ComponentType } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFC = ComponentType<any>

import {
  Accordion as _Accordion,
  Alert as _Alert,
  AlertDialog as _AlertDialog,
  Avatar as _Avatar,
  Badge as _Badge,
  Breadcrumb as _Breadcrumb,
  Button as _Button,
  ButtonGroup as _ButtonGroup,
  Card as _Card,
  Checkbox as _Checkbox,
  Collapsible as _Collapsible,
  Dialog as _Dialog,
  Input as _Input,
  Progress as _Progress,
  RadioGroup as _RadioGroup,
  Select as _Select,
  Separator as _Separator,
  Slider as _Slider,
  Spinner as _Spinner,
  Switch as _Switch,
  Tabs as _Tabs,
  Textarea as _Textarea,
  Toggle as _Toggle,
  Tooltip as _Tooltip,
  TooltipProvider as _TooltipProvider,
} from '@vlting/ui'

const Accordion = _Accordion as unknown as { Root: AnyFC; Item: AnyFC; Trigger: AnyFC; Content: AnyFC }
const Alert = _Alert as unknown as { Root: AnyFC; Title: AnyFC; Description: AnyFC }
const AlertDialog = _AlertDialog as unknown as { Root: AnyFC; Trigger: AnyFC; Overlay: AnyFC; Content: AnyFC; Title: AnyFC; Description: AnyFC; Footer: AnyFC; Cancel: AnyFC; Action: AnyFC }
const Avatar = _Avatar as unknown as AnyFC & { Image: AnyFC; Fallback: AnyFC }
const Badge = _Badge as AnyFC
const Breadcrumb = _Breadcrumb as unknown as { Root: AnyFC; Item: AnyFC; Link: AnyFC; Separator: AnyFC; Page: AnyFC }
const Button = _Button as AnyFC & { Text: AnyFC }
const ButtonGroup = _ButtonGroup as unknown as { Root: AnyFC }
const Card = _Card as AnyFC & { Header: AnyFC; Content: AnyFC; Title: AnyFC; Description: AnyFC; Footer: AnyFC }
const Checkbox = _Checkbox as unknown as { Root: AnyFC; Indicator: AnyFC }
const Collapsible = _Collapsible as unknown as { Root: AnyFC; Trigger: AnyFC; Content: AnyFC }
const Dialog = _Dialog as unknown as { Root: AnyFC; Trigger: AnyFC; Overlay: AnyFC; Content: AnyFC; Title: AnyFC; Description: AnyFC; Close: AnyFC }
const Input = _Input as AnyFC
const Progress = _Progress as AnyFC
const RadioGroup = _RadioGroup as unknown as { Root: AnyFC; Item: AnyFC }
const Select = _Select as AnyFC & { Item: AnyFC; Group: AnyFC; Label: AnyFC; Separator: AnyFC }
const Separator = _Separator as AnyFC
const Slider = _Slider as AnyFC
const Spinner = _Spinner as AnyFC
const Switch = _Switch as AnyFC
const Tabs = _Tabs as unknown as { Root: AnyFC; List: AnyFC; Trigger: AnyFC; Content: AnyFC }
const Textarea = _Textarea as AnyFC
const Toggle = _Toggle as AnyFC
const Tooltip = _Tooltip as AnyFC
const TooltipProvider = _TooltipProvider as AnyFC

type ExampleMap = Record<string, Record<string, ReactNode>>

const liveExamples: ExampleMap = {
  accordion: {
    Basic: (
      <Accordion.Root type="single" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
          <Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Is it styled?</Accordion.Trigger>
          <Accordion.Content>Yes. It uses design tokens for consistent theming.</Accordion.Content>
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
        <Alert.Description>You can add components to your app using the CLI.</Alert.Description>
      </Alert.Root>
    ),
    Destructive: (
      <Alert.Root variant="destructive">
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>Your session has expired. Please log in again.</Alert.Description>
      </Alert.Root>
    ),
  },
  'alert-dialog': {
    Basic: (
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button variant="destructive"><Button.Text>Delete Account</Button.Text></Button>
        </AlertDialog.Trigger>
        <AlertDialog.Overlay>
          <AlertDialog.Content>
            <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
            <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
            <AlertDialog.Footer>
              <AlertDialog.Cancel>
                <Button variant="outline"><Button.Text>Cancel</Button.Text></Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button variant="destructive"><Button.Text>Delete</Button.Text></Button>
              </AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Overlay>
      </AlertDialog.Root>
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
        <Avatar size="sm"><Avatar.Fallback>SM</Avatar.Fallback></Avatar>
        <Avatar size="md"><Avatar.Fallback>MD</Avatar.Fallback></Avatar>
        <Avatar size="lg"><Avatar.Fallback>LG</Avatar.Fallback></Avatar>
        <Avatar size="xl"><Avatar.Fallback>XL</Avatar.Fallback></Avatar>
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
        <Button variant="default"><Button.Text>Default</Button.Text></Button>
        <Button variant="secondary"><Button.Text>Secondary</Button.Text></Button>
        <Button variant="destructive"><Button.Text>Destructive</Button.Text></Button>
        <Button variant="outline"><Button.Text>Outline</Button.Text></Button>
        <Button variant="ghost"><Button.Text>Ghost</Button.Text></Button>
        <Button variant="link"><Button.Text>Link</Button.Text></Button>
      </div>
    ),
    Sizes: (
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button size="xs"><Button.Text>Extra Small</Button.Text></Button>
        <Button size="sm"><Button.Text>Small</Button.Text></Button>
        <Button size="md"><Button.Text>Medium</Button.Text></Button>
        <Button size="lg"><Button.Text>Large</Button.Text></Button>
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
        <Button variant="outline"><Button.Text>Left</Button.Text></Button>
        <Button variant="outline"><Button.Text>Center</Button.Text></Button>
        <Button variant="outline"><Button.Text>Right</Button.Text></Button>
      </ButtonGroup.Root>
    ),
  },
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
          <Button variant="outline"><Button.Text>Cancel</Button.Text></Button>
          <Button><Button.Text>Save</Button.Text></Button>
        </Card.Footer>
      </Card>
    ),
  },
  checkbox: {
    Basic: (
      <Checkbox.Root defaultChecked>
        <Checkbox.Indicator />
        Accept terms and conditions
      </Checkbox.Root>
    ),
  },
  collapsible: {
    Basic: (
      <Collapsible.Root>
        <Collapsible.Trigger>
          <Button variant="outline"><Button.Text>Toggle</Button.Text></Button>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <p style={{ padding: '8px 0' }}>This content can be collapsed and expanded.</p>
        </Collapsible.Content>
      </Collapsible.Root>
    ),
  },
  dialog: {
    Basic: (
      <Dialog.Root>
        <Dialog.Trigger>
          <Button><Button.Text>Open Dialog</Button.Text></Button>
        </Dialog.Trigger>
        <Dialog.Overlay>
          <Dialog.Content>
            <Dialog.Title>Edit profile</Dialog.Title>
            <Dialog.Description>Make changes to your profile here.</Dialog.Description>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '16px 0' }}>
              <Input placeholder="Name" />
              <Input placeholder="Username" />
            </div>
            <Dialog.Close>
              <Button><Button.Text>Save changes</Button.Text></Button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Root>
    ),
  },
  input: {
    Basic: <Input placeholder="Enter your email..." />,
    Sizes: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Input size="sm" placeholder="Small" />
        <Input size="md" placeholder="Medium" />
        <Input size="lg" placeholder="Large" />
      </div>
    ),
  },
  progress: {
    Basic: <Progress value={60} />,
  },
  'radio-group': {
    Basic: (
      <RadioGroup.Root defaultValue="option-1">
        <RadioGroup.Item value="option-1">Option 1</RadioGroup.Item>
        <RadioGroup.Item value="option-2">Option 2</RadioGroup.Item>
        <RadioGroup.Item value="option-3">Option 3</RadioGroup.Item>
      </RadioGroup.Root>
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
  slider: {
    Basic: <Slider value={50} />,
  },
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
  },
  textarea: {
    Basic: <Textarea placeholder="Type your message here." />,
  },
  toggle: {
    Basic: <Toggle aria-label="Toggle italic">Italic</Toggle>,
  },
  // toggle-group: skipped — ToggleGroup SSR resolution issue
  tooltip: {
    Basic: (
      <TooltipProvider>
        <Tooltip content="Add to library">
          <Button variant="outline"><Button.Text>Hover me</Button.Text></Button>
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
