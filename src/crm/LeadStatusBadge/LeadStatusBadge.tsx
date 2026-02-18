import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const LeadStatusBadgeFrame = styled(YStack, {})

export type LeadStatusBadgeProps = GetProps<typeof LeadStatusBadgeFrame>

export const LeadStatusBadge = LeadStatusBadgeFrame
