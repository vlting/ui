import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const PodMemberCardFrame = styled(YStack, {})

const PodMemberCardPhoto = styled(YStack, {})

const PodMemberCardName = styled(YStack, {})

const PodMemberCardBio = styled(YStack, {})

const PodMemberCardMatchButton = styled(YStack, {})

export const PodMemberCard = withStaticProperties(PodMemberCardFrame, {
  Photo: PodMemberCardPhoto,
  Name: PodMemberCardName,
  Bio: PodMemberCardBio,
  MatchButton: PodMemberCardMatchButton,
})

export type PodMemberCardProps = GetProps<typeof PodMemberCardFrame>
