import React from 'react'
import { withStaticProperties } from 'tamagui'
import { Separator, Text, Users, XStack, YStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// PodIntro — welcome screen for a new pod week
//
// Shows a welcome message, members slot, and first activity slot.
// Compound component with sub-components for flexible composition.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type PodIntroProps = {
  podName?: string
  memberCount?: number
  children?: React.ReactNode
  testID?: string
}

// ---------------------------------------------------------------------------
// Sub-components for composition
// ---------------------------------------------------------------------------

type PodIntroWelcomeProps = {
  podName?: string
  memberCount?: number
  children?: React.ReactNode
}

const PodIntroWelcome = React.memo(function PodIntroWelcome(
  props: PodIntroWelcomeProps,
) {
  const { podName = 'Your Pod', memberCount, children } = props

  return (
    <YStack gap="$3" alignItems="center">
      <XStack
        alignItems="center"
        justifyContent="center"
        width={48}
        height={48}
        borderRadius={24}
        backgroundColor="$blue3"
      >
        <Users size={24} color="$blue10" aria-hidden />
      </XStack>

      <Text
        fontSize="$6"
        fontWeight="700"
        color="$color"
        fontFamily="$body"
        textAlign="center"
      >
        Welcome to {podName}!
      </Text>

      {memberCount != null ? (
        <Text
          fontSize="$3"
          color="$color2"
          fontFamily="$body"
          textAlign="center"
        >
          You've been matched with {memberCount} people this week
        </Text>
      ) : null}

      {children}
    </YStack>
  )
})

type PodIntroMembersProps = {
  children?: React.ReactNode
}

const PodIntroMembers = React.memo(function PodIntroMembers(
  props: PodIntroMembersProps,
) {
  return (
    <YStack gap="$2">
      <Text
        fontSize="$3"
        fontWeight="600"
        color="$color"
        fontFamily="$body"
      >
        Your Pod Members
      </Text>
      {props.children}
    </YStack>
  )
})

type PodIntroFirstActivityProps = {
  children?: React.ReactNode
}

const PodIntroFirstActivity = React.memo(function PodIntroFirstActivity(
  props: PodIntroFirstActivityProps,
) {
  return (
    <YStack gap="$2">
      <Text
        fontSize="$3"
        fontWeight="600"
        color="$color"
        fontFamily="$body"
      >
        Your first activity is ready!
      </Text>
      {props.children}
    </YStack>
  )
})

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const PodIntroBase = React.memo(function PodIntroBase(
  props: PodIntroProps,
) {
  const {
    podName = 'Your Pod',
    memberCount,
    children,
    testID,
  } = props

  return (
    <YStack
      testID={testID}
      role="region"
      aria-label="Pod introduction"
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      padding="$4"
      gap="$4"
    >
      {/* Welcome */}
      <PodIntroWelcome podName={podName} memberCount={memberCount} />

      <Separator />

      {/* Children (composed sections) */}
      {children}
    </YStack>
  )
})

export const PodIntro = withStaticProperties(PodIntroBase, {
  Welcome: PodIntroWelcome,
  Members: PodIntroMembers,
  FirstActivity: PodIntroFirstActivity,
})
