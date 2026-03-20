import { useState } from 'react'
import { Button, Card, Input, InputGroup, Toggle, ToggleGroup } from '@vlting/ui'

import { Column, Columns, ControlRow, SectionTitle, StackY, type SectionProps } from './shared'

const SIZES = ['sm', 'md', 'lg'] as const
type Size = (typeof SIZES)[number]

export function InputGroupSection({ sectionRef }: SectionProps) {
  const [size, setSize] = useState<Size>('md')
  const [disabled, setDisabled] = useState(false)

  return (
    <Card ref={sectionRef} data-section="InputGroup">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>InputGroup</Card.Title>
        <ControlRow>
          <ToggleGroup
            type="exclusive"
            value={[size]}
            onValueChange={v => v[0] && setSize(v[0] as Size)}
            aria-label="InputGroup size"
          >
            {SIZES.map(s => (
              <Button key={s} value={s} size="md" variant="outline" theme="neutral">{s}</Button>
            ))}
          </ToggleGroup>
          <Toggle size="md" variant="outline" theme="neutral" pressed={disabled} onPressedChange={setDisabled}>disabled</Toggle>
        </ControlRow>
      </Card.Header>
      <Card.Content>
        <Columns>
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>With Addon</SectionTitle>
            <InputGroup size={size}>
              <InputGroup.Addon>$</InputGroup.Addon>
              <InputGroup.Input>
                <Input placeholder="Amount" disabled={disabled} />
              </InputGroup.Input>
              <InputGroup.Addon>.00</InputGroup.Addon>
            </InputGroup>
          </Column>
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>All sizes</SectionTitle>
            <StackY>
              {SIZES.map(s => (
                <InputGroup key={s} size={s}>
                  <InputGroup.Addon>https://</InputGroup.Addon>
                  <InputGroup.Input>
                    <Input placeholder={`Size: ${s}`} disabled={disabled} />
                  </InputGroup.Input>
                </InputGroup>
              ))}
            </StackY>
          </Column>
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Vertical</SectionTitle>
            <InputGroup size={size} orientation="vertical">
              <InputGroup.Input>
                <Input placeholder="First name" disabled={disabled} />
              </InputGroup.Input>
              <InputGroup.Input>
                <Input placeholder="Last name" disabled={disabled} />
              </InputGroup.Input>
            </InputGroup>
          </Column>
        </Columns>
      </Card.Content>
    </Card>
  )
}
