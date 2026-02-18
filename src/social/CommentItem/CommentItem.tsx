import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const CommentItemFrame = styled(YStack, {})

const CommentItemAvatar = styled(YStack, {})

const CommentItemContent = styled(YStack, {})

const CommentItemActions = styled(YStack, {})

export const CommentItem = withStaticProperties(CommentItemFrame, {
  Avatar: CommentItemAvatar,
  Content: CommentItemContent,
  Actions: CommentItemActions,
})

export type CommentItemProps = GetProps<typeof CommentItemFrame>
