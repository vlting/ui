import { useState } from 'react'
import { Button, Card, Input, NativeSelect, Textarea } from '@vlting/ui'

import { ButtonRow, SectionTitle, StackY, type SectionProps } from './shared'

const SIZES = ['sm', 'md', 'lg'] as const

export function InputSection({ sectionRef }: SectionProps) {
  const [error, setError] = useState(false)
  const [disabled, setDisabled] = useState(false)

  return (
    <Card ref={sectionRef} data-section="Input" stl={{ mt: '$24' }}>
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>Input</Card.Title>
        <ButtonRow>
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
        <SectionTitle>Input — Sizes</SectionTitle>
        <StackY>
          {SIZES.map((s) => (
            <Input key={s} size={s} placeholder={`Size: ${s}`} error={error} disabled={disabled} />
          ))}
        </StackY>

        {/* Textarea */}
        <SectionTitle>Textarea — Sizes</SectionTitle>
        <StackY>
          {SIZES.map((s) => (
            <Textarea key={s} size={s} placeholder={`Size: ${s}`} error={error} disabled={disabled} />
          ))}
          <Textarea rows={6} placeholder="rows=6" error={error} disabled={disabled} />
        </StackY>

        {/* NativeSelect */}
        <SectionTitle>NativeSelect — Sizes</SectionTitle>
        <StackY>
          {SIZES.map((s) => (
            <NativeSelect.Root key={s} size={s} placeholder={`Size: ${s}`} error={error} disabled={disabled}>
              <NativeSelect.Option value="apple">Apple</NativeSelect.Option>
              <NativeSelect.Option value="banana">Banana</NativeSelect.Option>
              <NativeSelect.Option value="cherry">Cherry</NativeSelect.Option>
            </NativeSelect.Root>
          ))}
        </StackY>
      </Card.Content>
    </Card>
  )
}
