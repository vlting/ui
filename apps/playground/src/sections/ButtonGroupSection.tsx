import { useState } from 'react'
import { Button, ButtonGroup, Card, Toggle, ToggleGroup } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { ButtonRow, Column, Columns, SectionTitle, THEMES, ToggleRow, type SectionProps } from './shared'

const StateLabel = styled('span', {
  fontSize: '$small', color: '$neutralText4', fontFamily: '$code',
}, { name: 'StateLabel' })

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
type Theme = typeof THEMES[number]

export function ButtonGroupSection({ sectionRef }: SectionProps) {
  const [attached, setAttached] = useState(true)
  const [size, setSize] = useState<Size>('md')
  const [theme, setTheme] = useState<Theme>('neutral')
  const [alignment, setAlignment] = useState<string[]>(['center'])
  const [formats, setFormats] = useState<string[]>([])

  return (
    <Card ref={sectionRef} data-section="ButtonGroup">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>ButtonGroup</Card.Title>
        <ToggleRow>
          <ToggleGroup
            type="exclusive"
            value={[theme]}
            onValueChange={v => v[0] && setTheme(v[0] as Theme)}
            aria-label="ButtonGroup theme"
          >
            {THEMES.map(t => (
              <Button key={t} value={t} size="md" variant="outline" theme="neutral">{t}</Button>
            ))}
          </ToggleGroup>
          <ToggleGroup
            type="exclusive"
            value={[size]}
            onValueChange={v => v[0] && setSize(v[0] as Size)}
            aria-label="ButtonGroup size"
          >
            {SIZES.map(s => (
              <Button key={s} value={s} size="md" variant="outline" theme="neutral">{s}</Button>
            ))}
          </ToggleGroup>
          <Toggle
            size="md"
            variant="outline"
            theme="neutral"
            pressed={attached}
            onPressedChange={setAttached}
          >
            attached
          </Toggle>
        </ToggleRow>
      </Card.Header>

      <Card.Content>
        <Columns>
          {/* ── Vertical ─────────────────────────────────── */}
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Vertical</SectionTitle>
            <ButtonRow>
              <ButtonGroup attached={attached} orientation="vertical" aria-label="Vertical solid">
                <Button variant="solid" theme={theme} square size={size}><PlusIcon /></Button>
                <Button variant="solid" theme={theme} square size={size}><MinusIcon /></Button>
              </ButtonGroup>
              <ButtonGroup attached={attached} orientation="vertical" aria-label="Vertical outline">
                <Button variant="outline" theme={theme} square size={size}><PlusIcon /></Button>
                <Button variant="outline" theme={theme} square size={size}><MuteIcon /></Button>
                <Button variant="outline" theme={theme} square size={size}><MinusIcon /></Button>
              </ButtonGroup>
              <ButtonGroup attached={attached} orientation="vertical" aria-label="Vertical ghost">
                <Button variant="ghost" theme={theme} square size={size}><PlusIcon /></Button>
                <Button variant="ghost" theme={theme} square size={size}><MinusIcon /></Button>
              </ButtonGroup>
            </ButtonRow>
          </Column>

          {/* ── Exclusive toggle ─────────────────────────── */}
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Exclusive</SectionTitle>
            <ButtonRow stl={{ alignItems: 'center', gap: '$16' }}>
              <ButtonGroup
                attached={attached}
                mode="exclusive"
                value={alignment}
                onValueChange={setAlignment}
                aria-label="Text alignment"
              >
                <Button value="left" variant="outline" theme={theme} size={size}>Left</Button>
                <Button value="center" variant="outline" theme={theme} size={size}>Center</Button>
                <Button value="right" variant="outline" theme={theme} size={size}>Right</Button>
              </ButtonGroup>
              <StateLabel>{JSON.stringify(alignment)}</StateLabel>
            </ButtonRow>
          </Column>

          {/* ── Multi-select toggle ──────────────────────── */}
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Multi-select</SectionTitle>
            <ButtonRow stl={{ alignItems: 'center', gap: '$16' }}>
              <ButtonGroup
                attached={attached}
                mode="toggle"
                value={formats}
                onValueChange={setFormats}
                aria-label="Text formatting"
              >
                <Button value="bold" variant="outline" theme={theme} size={size} square stl={{ fontWeight: '$700' }}>B</Button>
                <Button value="italic" variant="outline" theme={theme} size={size} square stl={{ fontStyle: 'italic' }}>I</Button>
                <Button value="underline" variant="outline" theme={theme} size={size} square stl={{ textDecoration: 'underline' }}>U</Button>
              </ButtonGroup>
              <StateLabel>{JSON.stringify(formats)}</StateLabel>
            </ButtonRow>
          </Column>
        </Columns>
      </Card.Content>
    </Card>
  )
}
