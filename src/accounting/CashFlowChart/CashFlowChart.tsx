import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const CashFlowChartFrame = styled(YStack, {})

export type CashFlowChartProps = GetProps<typeof CashFlowChartFrame>

export const CashFlowChart = CashFlowChartFrame
