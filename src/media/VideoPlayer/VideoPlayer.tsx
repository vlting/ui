import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const VideoPlayerFrame = styled(YStack, {})

export type VideoPlayerProps = GetProps<typeof VideoPlayerFrame>

export const VideoPlayer = VideoPlayerFrame
