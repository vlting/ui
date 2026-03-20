import { useState } from 'react'
import { Button, Card as UiCard, Toggle, ToggleGroup } from '@vlting/ui'

import { CardText, ControlRow, type SectionProps } from './shared'

const CARD_ELEVATIONS = ['flat', 'normal', 'raised'] as const
const CARD_THEMES = ['neutral', 'primary', 'secondary'] as const
type CardTheme = typeof CARD_THEMES[number]

export function CardSection({ sectionRef }: SectionProps) {
  const [elevation, setElevation] = useState<typeof CARD_ELEVATIONS[number]>('normal')
  const [theme, setTheme] = useState<CardTheme>('neutral')
  const [interactive, setInteractive] = useState(false)
  const [flush, setFlush] = useState(false)

  return (
    <div ref={sectionRef} data-section="Card">
      <UiCard
        theme={theme}
        elevation={elevation}
        interactive={interactive || undefined}
        flush={flush || undefined}
      >
        <UiCard.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
          <UiCard.Title>Card</UiCard.Title>
          <ControlRow>
            <ToggleGroup
              type="exclusive"
              value={[theme]}
              onValueChange={v => v[0] && setTheme(v[0] as CardTheme)}
              aria-label="Card theme"
            >
              {CARD_THEMES.map(t => (
                <Button key={t} value={t} size="md" variant="outline" theme="neutral">{t}</Button>
              ))}
            </ToggleGroup>
            <ToggleGroup
              type="exclusive"
              value={[elevation]}
              onValueChange={v => v[0] && setElevation(v[0] as typeof elevation)}
              aria-label="Card elevation"
            >
              {CARD_ELEVATIONS.map(e => (
                <Button key={e} value={e} size="md" variant="outline" theme="neutral">{e}</Button>
              ))}
            </ToggleGroup>
            <Toggle size="md" variant="outline" theme="neutral" pressed={interactive} onPressedChange={setInteractive}>
              interactive
            </Toggle>
            <Toggle size="md" variant="outline" theme="neutral" pressed={flush} onPressedChange={setFlush}>
              flush
            </Toggle>
          </ControlRow>
        </UiCard.Header>
        <UiCard.Content>
          <CardText>
            This card is the demo itself. Use the controls above to change its theme, elevation, and behavior.
            The card surface, border, and shadow all respond to the selected options.
          </CardText>
        </UiCard.Content>
      </UiCard>
    </div>
  )
}
