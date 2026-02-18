import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ReportContentModalFrame = styled(YStack, {})

export type ReportContentModalProps = GetProps<typeof ReportContentModalFrame>

export const ReportContentModal = ReportContentModalFrame
