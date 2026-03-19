import { useState } from 'react'
import { Button, Card, Input, NativeSelect, Textarea, ToggleGroup } from '@vlting/ui'

import { styled } from '@vlting/stl-react'

import { ControlRow, SectionTitle, StackY, type SectionProps } from './shared'

const ContentWrap = styled('div', {
  maxWidth: 480,
}, { name: 'ContentWrap' })

const SIZES = ['sm', 'md', 'lg'] as const
type Size = (typeof SIZES)[number]

export function InputSection({ sectionRef }: SectionProps) {
  const [error, setError] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [size, setSize] = useState<Size>('md')

  return (
    <Card ref={sectionRef} data-section="Input">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Card.Title>Input</Card.Title>
        <ControlRow>
          <ToggleGroup
            type="exclusive"
            value={[size]}
            onValueChange={v => v[0] && setSize(v[0] as Size)}
            aria-label="Size"
          >
            {SIZES.map(s => (
              <Button key={s} value={s} size="md" variant="outline" theme="neutral">{s}</Button>
            ))}
          </ToggleGroup>
          <ToggleGroup
            type="multiple"
            value={[...(error ? ['error'] : []), ...(disabled ? ['disabled'] : [])]}
            onValueChange={v => {
              setError(v.includes('error'))
              setDisabled(v.includes('disabled'))
            }}
            aria-label="State"
          >
            <Button value="error" size="md" variant="outline" theme="neutral">error</Button>
            <Button value="disabled" size="md" variant="outline" theme="neutral">disabled</Button>
          </ToggleGroup>
        </ControlRow>
      </Card.Header>
      <Card.Content>
        <ContentWrap>
          {/* Input */}
          <SectionTitle>Input</SectionTitle>
          <StackY>
            <Input size={size} placeholder={`Size: ${size}`} error={error} disabled={disabled} />
          </StackY>

          {/* Textarea */}
          <SectionTitle>Textarea</SectionTitle>
          <StackY>
            <Textarea size={size} placeholder={`Size: ${size}`} error={error} disabled={disabled} />
            <Textarea size={size} rows={6} placeholder="rows=6" error={error} disabled={disabled} />
          </StackY>

          {/* NativeSelect */}
          <SectionTitle>NativeSelect</SectionTitle>
          <StackY>
            <NativeSelect.Root size={size} placeholder={`Size: ${size}`} error={error} disabled={disabled}>
              <NativeSelect.Option value="apple">Apple</NativeSelect.Option>
              <NativeSelect.Option value="banana">Banana</NativeSelect.Option>
              <NativeSelect.Option value="cherry">Cherry</NativeSelect.Option>
            </NativeSelect.Root>
          </StackY>
        </ContentWrap>
      </Card.Content>
    </Card>
  )
}
