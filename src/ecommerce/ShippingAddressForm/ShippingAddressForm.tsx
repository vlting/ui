import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ShippingAddressFormFrame = styled(YStack, {})

export type ShippingAddressFormProps = GetProps<typeof ShippingAddressFormFrame>

export const ShippingAddressForm = ShippingAddressFormFrame
