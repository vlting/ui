import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const PaymentMethodFormFrame = styled(YStack, {})

export type PaymentMethodFormProps = GetProps<typeof PaymentMethodFormFrame>

export const PaymentMethodForm = PaymentMethodFormFrame
