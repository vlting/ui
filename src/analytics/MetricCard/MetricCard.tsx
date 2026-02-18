import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const MetricCardFrame = styled(YStack, {})

export type MetricCardProps = GetProps<typeof MetricCardFrame>

export const MetricCard = MetricCardFrame
