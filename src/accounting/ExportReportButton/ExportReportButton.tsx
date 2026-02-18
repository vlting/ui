import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ExportReportButtonFrame = styled(YStack, {})

export type ExportReportButtonProps = GetProps<typeof ExportReportButtonFrame>

export const ExportReportButton = ExportReportButtonFrame
