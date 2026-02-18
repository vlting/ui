import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const VoiceMessagePlayerFrame = styled(YStack, {})

export type VoiceMessagePlayerProps = GetProps<typeof VoiceMessagePlayerFrame>

export const VoiceMessagePlayer = VoiceMessagePlayerFrame
