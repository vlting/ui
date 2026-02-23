import React from 'react'
import type { ComponentType } from 'react'
import { ToggleGroup as TamaguiToggleGroup } from '@tamagui/toggle-group'
import { withStaticProperties } from 'tamagui'
import { styledHtml } from '@tamagui/web'

// --- Standalone Toggle ---
// Tamagui does not export a standalone Toggle component, so we keep our own
// using styledHtml('button') which renders a real <button> element.

const ToggleFrame = styledHtml('button', {
  display: 'inline-flex',
  flexDirection: 'row',
  boxSizing: 'border-box',
  appearance: 'none',
  border: 'none',
  background: 'none',
  padding: 0,
  margin: 0,
  fontFamily: 'inherit',
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
    variant: {
      default: {
        borderWidth: 0,
        borderColor: 'transparent',
      },
      outline: {
        borderWidth: 1,
        borderColor: '$borderColor',
      },
    },
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
    variant: 'default',
    size: 'md',
    pressed: false,
  },
} as any)

// Cast for JSX — Tamagui v2 RC GetFinalProps bug
const ToggleButton = ToggleFrame as ComponentType<Record<string, unknown>>

export interface ToggleProps {
  children?: React.ReactNode
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  variant?: 'default' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export function Toggle({
  children,
  pressed: controlledPressed,
  defaultPressed = false,
  onPressedChange,
  variant = 'default',
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
      variant={variant}
      size={size}
      pressed={isPressed}
    >
      {children}
    </ToggleButton>
  )
}

// --- ToggleGroup ---
// Uses Tamagui's official ToggleGroup which provides:
// - <div role="group"> container
// - <button> items with aria-pressed
// - Roving focus keyboard navigation (arrow keys)
// - Single/multiple selection modes

// Cast for JSX usage
const TamaguiToggleGroupJsx = TamaguiToggleGroup as unknown as ComponentType<Record<string, unknown>>
const TamaguiToggleGroupItemJsx = TamaguiToggleGroup.Item as unknown as ComponentType<Record<string, unknown>>

// Map named sizes to Tamagui tokens
const SIZE_TOKEN_MAP: Record<string, string> = {
  sm: '$3',
  md: '$4',
  lg: '$5',
}

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
  value,
  defaultValue,
  onValueChange,
  size = 'md',
  disabled,
}: ToggleGroupProps) {
  const sizeToken = SIZE_TOKEN_MAP[size]

  const normalizedValue = value !== undefined
    ? (Array.isArray(value) ? value : type === 'multiple' ? [value] : value)
    : undefined
  const normalizedDefault = defaultValue !== undefined
    ? (Array.isArray(defaultValue) ? defaultValue : type === 'multiple' ? [defaultValue] : defaultValue)
    : undefined

  if (type === 'multiple') {
    return (
      <TamaguiToggleGroupJsx
        type="multiple"
        value={normalizedValue as string[] | undefined}
        defaultValue={normalizedDefault as string[] | undefined}
        onValueChange={onValueChange}
        disabled={disabled}
        size={sizeToken}
      >
        {children}
      </TamaguiToggleGroupJsx>
    )
  }

  return (
    <TamaguiToggleGroupJsx
      type="single"
      value={normalizedValue as string | undefined}
      defaultValue={normalizedDefault as string | undefined}
      onValueChange={onValueChange}
      disabled={disabled}
      size={sizeToken}
    >
      {children}
    </TamaguiToggleGroupJsx>
  )
}

export interface ToggleGroupItemProps {
  children?: React.ReactNode
  value: string
  disabled?: boolean
}

function ToggleGroupItem({ children, value, disabled }: ToggleGroupItemProps) {
  return (
    <TamaguiToggleGroupItemJsx value={value} disabled={disabled}>
      {children}
    </TamaguiToggleGroupItemJsx>
  )
}

export const ToggleGroup = withStaticProperties(ToggleGroupRoot, {
  Item: ToggleGroupItem,
})
