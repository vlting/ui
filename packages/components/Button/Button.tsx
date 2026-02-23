import React, { createContext, useContext } from 'react'
import type { GetProps } from 'tamagui'
import { Spinner, Text, Theme, XStack, styled, withStaticProperties } from 'tamagui'
import { VisuallyHidden } from '../../primitives'

// @ts-expect-error Tamagui v2 RC
const ButtonFrame = styled(XStack, {
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

type ButtonFrameProps = GetProps<typeof ButtonFrame>

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
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        aria-busy={loading || undefined}
        onClick={isDisabled ? undefined : onPress}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          display: 'inline-flex',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
        }}
      >
        {/* @ts-expect-error Tamagui v2 RC */}
        <ButtonFrame
          {...props}
          variant={variant}
          size={size}
          disabled={isDisabled}
        >
          {loading ? (
            <>
              <Spinner size="small" />
              <VisuallyHidden>Loading</VisuallyHidden>
            </>
          ) : children}
        </ButtonFrame>
      </button>
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
