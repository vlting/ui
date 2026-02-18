import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const InvoiceTableFrame = styled(YStack, {})

export type InvoiceTableProps = GetProps<typeof InvoiceTableFrame>

export const InvoiceTable = InvoiceTableFrame
