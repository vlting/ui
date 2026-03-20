import { useState } from 'react'
import { Button, Card, Checkbox, RadioGroup, Switch, Toggle, ToggleGroup } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { Column, Columns, ControlRow, SectionTitle, StackY, type SectionProps } from './shared'

const StatusLabel = styled('span', {
  fontSize: '$small', color: '$neutralText4', fontFamily: '$code',
}, { name: 'StatusLabel' })

const Row = styled('div', {
  display: 'flex', gap: '$16', alignItems: 'center', flexWrap: 'wrap',
}, { name: 'Row' })

const SIZES = ['sm', 'md', 'lg'] as const
type Size = (typeof SIZES)[number]

export function SelectionSection({ sectionRef }: SectionProps) {
  const [size, setSize] = useState<Size>('md')
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState(false)

  const [cbChecked, setCbChecked] = useState(false)
  const [swChecked, setSwChecked] = useState(false)
  const [radioValue, setRadioValue] = useState('apple')

  return (
    <Card ref={sectionRef} data-section="Selection">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>Selection</Card.Title>
        <ControlRow>
          <ToggleGroup
            type="exclusive"
            value={[size]}
            onValueChange={v => v[0] && setSize(v[0] as Size)}
            aria-label="Selection size"
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
          {/* ── Checkbox ───────────────────────────────────── */}
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Checkbox</SectionTitle>
            <StackY>
              <Checkbox.Root size={size} disabled={disabled} error={error}>
                Uncontrolled
              </Checkbox.Root>
              <Checkbox.Root size={size} disabled={disabled} error={error} defaultChecked>
                Default checked
              </Checkbox.Root>
              <Checkbox.Root size={size} disabled={disabled} error={error} indeterminate>
                Indeterminate
              </Checkbox.Root>
              <Row>
                <Checkbox.Root
                  size={size}
                  disabled={disabled}
                  error={error}
                  checked={cbChecked}
                  onCheckedChange={setCbChecked}
                >
                  Controlled
                </Checkbox.Root>
                <StatusLabel>{cbChecked ? 'ON' : 'OFF'}</StatusLabel>
              </Row>
            </StackY>
          </Column>

          {/* ── Switch ─────────────────────────────────────── */}
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Switch</SectionTitle>
            <StackY>
              <Row>
                <Switch size={size} disabled={disabled} error={error} aria-label="Uncontrolled" />
                <StatusLabel>Uncontrolled</StatusLabel>
              </Row>
              <Row>
                <Switch size={size} disabled={disabled} error={error} defaultChecked aria-label="Default on" />
                <StatusLabel>Default on</StatusLabel>
              </Row>
              <Row>
                <Switch
                  size={size}
                  disabled={disabled}
                  error={error}
                  checked={swChecked}
                  onCheckedChange={setSwChecked}
                  aria-label="Controlled"
                />
                <StatusLabel>{swChecked ? 'ON' : 'OFF'}</StatusLabel>
              </Row>
            </StackY>
          </Column>

          {/* ── RadioGroup ─────────────────────────────────── */}
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>RadioGroup</SectionTitle>
            <StackY stl={{ gap: '$24' }}>
              <RadioGroup.Root size={size} disabled={disabled} error={error} defaultValue="banana" aria-label="Fruit">
                <RadioGroup.Item value="apple">Apple</RadioGroup.Item>
                <RadioGroup.Item value="banana">Banana</RadioGroup.Item>
                <RadioGroup.Item value="cherry">Cherry</RadioGroup.Item>
              </RadioGroup.Root>
              <RadioGroup.Root
                size={size}
                disabled={disabled}
                error={error}
                orientation="horizontal"
                defaultValue="sm"
                aria-label="Plan"
              >
                <RadioGroup.Item value="sm">Small</RadioGroup.Item>
                <RadioGroup.Item value="md">Medium</RadioGroup.Item>
                <RadioGroup.Item value="lg">Large</RadioGroup.Item>
              </RadioGroup.Root>
              <Row>
                <RadioGroup.Root
                  size={size}
                  disabled={disabled}
                  error={error}
                  orientation="horizontal"
                  value={radioValue}
                  onValueChange={setRadioValue}
                  aria-label="Controlled fruit"
                >
                  <RadioGroup.Item value="apple">Apple</RadioGroup.Item>
                  <RadioGroup.Item value="banana">Banana</RadioGroup.Item>
                  <RadioGroup.Item value="cherry">Cherry</RadioGroup.Item>
                </RadioGroup.Root>
                <StatusLabel>{radioValue}</StatusLabel>
              </Row>
            </StackY>
          </Column>
        </Columns>
      </Card.Content>
    </Card>
  )
}
