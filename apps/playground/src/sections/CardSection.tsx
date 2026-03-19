import { useState } from 'react'
import { Button, Card as UiCard, Toggle, ToggleGroup } from '@vlting/ui'

import { CardText, ControlRow, StackY, type SectionProps } from './shared'

const CARD_ELEVATIONS = ['flat', 'normal', 'raised'] as const
const CARD_THEMES = ['neutral', 'primary', 'secondary'] as const

export function CardSection({ sectionRef }: SectionProps) {
  const [elevation, setElevation] = useState<typeof CARD_ELEVATIONS[number]>('normal')
  const [interactive, setInteractive] = useState(false)
  const [flush, setFlush] = useState(false)

  return (
    <UiCard ref={sectionRef} data-section="Card">
      <UiCard.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <UiCard.Title>Card</UiCard.Title>
        <ControlRow>
          <ToggleGroup
            type="exclusive"
            value={[elevation]}
            onValueChange={v => v[0] && setElevation(v[0] as typeof elevation)}
            aria-label="Elevation"
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
        <StackY>
          {CARD_THEMES.map((theme) => (
            <UiCard key={theme} theme={theme} elevation={elevation} interactive={interactive || undefined} flush={flush || undefined}>
              <UiCard.Header stl={flush ? { bg: '$neutralAlpha2' } : undefined}>
                <UiCard.Title>{theme.charAt(0).toUpperCase() + theme.slice(1)}</UiCard.Title>
                <UiCard.Description>{elevation} elevation{interactive ? ' · interactive' : ''}{flush ? ' · flush' : ''}</UiCard.Description>
              </UiCard.Header>
              <UiCard.Content>
                <CardText>Card content here.</CardText>
              </UiCard.Content>
            </UiCard>
          ))}
        </StackY>
      </UiCard.Content>
    </UiCard>
  )
}
