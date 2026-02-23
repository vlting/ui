import type { ComponentType } from 'react'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Text, View } from 'tamagui'
import { styledHtml } from '@tamagui/web'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

const InputFrame = styledHtml('input', {
  display: 'flex',
  width: '100%',
  backgroundColor: 'transparent',
  fontSize: 14,
  fontFamily: '$body',
  color: '$color',
  outline: 'none',
  border: 'none',
  padding: 0,
} as any)

const InputJsx = InputFrame as AnyFC

export interface ComboboxOption {
  value: string
  label: string
}

export interface ComboboxRootProps {
  children?: React.ReactNode
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  disabled?: boolean
}

export interface ComboboxItemProps {
  value: string
  label: string
  isSelected: boolean
  onSelect: () => void
}

function Root({
  options,
  value,
  onValueChange,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No results found.',
  disabled,
}: ComboboxRootProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [highlightIndex, setHighlightIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(
    () =>
      options.filter((o) =>
        o.label.toLowerCase().includes(search.toLowerCase()),
      ),
    [options, search],
  )

  const selectedLabel = options.find((o) => o.value === value)?.label

  const handleSelect = useCallback(
    (optionValue: string) => {
      onValueChange?.(optionValue)
      setOpen(false)
      setSearch('')
    },
    [onValueChange],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlightIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filtered[highlightIndex]) {
          handleSelect(filtered[highlightIndex].value)
        }
      } else if (e.key === 'Escape') {
        setOpen(false)
        setSearch('')
      }
    },
    [filtered, highlightIndex, handleSelect],
  )

  return (
    <ViewJsx position="relative" width="100%">
      {/* Trigger */}
      <ViewJsx
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        height={36}
        paddingLeft={12}
        paddingRight={12}
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$4"
        backgroundColor="$background"
        cursor={disabled ? 'not-allowed' : 'pointer'}
        opacity={disabled ? 0.5 : 1}
        onPress={disabled ? undefined : () => {
          setOpen(!open)
          setTimeout(() => inputRef.current?.focus(), 0)
        }}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <TextJsx fontSize={14} fontFamily="$body" color={value ? '$color' : '$placeholderColor'}>
          {selectedLabel ?? placeholder}
        </TextJsx>
        <TextJsx fontSize={12} color="$colorSubtitle">{open ? '\u25B2' : '\u25BC'}</TextJsx>
      </ViewJsx>

      {/* Dropdown */}
      {open && (
        <ViewJsx
          position="absolute"
          top="100%"
          left={0}
          right={0}
          marginTop={4}
          backgroundColor="$background"
          borderWidth={1}
          borderColor="$borderColor"
          borderRadius="$4"
          zIndex={50}
          overflow="hidden"
          style={{ boxShadow: 'var(--shadowMd)' }}
        >
          {/* Search input */}
          <ViewJsx
            flexDirection="row"
            alignItems="center"
            paddingLeft={12}
            paddingRight={12}
            height={36}
            borderBottomWidth={1}
            borderBottomColor="$borderColor"
          >
            <InputJsx
              ref={inputRef}
              value={search}
              onChange={(e: any) => {
                setSearch(e.target.value)
                setHighlightIndex(0)
              }}
              onKeyDown={handleKeyDown}
              placeholder={searchPlaceholder}
              aria-label="Search options"
            />
          </ViewJsx>

          {/* Options */}
          <ViewJsx maxHeight={200} style={{ overflowY: 'auto' }} role="listbox">
            {filtered.length === 0 ? (
              <ViewJsx padding={12} alignItems="center">
                <TextJsx fontSize={14} color="$colorSubtitle" fontFamily="$body">
                  {emptyMessage}
                </TextJsx>
              </ViewJsx>
            ) : (
              filtered.map((option, i) => {
                const isSelected = option.value === value
                const isHighlighted = i === highlightIndex
                return (
                  <ViewJsx
                    key={option.value}
                    flexDirection="row"
                    alignItems="center"
                    height={36}
                    paddingLeft={12}
                    paddingRight={12}
                    cursor="pointer"
                    backgroundColor={isHighlighted ? '$color2' : 'transparent'}
                    onPress={() => handleSelect(option.value)}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <ViewJsx width={16}>
                      {isSelected && (
                        <TextJsx fontSize={12} color="$color">{'\u2713'}</TextJsx>
                      )}
                    </ViewJsx>
                    <TextJsx
                      fontSize={14}
                      fontFamily="$body"
                      color="$color"
                      fontWeight={isSelected ? '500' : '400'}
                    >
                      {option.label}
                    </TextJsx>
                  </ViewJsx>
                )
              })
            )}
          </ViewJsx>
        </ViewJsx>
      )}
    </ViewJsx>
  )
}

export const Combobox = { Root }
