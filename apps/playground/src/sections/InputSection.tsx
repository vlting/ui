import { useState } from 'react'
import { Button, Card, Input, NativeSelect, Textarea, Toggle, ToggleGroup } from '@vlting/ui'

import { Column, Columns, ControlRow, SectionTitle, StackY, type SectionProps } from './shared'

const SIZES = ['sm', 'md', 'lg'] as const
type Size = (typeof SIZES)[number]

export function InputSection({ sectionRef }: SectionProps) {
  const [error, setError] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [size, setSize] = useState<Size>('md')
  return (
    <Card ref={sectionRef} data-section="Inputs">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>Inputs</Card.Title>
        <ControlRow>
          <ToggleGroup
            type="exclusive"
            value={[size]}
            onValueChange={v => v[0] && setSize(v[0] as Size)}
            aria-label="Input size"
          >
            {SIZES.map(s => (
              <Button key={s} value={s} size="md" variant="outline" theme="neutral">{s}</Button>
            ))}
          </ToggleGroup>
          <Toggle size="md" variant="outline" theme="neutral" pressed={error} onPressedChange={setError}>error</Toggle>
          <Toggle size="md" variant="outline" theme="neutral" pressed={disabled} onPressedChange={setDisabled}>disabled</Toggle>
        </ControlRow>
      </Card.Header>
      <Card.Content>
        <Columns>
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Input</SectionTitle>
            <Input size={size} placeholder={`Size: ${size}`} error={error} disabled={disabled} />
          </Column>
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Textarea</SectionTitle>
            <Textarea size={size} placeholder={`Size: ${size}`} error={error} disabled={disabled} />
          </Column>
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>NativeSelect</SectionTitle>
            <NativeSelect.Root size={size} placeholder={`Size: ${size}`} error={error} disabled={disabled}>
              <NativeSelect.Option value="apple">Apple</NativeSelect.Option>
              <NativeSelect.Option value="banana">Banana</NativeSelect.Option>
              <NativeSelect.Option value="cherry">Cherry</NativeSelect.Option>
            </NativeSelect.Root>
          </Column>
        </Columns>
      </Card.Content>
    </Card>
  )
}
