import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const MatchCardFrame = styled(YStack, {})

const MatchCardPhoto = styled(YStack, {})

const MatchCardName = styled(YStack, {})

const MatchCardAge = styled(YStack, {})

const MatchCardBio = styled(YStack, {})

export const MatchCard = withStaticProperties(MatchCardFrame, {
  Photo: MatchCardPhoto,
  Name: MatchCardName,
  Age: MatchCardAge,
  Bio: MatchCardBio,
})

export type MatchCardProps = GetProps<typeof MatchCardFrame>
