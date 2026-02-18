import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const DateRangePickerFrame = styled(YStack, {})

export type DateRangePickerProps = GetProps<typeof DateRangePickerFrame>

export const DateRangePicker = DateRangePickerFrame
