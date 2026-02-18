import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const DataGridFrame = styled(YStack, {})

export type DataGridProps = GetProps<typeof DataGridFrame>

export const DataGrid = DataGridFrame
