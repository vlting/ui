import React, { useCallback } from 'react'
import { Pressable } from 'react-native'
import { withStaticProperties } from 'tamagui'
import { Check, Image, Text, User, View, XStack, YStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// WeekEndReview — end-of-week review and match selection
//
// Shows a grid of pod members with toggleable checkboxes for match selection.
// Displays a prompt, member cards, summary, and submit button.
// Compound component with sub-components for flexible composition.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type PodMember = {
  id: string
  name: string
  photoSrc?: string
  bio?: string
}

export type WeekEndReviewProps = {
  members: PodMember[]
  selectedIds: string[]
  onToggleSelect?: (id: string) => void
  onSubmit?: () => void
  testID?: string
}

// ---------------------------------------------------------------------------
// Sub-components for composition
// ---------------------------------------------------------------------------

type MemberCardItemProps = {
  member: PodMember
  selected: boolean
  onToggle?: (id: string) => void
}

const MemberCardItem = React.memo(function MemberCardItem(
  props: MemberCardItemProps,
) {
  const { member, selected, onToggle } = props

  const handlePress = useCallback(() => {
    onToggle?.(member.id)
  }, [onToggle, member.id])

  return (
    <Pressable
      onPress={handlePress}
      disabled={!onToggle}
      role="checkbox"
      aria-checked={selected}
      aria-label={`Select ${member.name}`}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={`Select ${member.name}`}
    >
      <YStack
        backgroundColor="$background"
        borderRadius="$4"
        borderWidth={2}
        borderColor={selected ? '$color10' : '$borderColor'}
        padding="$3"
        gap="$2"
        alignItems="center"
        minWidth={120}
      >
        {/* Photo */}
        {member.photoSrc ? (
          <Image
            source={{ uri: member.photoSrc }}
            width={64}
            height={64}
            borderRadius={32}
            alt={member.name}
          />
        ) : (
          <View
            width={64}
            height={64}
            borderRadius={32}
            backgroundColor="$gray4"
            alignItems="center"
            justifyContent="center"
          >
            <User size={32} color="$color2" aria-hidden />
          </View>
        )}

        {/* Name */}
        <Text
          fontSize="$3"
          fontWeight="600"
          color="$color"
          fontFamily="$body"
          numberOfLines={1}
          textAlign="center"
        >
          {member.name}
        </Text>

        {/* Check indicator */}
        {selected ? (
          <View
            width={24}
            height={24}
            borderRadius={12}
            backgroundColor="$color10"
            alignItems="center"
            justifyContent="center"
          >
            <Check size={14} color="white" aria-hidden />
          </View>
        ) : (
          <View
            width={24}
            height={24}
            borderRadius={12}
            borderWidth={2}
            borderColor="$borderColor"
          />
        )}
      </YStack>
    </Pressable>
  )
})

type WeekEndReviewMemberListProps = {
  members: PodMember[]
  selectedIds: string[]
  onToggle?: (id: string) => void
}

const WeekEndReviewMemberList = React.memo(function WeekEndReviewMemberList(
  props: WeekEndReviewMemberListProps,
) {
  const { members, selectedIds, onToggle } = props

  if (members.length === 0) {
    return (
      <Text
        fontSize="$3"
        color="$color2"
        fontFamily="$body"
        textAlign="center"
        padding="$4"
      >
        No members this week
      </Text>
    )
  }

  return (
    <XStack flexWrap="wrap" gap="$3" justifyContent="center" role="group" aria-label="Pod members">
      {members.map((member) => (
        <MemberCardItem
          key={member.id}
          member={member}
          selected={selectedIds.includes(member.id)}
          onToggle={onToggle}
        />
      ))}
    </XStack>
  )
})

type WeekEndReviewMatchPromptProps = {
  children?: React.ReactNode
}

const WeekEndReviewMatchPrompt = React.memo(function WeekEndReviewMatchPrompt(
  props: WeekEndReviewMatchPromptProps,
) {
  return (
    <YStack gap="$1" alignItems="center">
      {props.children ?? (
        <Text
          fontSize="$3"
          color="$color2"
          fontFamily="$body"
          textAlign="center"
        >
          Would you like to match with anyone from this week?
        </Text>
      )}
    </YStack>
  )
})

type WeekEndReviewSummaryProps = {
  selectedCount: number
}

const WeekEndReviewSummary = React.memo(function WeekEndReviewSummary(
  props: WeekEndReviewSummaryProps,
) {
  const { selectedCount } = props

  return (
    <Text
      fontSize="$2"
      color="$color2"
      fontFamily="$body"
      textAlign="center"
      aria-live="polite"
    >
      {selectedCount} {selectedCount === 1 ? 'member' : 'members'} selected
    </Text>
  )
})

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const WeekEndReviewBase = React.memo(function WeekEndReviewBase(
  props: WeekEndReviewProps,
) {
  const {
    members,
    selectedIds,
    onToggleSelect,
    onSubmit,
    testID,
  } = props

  const handleSubmit = useCallback(() => {
    if (selectedIds.length > 0 && onSubmit) {
      onSubmit()
    }
  }, [selectedIds.length, onSubmit])

  const canSubmit = selectedIds.length > 0 && onSubmit != null

  return (
    <YStack
      testID={testID}
      role="region"
      aria-label="Week in Review"
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      padding="$4"
      gap="$4"
    >
      {/* Title */}
      <Text
        fontSize="$6"
        fontWeight="700"
        color="$color"
        fontFamily="$body"
        textAlign="center"
      >
        Week in Review
      </Text>

      {/* Match prompt */}
      <WeekEndReviewMatchPrompt />

      {/* Member grid */}
      <WeekEndReviewMemberList
        members={members}
        selectedIds={selectedIds}
        onToggle={onToggleSelect}
      />

      {/* Summary */}
      <WeekEndReviewSummary selectedCount={selectedIds.length} />

      {/* Submit button */}
      {onSubmit ? (
        <XStack justifyContent="center">
          <Pressable
            onPress={handleSubmit}
            disabled={!canSubmit}
            role="button"
            aria-label="Confirm Matches"
            aria-disabled={!canSubmit}
            accessibilityRole="button"
            accessibilityState={{ disabled: !canSubmit }}
            accessibilityLabel="Confirm Matches"
            data-testid={testID ? `${testID}-submit` : undefined}
          >
            <XStack
              paddingVertical="$2"
              paddingHorizontal="$4"
              borderRadius="$3"
              backgroundColor={canSubmit ? '$color10' : '$gray6'}
              minHeight={40}
              alignItems="center"
              justifyContent="center"
              cursor={canSubmit ? 'pointer' : 'not-allowed'}
              opacity={!canSubmit ? 0.5 : 1}
            >
              <Text
                fontSize="$3"
                fontWeight="600"
                color="white"
                fontFamily="$body"
              >
                Confirm Matches
              </Text>
            </XStack>
          </Pressable>
        </XStack>
      ) : null}
    </YStack>
  )
})

export const WeekEndReview = withStaticProperties(WeekEndReviewBase, {
  MemberList: WeekEndReviewMemberList,
  MatchPrompt: WeekEndReviewMatchPrompt,
  Summary: WeekEndReviewSummary,
})
