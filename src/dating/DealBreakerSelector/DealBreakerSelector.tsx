import React, { useCallback, useMemo } from 'react'
import { Pressable } from 'react-native'
import { Check, Text, XStack, YStack } from '../_jsx-compat'

// ---------------------------------------------------------------------------
// DealBreakerSelector — multi-select for deal-breaker traits
//
// Renders a list of toggleable checkbox items, optionally grouped by category.
// Controlled component: parent owns the value array via onChange.
// Presentation-only — no business logic or data fetching.
// ---------------------------------------------------------------------------

export type DealBreakerOption = {
  id: string
  label: string
  category?: string
}

export type DealBreakerSelectorProps = {
  /** Available deal-breaker options */
  options: DealBreakerOption[]
  /** Currently selected option IDs */
  value: string[]
  /** Callback when selection changes */
  onChange: (value: string[]) => void
  /** Optional test ID for testing */
  testID?: string
}

const DealBreakerItem = React.memo(function DealBreakerItem(props: {
  option: DealBreakerOption
  selected: boolean
  onToggle: (id: string) => void
}) {
  const { option, selected, onToggle } = props

  const handlePress = useCallback(() => {
    onToggle(option.id)
  }, [onToggle, option.id])

  return (
    <Pressable
      onPress={handlePress}
      role="checkbox"
      aria-checked={selected}
      aria-label={option.label}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={option.label}
    >
      <XStack
        alignItems="center"
        gap="$2"
        paddingVertical="$2"
        paddingHorizontal="$3"
        borderRadius="$3"
        borderWidth={1}
        borderColor={selected ? '$blue10' : '$borderColor'}
        backgroundColor={selected ? '$blue10' : 'transparent'}
        minHeight={44}
        cursor="pointer"
      >
        <XStack
          width={20}
          height={20}
          borderRadius="$2"
          borderWidth={selected ? 0 : 2}
          borderColor="$borderColor"
          backgroundColor={selected ? 'white' : 'transparent'}
          alignItems="center"
          justifyContent="center"
        >
          {selected ? (
            <Check size={14} color="$blue10" aria-hidden />
          ) : null}
        </XStack>
        <Text
          fontSize="$3"
          fontWeight={selected ? '600' : '400'}
          color={selected ? 'white' : '$color'}
          fontFamily="$body"
          flex={1}
        >
          {option.label}
        </Text>
      </XStack>
    </Pressable>
  )
})

export const DealBreakerSelector = React.memo(function DealBreakerSelector(
  props: DealBreakerSelectorProps,
) {
  const { options, value, onChange, testID } = props

  const selectedSet = useMemo(() => new Set(value), [value])

  const handleToggle = useCallback(
    (id: string) => {
      if (selectedSet.has(id)) {
        onChange(value.filter((v) => v !== id))
      } else {
        onChange([...value, id])
      }
    },
    [selectedSet, value, onChange],
  )

  // Group options by category if categories exist
  const grouped = useMemo(() => {
    const hasCategories = options.some((o) => o.category != null)
    if (!hasCategories) {
      return [{ category: null, items: options }]
    }
    const groups: { category: string | null; items: DealBreakerOption[] }[] = []
    const seen = new Map<string, DealBreakerOption[]>()
    for (const option of options) {
      const cat = option.category ?? ''
      if (!seen.has(cat)) {
        const items: DealBreakerOption[] = []
        seen.set(cat, items)
        groups.push({ category: option.category ?? null, items })
      }
      seen.get(cat)!.push(option)
    }
    return groups
  }, [options])

  return (
    <YStack
      testID={testID}
      role="group"
      aria-label="Deal-breakers"
      gap="$3"
    >
      {grouped.map((group, groupIdx) => (
        <YStack key={group.category ?? `group-${groupIdx}`} gap="$2">
          {group.category ? (
            <Text
              fontSize="$2"
              fontWeight="700"
              color="$color2"
              fontFamily="$body"
              paddingHorizontal="$3"
              textTransform="uppercase"
            >
              {group.category}
            </Text>
          ) : null}
          {group.items.map((option) => (
            <DealBreakerItem
              key={option.id}
              option={option}
              selected={selectedSet.has(option.id)}
              onToggle={handleToggle}
            />
          ))}
        </YStack>
      ))}
    </YStack>
  )
})
