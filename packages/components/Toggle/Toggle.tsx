import React from 'react'
import type { ComponentType } from 'react'
import { Toggle as TamaguiToggle } from '@tamagui/toggle-group'
import { ToggleGroup as TamaguiToggleGroup } from '@tamagui/toggle-group'
import { styled, withStaticProperties } from 'tamagui'

// Extend Tamagui's Toggle with our custom styling.
// Tamagui Toggle already renders <button> with aria-pressed, data-state, press handler.
// @ts-expect-error Tamagui v2 RC
const StyledToggle = styled(TamaguiToggle, {
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$4',
  animation: 'fast',
})

// Cast for JSX — Tamagui v2 RC GetFinalProps bug
const StyledToggleJsx = StyledToggle as ComponentType<Record<string, unknown>>

// Map our named sizes to Tamagui tokens
const SIZE_TOKEN_MAP: Record<string, string> = {
  sm: '$3',
  md: '$4',
  lg: '$5',
}

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
  pressed,
  defaultPressed = false,
  onPressedChange,
  size = 'md',
  disabled,
}: ToggleProps) {
  return (
    <StyledToggleJsx
      active={pressed}
      defaultActive={defaultPressed}
      onActiveChange={onPressedChange}
      size={SIZE_TOKEN_MAP[size]}
      disabled={disabled}
    >
      {children}
    </StyledToggleJsx>
  )
}

// --- ToggleGroup ---

// Cast for JSX usage
const TamaguiToggleGroupJsx = TamaguiToggleGroup as ComponentType<Record<string, unknown>>
const TamaguiToggleGroupItemJsx = TamaguiToggleGroup.Item as ComponentType<Record<string, unknown>>

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

  // Normalize value/defaultValue for Tamagui's API
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
