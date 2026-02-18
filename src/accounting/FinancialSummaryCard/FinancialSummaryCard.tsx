import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const FinancialSummaryCardFrame = styled(YStack, {})

export type FinancialSummaryCardProps = GetProps<typeof FinancialSummaryCardFrame>

export const FinancialSummaryCard = FinancialSummaryCardFrame
