import { Avatar, Badge, Button, Card, HoverCard, Text } from '@vlting/ui'
import { styled } from '@vlting/stl-react'

import { ButtonRow, SectionTitle, StackY, type SectionProps } from './shared'

const ProfileCard = styled('div', {
  display: 'flex', flexDirection: 'column', gap: '$12',
}, { name: 'ProfileCard' })

const ProfileHeader = styled('div', {
  display: 'flex', gap: '$12', alignItems: 'center',
}, { name: 'ProfileHeader' })

const ProfileName = styled('span', {
  fontSize: '$p', fontWeight: '$600', color: '$neutralText3',
}, { name: 'ProfileName' })

const ProfileHandle = styled('span', {
  fontSize: '$small', color: '$neutralText4',
}, { name: 'ProfileHandle' })

const LinkText = styled('a', {
  color: '$primaryText3',
  textDecoration: 'underline',
  cursor: 'pointer',
  fontSize: '$p',
}, { name: 'LinkText' })

export function HoverCardSection({ sectionRef }: SectionProps) {
  return (
    <Card ref={sectionRef} data-section="HoverCard">
      <Card.Header>
        <Card.Title>HoverCard</Card.Title>
      </Card.Header>
      <Card.Content>
        <StackY>
          <SectionTitle stl={{ mt: '$0' }}>User profile preview</SectionTitle>
          <ButtonRow>
            <HoverCard.Root>
              <HoverCard.Trigger>
                <LinkText href="#">@saralee</LinkText>
              </HoverCard.Trigger>
              <HoverCard.Content>
                <ProfileCard>
                  <ProfileHeader>
                    <Avatar size="md" fallback="SL" />
                    <div>
                      <ProfileName>Sara Lee</ProfileName>
                      <ProfileHandle>@saralee</ProfileHandle>
                    </div>
                  </ProfileHeader>
                  <Text size="sm">Senior engineer working on design systems and component libraries. Loves TypeScript and accessibility.</Text>
                  <ButtonRow>
                    <Badge theme="iris" variant="subtle" size="sm">12 repos</Badge>
                    <Badge theme="grass" variant="subtle" size="sm">48 PRs</Badge>
                  </ButtonRow>
                </ProfileCard>
              </HoverCard.Content>
            </HoverCard.Root>

            <HoverCard.Root>
              <HoverCard.Trigger>
                <LinkText href="#">@marcorivera</LinkText>
              </HoverCard.Trigger>
              <HoverCard.Content>
                <ProfileCard>
                  <ProfileHeader>
                    <Avatar size="md" fallback="MR" />
                    <div>
                      <ProfileName>Marco Rivera</ProfileName>
                      <ProfileHandle>@marcorivera</ProfileHandle>
                    </div>
                  </ProfileHeader>
                  <Text size="sm">Full-stack developer focused on performance and developer experience. Building tools that scale.</Text>
                  <ButtonRow>
                    <Badge theme="iris" variant="subtle" size="sm">8 repos</Badge>
                    <Badge theme="grass" variant="subtle" size="sm">31 PRs</Badge>
                  </ButtonRow>
                </ProfileCard>
              </HoverCard.Content>
            </HoverCard.Root>
          </ButtonRow>

          <SectionTitle stl={{ mt: '$24' }}>On avatar</SectionTitle>
          <HoverCard.Root placement="right">
            <HoverCard.Trigger>
              <Button theme="neutral" variant="ghost" stl={{ p: '$0' }}>
                <Avatar size="lg" fallback="AC" />
              </Button>
            </HoverCard.Trigger>
            <HoverCard.Content>
              <ProfileCard>
                <ProfileName>Alice Chen</ProfileName>
                <Text size="sm">Product designer with a passion for clean interfaces and thoughtful interactions.</Text>
                <Badge theme="amber" variant="subtle" size="sm">Design lead</Badge>
              </ProfileCard>
            </HoverCard.Content>
          </HoverCard.Root>
        </StackY>
      </Card.Content>
    </Card>
  )
}
