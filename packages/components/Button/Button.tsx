import { Button as TamaguiButton } from '@tamagui/button'
import React, { createContext, useContext } from 'react'
import type { GetProps } from 'tamagui'
import { Spinner, Text, Theme, XStack, styled, withStaticProperties } from 'tamagui'
import { VisuallyHidden } from '../../primitives'

// Extend Tamagui's Button.Frame with our custom variants.
// Tamagui Button already renders <button type="button"> with correct semantics,
// ARIA, focus styles, hover/press interactions, and token-based sizing.
const ButtonFrame = styled(TamaguiButton.Frame, {
  // @ts-expect-error Tamagui v2 RC PseudoStyleWithTransition type limitation
  focusVisibleStyle: {
    outlineWidth: 2,
    outlineOffset: 1,
    outlineColor: '$color10',
    outlineStyle: 'solid',
  },

  variants: {
    variant: {
      // shadcn: "default" — solid primary background
      default: {
        backgroundColor: '$color10',
        borderWidth: 0,
        borderColor: 'transparent',
        // @ts-expect-error Tamagui v2 RC
        hoverStyle: {
          backgroundColor: '$color11',
          borderColor: 'transparent',
        },
        // @ts-expect-error Tamagui v2 RC
        pressStyle: {
          backgroundColor: '$color11',
          borderColor: 'transparent',
        },
      },
      // Backwards compat alias
      solid: {
        backgroundColor: '$color10',
        borderWidth: 0,
        borderColor: 'transparent',
        // @ts-expect-error Tamagui v2 RC
        hoverStyle: {
          backgroundColor: '$color11',
          borderColor: 'transparent',
        },
        // @ts-expect-error Tamagui v2 RC
        pressStyle: {
          backgroundColor: '$color11',
          borderColor: 'transparent',
        },
      },
      // shadcn: "secondary"
      secondary: {
        backgroundColor: '$color2',
        borderWidth: 0,
        borderColor: 'transparent',
        // @ts-expect-error Tamagui v2 RC
        hoverStyle: {
          backgroundColor: '$color3',
        },
      },
      // shadcn: "destructive"
      destructive: {
        backgroundColor: '$color10',
        borderWidth: 0,
        borderColor: 'transparent',
        // @ts-expect-error Tamagui v2 RC
        hoverStyle: {
          backgroundColor: '$color11',
        },
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
        // @ts-expect-error Tamagui v2 RC
        hoverStyle: {
          backgroundColor: '$backgroundHover',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderColor: 'transparent',
        // @ts-expect-error Tamagui v2 RC
        hoverStyle: {
          backgroundColor: '$backgroundHover',
        },
      },
      // shadcn: "link"
      // @ts-expect-error Tamagui v2 RC
      link: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderColor: 'transparent',
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    disabled: {
      // @ts-expect-error Tamagui v2 RC
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  } as const,
})

// Map our named sizes to Tamagui size tokens
const SIZE_TOKEN_MAP: Record<string, string> = {
  xs: '$2',
  sm: '$3',
  md: '$4',
  lg: '$5',
  icon: '$4',
}

type ButtonFrameProps = GetProps<typeof ButtonFrame>

// Cast for JSX usage — Tamagui v2 RC GetFinalProps resolves all props as undefined
type AnyFC = React.ComponentType<Record<string, unknown>>
const ButtonFrameJsx = ButtonFrame as AnyFC
const SpinnerJsx = Spinner as AnyFC
const VisuallyHiddenJsx = VisuallyHidden as AnyFC

type ButtonVariant =
  | 'default'
  | 'solid'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'ghost'
  | 'link'

const SPINNER_COLOR_MAP: Record<ButtonVariant, string> = {
  default: '$color1',
  solid: '$color1',
  destructive: '$color1',
  secondary: '$color',
  outline: '$color',
  ghost: '$color',
  link: '$color10',
}

const ButtonContext = createContext<{ variant: ButtonVariant }>({ variant: 'default' })

const ButtonTextBase = styled(Text, {
  fontFamily: '$body',
  fontWeight: '$3',

  variants: {
    textVariant: {
      // @ts-expect-error Tamagui v2 RC
      default: { color: '$color1' },
      // @ts-expect-error Tamagui v2 RC
      solid: { color: '$color1' },
      // @ts-expect-error Tamagui v2 RC
      secondary: { color: '$color' },
      // @ts-expect-error Tamagui v2 RC
      destructive: { color: '$color1' },
      // @ts-expect-error Tamagui v2 RC
      outline: { color: '$color' },
      // @ts-expect-error Tamagui v2 RC
      ghost: { color: '$color' },
      // @ts-expect-error Tamagui v2 RC
      link: { color: '$color10', textDecorationLine: 'underline' as any },
    },
    size: {
      // @ts-expect-error Tamagui v2 RC
      xs: { fontSize: '$1' },
      // @ts-expect-error Tamagui v2 RC
      sm: { fontSize: '$2' },
      // @ts-expect-error Tamagui v2 RC
      md: { fontSize: '$4' },
      // @ts-expect-error Tamagui v2 RC
      lg: { fontSize: '$5' },
    },
  } as const,

  defaultVariants: {
    // @ts-expect-error Tamagui v2 RC
    textVariant: 'default',
    // @ts-expect-error Tamagui v2 RC
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const ButtonIcon = styled(XStack, {
  alignItems: 'center',
  justifyContent: 'center',
})

function ButtonText(props: React.ComponentProps<typeof ButtonTextBase>) {
  const { variant } = useContext(ButtonContext)
  // @ts-expect-error Tamagui v2 RC
  return <ButtonTextBase {...props} textVariant={variant} />
}

export interface ButtonProps {
  children?: React.ReactNode
  variant?: ButtonVariant
  tone?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon'
  loading?: boolean
  disabled?: boolean
  onPress?: () => void
  asChild?: boolean
}

const TONE_THEME_MAP: Record<string, string | undefined> = {
  neutral: undefined,
  primary: 'blue',
  success: 'green',
  warning: 'orange',
  danger: 'red',
}

// For destructive variant, always use red theme
const VARIANT_THEME_OVERRIDE: Record<string, string | undefined> = {
  destructive: 'red',
}

const ButtonBase = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & Omit<ButtonFrameProps, keyof ButtonProps>
>(function ButtonBase(
  {
    loading,
    children,
    disabled,
    variant = 'default',
    tone = 'neutral',
    size = 'md',
    onPress,
    asChild,
    ...props
  },
  ref,
) {
  const isDisabled = disabled ?? loading ?? false
  const themeName = VARIANT_THEME_OVERRIDE[variant] ?? TONE_THEME_MAP[tone]
  const sizeToken = SIZE_TOKEN_MAP[size]
  const isIcon = size === 'icon'

  const frame = (
    // @ts-expect-error Tamagui v2 RC
    <ButtonContext.Provider value={{ variant }}>
      <ButtonFrameJsx
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        onPress={isDisabled ? undefined : onPress}
        {...props}
        variant={variant}
        size={sizeToken}
        {...(isIcon ? { width: sizeToken, padding: 0 } : {})}
      >
        {loading ? (
          <>
            <SpinnerJsx
              size="small"
              color={SPINNER_COLOR_MAP[variant as ButtonVariant]}
            />
            <VisuallyHiddenJsx>Loading</VisuallyHiddenJsx>
          </>
        ) : (
          children
        )}
      </ButtonFrameJsx>
    </ButtonContext.Provider>
  )

  if (themeName) {
    return <Theme name={themeName}>{frame}</Theme>
  }

  return frame
})

export const Button = withStaticProperties(ButtonBase, {
  Text: ButtonText,
  Icon: ButtonIcon,
})
