import { useState } from 'react'
import { Badge, Button, Card, ToggleGroup } from '@vlting/ui'

import { ButtonRow, ControlRow, SectionTitle, StackY, type SectionProps } from './shared'

const coreThemes = ['primary', 'secondary', 'neutral'] as const
const statusThemes = ['success', 'warning', 'error', 'info'] as const
const flavorThemes = ['tomato', 'amber', 'grass', 'forest', 'aqua', 'indigo', 'plum', 'magenta'] as const

const BADGE_VARIANTS = ['solid', 'subtle', 'outline'] as const
type BadgeVariant = typeof BADGE_VARIANTS[number]

const BADGE_SIZES = ['sm', 'md', 'lg'] as const
type BadgeSize = typeof BADGE_SIZES[number]

export function BadgeSection({ sectionRef }: SectionProps) {
  const [variant, setVariant] = useState<BadgeVariant>('outline')
  const [size, setSize] = useState<BadgeSize>('md')

  return (
    <Card ref={sectionRef} data-section="Badge">
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '$8' }}>
        <Card.Title>Badge</Card.Title>
        <ControlRow>
          <ToggleGroup
            type="exclusive"
            value={[variant]}
            onValueChange={v => v[0] && setVariant(v[0] as BadgeVariant)}
            aria-label="Badge variant"
          >
            {BADGE_VARIANTS.map(v => (
              <Button key={v} value={v} size="md" variant="outline" theme="neutral">{v}</Button>
            ))}
          </ToggleGroup>
          <ToggleGroup
            type="exclusive"
            value={[size]}
            onValueChange={v => v[0] && setSize(v[0] as BadgeSize)}
            aria-label="Badge size"
          >
            {BADGE_SIZES.map(s => (
              <Button key={s} value={s} size="md" variant="outline" theme="neutral">{s}</Button>
            ))}
          </ToggleGroup>
        </ControlRow>
      </Card.Header>
      <Card.Content>
        <StackY>
          <SectionTitle stl={{ mt: '$0' }}>Core</SectionTitle>
          <ButtonRow>
            {coreThemes.map(t => <Badge key={t} theme={t} variant={variant} size={size}>{t}</Badge>)}
          </ButtonRow>

          <SectionTitle>Status</SectionTitle>
          <ButtonRow>
            {statusThemes.map(t => <Badge key={t} theme={t} variant={variant} size={size}>{t}</Badge>)}
          </ButtonRow>

          <SectionTitle>Flavor</SectionTitle>
          <ButtonRow>
            {flavorThemes.map(t => <Badge key={t} theme={t} variant={variant} size={size}>{t}</Badge>)}
          </ButtonRow>
        </StackY>
      </Card.Content>
    </Card>
  )
}
