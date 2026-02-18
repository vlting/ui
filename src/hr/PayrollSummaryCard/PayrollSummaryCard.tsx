import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const PayrollSummaryCardFrame = styled(YStack, {})

export type PayrollSummaryCardProps = GetProps<typeof PayrollSummaryCardFrame>

export const PayrollSummaryCard = PayrollSummaryCardFrame
