import type React from 'react'
import { createContext, forwardRef, useContext } from 'react'
import type { ViewStyle } from 'react-native'
import { ActivityIndicator, Pressable, Text as RNText, View } from 'react-native'
import { styled } from '../../stl-native/src/config/styled'

// ---------------------------------------------------------------------------
// Styled frames
// ---------------------------------------------------------------------------

const ButtonFrame = styled(
  Pressable,
  {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: '$3',
    pressed: { opacity: 0.85 },
  },
  {
    variant: {
      default: { backgroundColor: '$primary9' },
      solid: { backgroundColor: '$primary9' },
      secondary: { backgroundColor: '$color3' },
      destructive: { backgroundColor: '$red9' },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
      },
      ghost: { backgroundColor: 'transparent' },
      link: { backgroundColor: 'transparent' },
    },
    size: {
      sm: { height: 28, paddingHorizontal: 8, paddingVertical: 4 },
      md: { height: 32, paddingHorizontal: 12, paddingVertical: 8 },
      lg: { height: 36, paddingHorizontal: 16, paddingVertical: 8 },
      xl: { height: 40, paddingHorizontal: 24, paddingVertical: 12 },
      icon: { height: 36, width: 36, padding: 0 },
    },
    disabled: {
      true: { opacity: 0.5 },
    },
  },
  'Button',
)

const ButtonTextFrame = styled(
  RNText,
  {
    fontWeight: '500',
  },
  {
    textVariant: {
      default: { color: '$color1' },
      solid: { color: '$color1' },
      secondary: { color: '$defaultBody' },
      destructive: { color: '#fff' },
      outline: { color: '$defaultBody' },
      ghost: { color: '$defaultBody' },
      link: { color: '$primary9', textDecorationLine: 'underline' },
    },
    size: {
      sm: { fontSize: 11 },
      md: { fontSize: 12 },
      lg: { fontSize: 16 },
      xl: { fontSize: 18 },
    },
  },
  'ButtonText',
)

const ButtonIconFrame = styled(
  View,
  {
    alignItems: 'center',
    justifyContent: 'center',
  },
  'ButtonIcon',
)

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type ButtonVariant =
  | 'default'
  | 'solid'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'ghost'
  | 'link'

const ButtonContext = createContext<{ variant: ButtonVariant }>({
  variant: 'default',
})

const SPINNER_COLOR_MAP: Record<ButtonVariant, string> = {
  default: '#fff',
  solid: '#fff',
  destructive: '#fff',
  secondary: '#000',
  outline: '#000',
  ghost: '#000',
  link: '#007AFF',
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ButtonText({
  children,
  size = 'md',
  style,
  ...props
}: {
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  style?: ViewStyle
}) {
  const { variant } = useContext(ButtonContext)
  return (
    <ButtonTextFrame textVariant={variant} size={size} style={style} {...props}>
      {children}
    </ButtonTextFrame>
  )
}

function ButtonIcon({ children, ...props }: { children?: React.ReactNode }) {
  return <ButtonIconFrame {...props}>{children}</ButtonIconFrame>
}

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------

export interface ButtonProps {
  children?: React.ReactNode
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon'
  loading?: boolean
  disabled?: boolean
  onPress?: () => void
  style?: ViewStyle
}

const ButtonBase = forwardRef<View, ButtonProps>(function ButtonBase(
  { loading, children, disabled, variant = 'default', size = 'md', onPress, ...props },
  ref,
) {
  const isDisabled = disabled ?? loading ?? false

  return (
    <ButtonContext.Provider value={{ variant }}>
      <ButtonFrame
        ref={ref}
        disabled={isDisabled}
        onPress={isDisabled ? undefined : onPress}
        variant={variant}
        size={size}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: loading || false }}
        {...props}
      >
        {loading ? (
          <ActivityIndicator size="small" color={SPINNER_COLOR_MAP[variant]} />
        ) : (
          children
        )}
      </ButtonFrame>
    </ButtonContext.Provider>
  )
})

export const Button = Object.assign(ButtonBase, {
  Text: ButtonText,
  Icon: ButtonIcon,
})
