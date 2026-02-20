import React, { useCallback, useState } from 'react'
import { Pressable } from 'react-native'
import { withStaticProperties } from 'tamagui'
import { ChevronLeft, Input, ScrollView, Send, Text, View, XStack, YStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// DirectMessageThread — one-on-one message thread
//
// Displays a header with back button and recipient name, a scrollable list
// of message bubbles, and an input bar for composing new messages.
// Compound component with sub-components for flexible composition.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type DMMessage = {
  id: string
  content: string
  timestamp: string
  isCurrentUser: boolean
}

export type DirectMessageThreadProps = {
  messages: DMMessage[]
  recipientName?: string
  onSendMessage?: (content: string) => void
  onBack?: () => void
  testID?: string
}

// ---------------------------------------------------------------------------
// Sub-components for composition
// ---------------------------------------------------------------------------

type DirectMessageThreadHeaderProps = {
  recipientName?: string
  onBack?: () => void
}

const DirectMessageThreadHeader = React.memo(function DirectMessageThreadHeader(
  props: DirectMessageThreadHeaderProps,
) {
  const { recipientName, onBack } = props

  const handleBack = useCallback(() => {
    onBack?.()
  }, [onBack])

  return (
    <XStack
      padding="$3"
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
      alignItems="center"
      gap="$2"
    >
      {onBack ? (
        <Pressable
          onPress={handleBack}
          role="button"
          aria-label="Go back"
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <View padding="$1">
            <ChevronLeft size={24} color="$color" aria-hidden />
          </View>
        </Pressable>
      ) : null}

      {recipientName ? (
        <Text
          fontSize="$5"
          fontWeight="700"
          color="$color"
          fontFamily="$body"
          numberOfLines={1}
          flex={1}
        >
          {recipientName}
        </Text>
      ) : null}
    </XStack>
  )
})

type DMBubbleProps = {
  message: DMMessage
}

const DMBubble = React.memo(function DMBubble(props: DMBubbleProps) {
  const { message } = props
  const { isCurrentUser, content, timestamp } = message

  return (
    <XStack
      justifyContent={isCurrentUser ? 'flex-end' : 'flex-start'}
      paddingHorizontal="$3"
      paddingVertical="$1"
    >
      <YStack
        backgroundColor={isCurrentUser ? '$blue6' : '$gray4'}
        borderRadius="$3"
        padding="$2"
        paddingHorizontal="$3"
        maxWidth="80%"
        gap="$1"
      >
        <Text
          fontSize="$3"
          color="$color"
          fontFamily="$body"
        >
          {content}
        </Text>
        <Text
          fontSize="$1"
          color="$color2"
          fontFamily="$body"
        >
          {timestamp}
        </Text>
      </YStack>
    </XStack>
  )
})

type DirectMessageThreadMessagesProps = {
  messages: DMMessage[]
}

const DirectMessageThreadMessages = React.memo(function DirectMessageThreadMessages(
  props: DirectMessageThreadMessagesProps,
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
          <DMBubble key={msg.id} message={msg} />
        ))}
      </YStack>
    </ScrollView>
  )
})

type DirectMessageThreadInputProps = {
  onSend?: (content: string) => void
}

const DirectMessageThreadInput = React.memo(function DirectMessageThreadInput(
  props: DirectMessageThreadInputProps,
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

  const isEmpty = text.trim().length === 0

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
        placeholder="Write a message..."
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
        disabled={isEmpty}
      >
        <View
          padding="$2"
          borderRadius="$2"
          backgroundColor={isEmpty ? '$gray4' : '$color10'}
          alignItems="center"
          justifyContent="center"
          opacity={isEmpty ? 0.5 : 1}
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

const DirectMessageThreadBase = React.memo(function DirectMessageThreadBase(
  props: DirectMessageThreadProps,
) {
  const { messages, recipientName, onSendMessage, onBack, testID } = props

  return (
    <YStack
      testID={testID}
      flex={1}
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      overflow="hidden"
      aria-label={
        recipientName
          ? `Conversation with ${recipientName}`
          : 'Direct message thread'
      }
    >
      <DirectMessageThreadHeader
        recipientName={recipientName}
        onBack={onBack}
      />
      <DirectMessageThreadMessages messages={messages} />
      <DirectMessageThreadInput onSend={onSendMessage} />
    </YStack>
  )
})

export const DirectMessageThread = withStaticProperties(DirectMessageThreadBase, {
  Header: DirectMessageThreadHeader,
  Messages: DirectMessageThreadMessages,
  Input: DirectMessageThreadInput,
})
