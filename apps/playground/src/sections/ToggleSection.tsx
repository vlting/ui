import { useState } from 'react'
import { Toggle, ToggleGroup, Button, Card } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { ButtonRow, SectionTitle, SIZES, THEMES, type SectionProps } from './shared'

const StatusLabel = styled('span', {
  fontSize: '$small', color: '$neutralText4', fontFamily: '$code',
}, { name: 'StatusLabel' })

const ToggleRow = styled('div', {
  display: 'flex', gap: '$8', alignItems: 'center',
}, { name: 'ToggleRow' })

// ─── Icons ──────────────────────────────────────────────────────────────────

const ListIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z" />
  </svg>
)

const GridIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3H11V11H3V3ZM13 3H21V11H13V3ZM3 13H11V21H3V13ZM13 13H21V21H13V13Z" />
  </svg>
)

const GalleryIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 3H2V21H22V3ZM4 5H20V15L16 11L13 14L9 10L4 15V5Z" />
  </svg>
)

const WifiIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 18L3.27 9.27C6.34 6.2 10.09 4.5 12 4.5C13.91 4.5 17.66 6.2 20.73 9.27L12 18Z" />
  </svg>
)

const BluetoothIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L18 7L14.41 10.59L18 14.17L13 19.17V13.41L9.41 17L8 15.59L12.59 11L8 6.41L9.41 5L13 8.59V2Z" />
  </svg>
)

const AirplaneIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" />
  </svg>
)

type Size = typeof SIZES[number]
type Theme = typeof THEMES[number]

export function ToggleSection({ sectionRef }: SectionProps) {
  const [theme, setTheme] = useState<Theme>('neutral')
  const [size, setSize] = useState<Size>('md')
  const [bold, setBold] = useState(false)
  const [view, setView] = useState<string[]>(['grid'])
  const [features, setFeatures] = useState<string[]>([])

  return (
    <Card ref={sectionRef} data-section="Toggle">
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
              <Button key={t} value={t} size="md" variant="outline" theme="neutral">{t}</Button>
            ))}
          </ToggleGroup>
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
        {/* ── Single toggles ───────────────────────────── */}
        <div>
          <SectionTitle stl={{ mt: '$0', mb: '$8' }}>Single toggle</SectionTitle>
          <ButtonRow>
            <Toggle theme={theme} variant="outline" size={size}>Favorite</Toggle>
            <Toggle theme={theme} variant="subtle" size={size}>Music</Toggle>
            <Toggle theme={theme} variant="ghost" size={size} defaultPressed>Active</Toggle>
            <Toggle theme={theme} variant="outline" size={size} square>★</Toggle>
            <Toggle theme={theme} variant="subtle" size={size} square>♫</Toggle>
            <Toggle theme={theme} variant="ghost" size={size} square defaultPressed>✓</Toggle>
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

        {/* ── Exclusive Group ──────────────────────────── */}
        <div>
          <SectionTitle stl={{ mt: '$0', mb: '$8' }}>Exclusive Group</SectionTitle>
          <ButtonRow stl={{ alignItems: 'center', gap: '$16' }}>
            <ToggleRow stl={{ gap: '$24', alignItems: 'start' }}>
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
              <ToggleGroup
                type="exclusive"
                value={view}
                onValueChange={setView}
                orientation="vertical"
                aria-label="View mode vertical"
              >
                <Button value="list" variant="outline" theme={theme} size={size} square><ListIcon /></Button>
                <Button value="grid" variant="outline" theme={theme} size={size} square><GridIcon /></Button>
                <Button value="gallery" variant="outline" theme={theme} size={size} square><GalleryIcon /></Button>
              </ToggleGroup>
            </ToggleRow>
            <StatusLabel>{JSON.stringify(view)}</StatusLabel>
          </ButtonRow>
        </div>

        {/* ── Multi-Select ─────────────────────────────── */}
        <div>
          <SectionTitle stl={{ mt: '$0', mb: '$8' }}>Multi-Select</SectionTitle>
          <ButtonRow stl={{ alignItems: 'center', gap: '$16' }}>
            <ToggleRow stl={{ gap: '$24', alignItems: 'start' }}>
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
              <ToggleGroup
                type="toggle"
                value={features}
                onValueChange={setFeatures}
                orientation="vertical"
                aria-label="Features vertical"
              >
                <Button value="wifi" variant="outline" theme={theme} size={size} square><WifiIcon /></Button>
                <Button value="bluetooth" variant="outline" theme={theme} size={size} square><BluetoothIcon /></Button>
                <Button value="airplane" variant="outline" theme={theme} size={size} square><AirplaneIcon /></Button>
              </ToggleGroup>
            </ToggleRow>
            <StatusLabel>{JSON.stringify(features)}</StatusLabel>
          </ButtonRow>
        </div>
      </Card.Content>
    </Card>
  )
}
