import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const RuleSummaryCardFrame = styled(YStack, {})

export type RuleSummaryCardProps = GetProps<typeof RuleSummaryCardFrame>

export const RuleSummaryCard = RuleSummaryCardFrame
