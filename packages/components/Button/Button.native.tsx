import { type ReactNode, forwardRef, useState } from 'react'
import { ActivityIndicator, Pressable, Text as RNText, View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { styled } from '../../stl-native/src/config'

// ─── Styled ─────────────────────────────────────────────────────────────────

const ButtonBase = styled(Pressable, {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  borderRadius: 6,
}, {
  theme: {
    primary: { backgroundColor: '$primary9' },
    secondary: { backgroundColor: '$secondary9' },
    neutral: { backgroundColor: '$neutral4' },
    destructive: { backgroundColor: '$error9' },
  },
  variant: {
    solid: {},
    subtle: {},
    outline: { borderWidth: 1, borderColor: '$neutral6' },
    ghost: { backgroundColor: 'transparent' },
    link: { backgroundColor: 'transparent' },
  },
  size: {
    sm: { height: 28, paddingHorizontal: 12, paddingVertical: 4 },
    md: { height: 32, paddingHorizontal: 20, paddingVertical: 8 },
    lg: { height: 36, paddingHorizontal: 24, paddingVertical: 10 },
    xl: { height: 40, paddingHorizontal: 32, paddingVertical: 12 },
    icon: { height: 36, width: 36, paddingHorizontal: 0, paddingVertical: 0 },
  },
  disabled: {
    true: { opacity: 0.5 },
  },
  pill: {
    true: { borderRadius: 999 },
  },
  square: {
    true: { paddingHorizontal: 0, justifyContent: 'center' },
  },
  pressed: {
    true: {},
  },
}, 'Button')

const ButtonText = styled(RNText, {
  fontWeight: '500',
  textAlign: 'center',
}, {
  theme: {
    primary: { color: '$primaryText9' },
    secondary: { color: '$secondaryText9' },
    neutral: { color: '$neutralText4' },
    destructive: { color: '$errorText9' },
  },
  size: {
    sm: { fontSize: 13 },
    md: { fontSize: 14 },
    lg: { fontSize: 15 },
    xl: { fontSize: 16 },
    icon: { fontSize: 14 },
  },
}, 'ButtonText')

// ─── Types ──────────────────────────────────────────────────────────────────

type ButtonVariant = 'solid' | 'subtle' | 'outline' | 'ghost' | 'link'

export interface ButtonProps {
  children?: ReactNode
  theme?: 'primary' | 'secondary' | 'neutral' | 'destructive'
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon'
  square?: boolean
  pill?: boolean
  loading?: boolean
  disabled?: boolean
  pressed?: boolean
  onPress?: () => void
  prefix?: ReactNode
  suffix?: ReactNode
  style?: ViewStyle
  groupPosition?: 'first' | 'middle' | 'last' | 'only'
  groupDirection?: 'horizontal' | 'vertical'
}

// ─── Button ─────────────────────────────────────────────────────────────────

const ButtonRoot = forwardRef<View, ButtonProps>(
  ({
    children,
    theme = 'primary',
    variant = 'solid',
    size = 'md',
    square,
    pill,
    loading,
    disabled,
    pressed,
    onPress,
    prefix,
    suffix,
    groupPosition,
    groupDirection,
    ...rest
  }, ref) => {
    const isDisabled = disabled || loading

    const groupStyle = getGroupStyle(groupPosition, groupDirection)

    return (
      <ButtonBase
        ref={ref}
        theme={theme}
        variant={variant}
        size={size}
        square={square}
        pill={pill}
        disabled={isDisabled}
        pressed={pressed}
        onPress={isDisabled ? undefined : onPress}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        css={groupStyle}
        {...rest}
      >
        {loading && (
          <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="small" />
          </View>
        )}
        <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 8 }, loading && { opacity: 0 }]}>
          {prefix}
          {typeof children === 'string' ? (
            <ButtonText theme={theme} size={size}>{children}</ButtonText>
          ) : (
            children
          )}
          {suffix}
        </View>
      </ButtonBase>
    )
  },
)
ButtonRoot.displayName = 'Button'

// ─── Group style helper ─────────────────────────────────────────────────────

function getGroupStyle(
  position?: string,
  direction?: string,
): Record<string, number> | undefined {
  if (!position || position === 'only') return undefined
  if (direction === 'horizontal') {
    if (position === 'first') return { borderTopRightRadius: 0, borderBottomRightRadius: 0 }
    if (position === 'middle') return { borderRadius: 0 }
    return { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
  }
  if (position === 'first') return { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
  if (position === 'middle') return { borderRadius: 0 }
  return { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
}

// ─── Export ─────────────────────────────────────────────────────────────────

export const Button = Object.assign(ButtonRoot, {
  Text: ButtonText,
  displayName: 'Button',
})
