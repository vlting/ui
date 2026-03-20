import { useState } from 'react'
import { Button, Card, ToggleGroup } from '@vlting/ui'
import { styled, Spinner } from '@vlting/stl-react'

import {
  ButtonRow, DarkStage, GridCell, GridLabel,
  SectionTitle, SPINNER_SIZES,
  type SectionProps,
} from './shared'

const Stage = styled('div', {
  bg: 'transparent', radius: '$3', p: '$24',
}, { name: 'Stage' })

const SPINNER_THEMES = ['primary', 'secondary', 'neutralMax', 'neutralMin'] as const
type SpinnerTheme = typeof SPINNER_THEMES[number]

export function SpinnerSection({ sectionRef }: SectionProps) {
  const [theme, setTheme] = useState<SpinnerTheme>('primary')

  const isNeutralMin = theme === 'neutralMin'
  const Container = isNeutralMin ? DarkStage : Stage
  const textStl = isNeutralMin ? { color: '$backgroundText10' } : undefined

  return (
    <Card ref={sectionRef} data-section="Spinner">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>Spinner</Card.Title>
        <ToggleGroup
          type="exclusive"
          value={[theme]}
          onValueChange={v => v[0] && setTheme(v[0] as SpinnerTheme)}
          aria-label="Spinner theme"
        >
          {SPINNER_THEMES.map(t => (
            <Button key={t} value={t} size="md" variant="outline" theme="neutral">{t}</Button>
          ))}
        </ToggleGroup>
      </Card.Header>
      <Card.Content>
        <Container>
          <SectionTitle stl={{ textTransform: 'none', mt: '$0', mb: '$0', ...textStl }}>{theme}</SectionTitle>
          <ButtonRow stl={{ justifyContent: 'space-evenly', alignItems: 'baseline' }}>
            {SPINNER_SIZES.map((size) => (
              <GridCell key={size}>
                <Spinner theme={theme} size={size} />
                <GridLabel stl={textStl}>{size}</GridLabel>
              </GridCell>
            ))}
          </ButtonRow>
        </Container>
      </Card.Content>
    </Card>
  )
}
