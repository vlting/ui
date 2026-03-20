import { useState } from 'react'
import { Card, Collapsible, Toggle } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { ControlRow, type SectionProps } from './shared'

const StatusLabel = styled('span', {
  fontSize: '$small', color: '$neutralText4', fontFamily: '$code',
}, { name: 'StatusLabel' })

export function CollapsibleSection({ sectionRef }: SectionProps) {
  const [disabled, setDisabled] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <Card ref={sectionRef} data-section="Collapsible">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>Collapsible</Card.Title>
        <ControlRow>
          <Toggle size="md" variant="outline" theme="neutral" pressed={disabled} onPressedChange={setDisabled}>disabled</Toggle>
        </ControlRow>
      </Card.Header>
      <Card.Content>
        <Collapsible.Root disabled={disabled} open={open} onOpenChange={setOpen}>
          <Collapsible.Trigger>Toggle content</Collapsible.Trigger>
          <Collapsible.Content>
            This content can be toggled open and closed. It uses the hidden attribute for visibility.
          </Collapsible.Content>
        </Collapsible.Root>
        <StatusLabel>open: {String(open)}</StatusLabel>
      </Card.Content>
    </Card>
  )
}
