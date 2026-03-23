import type { ReactNode } from 'react'
import { View, Text as RNText } from 'react-native'
import type { ViewStyle } from 'react-native'
import { styled } from '../../stl-native/src/config'

// ─── Card ───────────────────────────────────────────────────────────────────

const CardRoot = styled(View, {
  borderRadius: 12,
  backgroundColor: '$surface1',
}, {
  theme: {
    primary: {},
    secondary: {},
    neutral: {},
  },
  size: {
    sm: { padding: 8 },
    md: { padding: 16 },
    lg: { padding: 20 },
  },
  elevation: {
    flat: { borderWidth: 1, borderColor: '$neutral4' },
    normal: { backgroundColor: '$surface2' },
    raised: {},
  },
  flush: {
    true: { padding: 0, overflow: 'hidden' },
  },
}, 'Card')

const CardHeader = styled(View, {
  flexDirection: 'column',
  gap: 4,
  padding: 16,
}, 'CardHeader')

const CardContent = styled(View, {
  padding: 16,
  flex: 1,
}, 'CardContent')

const CardFooter = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  padding: 16,
}, 'CardFooter')

const CardTitle = styled(RNText, {
  fontWeight: '600',
  fontSize: 20,
  color: '$defaultHeading',
}, 'CardTitle')

const CardDescription = styled(RNText, {
  fontSize: 14,
  color: '$neutralText4',
}, 'CardDescription')

// ─── Export ─────────────────────────────────────────────────────────────────

export interface CardProps {
  children?: ReactNode
  theme?: 'primary' | 'secondary' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  elevation?: 'flat' | 'normal' | 'raised'
  flush?: boolean
  interactive?: boolean
  style?: ViewStyle
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
  Title: CardTitle,
  Description: CardDescription,
})
