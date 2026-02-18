import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const BarChartFrame = styled(YStack, {})

export type BarChartProps = GetProps<typeof BarChartFrame>

export const BarChart = BarChartFrame
