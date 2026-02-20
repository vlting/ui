import React from 'react'
import { Check, View, XStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// MatchRequestBadge — visual indicator for match status
//
// Displays a colored dot to communicate the current match status between
// two users. Renders nothing when no request exists, a yellow dot for pending,
// and a green dot with checkmark for mutual matches.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type MatchRequestBadgeProps = {
  /** Current match status */
  status: 'none' | 'pending' | 'mutual'
  /** Optional test ID for testing */
  testID?: string
}

const PendingDot = React.memo(function PendingDot({ testID }: { testID?: string }) {
  return (
    <View
      testID={testID}
      role="status"
      aria-live="polite"
      aria-label="Match pending"
      width={12}
      height={12}
      borderRadius={9999}
      backgroundColor="$yellow10"
    />
  )
})

const MutualDot = React.memo(function MutualDot({ testID }: { testID?: string }) {
  return (
    <XStack
      testID={testID}
      role="status"
      aria-live="polite"
      aria-label="Mutual match"
      alignItems="center"
      justifyContent="center"
      width={16}
      height={16}
      borderRadius={9999}
      backgroundColor="$green10"
    >
      <Check size={10} color="white" aria-hidden />
    </XStack>
  )
})

export const MatchRequestBadge = React.memo(function MatchRequestBadge(
  props: MatchRequestBadgeProps,
) {
  const { status, testID } = props

  if (status === 'none') {
    return null
  }

  if (status === 'pending') {
    return <PendingDot testID={testID} />
  }

  return <MutualDot testID={testID} />
})
