import React, { useEffect, useMemo, useState } from 'react'
import { Clock, Text, XStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// PodCountdown — timer display for pod expiration
//
// Shows remaining time until a pod expires in "Xd Xh Xm" format.
// Updates every minute to balance accuracy and performance.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type PodCountdownProps = {
  /** When the pod ends — accepts Date object or ISO date string */
  endDate: Date | string
  /** Optional label displayed before the countdown */
  label?: string
  /** Optional test ID for testing */
  testID?: string
}

function parseEndDate(endDate: Date | string): Date {
  if (endDate instanceof Date) {
    return endDate
  }
  return new Date(endDate)
}

function formatTimeRemaining(endDate: Date): string {
  const now = Date.now()
  const end = endDate.getTime()
  const diff = end - now

  if (diff <= 0) {
    return 'Pod ended'
  }

  const totalMinutes = Math.floor(diff / 60000)
  const days = Math.floor(totalMinutes / 1440)
  const hours = Math.floor((totalMinutes % 1440) / 60)
  const minutes = totalMinutes % 60

  const parts: string[] = []
  if (days > 0) {
    parts.push(`${days}d`)
  }
  if (hours > 0 || days > 0) {
    parts.push(`${hours}h`)
  }
  parts.push(`${minutes}m`)

  return parts.join(' ')
}

export const PodCountdown = React.memo(function PodCountdown(
  props: PodCountdownProps,
) {
  const { endDate, label, testID } = props

  const parsedEndDate = useMemo(() => parseEndDate(endDate), [endDate])

  const [timeText, setTimeText] = useState(() => formatTimeRemaining(parsedEndDate))

  useEffect(() => {
    // Update immediately in case endDate changed
    setTimeText(formatTimeRemaining(parsedEndDate))

    const interval = setInterval(() => {
      setTimeText(formatTimeRemaining(parsedEndDate))
    }, 60000)

    return () => clearInterval(interval)
  }, [parsedEndDate])

  const isExpired = timeText === 'Pod ended'
  const fullAriaLabel = label
    ? `${label}: ${timeText}`
    : timeText

  return (
    <XStack
      testID={testID}
      role="timer"
      aria-live="polite"
      aria-label={fullAriaLabel}
      alignItems="center"
      gap="$2"
      paddingVertical="$1"
      paddingHorizontal="$2"
    >
      <Clock size={16} color={isExpired ? '$red10' : '$color'} aria-hidden />
      {label ? (
        <Text
          fontSize="$2"
          color="$color2"
          fontFamily="$body"
        >
          {label}
        </Text>
      ) : null}
      <Text
        fontSize="$3"
        fontWeight="600"
        color={isExpired ? '$red10' : '$color'}
        fontFamily="$body"
      >
        {timeText}
      </Text>
    </XStack>
  )
})
