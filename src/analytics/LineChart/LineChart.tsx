import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const LineChartFrame = styled(YStack, {})

export type LineChartProps = GetProps<typeof LineChartFrame>

export const LineChart = LineChartFrame
