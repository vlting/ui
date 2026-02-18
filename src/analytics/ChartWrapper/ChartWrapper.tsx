import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ChartWrapperFrame = styled(YStack, {})

export type ChartWrapperProps = GetProps<typeof ChartWrapperFrame>

export const ChartWrapper = ChartWrapperFrame
