import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ExpenseFormFrame = styled(YStack, {})

export type ExpenseFormProps = GetProps<typeof ExpenseFormFrame>

export const ExpenseForm = ExpenseFormFrame
