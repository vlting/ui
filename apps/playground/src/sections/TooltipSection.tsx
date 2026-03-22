import { useState } from 'react'
import { Badge, Button, Card, Tooltip, ToggleGroup } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { ButtonRow, ControlRow, SectionTitle, StackY, type SectionProps } from './shared'

type Placement = 'top' | 'bottom' | 'left' | 'right'

const InlineText = styled('span', {
  fontSize: '$p', color: '$neutralText4',
  textDecoration: 'underline',
  textDecorationStyle: 'dotted',
  cursor: 'help',
}, { name: 'InlineText' })

export function TooltipSection({ sectionRef }: SectionProps) {
  const [placement, setPlacement] = useState<Placement>('top')

  return (
    <Card ref={sectionRef} data-section="Tooltip">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>Tooltip</Card.Title>
        <ControlRow>
          <ToggleGroup
            type="exclusive"
            value={[placement]}
            onValueChange={v => v[0] && setPlacement(v[0] as Placement)}
            aria-label="Tooltip placement"
          >
            <Button value="top" size="md" variant="outline" theme="neutral">top</Button>
            <Button value="bottom" size="md" variant="outline" theme="neutral">bottom</Button>
            <Button value="left" size="md" variant="outline" theme="neutral">left</Button>
            <Button value="right" size="md" variant="outline" theme="neutral">right</Button>
          </ToggleGroup>
        </ControlRow>
      </Card.Header>
      <Card.Content>
        <StackY>
          <SectionTitle stl={{ mt: '$0' }}>On buttons</SectionTitle>
          <ButtonRow>
            <Tooltip content="Save your changes" placement={placement}>
              <Button theme="primary" variant="solid">Save</Button>
            </Tooltip>
            <Tooltip content="Discard and go back" placement={placement}>
              <Button theme="neutral" variant="outline">Cancel</Button>
            </Tooltip>
            <Tooltip content="This action cannot be undone" placement={placement}>
              <Button theme="destructive" variant="outline">Delete</Button>
            </Tooltip>
          </ButtonRow>

          <SectionTitle stl={{ mt: '$24' }}>On badges</SectionTitle>
          <ButtonRow>
            <Tooltip content="3 urgent items need attention" placement={placement}>
              <Badge theme="tomato" variant="subtle" size="sm">urgent</Badge>
            </Tooltip>
            <Tooltip content="Awaiting review from team" placement={placement}>
              <Badge theme="amber" variant="subtle" size="sm">pending</Badge>
            </Tooltip>
            <Tooltip content="All tasks completed" placement={placement}>
              <Badge theme="grass" variant="subtle" size="sm">done</Badge>
            </Tooltip>
          </ButtonRow>

          <SectionTitle stl={{ mt: '$24' }}>On inline text</SectionTitle>
          <Tooltip content="Keyboard shortcut: Ctrl+S" placement={placement}>
            <InlineText>shortcut hint</InlineText>
          </Tooltip>

          <SectionTitle stl={{ mt: '$24' }}>Compound API</SectionTitle>
          <Tooltip.Root placement={placement} showDelay={500}>
            <Tooltip.Trigger>
              <Button theme="neutral" variant="ghost">Slow tooltip (500ms)</Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Custom delay via compound API</Tooltip.Content>
          </Tooltip.Root>
        </StackY>
      </Card.Content>
    </Card>
  )
}
