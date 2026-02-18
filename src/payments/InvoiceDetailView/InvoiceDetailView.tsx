import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const InvoiceDetailViewFrame = styled(YStack, {})

export type InvoiceDetailViewProps = GetProps<typeof InvoiceDetailViewFrame>

export const InvoiceDetailView = InvoiceDetailViewFrame
