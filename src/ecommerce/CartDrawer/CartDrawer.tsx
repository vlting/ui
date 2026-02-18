import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const CartDrawerFrame = styled(YStack, {})

export type CartDrawerProps = GetProps<typeof CartDrawerFrame>

export const CartDrawer = CartDrawerFrame
