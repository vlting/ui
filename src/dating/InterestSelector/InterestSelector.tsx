import React, { useCallback, useMemo } from 'react'
import { Pressable } from 'react-native'
import { Check, Text, View, XStack, YStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// InterestSelector — chip selector for user interests
//
// Renders a flex-wrap grid of toggleable chips for selecting interests.
// Uses controlled state: parent owns the value array and onChange callback.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type InterestItem = {
  id: string
  label: string
}

export type InterestSelectorProps = {
  /** Available interest items */
  interests: InterestItem[]
  /** Currently selected interest IDs */
  value: string[]
  /** Callback when selection changes */
  onChange: (value: string[]) => void
  /** Maximum number of interests that can be selected */
  maxSelections?: number
  /** Optional test ID for testing */
  testID?: string
}

const InterestChip = React.memo(function InterestChip(props: {
  item: InterestItem
  selected: boolean
  disabled: boolean
  onToggle: (id: string) => void
}) {
  const { item, selected, disabled, onToggle } = props

  const handlePress = useCallback(() => {
    if (!disabled || selected) {
      onToggle(item.id)
    }
  }, [disabled, selected, onToggle, item.id])

  const isInteractive = selected || !disabled

  return (
    <Pressable
      onPress={handlePress}
      disabled={!isInteractive}
      role="checkbox"
      aria-checked={selected}
      aria-disabled={disabled && !selected}
      aria-label={item.label}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected, disabled: disabled && !selected }}
      accessibilityLabel={item.label}
    >
      <XStack
        alignItems="center"
        gap="$1"
        paddingVertical="$1"
        paddingHorizontal="$3"
        borderRadius="$6"
        borderWidth={1}
        borderColor={selected ? '$blue10' : '$borderColor'}
        backgroundColor={selected ? '$blue10' : 'transparent'}
        opacity={disabled && !selected ? 0.4 : 1}
        minHeight={36}
        cursor={isInteractive ? 'pointer' : 'not-allowed'}
      >
        {selected ? (
          <Check size={14} color="white" aria-hidden />
        ) : null}
        <Text
          fontSize="$2"
          fontWeight={selected ? '600' : '400'}
          color={selected ? 'white' : '$color'}
          fontFamily="$body"
        >
          {item.label}
        </Text>
      </XStack>
    </Pressable>
  )
})

export const InterestSelector = React.memo(function InterestSelector(
  props: InterestSelectorProps,
) {
  const { interests, value, onChange, maxSelections, testID } = props

  const selectedSet = useMemo(() => new Set(value), [value])
  const isAtLimit = maxSelections != null && value.length >= maxSelections

  const handleToggle = useCallback(
    (id: string) => {
      if (selectedSet.has(id)) {
        onChange(value.filter((v) => v !== id))
      } else if (!isAtLimit) {
        onChange([...value, id])
      }
    },
    [selectedSet, value, onChange, isAtLimit],
  )

  const countText = maxSelections != null
    ? `${value.length}/${maxSelections} selected`
    : undefined

  return (
    <YStack
      testID={testID}
      role="group"
      aria-label="Select your interests"
      gap="$2"
    >
      <XStack
        flexWrap="wrap"
        gap="$2"
      >
        {interests.map((item) => (
          <InterestChip
            key={item.id}
            item={item}
            selected={selectedSet.has(item.id)}
            disabled={isAtLimit}
            onToggle={handleToggle}
          />
        ))}
      </XStack>
      {countText ? (
        <View aria-live="polite">
          <Text
            fontSize="$2"
            color="$color2"
            fontFamily="$body"
          >
            {countText}
          </Text>
        </View>
      ) : null}
    </YStack>
  )
})
