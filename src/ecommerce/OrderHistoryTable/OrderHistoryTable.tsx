import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const OrderHistoryTableFrame = styled(YStack, {})

export type OrderHistoryTableProps = GetProps<typeof OrderHistoryTableFrame>

export const OrderHistoryTable = OrderHistoryTableFrame
