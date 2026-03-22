import { forwardRef, useState } from 'react'
import { TextInput } from 'react-native'
import type { TextStyle } from 'react-native'
import { styled } from '../../stl-native/src/config'

// ─── Styled ─────────────────────────────────────────────────────────────────

const TextareaBase = styled(TextInput, {
  borderWidth: 1,
  borderColor: '$neutral6',
  borderRadius: 6,
  backgroundColor: '$surface1',
  color: '$defaultBody',
  textAlignVertical: 'top',
  width: '100%' as any,
}, {
  size: {
    sm: { minHeight: 56, paddingHorizontal: 8, paddingVertical: 6, fontSize: 13 },
    md: { minHeight: 72, paddingHorizontal: 12, paddingVertical: 8, fontSize: 14 },
    lg: { minHeight: 96, paddingHorizontal: 16, paddingVertical: 12, fontSize: 15 },
  },
  error: {
    true: { borderColor: '$error9' },
  },
  disabled: {
    true: { opacity: 0.5 },
  },
  focused: {
    true: { borderColor: '$neutral9', borderWidth: 2 },
  },
}, 'Textarea')

// ─── Types ──────────────────────────────────────────────────────────────────

export interface TextareaProps {
  size?: 'sm' | 'md' | 'lg'
  placeholder?: string
  value?: string
  defaultValue?: string
  onChangeText?: (text: string) => void
  error?: boolean
  disabled?: boolean
  maxLength?: number
  numberOfLines?: number
  style?: TextStyle
}

// ─── Textarea ───────────────────────────────────────────────────────────────

export const Textarea = forwardRef<TextInput, TextareaProps>(
  ({
    size = 'md',
    error,
    disabled,
    numberOfLines = 4,
    onChangeText,
    ...rest
  }, ref) => {
    const [focused, setFocused] = useState(false)

    return (
      <TextareaBase
        ref={ref}
        multiline
        numberOfLines={numberOfLines}
        size={size}
        error={error}
        disabled={disabled}
        focused={focused}
        editable={!disabled}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        accessibilityState={{ disabled }}
        {...rest}
      />
    )
  },
)
Textarea.displayName = 'Textarea'
