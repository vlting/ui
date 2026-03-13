import React from 'react'
import { VisuallyHidden } from '../../primitives'
import { Spinner } from '../../primitives/Spinner'
import { styled, options } from '../../stl-react/src/config'

// ─── Types ───────────────────────────────────────────────────────────────────

export type ButtonTheme = 'primary' | 'secondary' | 'neutral' | 'destructive'
export type ButtonVariant = 'solid' | 'subtle' | 'outline' | 'ghost' | 'link'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon'

export interface ButtonProps {
  children?: React.ReactNode
  theme?: ButtonTheme
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

// ─── ButtonFrame ─────────────────────────────────────────────────────────────

interface ButtonTemplateProps {
  loading?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

const ButtonFrame = styled<ButtonTemplateProps>('button', {
  stl: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '$8',
    borderRadius: '$button',
    fontFamily: '$body',
    fontWeight: '$500',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    transition:
      'background-color 150ms ease, border-color 150ms ease, color 150ms ease, transform 100ms ease',
    focused: {
      outlineWidth: '$widthBase',
      outlineStyle: 'solid',
      outlineColor: '$outlineColor',
      outlineOffset: '$offsetDefault',
    },
    lowMotion: {
      transition: 'none',
      pressed: { transform: 'none' },
    },
  },
  variants: {
    theme: options('primary', 'secondary', 'neutral', 'destructive'),
    variant: options('solid', 'subtle', 'outline', 'ghost', 'link'),
    size: {
      xs: { height: '$28', py: '$4', px: '$8', fontSize: '$buttonTiny' },
      sm: { height: '$32', py: '$8', px: '$12', fontSize: '$buttonSmall' },
      md: { height: '$36', py: '$buttonBasePy', px: '$buttonBasePx', fontSize: '$button' },
      lg: { height: '$40', py: '$12', px: '$24', fontSize: '$buttonLarge' },
      icon: { height: '$36', width: '$36', p: '$0', fontSize: '$button' },
    },
    disabled: {
      true: { opacity: '0.5', cursor: 'not-allowed', pointerEvents: 'none' },
    },
  },
  compoundVariants: [
    // ── Primary ────────────────────────────────────────
    { when: { theme: 'primary', variant: 'solid' }, stl: {
      bg: '$primary9', color: '$primaryText9',
      hovered: { bg: '$primary10', color: '$primaryText10' },
      pressed: { bg: '$primary10', transform: 'scale(0.98)' },
      focused: { bg: '$primary10' },
    }},
    { when: { theme: 'primary', variant: 'subtle' }, stl: {
      bg: '$primary3', color: '$primaryText11',
      hovered: { bg: '$primary4', color: '$primaryText11' },
      pressed: { bg: '$primary4', transform: 'scale(0.98)' },
      focused: { bg: '$primary4' },
    }},
    { when: { theme: 'primary', variant: 'outline' }, stl: {
      bg: 'transparent', borderWidth: '1px', borderStyle: 'solid', borderColor: '$primary7', color: '$primaryText11',
      hovered: { bg: '$primary2' },
      pressed: { bg: '$primary2', transform: 'scale(0.98)' },
      focused: { bg: '$primary2' },
    }},
    { when: { theme: 'primary', variant: 'ghost' }, stl: {
      bg: 'transparent', color: '$primary11',
      hovered: { bg: '$primary3' },
      pressed: { bg: '$primary3', transform: 'scale(0.98)' },
      focused: { bg: '$primary3' },
    }},
    { when: { theme: 'primary', variant: 'link' }, stl: {
      bg: 'transparent', color: '$primary9', px: '$0', textDecoration: 'underline',
      hovered: { color: '$primaryText10' },
      pressed: { color: '$primaryText10' },
      focused: { color: '$primaryText10' },
    }},

    // ── Secondary ──────────────────────────────────────
    { when: { theme: 'secondary', variant: 'solid' }, stl: {
      bg: '$secondary9', color: '$secondaryText9',
      hovered: { bg: '$secondary10', color: '$secondaryText10' },
      pressed: { bg: '$secondary10', transform: 'scale(0.98)' },
      focused: { bg: '$secondary10' },
    }},
    { when: { theme: 'secondary', variant: 'subtle' }, stl: {
      bg: '$secondary3', color: '$secondaryText11',
      hovered: { bg: '$secondary4', color: '$secondaryText11' },
      pressed: { bg: '$secondary4', transform: 'scale(0.98)' },
      focused: { bg: '$secondary4' },
    }},
    { when: { theme: 'secondary', variant: 'outline' }, stl: {
      bg: 'transparent', borderWidth: '1px', borderStyle: 'solid', borderColor: '$secondary7', color: '$secondaryText11',
      hovered: { bg: '$secondary2' },
      pressed: { bg: '$secondary2', transform: 'scale(0.98)' },
      focused: { bg: '$secondary2' },
    }},
    { when: { theme: 'secondary', variant: 'ghost' }, stl: {
      bg: 'transparent', color: '$secondary11',
      hovered: { bg: '$secondary3' },
      pressed: { bg: '$secondary3', transform: 'scale(0.98)' },
      focused: { bg: '$secondary3' },
    }},
    { when: { theme: 'secondary', variant: 'link' }, stl: {
      bg: 'transparent', color: '$secondary9', px: '$0', textDecoration: 'underline',
      hovered: { color: '$secondaryText10' },
      pressed: { color: '$secondaryText10' },
      focused: { color: '$secondaryText10' },
    }},

    // ── Neutral ────────────────────────────────────────
    { when: { theme: 'neutral', variant: 'solid' }, stl: {
      bg: '$color9', color: '$colorText9',
      hovered: { bg: '$color10', color: '$colorText10' },
      pressed: { bg: '$color10', transform: 'scale(0.98)' },
      focused: { bg: '$color10' },
    }},
    { when: { theme: 'neutral', variant: 'subtle' }, stl: {
      bg: '$color3', color: '$colorText11',
      hovered: { bg: '$color4', color: '$colorText11' },
      pressed: { bg: '$color4', transform: 'scale(0.98)' },
      focused: { bg: '$color4' },
    }},
    { when: { theme: 'neutral', variant: 'outline' }, stl: {
      bg: 'transparent', borderWidth: '1px', borderStyle: 'solid', borderColor: '$color7', color: '$colorText11',
      hovered: { bg: '$color2' },
      pressed: { bg: '$color2', transform: 'scale(0.98)' },
      focused: { bg: '$color2' },
    }},
    { when: { theme: 'neutral', variant: 'ghost' }, stl: {
      bg: 'transparent', color: '$color11',
      hovered: { bg: '$color3' },
      pressed: { bg: '$color3', transform: 'scale(0.98)' },
      focused: { bg: '$color3' },
    }},
    { when: { theme: 'neutral', variant: 'link' }, stl: {
      bg: 'transparent', color: '$color9', px: '$0', textDecoration: 'underline',
      hovered: { color: '$colorText10' },
      pressed: { color: '$colorText10' },
      focused: { color: '$colorText10' },
    }},

    // ── Destructive ────────────────────────────────────
    { when: { theme: 'destructive', variant: 'solid' }, stl: {
      bg: '$red9', color: '$redText9',
      hovered: { bg: '$red10', color: '$redText10' },
      pressed: { bg: '$red10', transform: 'scale(0.98)' },
      focused: { bg: '$red10' },
    }},
    { when: { theme: 'destructive', variant: 'subtle' }, stl: {
      bg: '$red3', color: '$redText11',
      hovered: { bg: '$red4', color: '$redText11' },
      pressed: { bg: '$red4', transform: 'scale(0.98)' },
      focused: { bg: '$red4' },
    }},
    { when: { theme: 'destructive', variant: 'outline' }, stl: {
      bg: 'transparent', borderWidth: '1px', borderStyle: 'solid', borderColor: '$red7', color: '$redText11',
      hovered: { bg: '$red2' },
      pressed: { bg: '$red2', transform: 'scale(0.98)' },
      focused: { bg: '$red2' },
    }},
    { when: { theme: 'destructive', variant: 'ghost' }, stl: {
      bg: 'transparent', color: '$red11',
      hovered: { bg: '$red3' },
      pressed: { bg: '$red3', transform: 'scale(0.98)' },
      focused: { bg: '$red3' },
    }},
    { when: { theme: 'destructive', variant: 'link' }, stl: {
      bg: 'transparent', color: '$red9', px: '$0', textDecoration: 'underline',
      hovered: { color: '$redText10' },
      pressed: { color: '$redText10' },
      focused: { color: '$redText10' },
    }},
  ],
  defaultVariants: { theme: 'primary', variant: 'solid', size: 'md' },
  template: ({ children, loading, prefix: prefixSlot, suffix: suffixSlot }) => (
    <>
      {prefixSlot}
      {loading ? (
        <>
          <Spinner size="sm" />
          <VisuallyHidden>Loading</VisuallyHidden>
        </>
      ) : (
        children
      )}
      {suffixSlot}
    </>
  ),
  templateProps: ['loading', 'prefix', 'suffix'],
  styleName: 'Button',
})

// ─── Button ──────────────────────────────────────────────────────────────────

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonProps>
>(function Button(
  {
    theme = 'primary',
    variant = 'solid',
    size = 'md',
    loading,
    disabled,
    prefix,
    suffix,
    children,
    onClick,
    ...props
  },
  ref,
) {
  const isDisabled = disabled ?? loading ?? false

  return (
    <ButtonFrame
      ref={ref}
      type="button"
      disabled={isDisabled}
      aria-busy={loading || undefined}
      onClick={isDisabled ? undefined : onClick}
      theme={theme}
      variant={variant}
      {...(isDisabled ? { disabled: true } : {})}
      size={size}
      loading={loading}
      prefix={prefix}
      suffix={suffix}
      {...props}
    >
      {children}
    </ButtonFrame>
  )
})
