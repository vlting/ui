import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const StatCardFrame = styled(YStack, {})

const StatCardLabel = styled(YStack, {})

const StatCardValue = styled(YStack, {})

const StatCardTrend = styled(YStack, {})

export const StatCard = withStaticProperties(StatCardFrame, {
  Label: StatCardLabel,
  Value: StatCardValue,
  Trend: StatCardTrend,
})

export type StatCardProps = GetProps<typeof StatCardFrame>
