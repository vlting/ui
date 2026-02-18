import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const BillingSummaryFrame = styled(YStack, {})

export type BillingSummaryProps = GetProps<typeof BillingSummaryFrame>

export const BillingSummary = BillingSummaryFrame
