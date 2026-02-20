import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const SafetyReportModalFrame = styled(YStack, {})

export type SafetyReportModalProps = GetProps<typeof SafetyReportModalFrame>

export const SafetyReportModal = SafetyReportModalFrame
