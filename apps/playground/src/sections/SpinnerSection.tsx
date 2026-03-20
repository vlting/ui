import { useState } from 'react'
import { Button, Card, ToggleGroup } from '@vlting/ui'
import { Spinner } from '@vlting/stl-react'

import {
  ButtonRow, DarkStage, GridCell, GridLabel,
  SPINNER_SIZES,
  type SectionProps,
} from './shared'

const SPINNER_THEMES = ['primary', 'secondary', 'neutralMax', 'neutralMin'] as const
type SpinnerTheme = typeof SPINNER_THEMES[number]

export function SpinnerSection({ sectionRef }: SectionProps) {
  const [theme, setTheme] = useState<SpinnerTheme>('primary')

  const isNeutralMin = theme === 'neutralMin'

  const content = (
    <ButtonRow stl={{ justifyContent: 'space-evenly', alignItems: 'baseline' }}>
      {SPINNER_SIZES.map((size) => (
        <GridCell key={size}>
          <Spinner theme={theme} size={size} />
          <GridLabel stl={isNeutralMin ? { color: '$backgroundText10' } : undefined}>{size}</GridLabel>
        </GridCell>
      ))}
    </ButtonRow>
  )

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
        {isNeutralMin ? <DarkStage>{content}</DarkStage> : content}
      </Card.Content>
    </Card>
  )
}
