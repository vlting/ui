'use client'

import { useState, useMemo, type ReactNode, type ComponentType } from 'react'

// Cast for docs usage
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFC = ComponentType<any>

import {
  Button as _Button,
  Input as _Input,
  Card as _Card,
  Dialog as _Dialog,
  Tabs as _Tabs,
  Tooltip as _Tooltip,
  Badge as _Badge,
  Switch as _Switch,
  Progress as _Progress,
  Checkbox as _Checkbox,
  Select as _Select,
  Slider as _Slider,
  Alert as _Alert,
  Avatar as _Avatar,
  Toggle as _Toggle,
  Spinner as _Spinner,
  Textarea as _Textarea,
} from '@vlting/ui'

const Button = _Button as AnyFC & { Text: AnyFC }
const Input = _Input as AnyFC
const Card = _Card as AnyFC & {
  Header: AnyFC
  Content: AnyFC
  Title: AnyFC
  Description: AnyFC
}
const Dialog = _Dialog as unknown as {
  Root: AnyFC
  Trigger: AnyFC
  Overlay: AnyFC
  Content: AnyFC
  Title: AnyFC
  Description: AnyFC
  Header: AnyFC
  Footer: AnyFC
  Close: AnyFC
}
const Select = _Select as AnyFC & { Item: AnyFC; Group: AnyFC; Label: AnyFC; Separator: AnyFC }
const Tabs = _Tabs as unknown as {
  Root: AnyFC
  List: AnyFC
  Trigger: AnyFC
  Content: AnyFC
}
const Tooltip = _Tooltip as AnyFC
const Badge = _Badge as AnyFC
const Switch = _Switch as AnyFC
const Progress = _Progress as AnyFC
const Checkbox = _Checkbox as unknown as { Root: AnyFC; Indicator: AnyFC }
const Slider = _Slider as AnyFC
const Alert = _Alert as unknown as { Root: AnyFC; Title: AnyFC; Description: AnyFC }
const Avatar = _Avatar as unknown as AnyFC & { Image: AnyFC; Fallback: AnyFC }
const Toggle = _Toggle as AnyFC
const Spinner = _Spinner as AnyFC
const Textarea = _Textarea as AnyFC

export interface PlaygroundControl {
  prop: string
  type: 'select' | 'boolean' | 'string' | 'number'
  label: string
  options?: string[]
  defaultValue: string | boolean | number
}

export interface PlaygroundConfig {
  component: string
  controls: PlaygroundControl[]
}

