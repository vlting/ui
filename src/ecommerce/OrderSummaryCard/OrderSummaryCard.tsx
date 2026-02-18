import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const OrderSummaryCardFrame = styled(YStack, {})

const OrderSummaryCardItems = styled(YStack, {})

const OrderSummaryCardSubtotal = styled(YStack, {})

const OrderSummaryCardTotal = styled(YStack, {})

export const OrderSummaryCard = withStaticProperties(OrderSummaryCardFrame, {
  Items: OrderSummaryCardItems,
  Subtotal: OrderSummaryCardSubtotal,
  Total: OrderSummaryCardTotal,
})

export type OrderSummaryCardProps = GetProps<typeof OrderSummaryCardFrame>
