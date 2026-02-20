import React, { memo } from 'react'
import { Text, XStack, YStack, styled, withStaticProperties } from 'tamagui'

// ─── Frame ────────────────────────────────────────────────────────────────────

const StatCardFrame = styled(YStack, {
  backgroundColor: '$background',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$4',
  padding: '$4',
  gap: '$2',
})

// ─── Sub-components ───────────────────────────────────────────────────────────

const StatCardLabel = memo(function StatCardLabel({
  children,
  testID,
}: {
  children?: React.ReactNode
  testID?: string
}) {
  return (
    <Text fontSize="$2" color="$colorSubtitle" testID={testID}>
      {children}
    </Text>
  )
})

const StatCardValue = memo(function StatCardValue({
  children,
  testID,
}: {
  children?: React.ReactNode
  testID?: string
}) {
  return (
    <Text fontSize="$8" fontWeight="700" color="$color" testID={testID}>
      {children}
    </Text>
  )
})

// ─── Trend types ──────────────────────────────────────────────────────────────

export type TrendDirection = 'up' | 'down' | 'neutral'

const TREND_ICONS: Record<TrendDirection, string> = {
  up: '↑',
  down: '↓',
  neutral: '→',
}

const TREND_LABELS: Record<TrendDirection, string> = {
  up: 'Up',
  down: 'Down',
  neutral: 'No change',
}

const StatCardTrend = memo(function StatCardTrend({
  direction = 'neutral',
  value,
  testID,
}: {
  direction?: TrendDirection
  value?: string
  children?: React.ReactNode
  testID?: string
}) {
  const icon = TREND_ICONS[direction]
  const label = TREND_LABELS[direction]
  const accessibleText = value ? `${label} ${value}` : label

  const colorMap: Record<TrendDirection, string> = {
    up: '$green10',
    down: '$red10',
    neutral: '$colorSubtitle',
  }

  return (
    <XStack gap="$1" alignItems="center" testID={testID}>
      <Text aria-hidden="true" color={colorMap[direction]} fontSize="$2">
        {icon}
      </Text>
      <Text color={colorMap[direction]} fontSize="$2">
        {accessibleText}
      </Text>
    </XStack>
  )
})

// ─── Props ────────────────────────────────────────────────────────────────────

export type StatCardProps = {
  children?: React.ReactNode
  testID?: string
  [key: string]: unknown
}

// ─── Root Component ───────────────────────────────────────────────────────────

const StatCardRoot = memo(function StatCard({
  children,
  testID,
  ...rest
}: StatCardProps) {
  return (
    <StatCardFrame testID={testID} {...(rest as object)}>
      {children}
    </StatCardFrame>
  )
})

// ─── Export ──────────────────────────────────────────────────────────────────

export const StatCard = withStaticProperties(StatCardRoot, {
  Label: StatCardLabel,
  Value: StatCardValue,
  Trend: StatCardTrend,
})
