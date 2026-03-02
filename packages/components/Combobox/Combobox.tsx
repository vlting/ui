import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'
import type React from 'react'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Text, View } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

function ChevronsUpDownSvg() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
      <path d="M7 15l5 5 5-5" />
      <path d="M7 9l5-5 5 5" />
    </svg>
  )
}

function CheckSvg() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

const BtnFrame = styledHtml('button', {
  display: 'flex',
  flexDirection: 'row',
  boxSizing: 'border-box',
  appearance: 'none',
  border: 'none',
  background: 'none',
  padding: 0,
  margin: 0,
  fontFamily: 'inherit',
  cursor: 'pointer',
  textAlign: 'left',
  focusVisibleStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },
} as any)
const BtnJsx = BtnFrame as AnyFC

const InputFrame = styledHtml('input', {
  display: 'flex',
  width: '100%',
  backgroundColor: 'transparent',
  fontSize: '$4',
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
    () => options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase())),
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
      <BtnJsx
        type="button"
        alignItems="center"
        justifyContent="space-between"
        height="$4"
        paddingLeft="$2"
        paddingRight="$2"
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$4"
        backgroundColor="$background"
        cursor={disabled ? 'not-allowed' : 'pointer'}
        opacity={disabled ? 0.5 : 1}
        disabled={disabled}
        hoverStyle={disabled ? undefined : { borderColor: '$color8' }}
        onClick={
          disabled
            ? undefined
            : () => {
                setOpen(!open)
                setTimeout(() => inputRef.current?.focus(), 0)
              }
        }
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <TextJsx
          fontSize="$3"
          fontFamily="$body"
          color={value ? '$color' : '$placeholderColor'}
        >
          {selectedLabel ?? placeholder}
        </TextJsx>
        <ChevronsUpDownSvg />
      </BtnJsx>

      {/* Dropdown */}
      {open && (
        <ViewJsx
          position="absolute"
          top="100%"
          left={0}
          right={0}
          marginTop="$0.5"
          backgroundColor="$background"
          borderWidth={1}
          borderColor="$borderColor"
          borderRadius="$4"
          zIndex="$5"
          overflow="hidden"
          style={{ boxShadow: 'var(--shadowMd)' }}
        >
          {/* Search input */}
          <ViewJsx
            flexDirection="row"
            alignItems="center"
            paddingLeft="$2"
            paddingRight="$2"
            height="$4"
            borderBottomWidth={1}
            borderColor="$borderColor"
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
          <ViewJsx maxHeight="$14" padding="$1" style={{ overflowY: 'auto' }} role="listbox">
            {filtered.length === 0 ? (
              <ViewJsx padding="$2" alignItems="center">
                <TextJsx fontSize="$3" color="$colorSubtitle" fontFamily="$body">
                  {emptyMessage}
                </TextJsx>
              </ViewJsx>
            ) : (
              filtered.map((option, i) => {
                const isSelected = option.value === value
                const isHighlighted = i === highlightIndex
                return (
                  <BtnJsx
                    key={option.value}
                    type="button"
                    alignItems="center"
                    width="100%"
                    height="$4"
                    paddingLeft="$2"
                    paddingRight="$2"
                    paddingVertical="$1"
                    borderRadius="$2"
                    backgroundColor={isHighlighted ? '$color3' : 'transparent'}
                    hoverStyle={{ backgroundColor: '$color3' }}
                    onClick={() => handleSelect(option.value)}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <ViewJsx width="$2" alignItems="center">
                      {isSelected && <CheckSvg />}
                    </ViewJsx>
                    <TextJsx
                      fontSize="$3"
                      fontFamily="$body"
                      color="$color"
                      fontWeight={isSelected ? '$3' : '$2'}
                    >
                      {option.label}
                    </TextJsx>
                  </BtnJsx>
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