const playgroundConfigs: Record<string, PlaygroundConfig> = {
  button: {
    component: 'Button',
    controls: [
      {
        prop: 'variant',
        type: 'select',
        label: 'Variant',
        options: ['default', 'solid', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
        defaultValue: 'default',
      },
      {
        prop: 'size',
        type: 'select',
        label: 'Size',
        options: ['xs', 'sm', 'md', 'lg'],
        defaultValue: 'md',
      },
      {
        prop: 'loading',
        type: 'boolean',
        label: 'Loading',
        defaultValue: false,
      },
      {
        prop: 'disabled',
        type: 'boolean',
        label: 'Disabled',
        defaultValue: false,
      },
    ],
  },
  input: {
    component: 'Input',
    controls: [
      {
        prop: 'placeholder',
        type: 'string',
        label: 'Placeholder',
        defaultValue: 'Enter text...',
      },
      {
        prop: 'size',
        type: 'select',
        label: 'Size',
        options: ['sm', 'md', 'lg'],
        defaultValue: 'md',
      },
      {
        prop: 'disabled',
        type: 'boolean',
        label: 'Disabled',
        defaultValue: false,
      },
    ],
  },
  card: {
    component: 'Card',
    controls: [
      {
        prop: 'size',
        type: 'select',
        label: 'Size',
        options: ['sm', 'md', 'lg'],
        defaultValue: 'md',
      },
      {
        prop: 'elevated',
        type: 'boolean',
        label: 'Elevated',
        defaultValue: false,
      },
      {
        prop: 'interactive',
        type: 'boolean',
        label: 'Interactive',
        defaultValue: false,
      },
    ],
  },
  dialog: {
    component: 'Dialog',
    controls: [
      { prop: 'modal', type: 'boolean', label: 'Modal', defaultValue: true },
    ],
  },
  select: {
    component: 'Select',
    controls: [
      { prop: 'placeholder', type: 'string', label: 'Placeholder', defaultValue: 'Select an option' },
      { prop: 'size', type: 'select', label: 'Size', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
      { prop: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false },
    ],
  },
  tabs: {
    component: 'Tabs',
    controls: [
      {
        prop: 'orientation',
        type: 'select',
        label: 'Orientation',
        options: ['horizontal', 'vertical'],
        defaultValue: 'horizontal',
      },
    ],
  },
  tooltip: {
    component: 'Tooltip',
    controls: [
      {
        prop: 'content',
        type: 'string',
        label: 'Content',
        defaultValue: 'Tooltip text',
      },
      {
        prop: 'side',
        type: 'select',
        label: 'Side',
        options: ['top', 'right', 'bottom', 'left'],
        defaultValue: 'top',
      },
    ],
  },
  badge: {
    component: 'Badge',
    controls: [
      {
        prop: 'variant',
        type: 'select',
        label: 'Variant',
        options: ['default', 'solid', 'secondary', 'destructive', 'outline', 'subtle'],
        defaultValue: 'default',
      },
      {
        prop: 'size',
        type: 'select',
        label: 'Size',
        options: ['sm', 'md', 'lg'],
        defaultValue: 'md',
      },
      {
        prop: 'tone',
        type: 'select',
        label: 'Tone',
        options: ['neutral', 'primary', 'success', 'warning', 'danger'],
        defaultValue: 'neutral',
      },
    ],
  },
  switch: {
    component: 'Switch',
    controls: [
      {
        prop: 'checked',
        type: 'boolean',
        label: 'Checked',
        defaultValue: false,
      },
      {
        prop: 'size',
        type: 'select',
        label: 'Size',
        options: ['sm', 'md', 'lg'],
        defaultValue: 'md',
      },
      {
        prop: 'disabled',
        type: 'boolean',
        label: 'Disabled',
        defaultValue: false,
      },
    ],
  },
  progress: {
    component: 'Progress',
    controls: [
      {
        prop: 'value',
        type: 'number',
        label: 'Value',
        defaultValue: 50,
      },
      {
        prop: 'size',
        type: 'select',
        label: 'Size',
        options: ['sm', 'md', 'lg'],
        defaultValue: 'md',
      },
    ],
  },
  checkbox: {
    component: 'Checkbox',
    controls: [
      {
        prop: 'checked',
        type: 'boolean',
        label: 'Checked',
        defaultValue: false,
      },
      {
        prop: 'size',
        type: 'select',
        label: 'Size',
        options: ['sm', 'md', 'lg'],
        defaultValue: 'md',
      },
      {
        prop: 'disabled',
        type: 'boolean',
        label: 'Disabled',
        defaultValue: false,
      },
    ],
  },
  slider: {
    component: 'Slider',
    controls: [
      {
        prop: 'value',
        type: 'number',
        label: 'Value',
        defaultValue: 50,
      },
      {
        prop: 'min',
        type: 'number',
        label: 'Min',
        defaultValue: 0,
      },
      {
        prop: 'max',
        type: 'number',
        label: 'Max',
        defaultValue: 100,
      },
      {
        prop: 'step',
        type: 'number',
        label: 'Step',
        defaultValue: 1,
      },
    ],
  },
  alert: {
    component: 'Alert',
    controls: [
      {
        prop: 'variant',
        type: 'select',
        label: 'Variant',
        options: ['default', 'destructive'],
        defaultValue: 'default',
      },
    ],
  },
  avatar: {
    component: 'Avatar',
    controls: [
      {
        prop: 'size',
        type: 'select',
        label: 'Size',
        options: ['sm', 'md', 'lg', 'xl'],
        defaultValue: 'md',
      },
    ],
  },
  toggle: {
    component: 'Toggle',
    controls: [
      {
        prop: 'pressed',
        type: 'boolean',
        label: 'Pressed',
        defaultValue: false,
      },
      {
        prop: 'variant',
        type: 'select',
        label: 'Variant',
        options: ['default', 'outline'],
        defaultValue: 'default',
      },
      {
        prop: 'size',
        type: 'select',
        label: 'Size',
        options: ['sm', 'md', 'lg'],
        defaultValue: 'md',
      },
    ],
  },
  spinner: {
    component: 'Spinner',
    controls: [
      {
        prop: 'size',
        type: 'select',
        label: 'Size',
        options: ['sm', 'md', 'lg'],
        defaultValue: 'md',
      },
    ],
  },
  textarea: {
    component: 'Textarea',
    controls: [
      {
        prop: 'placeholder',
        type: 'string',
        label: 'Placeholder',
        defaultValue: 'Enter text...',
      },
      {
        prop: 'size',
        type: 'select',
        label: 'Size',
        options: ['sm', 'md', 'lg'],
        defaultValue: 'md',
      },
      {
        prop: 'rows',
        type: 'number',
        label: 'Rows',
        defaultValue: 3,
      },
      {
        prop: 'disabled',
        type: 'boolean',
        label: 'Disabled',
        defaultValue: false,
      },
    ],
  },
}

export function getPlaygroundConfig(
  slug: string,
): PlaygroundConfig | undefined {
  return playgroundConfigs[slug]
}

// Component renderers for each playground
function renderPlayground(
  slug: string,
  props: Record<string, string | boolean | number>,
): ReactNode {
  switch (slug) {
    case 'button':
      return (
        <Button
          variant={props.variant as string}
          size={props.size as string}
          loading={props.loading as boolean}
          disabled={props.disabled as boolean}
        >
          <Button.Text>Button</Button.Text>
        </Button>
      )
    case 'input':
      return (
        <Input
          placeholder={props.placeholder as string}
          size={props.size as string}
          disabled={props.disabled as boolean}
        />
      )
    case 'card':
      return (
        <Card
          size={props.size as string}
          elevated={props.elevated as boolean}
          interactive={props.interactive as boolean}
        >
          <Card.Header>
            <Card.Title>Playground Card</Card.Title>
            <Card.Description>Adjust the controls to see changes.</Card.Description>
          </Card.Header>
          <Card.Content>
            <p>Card content goes here.</p>
          </Card.Content>
        </Card>
      )
    case 'dialog':
      return (
        <Dialog.Root modal={props.modal as boolean}>
          <Dialog.Trigger>
            <Button><Button.Text>Open Dialog</Button.Text></Button>
          </Dialog.Trigger>
          <Dialog.Overlay>
            <Dialog.Content>
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.Description>This is a dialog description.</Dialog.Description>
              <Dialog.Close>
                <Button><Button.Text>Close</Button.Text></Button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Root>
      )
    case 'select':
      return (
        <Select
          placeholder={props.placeholder as string}
          size={props.size as string}
          disabled={props.disabled as boolean}
        >
          <Select.Item value="option-1">Option 1</Select.Item>
          <Select.Item value="option-2">Option 2</Select.Item>
          <Select.Item value="option-3">Option 3</Select.Item>
        </Select>
      )
    case 'tabs':
      return (
        <Tabs.Root defaultValue="tab1" orientation={props.orientation as string}>
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
          <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
        </Tabs.Root>
      )
    case 'tooltip':
      return (
        <Tooltip content={props.content as string} side={props.side as string}>
          <Button>
            <Button.Text>Hover me</Button.Text>
          </Button>
        </Tooltip>
      )
    case 'badge':
      return (
        <Badge
          variant={props.variant as string}
          size={props.size as string}
          tone={props.tone as string}
        >
          Badge
        </Badge>
      )
    case 'switch':
      return (
        <Switch
          checked={props.checked as boolean}
          size={props.size as string}
          disabled={props.disabled as boolean}
        />
      )
    case 'progress':
      return (
        <Progress
          value={props.value as number}
          size={props.size as string}
        />
      )
    case 'checkbox':
      return (
        <Checkbox.Root
          checked={props.checked as boolean}
          size={props.size as string}
          disabled={props.disabled as boolean}
        >
          <Checkbox.Indicator />
        </Checkbox.Root>
      )
    case 'slider':
      return (
        <Slider
          value={props.value as number}
          min={props.min as number}
          max={props.max as number}
          step={props.step as number}
        />
      )
    case 'alert':
      return (
        <Alert.Root variant={props.variant as string}>
          <Alert.Title>Alert Title</Alert.Title>
          <Alert.Description>This is an alert description.</Alert.Description>
        </Alert.Root>
      )
    case 'avatar':
      return (
        <Avatar size={props.size as string}>
          <Avatar.Fallback>AB</Avatar.Fallback>
        </Avatar>
      )
    case 'toggle':
      return (
        <Toggle
          pressed={props.pressed as boolean}
          variant={props.variant as string}
          size={props.size as string}
        >
          Toggle
        </Toggle>
      )
    case 'spinner':
      return (
        <Spinner size={props.size as string} />
      )
    case 'textarea':
      return (
        <Textarea
          placeholder={props.placeholder as string}
          size={props.size as string}
          rows={props.rows as number}
          disabled={props.disabled as boolean}
        />
      )
    default:
      return <p className="text-muted-foreground">No playground available.</p>
  }
}

function generateCode(
  slug: string,
  config: PlaygroundConfig,
  props: Record<string, string | boolean | number>,
): string {
  const propsStr = config.controls
    .filter((c) => props[c.prop] !== c.defaultValue)
    .map((c) => {
      const val = props[c.prop]
      if (typeof val === 'boolean') return val ? c.prop : ''
      if (typeof val === 'number') return `${c.prop}={${val}}`
      return `${c.prop}="${val}"`
    })
    .filter(Boolean)
    .join(' ')

  const propsDisplay = propsStr ? ` ${propsStr}` : ''

  switch (slug) {
    case 'button':
      return `<Button${propsDisplay}>\n  <Button.Text>Button</Button.Text>\n</Button>`
    case 'input':
      return `<Input${propsDisplay} />`
    case 'card':
      return `<Card${propsDisplay}>\n  <Card.Header>\n    <Card.Title>Title</Card.Title>\n  </Card.Header>\n  <Card.Content>Content</Card.Content>\n</Card>`
    case 'dialog':
      return `<Dialog.Root${propsDisplay}>\n  <Dialog.Trigger>\n    <Button>Open Dialog</Button>\n  </Dialog.Trigger>\n  <Dialog.Content>\n    <Dialog.Title>Title</Dialog.Title>\n    <Dialog.Description>Description</Dialog.Description>\n  </Dialog.Content>\n</Dialog.Root>`
    case 'select':
      return `<Select${propsDisplay}>\n  <Select.Item value="option-1">Option 1</Select.Item>\n  <Select.Item value="option-2">Option 2</Select.Item>\n  <Select.Item value="option-3">Option 3</Select.Item>\n</Select>`
    case 'tabs':
      return `<Tabs.Root defaultValue="tab1"${propsDisplay}>\n  <Tabs.List>\n    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>\n    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>\n  </Tabs.List>\n  <Tabs.Content value="tab1">...</Tabs.Content>\n  <Tabs.Content value="tab2">...</Tabs.Content>\n</Tabs.Root>`
    case 'tooltip':
      return `<Tooltip${propsDisplay}>\n  <Button>\n    <Button.Text>Hover me</Button.Text>\n  </Button>\n</Tooltip>`
    case 'badge':
      return `<Badge${propsDisplay}>Badge</Badge>`
    case 'switch':
      return `<Switch${propsDisplay} />`
    case 'progress':
      return `<Progress${propsDisplay} />`
    case 'checkbox':
      return `<Checkbox.Root${propsDisplay}>\n  <Checkbox.Indicator />\n</Checkbox.Root>`
    case 'slider':
      return `<Slider${propsDisplay} />`
    case 'alert':
      return `<Alert.Root${propsDisplay}>\n  <Alert.Title>Alert Title</Alert.Title>\n  <Alert.Description>Description</Alert.Description>\n</Alert.Root>`
    case 'avatar':
      return `<Avatar${propsDisplay}>\n  <Avatar.Fallback>AB</Avatar.Fallback>\n</Avatar>`
    case 'toggle':
      return `<Toggle${propsDisplay}>Toggle</Toggle>`
    case 'spinner':
      return `<Spinner${propsDisplay} />`
    case 'textarea':
      return `<Textarea${propsDisplay} />`
    default:
      return ''
  }
}

interface PlaygroundProps {
  slug: string
}

export function Playground({ slug }: PlaygroundProps) {
  const config = playgroundConfigs[slug]
  if (!config) return null

  const [props, setProps] = useState<Record<string, string | boolean | number>>(
    () => {
      const initial: Record<string, string | boolean | number> = {}
      for (const control of config.controls) {
        initial[control.prop] = control.defaultValue
      }
      return initial
    },
  )

  const code = useMemo(
    () => generateCode(slug, config, props),
    [slug, config, props],
  )

  const updateProp = (prop: string, value: string | boolean | number) => {
    setProps((prev) => ({ ...prev, [prop]: value }))
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="px-4 py-2 border-b border-border bg-surface-muted">
        <span className="text-sm font-medium">Playground</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
        {/* Controls */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-border bg-surface-muted/50 space-y-4">
          {config.controls.map((control) => (
            <div key={control.prop}>
              <label className="block text-xs font-medium text-foreground-secondary mb-1">
                {control.label}
              </label>
              {control.type === 'select' && control.options && (
                <select
                  value={props[control.prop] as string}
                  onChange={(e) => updateProp(control.prop, e.target.value)}
                  className="w-full rounded border border-border bg-background px-2 py-1 text-sm"
                >
                  {control.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
              {control.type === 'boolean' && (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={props[control.prop] as boolean}
                    onChange={(e) =>
                      updateProp(control.prop, e.target.checked)
                    }
                    className="rounded"
                  />
                  <span className="text-sm">
                    {props[control.prop] ? 'On' : 'Off'}
                  </span>
                </label>
              )}
              {control.type === 'string' && (
                <input
                  type="text"
                  value={props[control.prop] as string}
                  onChange={(e) => updateProp(control.prop, e.target.value)}
                  className="w-full rounded border border-border bg-background px-2 py-1 text-sm"
                />
              )}
              {control.type === 'number' && (
                <input
                  type="number"
                  value={props[control.prop] as number}
                  onChange={(e) =>
                    updateProp(control.prop, Number(e.target.value))
                  }
                  className="w-full rounded border border-border bg-background px-2 py-1 text-sm"
                />
              )}
            </div>
          ))}
        </div>

        {/* Preview */}
        <div className="p-8 flex items-center justify-center bg-background bg-[image:radial-gradient(circle,_rgb(0_0_0_/_0.05)_1px,_transparent_1px)] dark:bg-[image:radial-gradient(circle,_rgb(255_255_255_/_0.05)_1px,_transparent_1px)] bg-[size:16px_16px] min-h-[200px]">
          {renderPlayground(slug, props)}
        </div>
      </div>

      {/* Generated Code */}
      <div className="border-t border-border p-4 bg-surface-muted">
        <pre className="text-sm font-mono whitespace-pre-wrap text-foreground-secondary">
          {code}
        </pre>
      </div>
    </div>
  )
}
