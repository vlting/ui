import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const SwipeCardFrame = styled(YStack, {})

const SwipeCardPhoto = styled(YStack, {})

const SwipeCardInfo = styled(YStack, {})

const SwipeCardActions = styled(YStack, {})

export const SwipeCard = withStaticProperties(SwipeCardFrame, {
  Photo: SwipeCardPhoto,
  Info: SwipeCardInfo,
  Actions: SwipeCardActions,
})

export type SwipeCardProps = GetProps<typeof SwipeCardFrame>
