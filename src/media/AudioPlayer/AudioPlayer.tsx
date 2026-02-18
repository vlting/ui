import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const AudioPlayerFrame = styled(YStack, {})

export type AudioPlayerProps = GetProps<typeof AudioPlayerFrame>

export const AudioPlayer = AudioPlayerFrame
