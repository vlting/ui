import React, { useCallback } from 'react'
import { Pressable } from 'react-native'
import { Image, MessageCircle, ScrollView, Text, User, View, XStack, YStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// ConversationList — scrollable list of DM conversations
//
// Renders a list of conversation rows with avatar, name, last message preview,
// time, and unread indicator. Supports loading and empty states.
// Controlled: parent provides conversations and receives onSelect callback.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type ConversationItem = {
  id: string
  name: string
  photoSrc?: string
  lastMessage?: string
  lastMessageTime?: string
  unread?: boolean
}

export type ConversationListProps = {
  /** Array of conversation items to display */
  conversations: ConversationItem[]
  /** Callback when a conversation row is selected */
  onSelect?: (id: string) => void
  /** Whether the list is loading */
  isLoading?: boolean
  /** Message to display when list is empty */
  emptyMessage?: string
  /** Optional test ID for testing */
  testID?: string
}

// ---------------------------------------------------------------------------
// Skeleton placeholder row
// ---------------------------------------------------------------------------

const SkeletonRow = React.memo(function SkeletonRow(_props: { index: number }) {
  return (
    <XStack
      alignItems="center"
      gap="$3"
      paddingVertical="$3"
      paddingHorizontal="$3"
      aria-hidden={true}
    >
      <View
        width={48}
        height={48}
        borderRadius={24}
        backgroundColor="$gray4"
      />
      <YStack flex={1} gap="$1">
        <View
          height={14}
          width="60%"
          borderRadius="$2"
          backgroundColor="$gray4"
        />
        <View
          height={12}
          width="80%"
          borderRadius="$2"
          backgroundColor="$gray3"
        />
      </YStack>
      <View
        height={10}
        width={40}
        borderRadius="$2"
        backgroundColor="$gray3"
      />
    </XStack>
  )
})

// ---------------------------------------------------------------------------
// Conversation row
// ---------------------------------------------------------------------------

type ConversationRowProps = {
  conversation: ConversationItem
  onSelect?: (id: string) => void
  testID?: string
}

const ConversationRow = React.memo(function ConversationRow(
  props: ConversationRowProps,
) {
  const { conversation, onSelect, testID } = props
  const { id, name, photoSrc, lastMessage, lastMessageTime, unread } = conversation

  const handlePress = useCallback(() => {
    onSelect?.(id)
  }, [onSelect, id])

  return (
    <Pressable
      onPress={handlePress}
      role="listitem"
      aria-label={`Conversation with ${name}${unread ? ', unread' : ''}`}
      accessibilityRole="button"
      accessibilityLabel={`Conversation with ${name}${unread ? ', unread' : ''}`}
      data-testid={testID ? `${testID}-row-${id}` : undefined}
    >
      <XStack
        alignItems="center"
        gap="$3"
        paddingVertical="$3"
        paddingHorizontal="$3"
        backgroundColor="$background"
        cursor="pointer"
      >
        {/* Avatar */}
        {photoSrc ? (
          <Image
            source={{ uri: photoSrc }}
            width={48}
            height={48}
            borderRadius={24}
            alt={name}
          />
        ) : (
          <View
            width={48}
            height={48}
            borderRadius={24}
            backgroundColor="$gray4"
            alignItems="center"
            justifyContent="center"
          >
            <User size={24} color="$color2" aria-hidden />
          </View>
        )}

        {/* Content */}
        <YStack flex={1} gap="$1">
          <XStack alignItems="center" gap="$2">
            <Text
              fontSize="$3"
              fontWeight={unread ? '700' : '400'}
              color="$color"
              fontFamily="$body"
              numberOfLines={1}
              flex={1}
            >
              {name}
            </Text>
            {lastMessageTime ? (
              <Text
                fontSize="$1"
                color="$color2"
                fontFamily="$body"
              >
                {lastMessageTime}
              </Text>
            ) : null}
          </XStack>
          {lastMessage ? (
            <Text
              fontSize="$2"
              color="$color2"
              fontFamily="$body"
              numberOfLines={1}
            >
              {lastMessage}
            </Text>
          ) : null}
        </YStack>

        {/* Unread indicator */}
        {unread ? (
          <View
            width={10}
            height={10}
            borderRadius={5}
            backgroundColor="$blue10"
            aria-label="Unread"
          />
        ) : null}
      </XStack>
    </Pressable>
  )
})

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export const ConversationList = React.memo(function ConversationList(
  props: ConversationListProps,
) {
  const {
    conversations,
    onSelect,
    isLoading = false,
    emptyMessage = 'No conversations yet',
    testID,
  } = props

  // Loading state
  if (isLoading) {
    return (
      <YStack
        testID={testID}
        role="list"
        aria-label="Conversations loading"
        aria-busy={true}
      >
        <SkeletonRow index={0} />
        <SkeletonRow index={1} />
        <SkeletonRow index={2} />
      </YStack>
    )
  }

  // Empty state
  if (conversations.length === 0) {
    return (
      <YStack
        testID={testID}
        alignItems="center"
        justifyContent="center"
        padding="$6"
        gap="$3"
        minHeight={200}
      >
        <MessageCircle size={32} color="$color2" aria-hidden />
        <Text
          fontSize="$3"
          color="$color2"
          fontFamily="$body"
          textAlign="center"
        >
          {emptyMessage}
        </Text>
      </YStack>
    )
  }

  return (
    <ScrollView testID={testID}>
      <YStack role="list" aria-label="Conversations">
        {conversations.map((conversation) => (
          <ConversationRow
            key={conversation.id}
            conversation={conversation}
            onSelect={onSelect}
            testID={testID}
          />
        ))}
      </YStack>
    </ScrollView>
  )
})
