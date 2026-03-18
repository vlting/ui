import { useState } from 'react'
import { Badge } from '@vlting/ui'

import { ButtonRow, DemoCard, SectionHeading, SectionTitle, StackY, VariantToggle, type SectionProps } from './shared'

const coreThemes = ['primary', 'secondary', 'neutral'] as const
const statusThemes = ['success', 'warning', 'error', 'info'] as const
const flavorThemes = ['tomato', 'amber', 'grass', 'forest', 'aqua', 'indigo', 'plum', 'magenta'] as const

const BADGE_VARIANTS = ['solid', 'subtle', 'outline'] as const
type BadgeVariant = typeof BADGE_VARIANTS[number]

export function BadgeSection({ sectionRef }: SectionProps) {
  const [variant, setVariant] = useState<BadgeVariant>('outline')

  return (
    <DemoCard stl={{ mt: '$24' }} ref={sectionRef} data-section="Badge">
      <SectionHeading>Badge</SectionHeading>
      <StackY>
        <VariantToggle options={BADGE_VARIANTS} value={variant} onChange={setVariant} />

        <SectionTitle>Core</SectionTitle>
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
    </DemoCard>
  )
}
