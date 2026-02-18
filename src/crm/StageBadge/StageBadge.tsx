import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const StageBadgeFrame = styled(YStack, {})

export type StageBadgeProps = GetProps<typeof StageBadgeFrame>

export const StageBadge = StageBadgeFrame
