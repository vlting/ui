import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const SupplierCardFrame = styled(YStack, {})

export type SupplierCardProps = GetProps<typeof SupplierCardFrame>

export const SupplierCard = SupplierCardFrame
