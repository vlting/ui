import { useState } from 'react'
import { Button, Card as UiCard, Toggle, ToggleGroup } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { CardText, Columns, Column, ControlRow, SectionTitle, type SectionProps } from './shared'

const CARD_ELEVATIONS = ['flat', 'normal', 'raised'] as const
const CARD_THEMES = ['neutral', 'primary', 'secondary'] as const
type CardTheme = typeof CARD_THEMES[number]

const Footer = styled('div', {
  display: 'flex', gap: '$8', pt: '$12',
}, { name: 'Footer' })

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
        <UiCard.Content stl={{ display: 'flex', flexDirection: 'column', gap: '$16', p: '$24' }}>
          <Columns>
            <Column>
              <SectionTitle stl={{ mt: '$0' }}>Overview</SectionTitle>
              <CardText>
                This card is the demo itself. The surface, border, and shadow respond
                to the controls above. Try switching between themes and elevations to
                see how the card adapts.
              </CardText>
              <CardText>
                Cards group related content and actions into a single contained unit,
                making interfaces easier to scan and interact with.
              </CardText>
            </Column>
            <Column>
              <SectionTitle stl={{ mt: '$0' }}>Details</SectionTitle>
              <CardText>
                Flush mode removes internal padding for edge-to-edge content like
                images or tables. Interactive mode adds hover and press feedback
                for clickable card surfaces.
              </CardText>
              <CardText>
                Elevation controls the visual depth — flat for inline use, normal
                for standard grouping, raised for prominent call-outs.
              </CardText>
            </Column>
          </Columns>
          <Footer>
            <Button size="md" theme={theme === 'neutral' ? 'primary' : theme} variant="solid">Save</Button>
            <Button size="md" theme="neutral" variant="subtle">Cancel</Button>
            <Button size="md" theme="neutral" variant="ghost">Edit</Button>
          </Footer>
        </UiCard.Content>
      </UiCard>
    </div>
  )
}
