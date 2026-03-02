'use client'

import { useState, useMemo, type ReactNode, type ComponentType } from 'react'

// Tamagui v2 RC GetFinalProps bug — cast for docs usage
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFC = ComponentType<any>

import {
  Button as _Button,
  Input as _Input,
  Card as _Card,
  Tabs as _Tabs,
  Tooltip as _Tooltip,
} from '@vlting/ui'

const Button = _Button as AnyFC & { Text: AnyFC }
const Input = _Input as AnyFC
const Card = _Card as AnyFC & {
  Header: AnyFC
  Content: AnyFC
  Title: AnyFC
  Description: AnyFC
}
const Tabs = _Tabs as unknown as {
  Root: AnyFC
  List: AnyFC
  Trigger: AnyFC
  Content: AnyFC
}
const Tooltip = _Tooltip as AnyFC

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
    case 'tabs':
      return `<Tabs.Root defaultValue="tab1"${propsDisplay}>\n  <Tabs.List>\n    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>\n    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>\n  </Tabs.List>\n  <Tabs.Content value="tab1">...</Tabs.Content>\n  <Tabs.Content value="tab2">...</Tabs.Content>\n</Tabs.Root>`
    case 'tooltip':
      return `<Tooltip${propsDisplay}>\n  <Button>\n    <Button.Text>Hover me</Button.Text>\n  </Button>\n</Tooltip>`
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
