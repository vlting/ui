import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ExportDataButtonFrame = styled(YStack, {})

export type ExportDataButtonProps = GetProps<typeof ExportDataButtonFrame>

export const ExportDataButton = ExportDataButtonFrame
