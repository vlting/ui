import React, { useCallback, useState } from 'react'
import { Pressable } from 'react-native'
import { withStaticProperties } from 'tamagui'
import { Image, Input, ScrollView, Send, Text, User, View, XStack, YStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// ActivityThread — threaded message view for pod activity discussions
//
// Displays a scrollable list of message bubbles with author info,
// a header, and an input bar for composing new messages.
// Compound component with sub-components for flexible composition.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type ThreadMessage = {
  id: string
  authorName: string
  authorPhotoSrc?: string
  content: string
  timestamp: string
  isCurrentUser?: boolean
}

export type ActivityThreadProps = {
  messages: ThreadMessage[]
  onSendMessage?: (content: string) => void
  title?: string
  testID?: string
}

// ---------------------------------------------------------------------------
// Sub-components for composition
// ---------------------------------------------------------------------------

type ActivityThreadHeaderProps = {
  title?: string
}

const ActivityThreadHeader = React.memo(function ActivityThreadHeader(
  props: ActivityThreadHeaderProps,
) {
  const { title } = props

  if (!title) return null

  return (
    <XStack
      padding="$3"
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
      alignItems="center"
    >
      <Text
        fontSize="$5"
        fontWeight="700"
        color="$color"
        fontFamily="$body"
        numberOfLines={1}
        flex={1}
      >
        {title}
      </Text>
    </XStack>
  )
})

type MessageBubbleProps = {
  message: ThreadMessage
}

const MessageBubble = React.memo(function MessageBubble(
  props: MessageBubbleProps,
) {
  const { message } = props
  const isCurrentUser = message.isCurrentUser ?? false

  return (
    <XStack
      justifyContent={isCurrentUser ? 'flex-end' : 'flex-start'}
      paddingHorizontal="$3"
      paddingVertical="$1"
    >
      <XStack
        gap="$2"
        alignItems="flex-end"
        maxWidth="80%"
        flexDirection={isCurrentUser ? 'row-reverse' : 'row'}
      >
        {/* Author avatar */}
        {!isCurrentUser ? (
          message.authorPhotoSrc ? (
            <Image
              source={{ uri: message.authorPhotoSrc }}
              width={28}
              height={28}
              borderRadius={14}
              alt={message.authorName}
            />
          ) : (
            <View
              width={28}
              height={28}
              borderRadius={14}
              backgroundColor="$gray4"
              alignItems="center"
              justifyContent="center"
            >
              <User size={14} color="$color2" aria-hidden />
            </View>
          )
        ) : null}

        {/* Bubble */}
        <YStack
          backgroundColor={isCurrentUser ? '$blue6' : '$gray4'}
          borderRadius="$3"
          padding="$2"
          paddingHorizontal="$3"
          gap="$1"
        >
          {!isCurrentUser ? (
            <Text
              fontSize="$1"
              fontWeight="700"
              color="$color"
              fontFamily="$body"
            >
              {message.authorName}
            </Text>
          ) : null}
          <Text
            fontSize="$3"
            color="$color"
            fontFamily="$body"
          >
            {message.content}
          </Text>
          <Text
            fontSize="$1"
            color="$color2"
            fontFamily="$body"
          >
            {message.timestamp}
          </Text>
        </YStack>
      </XStack>
    </XStack>
  )
})

type ActivityThreadMessagesProps = {
  messages: ThreadMessage[]
}

const ActivityThreadMessages = React.memo(function ActivityThreadMessages(
  props: ActivityThreadMessagesProps,
) {
  const { messages } = props

  return (
    <ScrollView flex={1}>
      <YStack
        role="log"
        aria-live="polite"
        padding="$2"
        gap="$1"
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </YStack>
    </ScrollView>
  )
})

type ActivityThreadInputProps = {
  onSend?: (content: string) => void
}

const ActivityThreadInput = React.memo(function ActivityThreadInput(
  props: ActivityThreadInputProps,
) {
  const { onSend } = props
  const [text, setText] = useState('')

  const handleSend = useCallback(() => {
    const trimmed = text.trim()
    if (trimmed && onSend) {
      onSend(trimmed)
      setText('')
    }
  }, [text, onSend])

  return (
    <XStack
      padding="$2"
      gap="$2"
      borderTopWidth={1}
      borderTopColor="$borderColor"
      alignItems="center"
    >
      <Input
        flex={1}
        value={text}
        onChangeText={setText}
        placeholder="Write a response..."
        aria-label="Message input"
        fontSize="$3"
        fontFamily="$body"
        borderRadius="$3"
        borderWidth={1}
        borderColor="$borderColor"
        padding="$2"
      />
      <Pressable
        onPress={handleSend}
        role="button"
        aria-label="Send message"
        accessibilityRole="button"
        accessibilityLabel="Send message"
        disabled={text.trim().length === 0}
      >
        <View
          padding="$2"
          borderRadius="$2"
          backgroundColor={text.trim().length > 0 ? '$blue10' : '$gray4'}
          alignItems="center"
          justifyContent="center"
        >
          <Send size={18} color="white" aria-hidden />
        </View>
      </Pressable>
    </XStack>
  )
})

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const ActivityThreadBase = React.memo(function ActivityThreadBase(
  props: ActivityThreadProps,
) {
  const { messages, onSendMessage, title, testID } = props

  return (
    <YStack
      testID={testID}
      flex={1}
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      overflow="hidden"
      aria-label={title ? `Activity thread: ${title}` : 'Activity thread'}
    >
      <ActivityThreadHeader title={title} />
      <ActivityThreadMessages messages={messages} />
      <ActivityThreadInput onSend={onSendMessage} />
    </YStack>
  )
})

export const ActivityThread = withStaticProperties(ActivityThreadBase, {
  Header: ActivityThreadHeader,
  Messages: ActivityThreadMessages,
  Input: ActivityThreadInput,
})
