import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const PodCountdownFrame = styled(YStack, {})

export type PodCountdownProps = GetProps<typeof PodCountdownFrame>

export const PodCountdown = PodCountdownFrame
