import { useState } from 'react'
import { Button, Card, Input, Popover, ToggleGroup } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { ControlRow, SectionTitle, StackY, type SectionProps } from './shared'

type Placement = 'top' | 'bottom' | 'left' | 'right'

const PopoverForm = styled('div', {
  display: 'flex', flexDirection: 'column', gap: '$12',
}, { name: 'PopoverForm' })

const PopoverLabel = styled('label', {
  fontSize: '$small', fontWeight: '$500', color: '$neutralText4',
}, { name: 'PopoverLabel' })

export function PopoverSection({ sectionRef }: SectionProps) {
  const [placement, setPlacement] = useState<Placement>('bottom')

  return (
    <Card ref={sectionRef} data-section="Popover">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>Popover</Card.Title>
        <ControlRow>
          <ToggleGroup
            type="exclusive"
            value={[placement]}
            onValueChange={v => v[0] && setPlacement(v[0] as Placement)}
            aria-label="Popover placement"
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
          <SectionTitle stl={{ mt: '$0' }}>Placement</SectionTitle>
          <Popover.Root placement={placement}>
            <Popover.Trigger>
              <Button theme="primary" variant="outline">Open popover</Button>
            </Popover.Trigger>
            <Popover.Content>
              <Popover.Close />
              Popover content positioned {placement}.
            </Popover.Content>
          </Popover.Root>

          <SectionTitle stl={{ mt: '$24' }}>With form content</SectionTitle>
          <Popover.Root placement="bottom">
            <Popover.Trigger>
              <Button theme="neutral" variant="outline">Edit dimensions</Button>
            </Popover.Trigger>
            <Popover.Content>
              <Popover.Close />
              <PopoverForm>
                <PopoverLabel htmlFor="pop-width">Width</PopoverLabel>
                <Input id="pop-width" placeholder="100px" />
                <PopoverLabel htmlFor="pop-height">Height</PopoverLabel>
                <Input id="pop-height" placeholder="50px" />
                <Button theme="primary" variant="solid" size="sm">Apply</Button>
              </PopoverForm>
            </Popover.Content>
          </Popover.Root>
        </StackY>
      </Card.Content>
    </Card>
  )
}
