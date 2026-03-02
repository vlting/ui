'use client'

import { type ReactNode, type ComponentType } from 'react'
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
