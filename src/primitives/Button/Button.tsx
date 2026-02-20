import React from 'react'
import type { GetProps } from 'tamagui'
import { Spinner, Text, XStack, styled, withStaticProperties } from 'tamagui'

// ---------------------------------------------------------------------------
// Button primitive — action trigger
//
// Spec: Button.spec.md
// Universal pressable element for triggering discrete user actions.
// Supports 4 variants, 3 sizes, loading state, and disabled state.
// NOT for navigation — use a Link component for that purpose.
// ---------------------------------------------------------------------------

const ButtonFrame = styled(XStack, {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$4',
  cursor: 'pointer',
  gap: '$2',
  // Focus ring
  focusStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },
  // Pressed feedback
  pressStyle: {
    opacity: 0.85,
    scale: 0.98,
  },
  // Animated transitions (fast)
  animation: 'fast',

  variants: {
    variant: {
      primary: {
        backgroundColor: '$blue10',
        borderWidth: 0,
      },
      secondary: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
      },
      tertiary: {
        backgroundColor: 'transparent',
        borderWidth: 0,
      },
      destructive: {
        backgroundColor: '$red10',
        borderWidth: 0,
      },
    },

    size: {
      sm: {
        paddingVertical: '$1',
        paddingHorizontal: '$3',
        height: '$3.5',
        minHeight: 36,
      },
      md: {
        paddingVertical: '$2',
        paddingHorizontal: '$4',
        height: '$4',
        minHeight: 44,
      },
      lg: {
        paddingVertical: '$3',
        paddingHorizontal: '$5',
        height: '$4.5',
        minHeight: 48,
      },
    },

    disabled: {
      true: {
        opacity: 0.4,
        pointerEvents: 'none' as const,
        cursor: 'not-allowed',
      },
    },

    fullWidth: {
      true: {
        width: '100%',
        alignSelf: 'stretch',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

// ---------------------------------------------------------------------------
// ButtonText — text label inside the button
// ---------------------------------------------------------------------------

const ButtonText = styled(Text, {
  fontFamily: '$body',
  fontWeight: '$3' as '500',
  numberOfLines: 1,

  variants: {
    variant: {
      primary: {
        color: 'white',
      },
      secondary: {
        color: '$color',
      },
      tertiary: {
        color: '$blue10',
      },
      destructive: {
        color: 'white',
      },
    },

    size: {
      sm: { fontSize: '$3', lineHeight: '$3' },
      md: { fontSize: '$4', lineHeight: '$4' },
      lg: { fontSize: '$5', lineHeight: '$5' },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

// ---------------------------------------------------------------------------
// ButtonIcon — slot for leading/trailing icons
// ---------------------------------------------------------------------------

const ButtonIcon = styled(XStack, {
  alignItems: 'center',
  justifyContent: 'center',
})

// ---------------------------------------------------------------------------
// ButtonBase — functional wrapper adding loading state and a11y
// ---------------------------------------------------------------------------

type ButtonFrameProps = GetProps<typeof ButtonFrame>

export type ButtonProps = ButtonFrameProps & {
  /**
   * Shows a spinner and prevents interaction when true.
   * Parent is responsible for setting this prop.
   */
  loading?: boolean
  /** Button label — rendered inside ButtonText when passing a plain string */
  children?: React.ReactNode
  /** Optional ARIA label for icon-only buttons */
  'aria-label'?: string
}

const ButtonBase = React.forwardRef<React.ElementRef<typeof ButtonFrame>, ButtonProps>(
  function ButtonBase({ loading, children, disabled, variant = 'primary', ...props }, ref) {
    const isDisabled = disabled ?? loading ?? false

    return (
      <ButtonFrame
        ref={ref}
        {...props}
        variant={variant}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityState={{
          disabled: isDisabled,
          busy: loading,
        }}
        // aria-disabled kept for web
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
      >
        {loading ? (
          <Spinner
            size="small"
            color={variant === 'secondary' || variant === 'tertiary' ? '$color' : 'white'}
            aria-label="Loading"
          />
        ) : (
          children
        )}
      </ButtonFrame>
    )
  }
)

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const Button = withStaticProperties(ButtonBase, {
  Text: ButtonText,
  Icon: ButtonIcon,
})

export type { ButtonFrameProps }
