import React, { useCallback, useId, useMemo, useState } from 'react'
import { Popover } from 'tamagui'
import { Input, Spinner, Text, YStack } from '../_jsx-compat'

export type ComboboxOption = {
  value: string
  label: string
  description?: string
}

export type ComboboxProps = {
  options: ComboboxOption[]
  value?: string
  onChange?: (val: string) => void
  placeholder?: string
  disabled?: boolean
  error?: boolean
  loading?: boolean
  testID?: string
}

const WINDOW_SIZE = 100

// Tamagui v2 RC: Popover sub-components have broken children type — cast to bypass
type AnyFC = React.ComponentType<Record<string, unknown>>
const PopoverTrigger = Popover.Trigger as AnyFC
const PopoverContent = Popover.Content as AnyFC

export function Combobox({
  options = [],
  value,
  onChange,
  placeholder = 'Search…',
  disabled = false,
  error = false,
  loading = false,
  testID,
}: ComboboxProps) {
  const listboxId = useId()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlighted, setHighlighted] = useState(-1)

  const selectedLabel = useMemo(
    () => options.find((o) => o.value === value)?.label ?? '',
    [options, value],
  )

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    const all = q
      ? options.filter(
          (o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q),
        )
      : options
    return all.slice(0, WINDOW_SIZE)
  }, [options, query])

  const handleOpen = useCallback(() => {
    if (!disabled) {
      setOpen(true)
      setQuery(selectedLabel)
      setHighlighted(-1)
    }
  }, [disabled, selectedLabel])

  const handleSelect = useCallback(
    (opt: ComboboxOption) => {
      onChange?.(opt.value)
      setQuery(opt.label)
      setOpen(false)
    },
    [onChange],
  )

  const handleKeyDown = useCallback(
    (key: string) => {
      if (!open) {
        if (key === 'ArrowDown') handleOpen()
        return
      }
      if (key === 'ArrowDown') {
        setHighlighted((h) => Math.min(h + 1, filtered.length - 1))
      } else if (key === 'ArrowUp') {
        setHighlighted((h) => Math.max(h - 1, 0))
      } else if (key === 'Enter') {
        if (highlighted >= 0 && filtered[highlighted]) {
          handleSelect(filtered[highlighted])
        }
      } else if (key === 'Escape') {
        setOpen(false)
        setQuery(selectedLabel)
      }
    },
    [open, filtered, highlighted, handleOpen, handleSelect, selectedLabel],
  )

  return (
    <Popover open={open} onOpenChange={setOpen} placement="bottom-start">
      <PopoverTrigger asChild>
        <Input
          value={query || selectedLabel}
          onChangeText={(text: string) => {
            setQuery(text)
            setOpen(true)
          }}
          onFocus={handleOpen}
          placeholder={placeholder}
          disabled={disabled}
          borderColor={error ? '$red10' : undefined}
          testID={testID}
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={highlighted >= 0 ? `${listboxId}-opt-${highlighted}` : undefined}
          onKeyPress={({ nativeEvent }: { nativeEvent: { key: string } }) =>
            handleKeyDown(nativeEvent.key)
          }
        />
      </PopoverTrigger>
      <PopoverContent width="100%" padding={0}>
        <YStack
          backgroundColor="$background"
          borderWidth={1}
          borderColor="$borderColor"
          borderRadius="$3"
          overflow="hidden"
          maxHeight={240}
          role="listbox"
          id={listboxId}
        >
          {loading ? (
            <YStack padding="$3" alignItems="center">
              <Spinner size="small" />
            </YStack>
          ) : filtered.length === 0 ? (
            <YStack padding="$3">
              <Text fontSize="$3" color="$color2">
                No results
              </Text>
            </YStack>
          ) : (
            filtered.map((opt, i) => (
              <YStack
                key={opt.value}
                id={`${listboxId}-opt-${i}`}
                onPress={() => handleSelect(opt)}
                paddingHorizontal="$3"
                paddingVertical="$2"
                backgroundColor={i === highlighted ? '$backgroundHover' : undefined}
                hoverStyle={{ backgroundColor: '$backgroundHover' }}
                pressStyle={{ backgroundColor: '$backgroundPress' }}
                role="option"
                aria-selected={opt.value === value}
              >
                <Text fontSize="$4" color="$color">
                  {opt.label}
                </Text>
                {opt.description ? (
                  <Text fontSize="$3" color="$color2">
                    {opt.description}
                  </Text>
                ) : null}
              </YStack>
            ))
          )}
        </YStack>
      </PopoverContent>
    </Popover>
  )
}
