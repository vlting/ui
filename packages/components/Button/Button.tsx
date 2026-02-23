import React, { createContext, useContext } from 'react'
import { Button as TamaguiButton, type ButtonProps as TamaguiButtonProps } from '@tamagui/button'
import type { GetProps } from 'tamagui'
import { Spinner, Text, Theme, XStack, styled, withStaticProperties } from 'tamagui'
import { VisuallyHidden } from '../../primitives'

// Extend Tamagui's Button.Frame with our custom variants.
// Tamagui Button already renders <button type="button"> with correct semantics,
// ARIA, focus styles, hover/press interactions, and token-based sizing.
// @ts-expect-error Tamagui v2 RC
const ButtonFrame = styled(TamaguiButton.Frame, {
  variants: {
    variant: {
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
  sm: '$3',
  md: '$4',
  lg: '$5',
}

type ButtonFrameProps = GetProps<typeof ButtonFrame>

// Cast for JSX usage — Tamagui v2 RC GetFinalProps resolves all props as undefined
const ButtonFrameJsx = ButtonFrame as React.ComponentType<Record<string, unknown>>

const ButtonContext = createContext<{ variant: 'solid' | 'outline' | 'ghost' }>({ variant: 'solid' })

// @ts-expect-error Tamagui v2 RC
const ButtonTextBase = styled(Text, {
  fontFamily: '$body',
  fontWeight: '$3',

  variants: {
    textVariant: {
      solid: { color: '$color1' },
      outline: { color: '$color' },
      ghost: { color: '$color' },
    },
    size: {
      sm: { fontSize: '$2' },
      md: { fontSize: '$4' },
      lg: { fontSize: '$5' },
    },
  } as const,

  defaultVariants: {
    textVariant: 'solid',
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
  variant?: 'solid' | 'outline' | 'ghost'
  tone?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  onPress?: () => void
}

const TONE_THEME_MAP: Record<string, string | undefined> = {
  neutral: undefined,
  primary: 'blue',
  success: 'green',
  warning: 'orange',
  danger: 'red',
}

const ButtonBase = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & Omit<ButtonFrameProps, keyof ButtonProps>
>(function ButtonBase(
  { loading, children, disabled, variant = 'solid', tone = 'neutral', size = 'md', onPress, ...props },
  ref,
) {
  const isDisabled = disabled ?? loading ?? false
  const themeName = TONE_THEME_MAP[tone]
  const sizeToken = SIZE_TOKEN_MAP[size]

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
