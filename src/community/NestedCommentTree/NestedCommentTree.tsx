import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const NestedCommentTreeFrame = styled(YStack, {})

export type NestedCommentTreeProps = GetProps<typeof NestedCommentTreeFrame>

export const NestedCommentTree = NestedCommentTreeFrame
