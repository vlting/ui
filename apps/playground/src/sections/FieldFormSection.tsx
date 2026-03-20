import { useState } from 'react'
import { Button, Card, Field, Form, Input, NativeSelect, Textarea, Toggle } from '@vlting/ui'

import { Column, Columns, ControlRow, SectionTitle, StackY, type SectionProps } from './shared'

export function FieldFormSection({ sectionRef }: SectionProps) {
  const [error, setError] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [required, setRequired] = useState(false)

  return (
    <Card ref={sectionRef} data-section="Field & Form">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>Field & Form</Card.Title>
        <ControlRow>
          <Toggle size="md" variant="outline" theme="neutral" pressed={error} onPressedChange={setError}>error</Toggle>
          <Toggle size="md" variant="outline" theme="neutral" pressed={disabled} onPressedChange={setDisabled}>disabled</Toggle>
          <Toggle size="md" variant="outline" theme="neutral" pressed={required} onPressedChange={setRequired}>required</Toggle>
        </ControlRow>
      </Card.Header>
      <Card.Content>
        <Columns>
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Field + Input</SectionTitle>
            <Field.Root error={error} disabled={disabled} required={required}>
              <Field.Label>Email</Field.Label>
              <Field.Control>
                <Input placeholder="you@example.com" />
              </Field.Control>
              <Field.Description>We'll never share your email.</Field.Description>
              <Field.Error>Please enter a valid email address.</Field.Error>
            </Field.Root>
          </Column>
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Field + Textarea</SectionTitle>
            <Field.Root error={error} disabled={disabled} required={required}>
              <Field.Label>Bio</Field.Label>
              <Field.Control>
                <Textarea placeholder="Tell us about yourself…" />
              </Field.Control>
              <Field.Description>Max 280 characters.</Field.Description>
              <Field.Error>Bio is required.</Field.Error>
            </Field.Root>
          </Column>
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Field + NativeSelect</SectionTitle>
            <Field.Root disabled={disabled} required={required}>
              <Field.Label>Fruit</Field.Label>
              <Field.Control>
                <NativeSelect.Root placeholder="Pick one">
                  <NativeSelect.Option value="apple">Apple</NativeSelect.Option>
                  <NativeSelect.Option value="banana">Banana</NativeSelect.Option>
                  <NativeSelect.Option value="cherry">Cherry</NativeSelect.Option>
                </NativeSelect.Root>
              </Field.Control>
              <Field.Description>Choose your favorite fruit.</Field.Description>
            </Field.Root>
          </Column>
        </Columns>

        <SectionTitle>Form composition</SectionTitle>
        <Form.Root onSubmit={() => alert('Submitted!')}>
          <StackY>
            <Field.Root error={error} disabled={disabled} required={required}>
              <Field.Label>Username</Field.Label>
              <Field.Control>
                <Input placeholder="johndoe" />
              </Field.Control>
              <Field.Error>Username is already taken.</Field.Error>
            </Field.Root>
            <Field.Root error={error} disabled={disabled} required={required}>
              <Field.Label>Password</Field.Label>
              <Field.Control>
                <Input type="password" placeholder="••••••••" />
              </Field.Control>
              <Field.Description>At least 8 characters.</Field.Description>
              <Field.Error>Password is too short.</Field.Error>
            </Field.Root>
            <Button type="submit" theme="primary" disabled={disabled}>Sign up</Button>
          </StackY>
        </Form.Root>
      </Card.Content>
    </Card>
  )
}
