import { useState } from 'react'
import { Button, Card, Input, NativeSelect, Textarea } from '@vlting/ui'

import { ButtonRow, SectionTitle, StackY, type SectionProps } from './shared'

const SIZES = ['sm', 'md', 'lg'] as const
type Size = (typeof SIZES)[number]

export function InputSection({ sectionRef }: SectionProps) {
  const [error, setError] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [size, setSize] = useState<Size>('md')

  return (
    <Card ref={sectionRef} data-section="Input">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>Input</Card.Title>
        <ButtonRow>
          {SIZES.map((s) => (
            <Button
              key={s}
              size="sm"
              variant={size === s ? 'solid' : 'outline'}
              theme="primary"
              onClick={() => setSize(s)}
            >
              {s}
            </Button>
          ))}
          <Button
            size="sm"
            variant={error ? 'solid' : 'outline'}
            theme="destructive"
            onClick={() => setError(!error)}
          >
            error
          </Button>
          <Button
            size="sm"
            variant={disabled ? 'solid' : 'outline'}
            theme="neutral"
            onClick={() => setDisabled(!disabled)}
          >
            disabled
          </Button>
        </ButtonRow>
      </Card.Header>
      <Card.Content>
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
      </Card.Content>
    </Card>
  )
}
