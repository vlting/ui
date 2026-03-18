import { useState } from 'react'
import { Button, Card as UiCard } from '@vlting/ui'

import { DemoCard, SectionHeading, StackY, ToggleBar, VariantToggle, type SectionProps } from './shared'

const CARD_ELEVATIONS = ['flat', 'normal', 'raised'] as const
const CARD_THEMES = ['neutral', 'primary', 'secondary'] as const

export function CardSection({ sectionRef }: SectionProps) {
  const [elevation, setElevation] = useState<typeof CARD_ELEVATIONS[number]>('normal')
  const [interactive, setInteractive] = useState(false)

  return (
    <DemoCard surface="dark" stl={{ mt: '$24' }} ref={sectionRef} data-section="Card">
      <SectionHeading>Card</SectionHeading>
      <ToggleBar>
        <VariantToggle options={CARD_ELEVATIONS} value={elevation} onChange={setElevation} />
        <Button
          size="xs"
          theme="neutral"
          variant={interactive ? 'solid' : 'outline'}
          onClick={() => setInteractive((i) => !i)}
          aria-pressed={interactive}
        >
          interactive
        </Button>
      </ToggleBar>
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
