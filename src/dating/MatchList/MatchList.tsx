import React, { useCallback } from 'react'
import { Pressable } from 'react-native'
import { AlertTriangle, Heart, ScrollView, Text, View, YStack } from '../_jsx-compat'
import { MatchCard } from '../MatchCard/MatchCard'

// ---------------------------------------------------------------------------
// MatchList — scrollable list of mutual matches
//
// Displays MatchCard items with optional section headers. Supports loading,
// empty, error, and populated states. Pull-to-refresh via onRefresh callback.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type MatchItem = {
  id: string
  name: string
  age: number
  photoSrc: string
  bio?: string
  isNew?: boolean
}

export type MatchListSection = { title: string; data: MatchItem[] }

export type MatchListProps = {
  matches: MatchItem[]
  sections?: MatchListSection[]
  isLoading?: boolean
  isError?: boolean
  onSelect?: (id: string) => void
  onRefresh?: () => void
  onRetry?: () => void
  emptyMessage?: string
  testID?: string
}

// ---------------------------------------------------------------------------
// Skeleton card for loading state
// ---------------------------------------------------------------------------

const SkeletonCard = React.memo(function SkeletonCard() {
  return (
    <YStack
      borderRadius="$4"
      overflow="hidden"
      borderWidth={1}
      borderColor="$borderColor"
      aria-hidden="true"
    >
      <View
        width="100%"
        aspectRatio={4 / 5}
        backgroundColor="$gray4"
      />
      <YStack padding="$3" gap="$2">
        <View
          height={16}
          width="50%"
          borderRadius="$2"
          backgroundColor="$gray4"
        />
        <View
          height={12}
          width="70%"
          borderRadius="$2"
          backgroundColor="$gray3"
        />
      </YStack>
    </YStack>
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
      <Heart size={32} color="$color2" aria-hidden />
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
// Error state
// ---------------------------------------------------------------------------

type ErrorStateProps = {
  onRetry?: () => void
}

const ErrorState = React.memo(function ErrorState(props: ErrorStateProps) {
  const { onRetry } = props

  return (
    <YStack
      alignItems="center"
      justifyContent="center"
      padding="$6"
      gap="$3"
      aria-label="Error loading matches"
    >
      <AlertTriangle size={32} color="$red10" aria-hidden />
      <Text
        fontSize="$3"
        color="$color2"
        fontFamily="$body"
        textAlign="center"
      >
        Something went wrong loading your matches.
      </Text>
      {onRetry ? (
        <Pressable
          onPress={onRetry}
          role="button"
          aria-label="Retry loading matches"
          accessibilityRole="button"
          accessibilityLabel="Retry loading matches"
        >
          <View
            paddingVertical="$2"
            paddingHorizontal="$4"
            borderRadius="$3"
            backgroundColor="$blue10"
          >
            <Text
              fontSize="$3"
              fontWeight="700"
              color="white"
              fontFamily="$body"
            >
              Retry
            </Text>
          </View>
        </Pressable>
      ) : null}
    </YStack>
  )
})

// ---------------------------------------------------------------------------
// Section header
// ---------------------------------------------------------------------------

type SectionHeaderProps = {
  title: string
}

const SectionHeader = React.memo(function SectionHeader(
  props: SectionHeaderProps,
) {
  return (
    <Text
      fontSize="$4"
      fontWeight="700"
      color="$color"
      fontFamily="$body"
      paddingVertical="$2"
      role="heading"
      aria-level={3}
    >
      {props.title}
    </Text>
  )
})

// ---------------------------------------------------------------------------
// Match item row
// ---------------------------------------------------------------------------

type MatchItemRowProps = {
  item: MatchItem
  onSelect?: (id: string) => void
}

const MatchItemRow = React.memo(function MatchItemRow(
  props: MatchItemRowProps,
) {
  const { item, onSelect } = props

  const handlePress = useCallback(() => {
    onSelect?.(item.id)
  }, [item.id, onSelect])

  return (
    <View role="listitem">
      <MatchCard
        name={item.name}
        age={item.age}
        photoSrc={item.photoSrc}
        bio={item.bio}
        isNew={item.isNew}
        onPress={onSelect ? handlePress : undefined}
      />
    </View>
  )
})

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export const MatchList = React.memo(function MatchList(
  props: MatchListProps,
) {
  const {
    matches,
    sections,
    isLoading = false,
    isError = false,
    onSelect,
    // onRefresh reserved for pull-to-refresh platform integration
    onRetry,
    emptyMessage = 'No matches yet',
    testID,
  } = props

  // Loading state
  if (isLoading) {
    return (
      <YStack
        testID={testID}
        aria-label="Loading matches"
        aria-busy="true"
        padding="$2"
        gap="$3"
      >
        <SkeletonCard />
        <SkeletonCard />
      </YStack>
    )
  }

  // Error state
  if (isError) {
    return (
      <YStack testID={testID}>
        <ErrorState onRetry={onRetry} />
      </YStack>
    )
  }

  // Empty state
  const hasItems = sections
    ? sections.some((s) => s.data.length > 0)
    : matches.length > 0

  if (!hasItems) {
    return (
      <YStack testID={testID}>
        <EmptyState message={emptyMessage} />
      </YStack>
    )
  }

  // Sectioned layout
  if (sections && sections.length > 0) {
    return (
      <ScrollView testID={testID}>
        <YStack role="list" gap="$3" padding="$2">
          {sections.map((section) => (
            <YStack key={section.title} gap="$2">
              <SectionHeader title={section.title} />
              {section.data.map((item) => (
                <MatchItemRow
                  key={item.id}
                  item={item}
                  onSelect={onSelect}
                />
              ))}
            </YStack>
          ))}
        </YStack>
      </ScrollView>
    )
  }

  // Flat layout
  return (
    <ScrollView testID={testID}>
      <YStack role="list" gap="$3" padding="$2">
        {matches.map((item) => (
          <MatchItemRow
            key={item.id}
            item={item}
            onSelect={onSelect}
          />
        ))}
      </YStack>
    </ScrollView>
  )
})
