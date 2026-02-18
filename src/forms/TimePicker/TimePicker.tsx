import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const TimePickerFrame = styled(YStack, {})

export type TimePickerProps = GetProps<typeof TimePickerFrame>

export const TimePicker = TimePickerFrame
