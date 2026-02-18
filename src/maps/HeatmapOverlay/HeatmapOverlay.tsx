import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const HeatmapOverlayFrame = styled(YStack, {})

export type HeatmapOverlayProps = GetProps<typeof HeatmapOverlayFrame>

export const HeatmapOverlay = HeatmapOverlayFrame
