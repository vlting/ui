import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const PlanComparisonTableFrame = styled(YStack, {})

export type PlanComparisonTableProps = GetProps<typeof PlanComparisonTableFrame>

export const PlanComparisonTable = PlanComparisonTableFrame
