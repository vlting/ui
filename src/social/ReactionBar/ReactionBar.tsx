import type { GetProps } from 'tamagui'
import { XStack, styled } from 'tamagui'

const ReactionBarFrame = styled(XStack, {})

export type ReactionBarProps = GetProps<typeof ReactionBarFrame>

export const ReactionBar = ReactionBarFrame
