import { useState } from 'react'
import { Accordion, Button, Card, Toggle, ToggleGroup } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { ControlRow, type SectionProps } from './shared'

const StatusLabel = styled('span', {
  fontSize: '$small', color: '$neutralText4', fontFamily: '$code',
}, { name: 'StatusLabel' })

type AccordionType = 'single' | 'multiple'

export function AccordionSection({ sectionRef }: SectionProps) {
  const [type, setType] = useState<AccordionType>('single')
  const [collapsible, setCollapsible] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [value, setValue] = useState<string[]>(['item-1'])

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
        <Accordion.Root
          type={type}
          collapsible={type === 'single' ? collapsible : undefined}
          disabled={disabled}
          value={value}
          onValueChange={setValue}
        >
          <Accordion.Item value="item-1">
            <Accordion.Trigger>What is this?</Accordion.Trigger>
            <Accordion.Content>
              A vertically stacked set of interactive headings that each reveal a section of content.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
            <Accordion.Content>
              Yes. It follows the WAI-ARIA Accordion pattern with proper aria-expanded, aria-controls, and keyboard navigation.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-3">
            <Accordion.Trigger>Can I style it?</Accordion.Trigger>
            <Accordion.Content>
              Yes. All sub-components accept STL style props and can be themed with tokens.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
        <StatusLabel>value: [{value.map(v => `"${v}"`).join(', ')}]</StatusLabel>
      </Card.Content>
    </Card>
  )
}
