import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const DeadlineIndicatorFrame = styled(YStack, {})

export type DeadlineIndicatorProps = GetProps<typeof DeadlineIndicatorFrame>

export const DeadlineIndicator = DeadlineIndicatorFrame
