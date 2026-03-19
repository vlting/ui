import { useState } from 'react'
import { Toggle, ToggleGroup, Button, Card } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { ButtonRow, SectionTitle, THEMES, type SectionProps } from './shared'

const StatusLabel = styled('span', {
  fontSize: '$small', color: '$neutralText4', fontFamily: '$code',
}, { name: 'StatusLabel' })

const ColumnRow = styled('div', {
  display: 'flex', gap: '$24', overflowX: 'auto', flexWrap: 'wrap',
}, { name: 'ColumnRow' })

const Column = styled('div', {
  display: 'flex', flexDirection: 'column', gap: '$12', flex: '1', minWidth: '200px',
}, { name: 'Column' })

const ToggleRow = styled('div', {
  display: 'flex', gap: '$8', alignItems: 'center',
}, { name: 'ToggleRow' })

const SIZES = ['xs', 'sm', 'md', 'lg'] as const
type Size = typeof SIZES[number]
type Theme = typeof THEMES[number]

export function ToggleSection({ sectionRef }: SectionProps) {
  const [theme, setTheme] = useState<Theme>('neutral')
  const [size, setSize] = useState<Size>('md')
  const [bold, setBold] = useState(false)
  const [view, setView] = useState<string[]>(['grid'])
  const [features, setFeatures] = useState<string[]>([])

  return (
    <Card elevation="flat" flush ref={sectionRef} data-section="Toggle" stl={{ mt: '$24' }}>
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Card.Title>Toggle</Card.Title>
        <ToggleRow>
          <ToggleGroup
            type="exclusive"
            value={[theme]}
            onValueChange={v => v[0] && setTheme(v[0] as Theme)}
            aria-label="Theme"
          >
            {THEMES.map(t => (
              <Button key={t} value={t} size="sm" variant="outline" theme="neutral">{t}</Button>
            ))}
          </ToggleGroup>
          <ToggleGroup
            type="exclusive"
            value={[size]}
            onValueChange={v => v[0] && setSize(v[0] as Size)}
            aria-label="Size"
          >
            {SIZES.map(s => (
              <Button key={s} value={s} size="sm" variant="outline" theme="neutral">{s}</Button>
            ))}
          </ToggleGroup>
        </ToggleRow>
      </Card.Header>

      <Card.Content stl={{ display: 'flex', flexDirection: 'column', gap: '$32' }}>
        {/* ── Single toggles ───────────────────────────── */}
        <div>
          <SectionTitle stl={{ mt: '$0', mb: '$8' }}>Single toggle</SectionTitle>
          <ButtonRow>
            <Toggle theme={theme} variant="outline" size={size}>Favorite</Toggle>
            <Toggle theme={theme} variant="subtle" size={size}>Music</Toggle>
            <Toggle theme={theme} variant="ghost" size={size} defaultPressed>Active</Toggle>
          </ButtonRow>
        </div>

        {/* ── Controlled ───────────────────────────────── */}
        <div>
          <SectionTitle stl={{ mt: '$0', mb: '$8' }}>Controlled</SectionTitle>
          <ButtonRow stl={{ alignItems: 'center', gap: '$16' }}>
            <Toggle
              variant="outline"
              theme={theme}
              size={size}
              pressed={bold}
              onPressedChange={setBold}
              stl={{ fontWeight: '$700' }}
            >
              B
            </Toggle>
            <StatusLabel>{bold ? 'ON' : 'OFF'}</StatusLabel>
          </ButtonRow>
        </div>

        {/* ── Exclusive group ──────────────────────────── */}
        <div>
          <SectionTitle stl={{ mt: '$0', mb: '$8' }}>Exclusive group</SectionTitle>
          <ButtonRow stl={{ alignItems: 'center', gap: '$16' }}>
            <ToggleGroup
              type="exclusive"
              value={view}
              onValueChange={setView}
              aria-label="View mode"
            >
              <Button value="list" variant="outline" theme={theme} size={size}>List</Button>
              <Button value="grid" variant="outline" theme={theme} size={size}>Grid</Button>
              <Button value="gallery" variant="outline" theme={theme} size={size}>Gallery</Button>
            </ToggleGroup>
            <StatusLabel>{JSON.stringify(view)}</StatusLabel>
          </ButtonRow>
        </div>

        {/* ── Multi-select group ───────────────────────── */}
        <div>
          <SectionTitle stl={{ mt: '$0', mb: '$8' }}>Multi-select</SectionTitle>
          <ButtonRow stl={{ alignItems: 'center', gap: '$16' }}>
            <ToggleGroup
              type="toggle"
              value={features}
              onValueChange={setFeatures}
              aria-label="Features"
            >
              <Button value="wifi" variant="outline" theme={theme} size={size}>WiFi</Button>
              <Button value="bluetooth" variant="outline" theme={theme} size={size}>Bluetooth</Button>
              <Button value="airplane" variant="outline" theme={theme} size={size}>Airplane</Button>
            </ToggleGroup>
            <StatusLabel>{JSON.stringify(features)}</StatusLabel>
          </ButtonRow>
        </div>

        {/* ── All themes ───────────────────────────────── */}
        <div>
          <SectionTitle stl={{ mt: '$0', mb: '$8' }}>Themes</SectionTitle>
          <ColumnRow>
            {THEMES.map(t => (
              <Column key={t}>
                <StatusLabel>{t}</StatusLabel>
                <ToggleGroup type="exclusive" defaultValue={['b']} aria-label={`${t} group`}>
                  <Button value="a" variant="outline" theme={t} size={size}>A</Button>
                  <Button value="b" variant="outline" theme={t} size={size}>B</Button>
                  <Button value="c" variant="outline" theme={t} size={size}>C</Button>
                </ToggleGroup>
              </Column>
            ))}
          </ColumnRow>
        </div>
      </Card.Content>
    </Card>
  )
}
