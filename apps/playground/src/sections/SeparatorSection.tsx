import { Separator } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { DemoCard, SectionHeading, SectionTitle, StackY, type SectionProps } from './shared'

const InlineRow = styled('div', {
  display: 'flex', alignItems: 'center', gap: '$16', height: '$44',
}, { name: 'InlineRow' })

export function SeparatorSection({ sectionRef }: SectionProps) {
  return (
    <DemoCard stl={{ mt: '$24' }} ref={sectionRef} data-section="Separator">
      <SectionHeading>Separator</SectionHeading>
      <StackY>
        <SectionTitle>Horizontal</SectionTitle>
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
    </DemoCard>
  )
}
