import React, { createContext, useContext } from 'react'
import { Button as TamaguiButton, type ButtonProps as TamaguiButtonProps } from '@tamagui/button'
import type { GetProps } from 'tamagui'
import { Spinner, Text, Theme, XStack, styled, withStaticProperties } from 'tamagui'
import { styledHtml } from '@tamagui/web'
import { VisuallyHidden } from '../../primitives'

// Extend Tamagui's Button.Frame with our custom variants.
// Tamagui Button already renders <button type="button"> with correct semantics,
// ARIA, focus styles, hover/press interactions, and token-based sizing.
const ButtonFrame = styled(TamaguiButton.Frame, {
  // @ts-expect-error Tamagui v2 RC PseudoStyleWithTransition type limitation
  focusVisibleStyle: {
    outlineWidth: 2,
    outlineOffset: 1,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },

  variants: {
    variant: {
      // shadcn: "default" — solid primary background
      default: {
        backgroundColor: '$color10',
        borderWidth: 0,
        borderColor: 'transparent',
        hoverStyle: {
          backgroundColor: '$color11',
          borderColor: 'transparent',
        },
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
        hoverStyle: {
          backgroundColor: '$color11',
          borderColor: 'transparent',
        },
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
        hoverStyle: {
          backgroundColor: '$color3',
        },
      },
      // shadcn: "destructive"
      destructive: {
        backgroundColor: '$color10',
        borderWidth: 0,
        borderColor: 'transparent',
        hoverStyle: {
          backgroundColor: '$color11',
        },
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
        hoverStyle: {
          backgroundColor: '$backgroundHover',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderColor: 'transparent',
        hoverStyle: {
          backgroundColor: '$backgroundHover',
        },
      },
      // shadcn: "link"
      link: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderColor: 'transparent',
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    disabled: {
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
const ButtonFrameJsx = ButtonFrame as React.ComponentType<Record<string, unknown>>

type ButtonVariant = 'default' | 'solid' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'

const ButtonContext = createContext<{ variant: ButtonVariant }>({ variant: 'default' })

// @ts-expect-error Tamagui v2 RC
const ButtonTextBase = styled(Text, {
  fontFamily: '$body',
  fontWeight: '$3',

  variants: {
    textVariant: {
      default: { color: '$color1' },
      solid: { color: '$color1' },
      secondary: { color: '$color' },
      destructive: { color: '$color1' },
      outline: { color: '$color' },
      ghost: { color: '$color' },
      link: { color: '$color10', textDecorationLine: 'underline' as any },
    },
    size: {
      xs: { fontSize: '$1' },
      sm: { fontSize: '$2' },
      md: { fontSize: '$4' },
      lg: { fontSize: '$5' },
    },
  } as const,

  defaultVariants: {
    textVariant: 'default',
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
  { loading, children, disabled, variant = 'default', tone = 'neutral', size = 'md', onPress, asChild, ...props },
  ref,
) {
  const isDisabled = disabled ?? loading ?? false
  const themeName = VARIANT_THEME_OVERRIDE[variant] ?? TONE_THEME_MAP[tone]
  const sizeToken = SIZE_TOKEN_MAP[size]
  const isIcon = size === 'icon'

  const frame = (
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
            <Spinner size="small" />
            <VisuallyHidden>Loading</VisuallyHidden>
          </>
        ) : children}
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
