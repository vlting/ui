import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const DirectionsPanelFrame = styled(YStack, {})

export type DirectionsPanelProps = GetProps<typeof DirectionsPanelFrame>

export const DirectionsPanel = DirectionsPanelFrame
