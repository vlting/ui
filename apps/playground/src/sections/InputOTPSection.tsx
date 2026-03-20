import { useState } from 'react'
import { Card, InputOTP, Toggle } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { Column, Columns, ControlRow, SectionTitle, StackY, type SectionProps } from './shared'

const StatusLabel = styled('span', {
  fontSize: '$small', color: '$neutralText4', fontFamily: '$code',
}, { name: 'StatusLabel' })

export function InputOTPSection({ sectionRef }: SectionProps) {
  const [disabled, setDisabled] = useState(false)
  const [value, setValue] = useState('')
  const [complete, setComplete] = useState(false)

  return (
    <Card ref={sectionRef} data-section="InputOTP">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>InputOTP</Card.Title>
        <ControlRow>
          <Toggle size="md" variant="outline" theme="neutral" pressed={disabled} onPressedChange={setDisabled}>disabled</Toggle>
        </ControlRow>
      </Card.Header>
      <Card.Content>
        <Columns>
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>6-digit code</SectionTitle>
            <StackY>
              <InputOTP.Root
                maxLength={6}
                value={value}
                onChange={setValue}
                onComplete={() => setComplete(true)}
                disabled={disabled}
              >
                <InputOTP.Group>
                  <InputOTP.Slot index={0} />
                  <InputOTP.Slot index={1} />
                  <InputOTP.Slot index={2} />
                </InputOTP.Group>
                <InputOTP.Separator />
                <InputOTP.Group>
                  <InputOTP.Slot index={3} />
                  <InputOTP.Slot index={4} />
                  <InputOTP.Slot index={5} />
                </InputOTP.Group>
              </InputOTP.Root>
              <StatusLabel>{value || '(empty)'} {complete && '✓'}</StatusLabel>
            </StackY>
          </Column>
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>4-digit PIN</SectionTitle>
            <InputOTP.Root maxLength={4} disabled={disabled}>
              <InputOTP.Group>
                <InputOTP.Slot index={0} />
                <InputOTP.Slot index={1} />
                <InputOTP.Slot index={2} />
                <InputOTP.Slot index={3} />
              </InputOTP.Group>
            </InputOTP.Root>
          </Column>
        </Columns>
      </Card.Content>
    </Card>
  )
}
