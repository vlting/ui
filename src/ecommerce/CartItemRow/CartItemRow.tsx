import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const CartItemRowFrame = styled(YStack, {})

export type CartItemRowProps = GetProps<typeof CartItemRowFrame>

export const CartItemRow = CartItemRowFrame
