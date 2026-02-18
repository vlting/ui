import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const GanttChartFrame = styled(YStack, {})

export type GanttChartProps = GetProps<typeof GanttChartFrame>

export const GanttChart = GanttChartFrame
