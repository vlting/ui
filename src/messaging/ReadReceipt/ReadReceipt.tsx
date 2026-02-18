import type { GetProps } from 'tamagui'
import { XStack, styled } from 'tamagui'

const ReadReceiptFrame = styled(XStack, {})

export type ReadReceiptProps = GetProps<typeof ReadReceiptFrame>

export const ReadReceipt = ReadReceiptFrame
