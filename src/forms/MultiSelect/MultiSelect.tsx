import React, { useCallback, useId, useState } from 'react'
import { Popover } from 'tamagui'
import { Check, ChevronDown, Text, XStack, YStack } from '../_jsx-compat'

// Tamagui v2 RC: Popover sub-components have broken children type — cast to bypass
type AnyFC = React.ComponentType<Record<string, unknown>>
const PopoverTrigger = Popover.Trigger as AnyFC
const PopoverContent = Popover.Content as AnyFC

export type MultiSelectOption = {
  value: string
  label: string
}

export type MultiSelectProps = {
  options: MultiSelectOption[]
  value?: string[]
  onChange?: (vals: string[]) => void
  placeholder?: string
  disabled?: boolean
  error?: boolean
  testID?: string
}

export function MultiSelect({
  options = [],
  value = [],
  onChange,
  placeholder = 'Select…',
  disabled = false,
  error = false,
  testID,
}: MultiSelectProps) {
  const listboxId = useId()
  const [open, setOpen] = useState(false)

  const toggle = useCallback(
    (optValue: string) => {
      if (value.includes(optValue)) {
        onChange?.(value.filter((v) => v !== optValue))
      } else {
        onChange?.([...value, optValue])
      }
    },
    [value, onChange],
  )

  const selectedLabels = options.filter((o) => value.includes(o.value)).map((o) => o.label)

  const triggerLabel =
    value.length === 0
      ? placeholder
      : value.length <= 3
        ? selectedLabels.join(', ')
        : `${value.length} selected`

  return (
    <Popover
      open={open}
      onOpenChange={disabled ? undefined : setOpen}
      placement="bottom-start"
    >
      <PopoverTrigger asChild>
        <XStack
          testID={testID}
          alignItems="center"
          justifyContent="space-between"
          paddingHorizontal="$3"
          paddingVertical="$2"
          borderWidth={1}
          borderColor={error ? '$red10' : '$borderColor'}
          borderRadius="$3"
          backgroundColor="$background"
          minHeight="$4"
          opacity={disabled ? 0.5 : 1}
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-disabled={disabled}
          hoverStyle={disabled ? {} : { borderColor: '$borderColorHover' }}
        >
          {value.length > 0 && value.length <= 3 ? (
            <XStack gap="$1" flexWrap="wrap" flex={1}>
              {selectedLabels.map((label) => (
                <XStack
                  key={label}
                  paddingHorizontal="$2"
                  paddingVertical="$0.5"
                  borderRadius="$1"
                  backgroundColor="$color3"
                >
                  <Text fontSize="$3" color="$color">
                    {label}
                  </Text>
                </XStack>
              ))}
            </XStack>
          ) : (
            <Text
              fontSize="$4"
              color={value.length === 0 ? '$placeholderColor' : '$color'}
              flex={1}
            >
              {triggerLabel}
            </Text>
          )}
          <ChevronDown size={16} color="$color2" />
        </XStack>
      </PopoverTrigger>
      <PopoverContent width="100%" padding={0}>
        <YStack
          maxHeight={240}
          backgroundColor="$background"
          borderWidth={1}
          borderColor="$borderColor"
          borderRadius="$3"
          overflow="hidden"
          role="listbox"
          aria-multiselectable="true"
          id={listboxId}
        >
          {options.map((opt) => {
            const selected = value.includes(opt.value)
            return (
              <XStack
                key={opt.value}
                alignItems="center"
                justifyContent="space-between"
                paddingHorizontal="$3"
                paddingVertical="$2"
                onPress={() => toggle(opt.value)}
                hoverStyle={{ backgroundColor: '$backgroundHover' }}
                pressStyle={{ backgroundColor: '$backgroundPress' }}
                role="option"
                aria-selected={selected}
              >
                <Text fontSize="$4" color="$color">
                  {opt.label}
                </Text>
                {selected && <Check size={16} color="$color" />}
              </XStack>
            )
          })}
        </YStack>
      </PopoverContent>
    </Popover>
  )
}
