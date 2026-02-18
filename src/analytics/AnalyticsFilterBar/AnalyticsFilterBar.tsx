import type { GetProps } from 'tamagui'
import { XStack, styled } from 'tamagui'

const AnalyticsFilterBarFrame = styled(XStack, {})

export type AnalyticsFilterBarProps = GetProps<typeof AnalyticsFilterBarFrame>

export const AnalyticsFilterBar = AnalyticsFilterBarFrame
