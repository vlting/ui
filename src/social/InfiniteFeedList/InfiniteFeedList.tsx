import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const InfiniteFeedListFrame = styled(YStack, {})

export type InfiniteFeedListProps = GetProps<typeof InfiniteFeedListFrame>

export const InfiniteFeedList = InfiniteFeedListFrame
