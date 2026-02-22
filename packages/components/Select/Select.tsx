import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
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

  focusStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
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

  variants: {
    selected: {
      true: {
        backgroundColor: '$color4',
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
}

const SelectContext = createContext<SelectContextValue>({
  onValueChange: () => {},
  open: false,
  setOpen: () => {},
  size: 'md',
  items: new Map(),
  registerItem: () => {},
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
  const containerRef = useRef<HTMLDivElement>(null)
  const value = controlledValue ?? internalValue

  const handleValueChange = (val: string) => {
    setInternalValue(val)
    onValueChange?.(val)
    setOpen(false)
  }

  const registerItem = (itemValue: string, label: string) => {
    items.set(itemValue, label)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

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
      }}
    >
      {/* @ts-expect-error Tamagui v2 RC */}
      <View ref={containerRef} position="relative">
        {/* @ts-expect-error Tamagui v2 RC */}
        <SelectTrigger
          size={size}
          disabled={disabled}
          onPress={() => !disabled && setOpen(!open)}
          role="combobox"
          aria-expanded={open}
          aria-disabled={disabled || undefined}
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

  React.useEffect(() => {
    ctx.registerItem(itemValue, label)
  }, [itemValue, label])

  return (
    // @ts-expect-error Tamagui v2 RC
    <SelectItemFrame
      selected={isSelected}
      onPress={() => ctx.onValueChange(itemValue)}
      role="option"
      aria-selected={isSelected}
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
