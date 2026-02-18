import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ExpenseCategoryBadgeFrame = styled(YStack, {})

export type ExpenseCategoryBadgeProps = GetProps<typeof ExpenseCategoryBadgeFrame>

export const ExpenseCategoryBadge = ExpenseCategoryBadgeFrame
