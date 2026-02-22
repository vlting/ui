import React from 'react'
import { styled, XStack, YStack, Text, View } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
const InputFrame = styled(XStack, {
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$4',
  backgroundColor: '$background',
  gap: '$2',

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
    error: {
      true: {
        borderColor: '$red10',
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
  },
})

// @ts-expect-error Tamagui v2 RC
const InputField = styled(View, {
  flex: 1,
  fontFamily: '$body',
  color: '$color',
  backgroundColor: 'transparent',
  borderWidth: 0,
  outlineWidth: 0,
  tag: 'input',

  variants: {
    size: {
      sm: { fontSize: '$2' },
      md: { fontSize: '$4' },
      lg: { fontSize: '$5' },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const InputLabel = styled(Text, {
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
  const displayHelper = error && errorMessage ? errorMessage : helperText

  return (
    // @ts-expect-error Tamagui v2 RC
    <YStack>
      {label && (
        // @ts-expect-error Tamagui v2 RC
        <InputLabel size={size}>{label}</InputLabel>
      )}
      {/* @ts-expect-error Tamagui v2 RC */}
      <InputFrame size={size} error={error} disabled={disabled}>
        {leadingSlot && <SlotFrame>{leadingSlot}</SlotFrame>}
        {/* @ts-expect-error Tamagui v2 RC */}
        <InputField
          size={size}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChangeText ? (e: { nativeEvent: { text: string } }) => onChangeText(e.nativeEvent.text) : undefined}
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-label={label}
        />
        {trailingSlot && <SlotFrame>{trailingSlot}</SlotFrame>}
      </InputFrame>
      {displayHelper && (
        // @ts-expect-error Tamagui v2 RC
        <InputHelper tone={error ? 'error' : 'neutral'}>
          {displayHelper}
        </InputHelper>
      )}
    </YStack>
  )
}

Input.Frame = InputFrame
Input.Field = InputField
Input.Label = InputLabel
Input.Helper = InputHelper
