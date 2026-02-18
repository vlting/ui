import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const ProfilePreviewCardFrame = styled(YStack, {})

const ProfilePreviewCardPhoto = styled(YStack, {})

const ProfilePreviewCardName = styled(YStack, {})

const ProfilePreviewCardBio = styled(YStack, {})

const ProfilePreviewCardInterests = styled(YStack, {})

export const ProfilePreviewCard = withStaticProperties(ProfilePreviewCardFrame, {
  Photo: ProfilePreviewCardPhoto,
  Name: ProfilePreviewCardName,
  Bio: ProfilePreviewCardBio,
  Interests: ProfilePreviewCardInterests,
})

export type ProfilePreviewCardProps = GetProps<typeof ProfilePreviewCardFrame>
