import type React from 'react'
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { styled } from '../../stl-react/src/config'

const TriggerButton = styled(
  'button',
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '$background',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '$borderColor',
    borderRadius: '$4',
    padding: '8px 12px',
    fontFamily: '$body',
    fontSize: '$p',
    color: '$defaultBody',
    cursor: 'pointer',
    outline: 'none',
    textAlign: 'left',
  },
  {
    disabled: {
      true: { cursor: 'not-allowed', opacity: '0.5' },
    },
  },
  'ComboboxTrigger',
)

const DropdownFrame = styled(
  'div',
  {
    position: 'absolute',
    top: '100%',
    left: '0',
    right: '0',
    marginTop: '4px',
    backgroundColor: '$background',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '$borderColor',
    borderRadius: '$4',
    zIndex: '1000',
    overflow: 'hidden',
  },
  'ComboboxDropdown',
)

const SearchInput = styled(
  'input',
  {
    display: 'flex',
    width: '100%',
    backgroundColor: 'transparent',
    fontSize: '$p',
    fontFamily: '$body',
    color: '$defaultBody',
    outline: 'none',
    border: 'none',
    padding: '0',
  },
  'ComboboxSearchInput',
)

const OptionButton = styled(
  'button',
  {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '8px 12px',
    fontFamily: '$body',
    fontSize: '$p',
    color: '$defaultBody',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    textAlign: 'left',
    outline: 'none',
    borderRadius: '$2',
  },
  'ComboboxOption',
)

function ChevronsUpDownSvg() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity: 0.5 }}
    >
      <path d="M7 15l5 5 5-5" />
      <path d="M7 9l5-5 5 5" />
    </svg>
  )
}

function CheckSvg() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

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
  const rootRef = useRef<HTMLDivElement>(null)
  const listboxId = `combobox-listbox-${useId()}`

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

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div ref={rootRef} style={{ position: 'relative', width: '100%' }}>
      <TriggerButton
        type="button"
        disabled={disabled || undefined}
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
        aria-controls={open ? listboxId : undefined}
      >
        <span style={!value ? { opacity: 0.5 } : undefined}>
          {selectedLabel ?? placeholder}
        </span>
        <ChevronsUpDownSvg />
      </TriggerButton>

      {open && (
        <DropdownFrame
          style={{ boxShadow: '0 4px 12px var(--stl-maxAlpha8, rgba(0,0,0,0.15))' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 12px',
              borderBottom: '1px solid var(--borderColor, var(--stl-surface3, #e5e7eb))',
            }}
          >
            <SearchInput
              ref={inputRef}
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearch(e.target.value)
                setHighlightIndex(0)
              }}
              onKeyDown={handleKeyDown}
              placeholder={searchPlaceholder}
              aria-label="Search options"
            />
          </div>

          <div
            id={listboxId}
            role="listbox"
            style={{ maxHeight: '240px', padding: '4px', overflowY: 'auto' }}
          >
            {filtered.length === 0 ? (
              <div style={{ padding: '8px', textAlign: 'center', opacity: 0.5 }}>
                {emptyMessage}
              </div>
            ) : (
              filtered.map((option, i) => {
                const isSelected = option.value === value
                const isHighlighted = i === highlightIndex
                return (
                  <OptionButton
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    role="option"
                    aria-selected={isSelected}
                    style={{
                      backgroundColor: isHighlighted
                        ? 'var(--surface3, var(--stl-surface2, #f3f4f6))'
                        : 'transparent',
                      fontWeight: isSelected ? 600 : 400,
                    }}
                  >
                    <span
                      style={{
                        width: '20px',
                        display: 'inline-flex',
                        alignItems: 'center',
                      }}
                    >
                      {isSelected && <CheckSvg />}
                    </span>
                    {option.label}
                  </OptionButton>
                )
              })
            )}
          </div>
        </DropdownFrame>
      )}
    </div>
  )
}

export const Combobox = { Root }
