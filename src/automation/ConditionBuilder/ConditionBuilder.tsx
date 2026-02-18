import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ConditionBuilderFrame = styled(YStack, {})

export type ConditionBuilderProps = GetProps<typeof ConditionBuilderFrame>

export const ConditionBuilder = ConditionBuilderFrame
