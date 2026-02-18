import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const LedgerTableFrame = styled(YStack, {})

export type LedgerTableProps = GetProps<typeof LedgerTableFrame>

export const LedgerTable = LedgerTableFrame
