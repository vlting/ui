import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Text, View, XStack, YStack, styled, withStaticProperties } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
const SelectTrigger = styled(XStack, {
  alignItems: 'center',
  justifyContent: 'space-between',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$4',
  backgroundColor: '$background',
  cursor: 'pointer',
  gap: '$2',

  hoverStyle: {
    borderColor: '$borderColorHover',
  },

  pressStyle: {
    backgroundColor: '$backgroundPress',
  },

  focusWithinStyle: {
    borderColor: '$borderColorFocus',
    outlineWidth: 2,
    outlineOffset: 0,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },

  variants: {
    size: {
      sm: { height: '$3.5', paddingHorizontal: '$2' },
      md: { height: '$4', paddingHorizontal: '$3' },
      lg: { height: '$4.5', paddingHorizontal: '$4' },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const SelectContent = styled(YStack, {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  marginTop: '$1',
  backgroundColor: '$background',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$4',
  overflow: 'hidden',
  zIndex: 1000,
  animation: 'fast',
})

// @ts-expect-error Tamagui v2 RC
const SelectItemFrame = styled(XStack, {
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  cursor: 'pointer',
  alignItems: 'center',

  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },

  focusStyle: {
    backgroundColor: '$backgroundHover',
    outlineWidth: 0,
  },

  variants: {
    selected: {
      true: {
        backgroundColor: '$color4',
      },
    },
    focused: {
      true: {
        backgroundColor: '$backgroundHover',
      },
    },
  } as const,
})

// @ts-expect-error Tamagui v2 RC
const SelectValueText = styled(Text, {
  fontFamily: '$body',
  color: '$color',
  flex: 1,

  variants: {
    size: {
      sm: { fontSize: '$2' },
      md: { fontSize: '$3' },
      lg: { fontSize: '$4' },
    },
    placeholder: {
      true: {
        color: '$placeholderColor',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const SelectItemText = styled(Text, {
  fontFamily: '$body',
  color: '$color',
  fontSize: '$3',
})

interface SelectContextValue {
  value?: string
  onValueChange: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
  size: 'sm' | 'md' | 'lg'
  disabled?: boolean
  items: Map<string, string>
  registerItem: (value: string, label: string) => void
  focusedIndex: number
  itemValues: string[]
}

const SelectContext = createContext<SelectContextValue>({
  onValueChange: () => {},
  open: false,
  setOpen: () => {},
  size: 'md',
  items: new Map(),
  registerItem: () => {},
  focusedIndex: -1,
  itemValues: [],
})

export interface SelectProps {
  children?: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

function SelectRoot({
  children,
  value: controlledValue,
  defaultValue,
  onValueChange,
  placeholder = 'Select...',
  size = 'md',
  disabled,
}: SelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const [items] = useState(() => new Map<string, string>())
  const [itemValues, setItemValues] = useState<string[]>([])
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const value = controlledValue ?? internalValue

  const handleValueChange = useCallback(
    (val: string) => {
      setInternalValue(val)
      onValueChange?.(val)
      setOpen(false)
      setFocusedIndex(-1)
    },
    [onValueChange],
  )

  const registerItem = useCallback(
    (itemValue: string, label: string) => {
      items.set(itemValue, label)
      setItemValues((prev) => {
        if (prev.includes(itemValue)) return prev
        return [...prev, itemValue]
      })
    },
    [items],
  )

  // Close on click outside
  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setFocusedIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setFocusedIndex(-1)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!open) {
        setOpen(true)
        setFocusedIndex(0)
      } else if (focusedIndex >= 0 && focusedIndex < itemValues.length) {
        handleValueChange(itemValues[focusedIndex])
      }
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!open) {
        setOpen(true)
        setFocusedIndex(0)
      } else {
        setFocusedIndex((prev) => Math.min(prev + 1, itemValues.length - 1))
      }
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (open) {
        setFocusedIndex((prev) => Math.max(prev - 1, 0))
      }
    }
  }

  const displayLabel = value ? (items.get(value) ?? value) : undefined

  return (
    <SelectContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        open,
        setOpen,
        size,
        disabled,
        items,
        registerItem,
        focusedIndex,
        itemValues,
      }}
    >
      {/* @ts-expect-error Tamagui v2 RC */}
      <View ref={containerRef} position="relative">
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-disabled={disabled || undefined}
          disabled={disabled}
          onClick={() => !disabled && setOpen(!open)}
          onKeyDown={handleKeyDown}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            display: 'flex',
            width: '100%',
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          {/* @ts-expect-error Tamagui v2 RC */}
          <SelectTrigger
            size={size}
            disabled={disabled}
          >
            {/* @ts-expect-error Tamagui v2 RC */}
            <SelectValueText size={size} placeholder={!displayLabel}>
              {displayLabel || placeholder}
            </SelectValueText>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </SelectTrigger>
        </button>
        {open && (
          // @ts-expect-error Tamagui v2 RC
          <SelectContent role="listbox">{children}</SelectContent>
        )}
      </View>
    </SelectContext.Provider>
  )
}

export interface SelectItemProps {
  value: string
  children?: React.ReactNode
}

function SelectItem({ value: itemValue, children }: SelectItemProps) {
  const ctx = useContext(SelectContext)
  const isSelected = ctx.value === itemValue
  const label = typeof children === 'string' ? children : itemValue
  const itemIndex = ctx.itemValues.indexOf(itemValue)
  const isFocused = ctx.focusedIndex === itemIndex

  React.useEffect(() => {
    ctx.registerItem(itemValue, label)
  }, [itemValue, label])

  return (
    // @ts-expect-error Tamagui v2 RC
    <SelectItemFrame
      selected={isSelected}
      focused={isFocused && !isSelected}
      onPress={() => ctx.onValueChange(itemValue)}
      role="option"
      aria-selected={isSelected}
      tabIndex={-1}
    >
      {typeof children === 'string' ? (
        // @ts-expect-error Tamagui v2 RC
        <SelectItemText>{children}</SelectItemText>
      ) : (
        children
      )}
    </SelectItemFrame>
  )
}

export const Select = withStaticProperties(SelectRoot, {
  Item: SelectItem,
})
