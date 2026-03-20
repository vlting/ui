import { useState } from 'react'
import { Button, Card, Slider, Toggle, ToggleGroup } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { Column, Columns, ControlRow, SectionTitle, StackY, type SectionProps } from './shared'

const StatusLabel = styled('span', {
  fontSize: '$small', color: '$neutralText4', fontFamily: '$code',
}, { name: 'StatusLabel' })

const SIZES = ['sm', 'md', 'lg'] as const
type Size = (typeof SIZES)[number]

const THEMES = ['primary', 'secondary', 'neutral'] as const
type SliderTheme = (typeof THEMES)[number]

export function SliderSection({ sectionRef }: SectionProps) {
  const [size, setSize] = useState<Size>('md')
  const [theme, setTheme] = useState<SliderTheme>('primary')
  const [disabled, setDisabled] = useState(false)
  const [value, setValue] = useState(40)

  return (
    <Card ref={sectionRef} data-section="Slider">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>Slider</Card.Title>
        <ControlRow>
          <ToggleGroup
            type="exclusive"
            value={[size]}
            onValueChange={v => v[0] && setSize(v[0] as Size)}
            aria-label="Slider size"
          >
            {SIZES.map(s => (
              <Button key={s} value={s} size="md" variant="outline" theme="neutral">{s}</Button>
            ))}
          </ToggleGroup>
          <ToggleGroup
            type="exclusive"
            value={[theme]}
            onValueChange={v => v[0] && setTheme(v[0] as SliderTheme)}
            aria-label="Slider theme"
          >
            {THEMES.map(t => (
              <Button key={t} value={t} size="md" variant="outline" theme="neutral">{t}</Button>
            ))}
          </ToggleGroup>
          <Toggle size="md" variant="outline" theme="neutral" pressed={disabled} onPressedChange={setDisabled}>disabled</Toggle>
        </ControlRow>
      </Card.Header>
      <Card.Content>
        <Columns>
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Controlled</SectionTitle>
            <StackY>
              <Slider
                size={size}
                theme={theme}
                disabled={disabled}
                value={value}
                onValueChange={setValue}
                aria-label="Controlled slider"
              />
              <StatusLabel>{value}</StatusLabel>
            </StackY>
          </Column>
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>Step: 10</SectionTitle>
            <Slider
              size={size}
              theme={theme}
              disabled={disabled}
              defaultValue={50}
              step={10}
              aria-label="Stepped slider"
            />
          </Column>
          <Column>
            <SectionTitle stl={{ mt: '$0' }}>All sizes</SectionTitle>
            <StackY>
              {SIZES.map(s => (
                <Slider key={s} size={s} theme={theme} disabled={disabled} defaultValue={60} aria-label={`Size ${s}`} />
              ))}
            </StackY>
          </Column>
        </Columns>
      </Card.Content>
    </Card>
  )
}
