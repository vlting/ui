import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const MetricTileFrame = styled(YStack, {})

const MetricTileLabel = styled(YStack, {})

const MetricTileValue = styled(YStack, {})

const MetricTileIcon = styled(YStack, {})

export const MetricTile = withStaticProperties(MetricTileFrame, {
  Label: MetricTileLabel,
  Value: MetricTileValue,
  Icon: MetricTileIcon,
})

export type MetricTileProps = GetProps<typeof MetricTileFrame>
