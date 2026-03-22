import { useState } from 'react'
import { Accordion, Button, Card, Toggle, ToggleGroup } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { ControlRow, SectionTitle, StackY, type SectionProps } from './shared'

const StatusLabel = styled('span', {
  fontSize: '$small', color: '$neutralText4', fontFamily: '$code',
}, { name: 'StatusLabel' })

type AccordionType = 'single' | 'multiple'

export function AccordionSection({ sectionRef }: SectionProps) {
  const [type, setType] = useState<AccordionType>('single')
  const [collapsible, setCollapsible] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [value, setValue] = useState<string[]>(['getting-started'])

  return (
    <Card ref={sectionRef} data-section="Accordion">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>Accordion</Card.Title>
        <ControlRow>
          <ToggleGroup
            type="exclusive"
            value={[type]}
            onValueChange={v => v[0] && setType(v[0] as AccordionType)}
            aria-label="Accordion type"
          >
            <Button value="single" size="md" variant="outline" theme="neutral">single</Button>
            <Button value="multiple" size="md" variant="outline" theme="neutral">multiple</Button>
          </ToggleGroup>
          {type === 'single' && (
            <Toggle size="md" variant="outline" theme="neutral" pressed={collapsible} onPressedChange={setCollapsible}>collapsible</Toggle>
          )}
          <Toggle size="md" variant="outline" theme="neutral" pressed={disabled} onPressedChange={setDisabled}>disabled</Toggle>
        </ControlRow>
      </Card.Header>
      <Card.Content>
        <StackY>
          <SectionTitle stl={{ mt: '$0' }}>Interactive</SectionTitle>
          <Accordion.Root
            type={type}
            collapsible={type === 'single' ? collapsible : undefined}
            disabled={disabled}
            value={value}
            onValueChange={setValue}
          >
            <Accordion.Item value="what-is-vlt">
              <Accordion.Trigger>What is vlt?</Accordion.Trigger>
              <Accordion.Content>
                  vlt is a next-generation JavaScript package manager and serverless registry
                  designed for speed, security, and simplicity. It provides a modern alternative
                  to existing tools with first-class support for workspaces and monorepos.
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="getting-started">
              <Accordion.Trigger>Getting started</Accordion.Trigger>
              <Accordion.Content>
                  Install vlt globally with your preferred package manager, then run vlt install
                  in any project directory. Configuration is automatic — vlt reads your existing
                  package.json and lockfile formats out of the box.
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="configuration">
              <Accordion.Trigger>Configuration</Accordion.Trigger>
              <Accordion.Content>
                  vlt supports .vltrc files, environment variables, and package.json fields
                  for configuration. Registry scopes, authentication tokens, and cache settings
                  can all be managed through a unified config surface.
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="disabled-item" disabled>
              <Accordion.Trigger>Deprecated options</Accordion.Trigger>
              <Accordion.Content>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
          <StatusLabel>value: [{value.map(v => `"${v}"`).join(', ')}]</StatusLabel>

          <SectionTitle stl={{ mt: '$24' }}>No indicator</SectionTitle>
          <Accordion.Root type="single" defaultValue={['faq-1']}>
            <Accordion.Item value="faq-1">
              <Accordion.Trigger indicator={false}>Can I hide the chevron?</Accordion.Trigger>
              <Accordion.Content>
                  Yes. Set indicator=false on any Trigger to render without the built-in
                  chevron icon. Useful when you want custom expand/collapse indicators.
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="faq-2">
              <Accordion.Trigger indicator={false}>Is keyboard navigation supported?</Accordion.Trigger>
              <Accordion.Content>
                  Full keyboard support — Arrow keys move between triggers, Enter and Space
                  toggle items, Home and End jump to first and last triggers.
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </StackY>
      </Card.Content>
    </Card>
  )
}
