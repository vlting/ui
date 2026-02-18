import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const WarehouseSelectorFrame = styled(YStack, {})

export type WarehouseSelectorProps = GetProps<typeof WarehouseSelectorFrame>

export const WarehouseSelector = WarehouseSelectorFrame
