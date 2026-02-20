import React, { memo } from 'react'
import { Text, XStack, YStack, styled, withStaticProperties } from 'tamagui'

// ─── Frame ────────────────────────────────────────────────────────────────────

const MetricTileFrame = styled(YStack, {
  backgroundColor: '$background',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$4',
  padding: '$4',
  gap: '$2',
  overflow: 'hidden',
})

// ─── Sub-components ───────────────────────────────────────────────────────────

const MetricTileIcon = memo(function MetricTileIcon({
  children,
  decorative = true,
  accessibilityLabel,
  testID,
}: {
  children?: React.ReactNode
  decorative?: boolean
  accessibilityLabel?: string
  testID?: string
}) {
  return (
    <YStack
      aria-hidden={decorative ? 'true' : undefined}
      aria-label={!decorative ? accessibilityLabel : undefined}
      testID={testID}
    >
      {children}
    </YStack>
  )
})

const MetricTileValue = memo(function MetricTileValue({
  children,
  live = false,
  testID,
}: {
  children?: React.ReactNode
  live?: boolean
  testID?: string
}) {
  return (
    <Text
      fontSize="$8"
      fontWeight="700"
      color="$color"
      aria-live={live ? 'polite' : undefined}
      numberOfLines={1}
      testID={testID}
    >
      {children}
    </Text>
  )
})

const MetricTileLabel = memo(function MetricTileLabel({
  children,
  testID,
}: {
  children?: React.ReactNode
  testID?: string
}) {
  return (
    <Text fontSize="$2" color="$colorSubtitle" numberOfLines={1} testID={testID}>
      {children}
    </Text>
  )
})

// ─── Size variants ────────────────────────────────────────────────────────────

const MetricTileFrameVariants = styled(MetricTileFrame, {
  variants: {
    size: {
      small: {
        padding: '$2',
      },
      medium: {
        padding: '$4',
      },
      large: {
        padding: '$6',
      },
    },
  } as const,
  defaultVariants: {
    size: 'medium',
  },
})

// ─── Props ────────────────────────────────────────────────────────────────────

export type MetricTileProps = {
  /** Size variant of the tile */
  size?: 'small' | 'medium' | 'large'
  children?: React.ReactNode
  testID?: string
  [key: string]: unknown
}

// ─── Root Component ───────────────────────────────────────────────────────────

const MetricTileRoot = memo(function MetricTile({
  size = 'medium',
  children,
  testID,
  ...rest
}: MetricTileProps) {
  return (
    <MetricTileFrameVariants size={size} testID={testID} {...(rest as object)}>
      {children}
    </MetricTileFrameVariants>
  )
})

// ─── Export ──────────────────────────────────────────────────────────────────

export const MetricTile = withStaticProperties(MetricTileRoot, {
  Label: MetricTileLabel,
  Value: MetricTileValue,
  Icon: MetricTileIcon,
})
