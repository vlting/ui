import { useState } from 'react'
import { Button, Card as UiCard } from '@vlting/ui'

import { ButtonRow, DemoCard, SectionHeading, StackY, type SectionProps } from './shared'

const CARD_ELEVATIONS = ['flat', 'normal', 'raised'] as const
const CARD_THEMES = ['neutral', 'primary', 'secondary'] as const

export function CardSection({ sectionRef }: SectionProps) {
  const [elevation, setElevation] = useState<typeof CARD_ELEVATIONS[number]>('normal')
  const [interactive, setInteractive] = useState(false)

  return (
    <DemoCard surface="dark" stl={{ mt: '$24' }} ref={sectionRef} data-section="Card">
      <SectionHeading>Card</SectionHeading>
      <ButtonRow stl={{ mb: '$16' }}>
        {CARD_ELEVATIONS.map((e) => (
          <Button
            key={e}
            size="xs"
            theme="neutral"
            variant={elevation === e ? 'subtle' : 'ghost'}
            onClick={() => setElevation(e)}
            aria-pressed={elevation === e}
          >
            {e}
          </Button>
        ))}
        <Button
          size="xs"
          theme="neutral"
          variant={interactive ? 'subtle' : 'ghost'}
          onClick={() => setInteractive((i) => !i)}
          aria-pressed={interactive}
        >
          interactive
        </Button>
      </ButtonRow>
      <StackY>
        {CARD_THEMES.map((theme) => (
          <UiCard key={theme} theme={theme} elevation={elevation} interactive={interactive || undefined}>
            <UiCard.Header>
              <UiCard.Title>{theme.charAt(0).toUpperCase() + theme.slice(1)}</UiCard.Title>
              <UiCard.Description>{elevation} elevation{interactive ? ' · interactive' : ''}</UiCard.Description>
            </UiCard.Header>
            <UiCard.Content>
              <p style={{ margin: 0 }}>Card content here.</p>
            </UiCard.Content>
          </UiCard>
        ))}
      </StackY>
    </DemoCard>
  )
}
