import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const CheckoutFormFrame = styled(YStack, {})

export type CheckoutFormProps = GetProps<typeof CheckoutFormFrame>

export const CheckoutForm = CheckoutFormFrame
