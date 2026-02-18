import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const AreaChartFrame = styled(YStack, {})

export type AreaChartProps = GetProps<typeof AreaChartFrame>

export const AreaChart = AreaChartFrame
