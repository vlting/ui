import React, { useCallback } from 'react'
import { Pressable } from 'react-native'
import { Minus, Plus, Text, View, XStack, YStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// AgeRangeSelector — dual-handle range selector for age preferences
//
// Provides +/- button controls for both minimum and maximum age handles,
// with a visual track showing the selected range.
// Controlled component: parent owns the [min, max] tuple via onChange.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type AgeRangeSelectorProps = {
  /** Current age range [minAge, maxAge] */
  value: [number, number]
  /** Callback when range changes */
  onChange: (value: [number, number]) => void
  /** Absolute minimum age (default: 18) */
  min?: number
  /** Absolute maximum age (default: 99) */
  max?: number
  /** Step increment (default: 1) */
  step?: number
  /** Whether the selector is disabled */
  disabled?: boolean
  /** Optional test ID for testing */
  testID?: string
}

export const AgeRangeSelector = React.memo(function AgeRangeSelector(
  props: AgeRangeSelectorProps,
) {
  const {
    value,
    onChange,
    min = 18,
    max = 99,
    step = 1,
    disabled = false,
    testID,
  } = props

  const [minAge, maxAge] = value

  const handleMinDecrement = useCallback(() => {
    if (!disabled) {
      const next = Math.max(min, minAge - step)
      onChange([next, maxAge])
    }
  }, [disabled, min, minAge, step, onChange, maxAge])

  const handleMinIncrement = useCallback(() => {
    if (!disabled) {
      const next = Math.min(maxAge, minAge + step)
      onChange([next, maxAge])
    }
  }, [disabled, maxAge, minAge, step, onChange])

  const handleMaxDecrement = useCallback(() => {
    if (!disabled) {
      const next = Math.max(minAge, maxAge - step)
      onChange([minAge, next])
    }
  }, [disabled, minAge, maxAge, step, onChange])

  const handleMaxIncrement = useCallback(() => {
    if (!disabled) {
      const next = Math.min(max, maxAge + step)
      onChange([minAge, next])
    }
  }, [disabled, max, maxAge, step, onChange, minAge])

  const range = max - min
  const leftPercent = range > 0 ? ((minAge - min) / range) * 100 : 0
  const rightPercent = range > 0 ? ((maxAge - min) / range) * 100 : 100
  const widthPercent = rightPercent - leftPercent

  return (
    <YStack
      testID={testID}
      gap="$3"
      opacity={disabled ? 0.5 : 1}
    >
      {/* Value readout */}
      <XStack alignItems="center" justifyContent="center" gap="$2">
        <Text
          fontSize="$5"
          fontWeight="700"
          color="$color"
          fontFamily="$body"
          aria-live="polite"
        >
          {minAge} - {maxAge}
        </Text>
      </XStack>

      {/* Visual track */}
      <View
        height={6}
        borderRadius="$6"
        backgroundColor="$gray4"
        position="relative"
      >
        <View
          position="absolute"
          height={6}
          borderRadius="$6"
          backgroundColor="$color10"
          left={`${leftPercent}%` as any}
          width={`${widthPercent}%` as any}
        />
      </View>

      {/* Min age controls */}
      <XStack alignItems="center" justifyContent="space-between">
        <YStack gap="$1" alignItems="center" flex={1}>
          <Text fontSize="$2" color="$color2" fontFamily="$body">
            Minimum age
          </Text>
          <XStack alignItems="center" gap="$2">
            <Pressable
              onPress={handleMinDecrement}
              disabled={disabled || minAge <= min}
              role="button"
              aria-label="Decrease minimum age"
              accessibilityRole="button"
              accessibilityLabel="Decrease minimum age"
              data-testid={testID ? `${testID}-min-decrement` : undefined}
            >
              <View
                width={32}
                height={32}
                borderRadius="$6"
                backgroundColor="$gray6"
                alignItems="center"
                justifyContent="center"
                opacity={disabled || minAge <= min ? 0.4 : 1}
                cursor={disabled || minAge <= min ? 'not-allowed' : 'pointer'}
              >
                <Minus size={14} color="$color" aria-hidden />
              </View>
            </Pressable>

            <View
              role="slider"
              aria-valuenow={minAge}
              aria-valuemin={min}
              aria-valuemax={maxAge}
              aria-valuetext={`${minAge} years`}
              aria-label="Minimum age"
              aria-disabled={disabled}
              paddingVertical="$1"
              paddingHorizontal="$3"
              borderRadius="$3"
              borderWidth={1}
              borderColor="$borderColor"
              minWidth={50}
              alignItems="center"
            >
              <Text
                fontSize="$3"
                fontWeight="600"
                color="$color"
                fontFamily="$body"
              >
                {minAge}
              </Text>
            </View>

            <Pressable
              onPress={handleMinIncrement}
              disabled={disabled || minAge >= maxAge}
              role="button"
              aria-label="Increase minimum age"
              accessibilityRole="button"
              accessibilityLabel="Increase minimum age"
              data-testid={testID ? `${testID}-min-increment` : undefined}
            >
              <View
                width={32}
                height={32}
                borderRadius="$6"
                backgroundColor="$gray6"
                alignItems="center"
                justifyContent="center"
                opacity={disabled || minAge >= maxAge ? 0.4 : 1}
                cursor={disabled || minAge >= maxAge ? 'not-allowed' : 'pointer'}
              >
                <Plus size={14} color="$color" aria-hidden />
              </View>
            </Pressable>
          </XStack>
        </YStack>

        <YStack gap="$1" alignItems="center" flex={1}>
          <Text fontSize="$2" color="$color2" fontFamily="$body">
            Maximum age
          </Text>
          <XStack alignItems="center" gap="$2">
            <Pressable
              onPress={handleMaxDecrement}
              disabled={disabled || maxAge <= minAge}
              role="button"
              aria-label="Decrease maximum age"
              accessibilityRole="button"
              accessibilityLabel="Decrease maximum age"
              data-testid={testID ? `${testID}-max-decrement` : undefined}
            >
              <View
                width={32}
                height={32}
                borderRadius="$6"
                backgroundColor="$gray6"
                alignItems="center"
                justifyContent="center"
                opacity={disabled || maxAge <= minAge ? 0.4 : 1}
                cursor={disabled || maxAge <= minAge ? 'not-allowed' : 'pointer'}
              >
                <Minus size={14} color="$color" aria-hidden />
              </View>
            </Pressable>

            <View
              role="slider"
              aria-valuenow={maxAge}
              aria-valuemin={minAge}
              aria-valuemax={max}
              aria-valuetext={`${maxAge} years`}
              aria-label="Maximum age"
              aria-disabled={disabled}
              paddingVertical="$1"
              paddingHorizontal="$3"
              borderRadius="$3"
              borderWidth={1}
              borderColor="$borderColor"
              minWidth={50}
              alignItems="center"
            >
              <Text
                fontSize="$3"
                fontWeight="600"
                color="$color"
                fontFamily="$body"
              >
                {maxAge}
              </Text>
            </View>

            <Pressable
              onPress={handleMaxIncrement}
              disabled={disabled || maxAge >= max}
              role="button"
              aria-label="Increase maximum age"
              accessibilityRole="button"
              accessibilityLabel="Increase maximum age"
              data-testid={testID ? `${testID}-max-increment` : undefined}
            >
              <View
                width={32}
                height={32}
                borderRadius="$6"
                backgroundColor="$gray6"
                alignItems="center"
                justifyContent="center"
                opacity={disabled || maxAge >= max ? 0.4 : 1}
                cursor={disabled || maxAge >= max ? 'not-allowed' : 'pointer'}
              >
                <Plus size={14} color="$color" aria-hidden />
              </View>
            </Pressable>
          </XStack>
        </YStack>
      </XStack>

      {/* Min/Max boundary labels */}
      <XStack justifyContent="space-between">
        <Text fontSize="$1" color="$color2" fontFamily="$body">
          {min}
        </Text>
        <Text fontSize="$1" color="$color2" fontFamily="$body">
          {max}
        </Text>
      </XStack>
    </YStack>
  )
})
