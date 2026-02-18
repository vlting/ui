import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const SavedReportListFrame = styled(YStack, {})

export type SavedReportListProps = GetProps<typeof SavedReportListFrame>

export const SavedReportList = SavedReportListFrame
