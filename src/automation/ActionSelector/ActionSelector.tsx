import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ActionSelectorFrame = styled(YStack, {})

export type ActionSelectorProps = GetProps<typeof ActionSelectorFrame>

export const ActionSelector = ActionSelectorFrame
