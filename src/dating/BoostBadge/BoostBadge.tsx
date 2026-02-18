import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const BoostBadgeFrame = styled(YStack, {})

export type BoostBadgeProps = GetProps<typeof BoostBadgeFrame>

export const BoostBadge = BoostBadgeFrame
