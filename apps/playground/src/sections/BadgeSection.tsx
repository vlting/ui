import { useState } from 'react'
import { Badge, Button, Card, ToggleGroup } from '@vlting/ui'

import { ButtonRow, SectionTitle, StackY, type SectionProps } from './shared'

const coreThemes = ['primary', 'secondary', 'neutral'] as const
const statusThemes = ['success', 'warning', 'error', 'info'] as const
const flavorThemes = ['tomato', 'amber', 'grass', 'forest', 'aqua', 'indigo', 'plum', 'magenta'] as const

const BADGE_VARIANTS = ['solid', 'subtle', 'outline'] as const
type BadgeVariant = typeof BADGE_VARIANTS[number]

export function BadgeSection({ sectionRef }: SectionProps) {
  const [variant, setVariant] = useState<BadgeVariant>('outline')

  return (
    <Card elevation="flat" flush ref={sectionRef} data-section="Badge" stl={{ mt: '$24' }}>
      <Card.Header stl={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Card.Title>Badge</Card.Title>
        <ToggleGroup
          type="exclusive"
          value={[variant]}
          onValueChange={v => v[0] && setVariant(v[0] as BadgeVariant)}
          aria-label="Variant"
        >
          {BADGE_VARIANTS.map(v => (
            <Button key={v} value={v} size="sm" variant="outline" theme="neutral">{v}</Button>
          ))}
        </ToggleGroup>
      </Card.Header>
      <Card.Content>
        <StackY>
          <SectionTitle stl={{ mt: '$0' }}>Core</SectionTitle>
          <ButtonRow>
            {coreThemes.map(t => <Badge key={t} theme={t} variant={variant}>{t}</Badge>)}
          </ButtonRow>

          <SectionTitle>Status</SectionTitle>
          <ButtonRow>
            {statusThemes.map(t => <Badge key={t} theme={t} variant={variant}>{t}</Badge>)}
          </ButtonRow>

          <SectionTitle>Flavor</SectionTitle>
          <ButtonRow>
            {flavorThemes.map(t => <Badge key={t} theme={t} variant={variant}>{t}</Badge>)}
          </ButtonRow>

          <SectionTitle>Sizes</SectionTitle>
          <ButtonRow stl={{ alignItems: 'center' }}>
            {(['sm', 'md', 'lg'] as const).map(size => (
              <Badge key={size} size={size}>size: {size}</Badge>
            ))}
          </ButtonRow>
        </StackY>
      </Card.Content>
    </Card>
  )
}
