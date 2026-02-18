import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const CommentThreadFrame = styled(YStack, {})

export type CommentThreadProps = GetProps<typeof CommentThreadFrame>

export const CommentThread = CommentThreadFrame
