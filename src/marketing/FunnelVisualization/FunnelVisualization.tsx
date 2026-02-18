import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const FunnelVisualizationFrame = styled(YStack, {})

export type FunnelVisualizationProps = GetProps<typeof FunnelVisualizationFrame>

export const FunnelVisualization = FunnelVisualizationFrame
