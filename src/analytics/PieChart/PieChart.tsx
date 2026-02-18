import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const PieChartFrame = styled(YStack, {})

export type PieChartProps = GetProps<typeof PieChartFrame>

export const PieChart = PieChartFrame
