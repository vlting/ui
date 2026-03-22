import { forwardRef } from 'react'
import type { ReactNode } from 'react'
import { View, Text as RNText } from 'react-native'
import type { ViewStyle } from 'react-native'
import { styled } from '../../stl-native/src/config'

// ─── Badge ──────────────────────────────────────────────────────────────────

const themes = [
  'primary', 'secondary', 'neutral',
  'success', 'warning', 'error', 'info',
  'tomato', 'amber', 'grass', 'forest', 'aqua', 'indigo', 'plum', 'magenta',
] as const

type BadgeTheme = typeof themes[number]
type BadgeVariant = 'solid' | 'subtle' | 'outline'
type BadgeSize = 'sm' | 'md' | 'lg'

// Build variant maps for container
function buildContainerVariants() {
  const theme: Record<string, object> = {}
  for (const t of themes) theme[t] = {}

  return {
    theme,
    variant: {
      solid: {},
      subtle: {},
      outline: { borderWidth: 1 },
    },
    size: {
      sm: { paddingHorizontal: 6, paddingVertical: 1 },
      md: { paddingHorizontal: 8, paddingVertical: 2 },
      lg: { paddingHorizontal: 12, paddingVertical: 4 },
    },
  }
}

const BadgeContainer = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 9999,
  alignSelf: 'flex-start',
}, buildContainerVariants(), 'Badge')

const BadgeText = styled(RNText, {
  fontWeight: '500',
  fontSize: 12,
}, 'BadgeText')

export interface BadgeProps {
  theme?: BadgeTheme
  variant?: BadgeVariant
  size?: BadgeSize
  children?: ReactNode
  style?: ViewStyle
}

const BadgeRoot = forwardRef<View, BadgeProps>(
  ({ theme = 'neutral', variant = 'outline', size = 'md', children, ...rest }, ref) => (
    <BadgeContainer
      ref={ref}
      theme={theme}
      variant={variant}
      size={size}
      {...rest}
    >
      {typeof children === 'string' ? (
        <BadgeText>{children}</BadgeText>
      ) : (
        children
      )}
    </BadgeContainer>
  ),
)

BadgeRoot.displayName = 'Badge'

export const Badge = BadgeRoot
