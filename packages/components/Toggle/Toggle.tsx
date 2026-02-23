import React, { createContext, useContext } from 'react'
import { XStack, styled, withStaticProperties } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
const ToggleFrame = styled(XStack, {
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
})

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
    <button
      type="button"
      aria-pressed={isPressed}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={handlePress}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        display: 'inline-flex',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {/* @ts-expect-error Tamagui v2 RC */}
      <ToggleFrame
        size={size}
        pressed={isPressed}
        disabled={disabled}
      >
        {children}
      </ToggleFrame>
    </button>
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

// @ts-expect-error Tamagui v2 RC
const ToggleGroupItemFrame = styled(XStack, {
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
})

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
    <button
      type="button"
      aria-pressed={isPressed}
      aria-disabled={isDisabled || undefined}
      disabled={isDisabled}
      onClick={() => ctx.onItemToggle(itemValue)}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        display: 'inline-flex',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      }}
    >
      {/* @ts-expect-error Tamagui v2 RC */}
      <ToggleGroupItemFrame
        size={ctx.size}
        pressed={isPressed}
        disabled={isDisabled}
      >
        {children}
      </ToggleGroupItemFrame>
    </button>
  )
}

export const ToggleGroup = withStaticProperties(ToggleGroupRoot, {
  Item: ToggleGroupItem,
})
