import React from 'react'
import { Text, View, XStack, YStack } from '../_jsx-compat'

export type PasswordStrengthLevel = 0 | 1 | 2 | 3 | 4

export type PasswordStrengthMeterProps = {
  strength: PasswordStrengthLevel
  testID?: string
}

const strengthLabels: Record<PasswordStrengthLevel, string> = {
  0: '',
  1: 'Weak',
  2: 'Fair',
  3: 'Strong',
  4: 'Very Strong',
}

function getSegmentColor(segmentIndex: number, strength: PasswordStrengthLevel): string {
  if (strength === 0) return '$color4'
  if (strength === 1) return segmentIndex === 0 ? '$red10' : '$color4'
  if (strength === 2) return segmentIndex < 2 ? '$yellow10' : '$color4'
  if (strength === 3) return segmentIndex < 3 ? '$green8' : '$color4'
  return '$green10'
}

const StrengthAnnouncer = React.memo(function StrengthAnnouncer({ label }: { label: string }) {
  return (
    <Text
      position="absolute"
      width={1}
      height={1}
      overflow="hidden"
      aria-live="polite"
    >
      {label}
    </Text>
  )
})

export const PasswordStrengthMeter = React.memo(function PasswordStrengthMeter({
  strength,
  testID,
}: PasswordStrengthMeterProps) {
  const label = strengthLabels[strength]

  return (
    <YStack
      gap="$1"
      testID={testID}
      role="meter"
      aria-valuenow={strength}
      aria-valuemin={0}
      aria-valuemax={4}
      aria-label="Password strength"
      tabIndex={-1}
    >
      <XStack gap="$1" height={4}>
        {[0, 1, 2, 3].map((i) => (
          <View
            key={i}
            flex={1}
            height={4}
            borderRadius="$1"
            backgroundColor={getSegmentColor(i, strength)}
          />
        ))}
      </XStack>
      {label ? (
        <Text fontSize="$3" color="$color2">
          {label}
        </Text>
      ) : null}
      <StrengthAnnouncer label={label} />
    </YStack>
  )
})
