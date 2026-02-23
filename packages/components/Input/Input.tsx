import React, { useId } from 'react'
import type { ComponentType } from 'react'
import { Input as TamaguiInput } from '@tamagui/input'
import { Text, View, XStack, YStack, styled } from 'tamagui'

// Extend Tamagui Input with our error variant.
// Tamagui Input already renders <input> with proper focus/hover/theme styles.
// @ts-expect-error Tamagui v2 RC
const StyledInput = styled(TamaguiInput, {
  variants: {
    error: {
      true: {
        borderColor: '$red10',
      },
    },
  } as const,
})

// Cast for JSX — Tamagui v2 RC GetFinalProps bug
const StyledInputJsx = StyledInput as ComponentType<Record<string, unknown>>

// @ts-expect-error Tamagui v2 RC
const StyledLabelText = styled(Text, {
  fontFamily: '$body',
  fontWeight: '$3',
  color: '$color',
  marginBottom: '$1',

  variants: {
    size: {
      sm: { fontSize: '$2' },
      md: { fontSize: '$3' },
      lg: { fontSize: '$4' },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const InputHelper = styled(Text, {
  fontFamily: '$body',
  fontSize: '$2',
  marginTop: '$1',

  variants: {
    tone: {
      neutral: { color: '$colorSubtitle' },
      error: { color: '$red10' },
    },
  } as const,

  defaultVariants: {
    tone: 'neutral',
  },
})

// @ts-expect-error Tamagui v2 RC
const SlotFrame = styled(View, {
  alignItems: 'center',
  justifyContent: 'center',
})

// Map named sizes to Tamagui size tokens
const SIZE_TOKEN_MAP: Record<string, string> = {
  sm: '$3',
  md: '$4',
  lg: '$5',
}

export interface InputProps {
  size?: 'sm' | 'md' | 'lg'
  placeholder?: string
  value?: string
  defaultValue?: string
  onChangeText?: (text: string) => void
  label?: string
  helperText?: string
  error?: boolean
  errorMessage?: string
  disabled?: boolean
  leadingSlot?: React.ReactNode
  trailingSlot?: React.ReactNode
}

export function Input({
  size = 'md',
  placeholder,
  value,
  defaultValue,
  onChangeText,
  label,
  helperText,
  error,
  errorMessage,
  disabled,
  leadingSlot,
  trailingSlot,
}: InputProps) {
  const inputId = useId()
  const helperId = useId()
  const displayHelper = error && errorMessage ? errorMessage : helperText
  const sizeToken = SIZE_TOKEN_MAP[size]

  return (
    // @ts-expect-error Tamagui v2 RC
    <YStack>
      {label && (
        <label htmlFor={inputId} style={{ display: 'block' }}>
          {/* @ts-expect-error Tamagui v2 RC */}
          <StyledLabelText size={size}>{label}</StyledLabelText>
        </label>
      )}
      {leadingSlot || trailingSlot ? (
        // When slots are present, wrap input in an XStack for layout
        // @ts-expect-error Tamagui v2 RC
        <XStack alignItems="center" gap="$2">
          {leadingSlot && <SlotFrame>{leadingSlot}</SlotFrame>}
          <StyledInputJsx
            id={inputId}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            onChangeText={onChangeText}
            disabled={disabled}
            error={error}
            size={sizeToken}
            aria-invalid={error || undefined}
            aria-describedby={displayHelper ? helperId : undefined}
            aria-label={!label ? placeholder : undefined}
            flex={1}
          />
          {trailingSlot && <SlotFrame>{trailingSlot}</SlotFrame>}
        </XStack>
      ) : (
        <StyledInputJsx
          id={inputId}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          disabled={disabled}
          error={error}
          size={sizeToken}
          aria-invalid={error || undefined}
          aria-describedby={displayHelper ? helperId : undefined}
          aria-label={!label ? placeholder : undefined}
        />
      )}
      {displayHelper && (
        // @ts-expect-error Tamagui v2 RC
        <InputHelper id={helperId} tone={error ? 'error' : 'neutral'}>{displayHelper}</InputHelper>
      )}
    </YStack>
  )
}

Input.Frame = StyledInput
Input.Label = StyledLabelText
Input.Helper = InputHelper
