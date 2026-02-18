import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const InventoryTableFrame = styled(YStack, {})

export type InventoryTableProps = GetProps<typeof InventoryTableFrame>

export const InventoryTable = InventoryTableFrame
