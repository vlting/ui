import { Card, Separator } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { SectionTitle, StackY, type SectionProps } from './shared'

const InlineRow = styled('div', {
  display: 'flex', alignItems: 'center', gap: '$16', height: '$44',
}, { name: 'InlineRow' })

export function SeparatorSection({ sectionRef }: SectionProps) {
  return (
    <Card elevation="flat" flush ref={sectionRef} data-section="Separator" stl={{ mt: '$24' }}>
      <Card.Header>
        <Card.Title>Separator</Card.Title>
      </Card.Header>
      <Card.Content>
        <StackY>
          <SectionTitle stl={{ mt: '$0' }}>Horizontal</SectionTitle>
          <Separator />

          <SectionTitle>Vertical</SectionTitle>
          <InlineRow>
            <span>Left</span>
            <Separator orientation="vertical" />
            <span>Right</span>
          </InlineRow>

          <SectionTitle>Decorative</SectionTitle>
          <Separator decorative />
        </StackY>
      </Card.Content>
    </Card>
  )
}
