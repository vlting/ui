import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const CalendarViewFrame = styled(YStack, {})

export type CalendarViewProps = GetProps<typeof CalendarViewFrame>

export const CalendarView = CalendarViewFrame
