import React, { forwardRef } from 'react'
import { Text as RNText, View } from 'react-native'
import type { TextStyle, ViewStyle } from 'react-native'
import { styled } from '../../stl-native/src/config/styled'

// ---------------------------------------------------------------------------
// Styled frames
// ---------------------------------------------------------------------------

const LabelText = styled(
  RNText,
  {
    fontWeight: '500',
    color: '$defaultBody',
  },
  {
    size: {
      sm: { fontSize: 12 },
      md: { fontSize: 14 },
      lg: { fontSize: 16 },
    },
    disabled: {
      true: { opacity: 0.5 },
    },
  },
  'Label',
)

const RequiredIndicator = styled(
  RNText,
  {
    color: '$red9',
    marginStart: 2,
  },
  'LabelRequired',
)

// ---------------------------------------------------------------------------
// Label
// ---------------------------------------------------------------------------

export interface LabelProps {
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  required?: boolean
  disabled?: boolean
  htmlFor?: string // ignored on native, kept for API parity
  style?: TextStyle
}

export const Label = forwardRef<RNText, LabelProps>(
  ({ children, size = 'md', required, disabled, style, ...props }, ref) => (
    <LabelText
      ref={ref}
      size={size}
      disabled={disabled || undefined}
      style={style}
      accessibilityRole="text"
      {...props}
    >
      {children}
      {required && <RequiredIndicator> *</RequiredIndicator>}
    </LabelText>
  ),
)
Label.displayName = 'Label'
