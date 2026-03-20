import { useState } from 'react'
import { Toggle, ToggleGroup, Button, Card } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { ButtonRow, Column, Columns, SectionTitle, SIZES, THEMES, ToggleRow, type SectionProps } from './shared'

const StatusLabel = styled('span', {
  fontSize: '$small', color: '$neutralText4', fontFamily: '$code',
}, { name: 'StatusLabel' })

// ─── Icons ──────────────────────────────────────────────────────────────────

const ListIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z" />
  </svg>
)

const GridIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3H11V11H3V3ZM13 3H21V11H13V3ZM3 13H11V21H3V13ZM13 13H21V21H13V13Z" />
  </svg>
)

const GalleryIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 3H2V21H22V3ZM4 5H20V15L16 11L13 14L9 10L4 15V5Z" />
  </svg>
)

const WifiIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 18L3.27 9.27C6.34 6.2 10.09 4.5 12 4.5C13.91 4.5 17.66 6.2 20.73 9.27L12 18Z" />
  </svg>
)

const BluetoothIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L18 7L14.41 10.59L18 14.17L13 19.17V13.41L9.41 17L8 15.59L12.59 11L8 6.41L9.41 5L13 8.59V2Z" />
  </svg>
)

const AirplaneIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" />
  </svg>
)

const StarIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L15.09 7.26L22 8.27L17 13.14L18.18 20.02L12 16.77L5.82 20.02L7 13.14L2 8.27L8.91 7.26L12 1Z" />
  </svg>
)

const MusicIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17C6 19.21 7.79 21 10 21C12.21 21 14 19.21 14 17V7H18V3H12Z" />
  </svg>
)

const CheckIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.55 18L3.85 12.3L5.275 10.875L9.55 15.15L18.725 5.975L20.15 7.4L9.55 18Z" />
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
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>Toggle</Card.Title>
        <ToggleRow>
          <ToggleGroup
            type="exclusive"
            value={[theme]}
            onValueChange={v => v[0] && setTheme(v[0] as Theme)}
            aria-label="Toggle theme"
          >
            {THEMES.map(t => (
              <Button key={t} value={t} size="md" variant="outline" theme="neutral">{t}</Button>
            ))}
          </ToggleGroup>
          <ToggleGroup
            type="exclusive"
            value={[size]}
            onValueChange={v => v[0] && setSize(v[0] as Size)}
            aria-label="Toggle size"
          >
            {SIZES.map(s => (
              <Button key={s} value={s} size="md" variant="outline" theme="neutral">{s}</Button>
            ))}
          </ToggleGroup>
        </ToggleRow>
      </Card.Header>

      <Card.Content>
        <Columns>
          {/* ── Single toggles ───────────────────────────── */}
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Single</SectionTitle>
            <ButtonRow>
              <Toggle theme={theme} variant="outline" size={size}>Favorite</Toggle>
              <Toggle theme={theme} variant="subtle" size={size}>Music</Toggle>
              <Toggle theme={theme} variant="ghost" size={size} defaultPressed>Active</Toggle>
            </ButtonRow>
            <ButtonRow>
              <Toggle theme={theme} variant="outline" size={size} square><StarIcon /></Toggle>
              <Toggle theme={theme} variant="subtle" size={size} square><MusicIcon /></Toggle>
              <Toggle theme={theme} variant="ghost" size={size} square defaultPressed><CheckIcon /></Toggle>
            </ButtonRow>
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
          </Column>

          {/* ── Exclusive Group ──────────────────────────── */}
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Exclusive Group</SectionTitle>
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
            <StatusLabel>{JSON.stringify(view)}</StatusLabel>
          </Column>

          {/* ── Multi-Select ─────────────────────────────── */}
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Multi-Select</SectionTitle>
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
            <StatusLabel>{JSON.stringify(features)}</StatusLabel>
          </Column>
        </Columns>
      </Card.Content>
    </Card>
  )
}
