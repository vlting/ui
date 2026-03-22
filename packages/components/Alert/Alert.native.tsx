import type { ReactNode } from 'react'
import { View, Text as RNText } from 'react-native'
import type { ViewStyle } from 'react-native'
import { styled } from '../../stl-native/src/config'

// ─── Alert ──────────────────────────────────────────────────────────────────

const AlertRoot = styled(View, {
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: 16,
  paddingHorizontal: 20,
  paddingVertical: 16,
  borderRadius: 12,
}, {
  theme: {
    primary: { backgroundColor: '$primary3' },
    secondary: { backgroundColor: '$secondary3' },
    neutral: { backgroundColor: '$neutral3' },
    success: { backgroundColor: '$success3' },
    warning: { backgroundColor: '$warning3' },
    error: { backgroundColor: '$error3' },
    info: { backgroundColor: '$info3' },
  },
  variant: {
    outline: {},
    subtle: {},
    solid: {},
  },
}, 'AlertRoot')

const AlertIcon = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  flexShrink: 0,
  minHeight: 20,
}, 'AlertIcon')

const AlertContent = styled(View, {
  flexDirection: 'column',
  gap: 4,
  flex: 1,
}, 'AlertContent')

const AlertTitle = styled(RNText, {
  fontWeight: '600',
  fontSize: 16,
  color: '$defaultBody',
}, 'AlertTitle')

const AlertDescription = styled(RNText, {
  fontSize: 14,
  color: '$defaultBody',
  opacity: 0.9,
}, 'AlertDescription')

// ─── Export ─────────────────────────────────────────────────────────────────

export interface AlertProps {
  children?: ReactNode
  theme?: 'primary' | 'secondary' | 'neutral' | 'success' | 'warning' | 'error' | 'info'
  variant?: 'outline' | 'subtle' | 'solid'
  style?: ViewStyle
}

export const Alert = {
  Root: AlertRoot,
  Icon: AlertIcon,
  Content: AlertContent,
  Title: AlertTitle,
  Description: AlertDescription,
}
