import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const DatePickerFrame = styled(YStack, {})

export type DatePickerProps = GetProps<typeof DatePickerFrame>

export const DatePicker = DatePickerFrame
