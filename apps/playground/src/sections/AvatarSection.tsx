import { Avatar, Card } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { ButtonRow, SectionTitle, type SectionProps } from './shared'

const SizeLabel = styled('span', {
  fontSize: '$12',
  color: '$neutralText4',
  fontWeight: '$400',
}, { name: 'SizeLabel' })

const AvatarWithLabel = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$4',
}, { name: 'AvatarWithLabel' })

export function AvatarSection({ sectionRef }: SectionProps) {
  return (
    <Card ref={sectionRef} data-section="Avatar" stl={{ mt: '$24' }}>
      <Card.Header>
        <Card.Title>Avatar</Card.Title>
      </Card.Header>
      <Card.Content>
        <SectionTitle stl={{ mt: '$0', mb: '$8' }}>Sizes</SectionTitle>
        <ButtonRow stl={{ alignItems: 'end' }}>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
            <AvatarWithLabel key={size}>
              <Avatar size={size} fallback="JD" />
              <SizeLabel>{size}</SizeLabel>
            </AvatarWithLabel>
          ))}
        </ButtonRow>
      </Card.Content>
    </Card>
  )
}
