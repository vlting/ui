import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ActivityTimelineFrame = styled(YStack, {})

export type ActivityTimelineProps = GetProps<typeof ActivityTimelineFrame>

export const ActivityTimeline = ActivityTimelineFrame
