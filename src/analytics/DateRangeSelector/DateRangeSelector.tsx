import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const DateRangeSelectorFrame = styled(YStack, {})

export type DateRangeSelectorProps = GetProps<typeof DateRangeSelectorFrame>

export const DateRangeSelector = DateRangeSelectorFrame
