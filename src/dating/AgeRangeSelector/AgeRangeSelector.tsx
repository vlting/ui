import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const AgeRangeSelectorFrame = styled(YStack, {})

export type AgeRangeSelectorProps = GetProps<typeof AgeRangeSelectorFrame>

export const AgeRangeSelector = AgeRangeSelectorFrame
