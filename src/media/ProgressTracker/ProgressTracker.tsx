import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ProgressTrackerFrame = styled(YStack, {})

export type ProgressTrackerProps = GetProps<typeof ProgressTrackerFrame>

export const ProgressTracker = ProgressTrackerFrame
