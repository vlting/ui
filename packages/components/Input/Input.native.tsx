import type React from 'react'
import { forwardRef } from 'react'
import type { ViewStyle } from 'react-native'
import { Text as RNText, TextInput, View } from 'react-native'
import { styled } from '../../stl-native/src/config/styled'

// ---------------------------------------------------------------------------
// Styled frames
// ---------------------------------------------------------------------------

const InputFrame = styled(
  TextInput,
  {
    color: '$defaultBody',
    backgroundColor: '$background',
    borderWidth: 1,
    borderColor: '$borderColor',
    borderRadius: '$3',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  {
    fieldSize: {
      sm: {
        height: 32,
        borderRadius: '$2',
        paddingHorizontal: 6,
        paddingVertical: 4,
        fontSize: 14,
      },
      md: {
        height: 40,
        borderRadius: '$3',
        paddingHorizontal: 8,
        paddingVertical: 6,
        fontSize: 16,
      },
      lg: {
        height: 44,
        borderRadius: '$3',
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
      },
    },
    error: {
      true: { borderColor: '$red9' },
    },
  },
  'Input',
)

const LabelText = styled(
  RNText,
  {
    fontWeight: '500',
    color: '$defaultBody',
    marginBottom: 4,
  },
  {
    size: {
      sm: { fontSize: 14 },
      md: { fontSize: 16 },
      lg: { fontSize: 16 },
    },
  },
  'InputLabel',
)

const HelperText = styled(
  RNText,
  {
    fontSize: 14,
    marginTop: 4,
  },
  {
    tone: {
      neutral: { color: '$secondaryText12' },
      error: { color: '$red9' },
    },
  },
  'InputHelper',
)

const SlotFrame = styled(
  View,
  {
    alignItems: 'center',
    justifyContent: 'center',
  },
  'InputSlot',
)

// ---------------------------------------------------------------------------
// Input
// ---------------------------------------------------------------------------

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
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url'
  leadingSlot?: React.ReactNode
  trailingSlot?: React.ReactNode
  style?: ViewStyle
}

export const Input = forwardRef<TextInput, InputProps>(function Input(
  {
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
    secureTextEntry,
    keyboardType,
    leadingSlot,
    trailingSlot,
    style,
  },
  ref,
) {
  const displayHelper = error && errorMessage ? errorMessage : helperText

  const inputEl = (
    <InputFrame
      ref={ref}
      placeholder={placeholder}
      placeholderTextColor="#999"
      value={value}
      defaultValue={defaultValue}
      onChangeText={onChangeText}
      editable={!disabled}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      error={error || undefined}
      fieldSize={size}
      accessibilityLabel={label || placeholder}
      accessibilityState={{ disabled: disabled || false }}
      style={[
        disabled ? { opacity: 0.5 } : undefined,
        leadingSlot || trailingSlot ? { flex: 1 } : undefined,
      ]}
    />
  )

  return (
    <View style={style}>
      {label && <LabelText size={size}>{label}</LabelText>}
      {leadingSlot || trailingSlot ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {leadingSlot && <SlotFrame>{leadingSlot}</SlotFrame>}
          {inputEl}
          {trailingSlot && <SlotFrame>{trailingSlot}</SlotFrame>}
        </View>
      ) : (
        inputEl
      )}
      {displayHelper && (
        <HelperText tone={error ? 'error' : 'neutral'}>{displayHelper}</HelperText>
      )}
    </View>
  )
})

Input.displayName = 'Input'
