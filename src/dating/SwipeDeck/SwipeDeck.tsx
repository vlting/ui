import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const SwipeDeckFrame = styled(YStack, {})

export type SwipeDeckProps = GetProps<typeof SwipeDeckFrame>

export const SwipeDeck = SwipeDeckFrame
