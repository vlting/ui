import React, { createContext, useContext } from 'react'
import type { ComponentType } from 'react'
import { XStack, styled, withStaticProperties } from 'tamagui'
import { styledHtml } from '@tamagui/web'

const ToggleFrame = styledHtml('button', {
  // XStack defaults (styledHtml doesn't inherit these):
  display: 'inline-flex',
  flexDirection: 'row',
  boxSizing: 'border-box',
  // Browser button resets:
  appearance: 'none',
  border: 'none',
  background: 'none',
  padding: 0,
  margin: 0,
  fontFamily: 'inherit',
  // Original ToggleFrame styles:
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$4',
  cursor: 'pointer',
  animation: 'fast',
  backgroundColor: 'transparent',

  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },

  pressStyle: {
    backgroundColor: '$backgroundPress',
  },

  focusWithinStyle: {
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
    pressed: {
      true: {
        backgroundColor: '$color4',
        borderColor: '$borderColorHover',
      },
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
    pressed: false,
  },
} as any)

// Tamagui v2 RC GetProps bug — cast for JSX usage
const ToggleButton = ToggleFrame as ComponentType<Record<string, unknown>>

export interface ToggleProps {
  children?: React.ReactNode
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export function Toggle({
  children,
  pressed: controlledPressed,
  defaultPressed = false,
  onPressedChange,
  size = 'md',
  disabled,
}: ToggleProps) {
  const [internalPressed, setInternalPressed] = React.useState(defaultPressed)
  const isPressed = controlledPressed ?? internalPressed

  const handlePress = () => {
    if (disabled) return
    const next = !isPressed
    setInternalPressed(next)
    onPressedChange?.(next)
  }

  return (
    <ToggleButton
      type="button"
      aria-pressed={isPressed}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={handlePress}
      size={size}
      pressed={isPressed}
    >
      {children}
    </ToggleButton>
  )
}

// --- ToggleGroup ---

interface ToggleGroupContextValue {
  type: 'single' | 'multiple'
  value: string[]
  onItemToggle: (itemValue: string) => void
  size: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  type: 'single',
  value: [],
  onItemToggle: () => {},
  size: 'md',
})

// @ts-expect-error Tamagui v2 RC
const ToggleGroupFrame = styled(XStack, {
  borderRadius: '$4',
  borderWidth: 1,
  borderColor: '$borderColor',
  overflow: 'hidden',
})

const ToggleGroupItemFrame = styledHtml('button', {
  // XStack defaults:
  display: 'inline-flex',
  flexDirection: 'row',
  boxSizing: 'border-box',
  // Browser button resets:
  appearance: 'none',
  border: 'none',
  background: 'none',
  padding: 0,
  margin: 0,
  fontFamily: 'inherit',
  // Original ToggleGroupItemFrame styles:
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  animation: 'fast',
  backgroundColor: 'transparent',
  borderWidth: 0,
  borderRightWidth: 1,
  borderColor: '$borderColor',

  focusWithinStyle: {
    outlineWidth: 2,
    outlineOffset: -2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },

  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },

  variants: {
    size: {
      sm: { height: '$3.5', paddingHorizontal: '$2' },
      md: { height: '$4', paddingHorizontal: '$3' },
      lg: { height: '$4.5', paddingHorizontal: '$4' },
    },
    pressed: {
      true: {
        backgroundColor: '$color4',
      },
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
    pressed: false,
  },
} as any)

// Tamagui v2 RC GetProps bug — cast for JSX usage
const ToggleGroupItemButton = ToggleGroupItemFrame as ComponentType<Record<string, unknown>>

export interface ToggleGroupProps {
  children?: React.ReactNode
  type?: 'single' | 'multiple'
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

function ToggleGroupRoot({
  children,
  type = 'single',
  value: controlledValue,
  defaultValue,
  onValueChange,
  size = 'md',
  disabled,
}: ToggleGroupProps) {
  const normalizeValue = (v?: string | string[]): string[] => {
    if (!v) return []
    return Array.isArray(v) ? v : [v]
  }

  const [internalValue, setInternalValue] = React.useState<string[]>(
    normalizeValue(defaultValue),
  )
  const value =
    controlledValue !== undefined ? normalizeValue(controlledValue) : internalValue

  const onItemToggle = (itemValue: string) => {
    if (disabled) return
    let next: string[]
    if (type === 'single') {
      next = value.includes(itemValue) ? [] : [itemValue]
    } else {
      next = value.includes(itemValue)
        ? value.filter((v) => v !== itemValue)
        : [...value, itemValue]
    }
    setInternalValue(next)
    onValueChange?.(type === 'single' ? (next[0] ?? '') : next)
  }

  return (
    <ToggleGroupContext.Provider value={{ type, value, onItemToggle, size, disabled }}>
      {/* @ts-expect-error Tamagui v2 RC */}
      <ToggleGroupFrame role="group">{children}</ToggleGroupFrame>
    </ToggleGroupContext.Provider>
  )
}

export interface ToggleGroupItemProps {
  children?: React.ReactNode
  value: string
  disabled?: boolean
}

function ToggleGroupItem({
  children,
  value: itemValue,
  disabled: itemDisabled,
}: ToggleGroupItemProps) {
  const ctx = useContext(ToggleGroupContext)
  const isPressed = ctx.value.includes(itemValue)
  const isDisabled = ctx.disabled || itemDisabled

  return (
    <ToggleGroupItemButton
      type="button"
      aria-pressed={isPressed}
      aria-disabled={isDisabled || undefined}
      disabled={isDisabled}
      onClick={() => ctx.onItemToggle(itemValue)}
      size={ctx.size}
      pressed={isPressed}
    >
      {children}
    </ToggleGroupItemButton>
  )
}

export const ToggleGroup = withStaticProperties(ToggleGroupRoot, {
  Item: ToggleGroupItem,
})
