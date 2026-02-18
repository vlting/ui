import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const InventoryStatusBadgeFrame = styled(YStack, {})

export type InventoryStatusBadgeProps = GetProps<typeof InventoryStatusBadgeFrame>

export const InventoryStatusBadge = InventoryStatusBadgeFrame
