import { useState } from 'react'
import { Button, ButtonGroup, Card, Toggle, ToggleGroup } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { ButtonRow, SectionTitle, type SectionProps } from './shared'

const ColumnRow = styled('div', {
  display: 'flex', gap: '$24',
}, { name: 'ColumnRow' })

const Column = styled('div', {
  display: 'flex', flexDirection: 'column', gap: '$12', flex: '1',
}, { name: 'Column' })

const StateLabel = styled('span', {
  fontSize: '$small', color: '$neutralText4', fontFamily: '$code',
}, { name: 'StateLabel' })

const ToggleRow = styled('div', {
  display: 'flex', gap: '$8', alignItems: 'center',
}, { name: 'ToggleRow' })

// ─── Icons ──────────────────────────────────────────────────────────────────

const PlusIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
  </svg>
)

const MinusIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 11H19V13H5V11Z" />
  </svg>
)

const MuteIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.88889 16H2C1.44772 16 1 15.5523 1 15V9C1 8.44772 1.44772 8 2 8H5.88889L11.1834 3.66815C11.3971 3.49809 11.7121 3.53357 11.8822 3.74731C11.9596 3.84507 12 3.96726 12 4.09317V19.9068C12 20.183 11.7761 20.4068 11.5 20.4068C11.3741 20.4068 11.2519 20.3665 11.1541 20.2891L5.88889 16ZM20.4142 12L23.9497 15.5355L22.5355 16.9497L19 13.4142L15.4645 16.9497L14.0503 15.5355L17.5858 12L14.0503 8.46447L15.4645 7.05025L19 10.5858L22.5355 7.05025L23.9497 8.46447L20.4142 12Z" />
  </svg>
)

const SIZES = ['sm', 'md', 'lg', 'xl'] as const
type Size = typeof SIZES[number]

export function ButtonGroupSection({ sectionRef }: SectionProps) {
  const [attached, setAttached] = useState(true)
  const [size, setSize] = useState<Size>('md')
  const [alignment, setAlignment] = useState<string[]>(['center'])
  const [formats, setFormats] = useState<string[]>([])

  return (
    <Card ref={sectionRef} data-section="ButtonGroup" stl={{ mt: '$24' }}>
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Card.Title>ButtonGroup</Card.Title>
        <ToggleRow>
          <Toggle
            size="sm"
            variant="outline"
            theme="neutral"
            pressed={attached}
            onPressedChange={setAttached}
          >
            Attached
          </Toggle>
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
        </ToggleRow>
      </Card.Header>

      <Card.Content stl={{ display: 'flex', flexDirection: 'column', gap: '$32' }}>
        {/* ── Variants ─────────────────────────────────── */}
        <div>
          <SectionTitle stl={{ mt: '$0', mb: '$8' }}>Variants</SectionTitle>
          <ColumnRow>
            {(['solid', 'outline', 'subtle', 'ghost'] as const).map(v => (
              <Column key={v}>
                <StateLabel>{v}</StateLabel>
                <ButtonGroup attached={attached} aria-label={`${v} group`}>
                  <Button variant={v} size={size}>One</Button>
                  <Button variant={v} size={size}>Two</Button>
                  <Button variant={v} size={size}>Three</Button>
                </ButtonGroup>
              </Column>
            ))}
          </ColumnRow>
        </div>

        {/* ── Vertical ─────────────────────────────────── */}
        <div>
          <SectionTitle stl={{ mt: '$0', mb: '$8' }}>Vertical</SectionTitle>
          <ButtonRow>
            <ButtonGroup attached={attached} orientation="vertical" aria-label="Vertical outline" stl={{ maxWidth: '$menuMin' }}>
              <Button variant="outline" size={size}>One</Button>
              <Button variant="outline" size={size}>Two</Button>
              <Button variant="outline" size={size}>Three</Button>
            </ButtonGroup>
            <ButtonGroup attached={attached} orientation="vertical" aria-label="Vertical icons">
              <Button variant="outline" square size={size}><PlusIcon /></Button>
              <Button variant="outline" square size={size}><MuteIcon /></Button>
              <Button variant="outline" square size={size}><MinusIcon /></Button>
            </ButtonGroup>
          </ButtonRow>
        </div>

        {/* ── Exclusive toggle ─────────────────────────── */}
        <div>
          <SectionTitle stl={{ mt: '$0', mb: '$8' }}>Exclusive toggle</SectionTitle>
          <ButtonRow stl={{ alignItems: 'center', gap: '$16' }}>
            <ButtonGroup
              attached={attached}
              mode="exclusive"
              value={alignment}
              onValueChange={setAlignment}
              aria-label="Text alignment"
            >
              <Button value="left" variant="outline" size={size}>Left</Button>
              <Button value="center" variant="outline" size={size}>Center</Button>
              <Button value="right" variant="outline" size={size}>Right</Button>
            </ButtonGroup>
            <StateLabel>{JSON.stringify(alignment)}</StateLabel>
          </ButtonRow>
        </div>

        {/* ── Multi-select toggle ──────────────────────── */}
        <div>
          <SectionTitle stl={{ mt: '$0', mb: '$8' }}>Multi-select</SectionTitle>
          <ButtonRow stl={{ alignItems: 'center', gap: '$16' }}>
            <ButtonGroup
              attached={attached}
              mode="toggle"
              value={formats}
              onValueChange={setFormats}
              aria-label="Text formatting"
            >
              <Button value="bold" variant="outline" size={size} stl={{ fontWeight: '$700' }}>B</Button>
              <Button value="italic" variant="outline" size={size} stl={{ fontStyle: 'italic' }}>I</Button>
              <Button value="underline" variant="outline" size={size} stl={{ textDecoration: 'underline' }}>U</Button>
            </ButtonGroup>
            <StateLabel>{JSON.stringify(formats)}</StateLabel>
          </ButtonRow>
        </div>
      </Card.Content>
    </Card>
  )
}
