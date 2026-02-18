import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const SuperLikeIndicatorFrame = styled(YStack, {})

export type SuperLikeIndicatorProps = GetProps<typeof SuperLikeIndicatorFrame>

export const SuperLikeIndicator = SuperLikeIndicatorFrame
