import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const MatchRequestButtonFrame = styled(YStack, {})

export type MatchRequestButtonProps = GetProps<typeof MatchRequestButtonFrame>

export const MatchRequestButton = MatchRequestButtonFrame
