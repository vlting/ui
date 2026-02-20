import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const DealBreakerSelectorFrame = styled(YStack, {})

export type DealBreakerSelectorProps = GetProps<typeof DealBreakerSelectorFrame>

export const DealBreakerSelector = DealBreakerSelectorFrame
