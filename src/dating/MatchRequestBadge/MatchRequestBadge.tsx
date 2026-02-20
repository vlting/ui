import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const MatchRequestBadgeFrame = styled(YStack, {})

export type MatchRequestBadgeProps = GetProps<typeof MatchRequestBadgeFrame>

export const MatchRequestBadge = MatchRequestBadgeFrame
