import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const PurchaseOrderFormFrame = styled(YStack, {})

export type PurchaseOrderFormProps = GetProps<typeof PurchaseOrderFormFrame>

export const PurchaseOrderForm = PurchaseOrderFormFrame
