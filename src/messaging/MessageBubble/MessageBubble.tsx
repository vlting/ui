import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const MessageBubbleFrame = styled(YStack, {})

const MessageBubbleContent = styled(YStack, {})

const MessageBubbleTimestamp = styled(YStack, {})

const MessageBubbleStatus = styled(YStack, {})

export const MessageBubble = withStaticProperties(MessageBubbleFrame, {
  Content: MessageBubbleContent,
  Timestamp: MessageBubbleTimestamp,
  Status: MessageBubbleStatus,
})

export type MessageBubbleProps = GetProps<typeof MessageBubbleFrame>
