import { useState } from 'react'
import { Toggle, ToggleGroup, Button } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { ButtonRow, DemoCard, SectionHeading, SectionTitle, THEMES, type SectionProps } from './shared'

const StatusLabel = styled('span', {
  fontSize: '$buttonSmall', color: '$neutralText3',
}, { name: 'StatusLabel' })

const ColumnRow = styled('div', {
  display: 'flex', gap: '$24', overflowX: 'auto', flexWrap: 'wrap',
}, { name: 'ColumnRow' })

const Column = styled('div', {
  display: 'flex', flexDirection: 'column', gap: '$12', flex: '1', minWidth: '200px',
}, { name: 'Column' })

export function ToggleSection({ sectionRef }: SectionProps) {
  const [bold, setBold] = useState(false)
  const [view, setView] = useState<string[]>(['grid'])
  const [features, setFeatures] = useState<string[]>([])

  return (
    <DemoCard stl={{ mt: '$24' }} ref={sectionRef} data-section="Toggle">
      <SectionHeading>Toggle</SectionHeading>

      <ColumnRow>
        <Column>
          <SectionTitle>Single toggle</SectionTitle>
          <ButtonRow>
            <Toggle theme="primary" variant="outline">Favorite</Toggle>
            <Toggle theme="secondary" variant="outline">Music</Toggle>
            <Toggle theme="neutral" variant="outline" defaultPressed>Active</Toggle>
          </ButtonRow>
        </Column>

        <Column>
          <SectionTitle>Controlled</SectionTitle>
          <ButtonRow stl={{ alignItems: 'center' }}>
            <Toggle
              variant="outline"
              theme="neutral"
              pressed={bold}
              onPressedChange={setBold}
              stl={{ fontWeight: '$700' }}
            >
              B
            </Toggle>
            <StatusLabel>{bold ? 'Bold ON' : 'Bold OFF'}</StatusLabel>
          </ButtonRow>
        </Column>
      </ColumnRow>

      <ColumnRow>
        <Column>
          <SectionTitle>Exclusive group</SectionTitle>
          <ToggleGroup
            type="exclusive"
            value={view}
            onValueChange={setView}
            aria-label="View mode"
          >
            <Button value="list" variant="outline" theme="neutral">List</Button>
            <Button value="grid" variant="outline" theme="neutral">Grid</Button>
            <Button value="gallery" variant="outline" theme="neutral">Gallery</Button>
          </ToggleGroup>
        </Column>

        <Column>
          <SectionTitle>Multi-select group</SectionTitle>
          <ToggleGroup
            type="toggle"
            value={features}
            onValueChange={setFeatures}
            aria-label="Features"
          >
            <Button value="wifi" variant="outline" theme="neutral">WiFi</Button>
            <Button value="bluetooth" variant="outline" theme="neutral">Bluetooth</Button>
            <Button value="airplane" variant="outline" theme="neutral">Airplane</Button>
          </ToggleGroup>
        </Column>
      </ColumnRow>

      <SectionTitle>Themes</SectionTitle>
      <ColumnRow>
        {THEMES.map(theme => (
          <Column key={theme}>
            <StatusLabel>{theme}</StatusLabel>
            <ToggleGroup type="exclusive" defaultValue={['b']} aria-label={`${theme} group`}>
              <Button value="a" variant="outline" theme={theme}>A</Button>
              <Button value="b" variant="outline" theme={theme}>B</Button>
              <Button value="c" variant="outline" theme={theme}>C</Button>
            </ToggleGroup>
          </Column>
        ))}
      </ColumnRow>
    </DemoCard>
  )
}
