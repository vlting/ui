import React from 'react'
import { withStaticProperties } from 'tamagui'
import { Separator, Text, Users, XStack, YStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// PodView — main pod container/layout component
//
// Provides named slot sections: Header, MemberGrid, Activity, Countdown.
// Each section renders children for flexible composition.
// Compound component pattern for pod display.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type PodViewProps = {
  podName?: string
  memberCount?: number
  daysRemaining?: number
  children?: React.ReactNode
  testID?: string
}

// ---------------------------------------------------------------------------
// Sub-components for composition
// ---------------------------------------------------------------------------

type PodViewHeaderProps = {
  podName?: string
  memberCount?: number
  children?: React.ReactNode
}

const PodViewHeader = React.memo(function PodViewHeader(
  props: PodViewHeaderProps,
) {
  const { podName = 'Your Pod', memberCount, children } = props

  return (
    <YStack gap="$2">
      <XStack alignItems="center" gap="$2">
        <Users size={20} color="$color" aria-hidden />
        <Text
          fontSize="$5"
          fontWeight="700"
          color="$color"
          fontFamily="$body"
          flex={1}
        >
          {podName}
        </Text>
        {memberCount != null ? (
          <Text
            fontSize="$3"
            color="$color2"
            fontFamily="$body"
          >
            {memberCount} {memberCount === 1 ? 'member' : 'members'}
          </Text>
        ) : null}
      </XStack>
      {children}
    </YStack>
  )
})

type PodViewMemberGridProps = {
  children?: React.ReactNode
}

const PodViewMemberGrid = React.memo(function PodViewMemberGrid(
  props: PodViewMemberGridProps,
) {
  return (
    <YStack gap="$2">
      <Text
        fontSize="$3"
        fontWeight="600"
        color="$color"
        fontFamily="$body"
      >
        Members
      </Text>
      <XStack flexWrap="wrap" gap="$3" role="group" aria-label="Pod members">
        {props.children}
      </XStack>
    </YStack>
  )
})

type PodViewActivityProps = {
  children?: React.ReactNode
}

const PodViewActivity = React.memo(function PodViewActivity(
  props: PodViewActivityProps,
) {
  return (
    <YStack gap="$2">
      <Text
        fontSize="$3"
        fontWeight="600"
        color="$color"
        fontFamily="$body"
      >
        Activity
      </Text>
      {props.children}
    </YStack>
  )
})

type PodViewCountdownProps = {
  children?: React.ReactNode
}

const PodViewCountdown = React.memo(function PodViewCountdown(
  props: PodViewCountdownProps,
) {
  return (
    <YStack gap="$2">
      <Text
        fontSize="$3"
        fontWeight="600"
        color="$color"
        fontFamily="$body"
      >
        Time Remaining
      </Text>
      {props.children}
    </YStack>
  )
})

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const PodViewBase = React.memo(function PodViewBase(
  props: PodViewProps,
) {
  const {
    podName = 'Your Pod',
    memberCount,
    // daysRemaining is available via props for consuming apps
    daysRemaining: _daysRemaining,
    children,
    testID,
  } = props

  return (
    <YStack
      testID={testID}
      role="region"
      aria-label={podName}
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      padding="$4"
      gap="$4"
    >
      {/* Header */}
      <PodViewHeader podName={podName} memberCount={memberCount} />

      <Separator />

      {/* Children (composed sections) */}
      {children}
    </YStack>
  )
})

export const PodView = withStaticProperties(PodViewBase, {
  Header: PodViewHeader,
  MemberGrid: PodViewMemberGrid,
  Activity: PodViewActivity,
  Countdown: PodViewCountdown,
})
