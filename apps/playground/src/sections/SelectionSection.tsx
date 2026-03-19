import { useState } from 'react'
import { Button, Card, Checkbox, RadioGroup, Switch, ToggleGroup } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { ControlRow, SectionTitle, StackY, type SectionProps } from './shared'

const ContentWrap = styled('div', {
  maxWidth: '$480',
}, { name: 'ContentWrap' })

const Row = styled('div', {
  display: 'flex', gap: '$16', alignItems: 'center', flexWrap: 'wrap',
}, { name: 'Row' })

const StatusLabel = styled('span', {
  fontSize: '$small', color: '$neutralText4', fontFamily: '$code',
}, { name: 'StatusLabel' })

const SIZES = ['sm', 'md', 'lg'] as const
type Size = (typeof SIZES)[number]

export function SelectionSection({ sectionRef }: SectionProps) {
  const [size, setSize] = useState<Size>('md')
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState(false)

  // Checkbox controlled state
  const [cbChecked, setCbChecked] = useState(false)

  // Switch controlled state
  const [swChecked, setSwChecked] = useState(false)

  // RadioGroup controlled state
  const [radioValue, setRadioValue] = useState('apple')

  return (
    <Card ref={sectionRef} data-section="Selection">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Card.Title>Selection</Card.Title>
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
      <Card.Content stl={{ display: 'flex', flexDirection: 'column', gap: '$32' }}>
        <ContentWrap>
          {/* ── Checkbox ───────────────────────────────────── */}
          <SectionTitle>Checkbox</SectionTitle>
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

          {/* ── Switch ─────────────────────────────────────── */}
          <SectionTitle>Switch</SectionTitle>
          <StackY>
            <Row>
              <Switch size={size} disabled={disabled} aria-label="Uncontrolled" />
              <StatusLabel>Uncontrolled</StatusLabel>
            </Row>
            <Row>
              <Switch size={size} disabled={disabled} defaultChecked aria-label="Default on" />
              <StatusLabel>Default on</StatusLabel>
            </Row>
            <Row>
              <Switch
                size={size}
                disabled={disabled}
                checked={swChecked}
                onCheckedChange={setSwChecked}
                aria-label="Controlled"
              />
              <StatusLabel>{swChecked ? 'ON' : 'OFF'}</StatusLabel>
            </Row>
          </StackY>

          {/* ── RadioGroup ─────────────────────────────────── */}
          <SectionTitle>RadioGroup — Vertical</SectionTitle>
          <StackY>
            <RadioGroup.Root size={size} disabled={disabled} defaultValue="banana" aria-label="Fruit">
              <RadioGroup.Item value="apple">Apple</RadioGroup.Item>
              <RadioGroup.Item value="banana">Banana</RadioGroup.Item>
              <RadioGroup.Item value="cherry">Cherry</RadioGroup.Item>
            </RadioGroup.Root>
          </StackY>

          <SectionTitle>RadioGroup — Horizontal</SectionTitle>
          <StackY>
            <RadioGroup.Root
              size={size}
              disabled={disabled}
              orientation="horizontal"
              defaultValue="sm"
              aria-label="Plan"
            >
              <RadioGroup.Item value="sm">Small</RadioGroup.Item>
              <RadioGroup.Item value="md">Medium</RadioGroup.Item>
              <RadioGroup.Item value="lg">Large</RadioGroup.Item>
            </RadioGroup.Root>
          </StackY>

          <SectionTitle>RadioGroup — Controlled</SectionTitle>
          <StackY>
            <Row>
              <RadioGroup.Root
                size={size}
                disabled={disabled}
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
        </ContentWrap>
      </Card.Content>
    </Card>
  )
}
