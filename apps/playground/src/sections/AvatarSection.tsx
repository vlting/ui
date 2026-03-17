import { Avatar } from '@vlting/ui'

import { ButtonRow, DemoCard, SectionHeading, SectionTitle, type SectionProps } from './shared'

export function AvatarSection({ sectionRef }: SectionProps) {
  return (
    <DemoCard stl={{ mt: '$24' }} ref={sectionRef} data-section="Avatar">
      <SectionHeading>Avatar</SectionHeading>
      <SectionTitle>Sizes</SectionTitle>
      <ButtonRow stl={{ alignItems: 'center' }}>
        {(['sm', 'md', 'lg', 'xl'] as const).map(size => (
          <Avatar key={size} size={size} fallback="JD" />
        ))}
      </ButtonRow>
    </DemoCard>
  )
}
