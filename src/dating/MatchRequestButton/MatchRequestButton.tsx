import React, { useCallback } from 'react'
import { CheckCircle, Heart, Text, X, XStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// MatchRequestButton — action button for sending/cancelling match requests
//
// Provides contextual actions based on the current match status between users.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type MatchRequestButtonProps = {
  /** Current match request status */
  status: 'none' | 'sent' | 'received' | 'mutual'
  /** Callback when button is pressed */
  onPress?: () => void
  /** Whether the button is disabled */
  disabled?: boolean
  /** Optional test ID for testing */
  testID?: string
}

type StatusConfig = {
  label: string
  ariaLabel: string
  icon: React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>
  backgroundColor: string
  textColor: string
  isDisabled: boolean
}

function getStatusConfig(status: MatchRequestButtonProps['status']): StatusConfig {
  switch (status) {
    case 'none':
      return {
        label: 'Send Match Request',
        ariaLabel: 'Send match request',
        icon: Heart,
        backgroundColor: '$color10',
        textColor: 'white',
        isDisabled: false,
      }
    case 'sent':
      return {
        label: 'Cancel Request',
        ariaLabel: 'Cancel match request',
        icon: X,
        backgroundColor: '$gray6',
        textColor: '$color',
        isDisabled: false,
      }
    case 'received':
      return {
        label: 'Match Back!',
        ariaLabel: 'Accept match request',
        icon: Heart,
        backgroundColor: '$color10',
        textColor: 'white',
        isDisabled: false,
      }
    case 'mutual':
      return {
        label: 'Matched!',
        ariaLabel: 'Already matched',
        icon: CheckCircle,
        backgroundColor: '$green10',
        textColor: 'white',
        isDisabled: true,
      }
  }
}

export const MatchRequestButton = React.memo(function MatchRequestButton(
  props: MatchRequestButtonProps,
) {
  const { status, onPress, disabled, testID } = props
  const config = getStatusConfig(status)
  const isDisabled = disabled || config.isDisabled

  const handlePress = useCallback(() => {
    if (!isDisabled && onPress) {
      onPress()
    }
  }, [isDisabled, onPress])

  const IconComponent = config.icon

  return (
    <XStack
      testID={testID}
      onPress={handlePress}
      role="button"
      aria-label={config.ariaLabel}
      aria-disabled={isDisabled}
      alignItems="center"
      justifyContent="center"
      gap="$2"
      paddingVertical="$2"
      paddingHorizontal="$4"
      borderRadius="$4"
      minHeight={44}
      backgroundColor={config.backgroundColor}
      opacity={isDisabled ? 0.5 : 1}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
    >
      <IconComponent size={18} color={config.textColor} aria-hidden />
      <Text
        fontSize="$3"
        fontWeight="600"
        color={config.textColor}
        fontFamily="$body"
      >
        {config.label}
      </Text>
    </XStack>
  )
})
