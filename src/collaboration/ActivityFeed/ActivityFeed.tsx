import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ActivityFeedFrame = styled(YStack, {})

export type ActivityFeedProps = GetProps<typeof ActivityFeedFrame>

export const ActivityFeed = ActivityFeedFrame
