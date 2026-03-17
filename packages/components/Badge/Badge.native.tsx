import type React from 'react'
import { forwardRef } from 'react'
import type { ViewStyle } from 'react-native'
import { Text as RNText, View } from 'react-native'
import { styled } from '../../stl-native/src/config/styled'

// ---------------------------------------------------------------------------
// Styled frames
// ---------------------------------------------------------------------------

const BadgeContainer = styled(
  View,
  {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
    alignSelf: 'flex-start',
  },
  {
    variant: {
      default: { backgroundColor: '$primary6' },
      secondary: { backgroundColor: '$color4' },
      destructive: { backgroundColor: '$tomato6' },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
      },
    },
  },
  'Badge',
)

const BadgeText = styled(
  RNText,
  {
    fontSize: 12,
    fontWeight: '600',
  },
  {
    variant: {
      default: { color: '#fff' },
      secondary: { color: '$defaultBody' },
      destructive: { color: '#fff' },
      outline: { color: '$defaultBody' },
    },
  },
  'BadgeText',
)

// ---------------------------------------------------------------------------
// Badge
// ---------------------------------------------------------------------------

export interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  children?: React.ReactNode
  style?: ViewStyle
}

export const Badge = forwardRef<View, BadgeProps>(
  ({ variant = 'default', children, style, ...props }, ref) => (
    <BadgeContainer
      ref={ref}
      variant={variant}
      style={style}
      accessibilityRole="text"
      {...props}
    >
      {typeof children === 'string' ? (
        <BadgeText variant={variant}>{children}</BadgeText>
      ) : (
        children
      )}
    </BadgeContainer>
  ),
)
Badge.displayName = 'Badge'
