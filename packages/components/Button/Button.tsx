import React, { createContext, useContext } from 'react'
import type { GetProps } from 'tamagui'
import { Spinner, Text, Theme, XStack, styled, withStaticProperties } from 'tamagui'
import { styledHtml } from '@tamagui/web'
import { VisuallyHidden } from '../../primitives'

// styledHtml sets Component: 'button' in staticConfig, rendering a real <button>
const ButtonFrame = styledHtml('button', {
  // XStack defaults that styledHtml('button') does not inherit:
  display: 'inline-flex',
  flexDirection: 'row',
  boxSizing: 'border-box',

  // Reset browser button defaults:
  appearance: 'none',
  border: 'none',
  background: 'none',
  padding: 0,
  margin: 0,
  fontFamily: 'inherit',

  // Original ButtonFrame styles:
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$4',
  cursor: 'pointer',
  gap: '$1.5',

  focusWithinStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },

  pressStyle: {
    opacity: 0.85,
    scale: 0.98,
  },

  animation: 'fast',

  variants: {
    variant: {
      solid: {
        backgroundColor: '$color10',
        borderWidth: 0,
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
        hoverStyle: {
          backgroundColor: '$backgroundHover',
        },
      },
    },

    size: {
      sm: {
        paddingVertical: '$1',
        paddingHorizontal: '$3',
        height: '$3.5',
      },
      md: {
        paddingVertical: '$2',
        paddingHorizontal: '$4',
        height: '$4',
      },
      lg: {
        paddingVertical: '$3',
        paddingHorizontal: '$5',
        height: '$4.5',
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

  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
})

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

type ButtonFrameProps = GetProps<typeof ButtonFrame>

// Cast for JSX usage — Tamagui v2 RC GetFinalProps resolves all props as undefined
const ButtonFrameJsx = ButtonFrame as React.ComponentType<Record<string, unknown>>

const ButtonContext = createContext<{ variant: 'solid' | 'outline' | 'ghost' }>({ variant: 'solid' })

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

  const frame = (
    <ButtonContext.Provider value={{ variant }}>
      <ButtonFrameJsx
        ref={ref}
        type="button"
        disabled={isDisabled}
        aria-busy={loading || undefined}
        onClick={isDisabled ? undefined : onPress}
        {...props}
        variant={variant}
        size={size}
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
