import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const DataTableFrame = styled(YStack, {})

const DataTableHeader = styled(YStack, {})

const DataTableRow = styled(YStack, {})

const DataTableCell = styled(YStack, {})

export const DataTable = withStaticProperties(DataTableFrame, {
  Header: DataTableHeader,
  Row: DataTableRow,
  Cell: DataTableCell,
})

export type DataTableProps = GetProps<typeof DataTableFrame>
