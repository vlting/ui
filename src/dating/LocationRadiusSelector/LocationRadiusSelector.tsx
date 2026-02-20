import React, { useCallback, useMemo } from 'react'
import { Pressable } from 'react-native'
import { MapPin, Minus, Plus, Text, View, XStack, YStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// LocationRadiusSelector — slider control for location radius
//
// Provides +/- button controls and a visual track for selecting a geographic
// search radius. Supports km/mi unit toggle.
// Controlled component: parent owns value via onChange.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type LocationRadiusSelectorProps = {
  /** Current radius value */
  value: number
  /** Callback when value changes */
  onChange: (value: number) => void
  /** Minimum radius (default: 1) */
  min?: number
  /** Maximum radius (default: 100) */
  max?: number
  /** Step increment (default: 1) */
  step?: number
  /** Distance unit (default: 'km') */
  unit?: 'km' | 'mi'
  /** Callback when unit changes */
  onUnitChange?: (unit: 'km' | 'mi') => void
  /** Whether the selector is disabled */
  disabled?: boolean
  /** Optional test ID for testing */
  testID?: string
}

export const LocationRadiusSelector = React.memo(function LocationRadiusSelector(
  props: LocationRadiusSelectorProps,
) {
  const {
    value,
    onChange,
    min = 1,
    max = 100,
    step = 1,
    unit = 'km',
    onUnitChange,
    disabled = false,
    testID,
  } = props

  const clamp = useCallback(
    (v: number) => Math.min(max, Math.max(min, v)),
    [min, max],
  )

  const handleDecrement = useCallback(() => {
    if (!disabled) {
      onChange(clamp(value - step))
    }
  }, [disabled, onChange, clamp, value, step])

  const handleIncrement = useCallback(() => {
    if (!disabled) {
      onChange(clamp(value + step))
    }
  }, [disabled, onChange, clamp, value, step])

  const handleUnitToggle = useCallback(() => {
    if (onUnitChange) {
      onUnitChange(unit === 'km' ? 'mi' : 'km')
    }
  }, [onUnitChange, unit])

  const unitLabel = unit === 'km' ? 'kilometers' : 'miles'
  const valueText = `${value} ${unitLabel}`
  const fillPercent = useMemo(
    () => ((value - min) / (max - min)) * 100,
    [value, min, max],
  )

  return (
    <YStack
      testID={testID}
      gap="$3"
      opacity={disabled ? 0.5 : 1}
    >
      {/* Header: icon + value readout */}
      <XStack alignItems="center" gap="$2">
        <MapPin size={18} color="$color" aria-hidden />
        <Text
          fontSize="$5"
          fontWeight="700"
          color="$color"
          fontFamily="$body"
          aria-live="polite"
        >
          {value} {unit}
        </Text>
        {onUnitChange ? (
          <Pressable
            onPress={handleUnitToggle}
            disabled={disabled}
            role="button"
            aria-label={`Switch to ${unit === 'km' ? 'miles' : 'kilometers'}`}
            accessibilityRole="button"
            accessibilityLabel={`Switch to ${unit === 'km' ? 'miles' : 'kilometers'}`}
          >
            <View
              paddingVertical="$1"
              paddingHorizontal="$2"
              borderRadius="$3"
              borderWidth={1}
              borderColor="$borderColor"
              cursor={disabled ? 'not-allowed' : 'pointer'}
            >
              <Text
                fontSize="$2"
                color="$color"
                fontFamily="$body"
              >
                {unit === 'km' ? 'mi' : 'km'}
              </Text>
            </View>
          </Pressable>
        ) : null}
      </XStack>

      {/* Slider track + controls */}
      <XStack alignItems="center" gap="$2">
        {/* Decrement button */}
        <Pressable
          onPress={handleDecrement}
          disabled={disabled || value <= min}
          role="button"
          aria-label="Decrease radius"
          accessibilityRole="button"
          accessibilityLabel="Decrease radius"
          data-testid={testID ? `${testID}-decrement` : undefined}
        >
          <View
            width={36}
            height={36}
            borderRadius="$6"
            backgroundColor="$gray6"
            alignItems="center"
            justifyContent="center"
            opacity={disabled || value <= min ? 0.4 : 1}
            cursor={disabled || value <= min ? 'not-allowed' : 'pointer'}
          >
            <Minus size={16} color="$color" aria-hidden />
          </View>
        </Pressable>

        {/* Visual track */}
        <View
          role="slider"
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuetext={valueText}
          aria-label="Location radius"
          aria-disabled={disabled}
          flex={1}
          height={6}
          borderRadius="$6"
          backgroundColor="$gray4"
          overflow="hidden"
        >
          <View
            height={6}
            borderRadius="$6"
            backgroundColor="$blue10"
            width={`${fillPercent}%` as any}
          />
        </View>

        {/* Increment button */}
        <Pressable
          onPress={handleIncrement}
          disabled={disabled || value >= max}
          role="button"
          aria-label="Increase radius"
          accessibilityRole="button"
          accessibilityLabel="Increase radius"
          data-testid={testID ? `${testID}-increment` : undefined}
        >
          <View
            width={36}
            height={36}
            borderRadius="$6"
            backgroundColor="$gray6"
            alignItems="center"
            justifyContent="center"
            opacity={disabled || value >= max ? 0.4 : 1}
            cursor={disabled || value >= max ? 'not-allowed' : 'pointer'}
          >
            <Plus size={16} color="$color" aria-hidden />
          </View>
        </Pressable>
      </XStack>

      {/* Min/Max labels */}
      <XStack justifyContent="space-between">
        <Text fontSize="$1" color="$color2" fontFamily="$body">
          {min} {unit}
        </Text>
        <Text fontSize="$1" color="$color2" fontFamily="$body">
          {max} {unit}
        </Text>
      </XStack>
    </YStack>
  )
})
