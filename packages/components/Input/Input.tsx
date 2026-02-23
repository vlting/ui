import React, { useId } from 'react'
import { Text, View, XStack, YStack, styled } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
const InputFrame = styled(XStack, {
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$4',
  backgroundColor: '$background',
  gap: '$2',

  hoverStyle: {
    borderColor: '$borderColorHover',
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

const INPUT_FONT_SIZE: Record<string, string> = {
  sm: '12px',
  md: '14px',
  lg: '16px',
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

  return (
    // @ts-expect-error Tamagui v2 RC
    <YStack>
      {label && (
        <label htmlFor={inputId} style={{ display: 'block' }}>
          {/* @ts-expect-error Tamagui v2 RC */}
          <StyledLabelText size={size}>{label}</StyledLabelText>
        </label>
      )}
      {/* @ts-expect-error Tamagui v2 RC */}
      <InputFrame size={size} error={error} disabled={disabled}>
        {leadingSlot && <SlotFrame>{leadingSlot}</SlotFrame>}
        <input
          id={inputId}
          type="text"
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChangeText ? (e) => onChangeText(e.target.value) : undefined}
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-describedby={displayHelper ? helperId : undefined}
          aria-label={!label ? placeholder : undefined}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'inherit',
            fontSize: INPUT_FONT_SIZE[size],
            color: 'inherit',
            padding: 0,
            width: '100%',
          }}
        />
        {trailingSlot && <SlotFrame>{trailingSlot}</SlotFrame>}
      </InputFrame>
      {displayHelper && (
        // @ts-expect-error Tamagui v2 RC
        <InputHelper id={helperId} tone={error ? 'error' : 'neutral'}>{displayHelper}</InputHelper>
      )}
    </YStack>
  )
}

Input.Frame = InputFrame
Input.Label = StyledLabelText
Input.Helper = InputHelper
