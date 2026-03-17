import { Badge } from '@vlting/ui'

import { ButtonRow, DemoCard, SectionHeading, SectionTitle, StackY, type SectionProps } from './shared'

const coreThemes = ['primary', 'secondary', 'neutral'] as const
const statusThemes = ['success', 'warning', 'error', 'info'] as const
const flavorThemes = ['tomato', 'amber', 'grass', 'forest', 'aqua', 'indigo', 'plum', 'magenta'] as const

export function BadgeSection({ sectionRef }: SectionProps) {
  return (
    <DemoCard stl={{ mt: '$24' }} ref={sectionRef} data-section="Badge">
      <SectionHeading>Badge</SectionHeading>
      <StackY>
        <SectionTitle>Solid</SectionTitle>
        <ButtonRow>
          {coreThemes.map(t => <Badge key={t} theme={t} variant="solid">{t}</Badge>)}
        </ButtonRow>
        <ButtonRow>
          {statusThemes.map(t => <Badge key={t} theme={t} variant="solid">{t}</Badge>)}
        </ButtonRow>
        <ButtonRow>
          {flavorThemes.map(t => <Badge key={t} theme={t} variant="solid">{t}</Badge>)}
        </ButtonRow>

        <SectionTitle>Subtle</SectionTitle>
        <ButtonRow>
          {coreThemes.map(t => <Badge key={t} theme={t} variant="subtle">{t}</Badge>)}
        </ButtonRow>
        <ButtonRow>
          {statusThemes.map(t => <Badge key={t} theme={t} variant="subtle">{t}</Badge>)}
        </ButtonRow>
        <ButtonRow>
          {flavorThemes.map(t => <Badge key={t} theme={t} variant="subtle">{t}</Badge>)}
        </ButtonRow>

        <SectionTitle>Outline</SectionTitle>
        <ButtonRow>
          {coreThemes.map(t => <Badge key={t} theme={t} variant="outline">{t}</Badge>)}
        </ButtonRow>
        <ButtonRow>
          {statusThemes.map(t => <Badge key={t} theme={t} variant="outline">{t}</Badge>)}
        </ButtonRow>
        <ButtonRow>
          {flavorThemes.map(t => <Badge key={t} theme={t} variant="outline">{t}</Badge>)}
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
