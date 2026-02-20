import React, { useCallback } from 'react'
import { ScrollView, Text, Users, View, XStack, YStack } from '../_jsx-compat'
import { ConnectionCard } from '../ConnectionCard/ConnectionCard'

// ---------------------------------------------------------------------------
// ConnectionList — scrollable list of connection items
//
// Displays a list of ConnectionCard components with loading, empty, and
// populated states. Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type ConnectionItem = {
  id: string
  name: string
  photoSrc?: string
  lastMessage?: string
  lastMessageTime?: string
  unread?: boolean
}

export type ConnectionListProps = {
  connections: ConnectionItem[]
  onSelect?: (id: string) => void
  isLoading?: boolean
  emptyMessage?: string
  testID?: string
}

// ---------------------------------------------------------------------------
// Skeleton row for loading state
// ---------------------------------------------------------------------------

const SkeletonRow = React.memo(function SkeletonRow() {
  return (
    <XStack
      alignItems="center"
      gap="$3"
      padding="$3"
      aria-hidden="true"
    >
      <View
        width={48}
        height={48}
        borderRadius={24}
        backgroundColor="$gray4"
      />
      <YStack flex={1} gap="$2">
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
    </XStack>
  )
})

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

type EmptyStateProps = {
  message: string
}

const EmptyState = React.memo(function EmptyState(props: EmptyStateProps) {
  return (
    <YStack
      alignItems="center"
      justifyContent="center"
      padding="$6"
      gap="$3"
      aria-label={props.message}
    >
      <Users size={32} color="$color2" aria-hidden />
      <Text
        fontSize="$3"
        color="$color2"
        fontFamily="$body"
        textAlign="center"
      >
        {props.message}
      </Text>
    </YStack>
  )
})

// ---------------------------------------------------------------------------
// Connection row
// ---------------------------------------------------------------------------

type ConnectionRowProps = {
  item: ConnectionItem
  onSelect?: (id: string) => void
}

const ConnectionRow = React.memo(function ConnectionRow(
  props: ConnectionRowProps,
) {
  const { item, onSelect } = props

  const handlePress = useCallback(() => {
    onSelect?.(item.id)
  }, [item.id, onSelect])

  return (
    <View role="listitem">
      <ConnectionCard
        name={item.name}
        photoSrc={item.photoSrc}
        lastMessage={item.lastMessage}
        lastMessageTime={item.lastMessageTime}
        unread={item.unread}
        onPress={onSelect ? handlePress : undefined}
      />
    </View>
  )
})

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export const ConnectionList = React.memo(function ConnectionList(
  props: ConnectionListProps,
) {
  const {
    connections,
    onSelect,
    isLoading = false,
    emptyMessage = 'No connections yet',
    testID,
  } = props

  // Loading state
  if (isLoading) {
    return (
      <YStack
        testID={testID}
        aria-label="Loading connections"
        aria-busy="true"
      >
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
      </YStack>
    )
  }

  // Empty state
  if (connections.length === 0) {
    return (
      <YStack testID={testID}>
        <EmptyState message={emptyMessage} />
      </YStack>
    )
  }

  // Populated state
  return (
    <ScrollView testID={testID}>
      <YStack role="list" gap="$2" padding="$2">
        {connections.map((item) => (
          <ConnectionRow
            key={item.id}
            item={item}
            onSelect={onSelect}
          />
        ))}
      </YStack>
    </ScrollView>
  )
})
