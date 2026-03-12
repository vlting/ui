import React from 'react'
import { VisuallyHidden } from '../../primitives'
import { styled } from '../../stl-react/src/config'

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

// ─── Spinner ─────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'var(--spin) var(--spinDuration, 1.25s) linear infinite',
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" opacity="0.25" />
        <path
          d="M14 8a6 6 0 0 0-6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

// ─── Compound variant generation ─────────────────────────────────────────────

const THEME_PREFIX: Record<ButtonTheme, string> = {
  primary: 'primary',
  secondary: 'secondary',
  neutral: 'color',
  destructive: 'red',
}

type VariantGenerator = (p: string, tp: string) => Record<string, any>

const VARIANT_CSS: Record<ButtonVariant, VariantGenerator> = {
  solid: (p, tp) => ({
    backgroundColor: `$${p}9`,
    color: `$${tp}9`,
    hovered: { backgroundColor: `$${p}10`, color: `$${tp}10` },
    pressed: { backgroundColor: `$${p}10`, transform: 'scale(0.98)' },
    focused: { backgroundColor: `$${p}10` },
  }),
  subtle: (p, tp) => ({
    backgroundColor: `$${p}3`,
    color: `$${tp}11`,
    hovered: { backgroundColor: `$${p}4`, color: `$${tp}11` },
    pressed: { backgroundColor: `$${p}4`, transform: 'scale(0.98)' },
    focused: { backgroundColor: `$${p}4` },
  }),
  outline: (p, tp) => ({
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: `$${p}7`,
    color: `$${tp}11`,
    hovered: { backgroundColor: `$${p}2` },
    pressed: { backgroundColor: `$${p}2`, transform: 'scale(0.98)' },
    focused: { backgroundColor: `$${p}2` },
  }),
  ghost: (p, _tp) => ({
    backgroundColor: 'transparent',
    color: `$${p}11`,
    hovered: { backgroundColor: `$${p}3` },
    pressed: { backgroundColor: `$${p}3`, transform: 'scale(0.98)' },
    focused: { backgroundColor: `$${p}3` },
  }),
  link: (p, tp) => ({
    backgroundColor: 'transparent',
    color: `$${p}9`,
    paddingLeft: '$0',
    paddingRight: '$0',
    textDecoration: 'underline',
    hovered: { color: `$${tp}10` },
    pressed: { color: `$${tp}10` },
    focused: { color: `$${tp}10` },
  }),
}

function generateComboVariants(): Record<string, Record<string, any>> {
  const combos: Record<string, Record<string, any>> = {}
  for (const [theme, prefix] of Object.entries(THEME_PREFIX)) {
    const textPrefix = prefix === 'color' ? 'colorText' : `${prefix}Text`
    for (const [variant, generator] of Object.entries(VARIANT_CSS)) {
      combos[`${theme}_${variant}`] = generator(prefix, textPrefix)
    }
  }
  return combos
}

// ─── ButtonFrame ─────────────────────────────────────────────────────────────

interface ButtonTemplateProps {
  loading?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

const ButtonFrame = styled<ButtonTemplateProps>('button', {
  css: {
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
    _combo: generateComboVariants(),
    size: {
      xs: {
        height: '$28',
        paddingTop: '$4',
        paddingBottom: '$4',
        paddingLeft: '$8',
        paddingRight: '$8',
        fontSize: '$buttonTiny',
      },
      sm: {
        height: '$32',
        paddingTop: '$8',
        paddingBottom: '$8',
        paddingLeft: '$12',
        paddingRight: '$12',
        fontSize: '$buttonSmall',
      },
      md: {
        height: '$36',
        paddingTop: '$buttonBasePy',
        paddingBottom: '$buttonBasePy',
        paddingLeft: '$buttonBasePx',
        paddingRight: '$buttonBasePx',
        fontSize: '$button',
      },
      lg: {
        height: '$40',
        paddingTop: '$12',
        paddingBottom: '$12',
        paddingLeft: '$24',
        paddingRight: '$24',
        fontSize: '$buttonLarge',
      },
      icon: {
        height: '$36',
        width: '$36',
        padding: '$0',
        fontSize: '$button',
      },
    },
    _disabled: {
      true: { opacity: '0.5', cursor: 'not-allowed', pointerEvents: 'none' },
    },
  },
  defaultVariants: {
    _combo: 'primary_solid',
    size: 'md',
  },
  template: ({ children, loading, prefix: prefixSlot, suffix: suffixSlot }) => (
    <>
      {prefixSlot}
      {loading ? (
        <>
          <Spinner />
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
  const combo = `${theme}_${variant}` as const

  return (
    <ButtonFrame
      ref={ref}
      type="button"
      disabled={isDisabled}
      aria-busy={loading || undefined}
      onClick={isDisabled ? undefined : onClick}
      _combo={combo}
      _disabled={isDisabled || undefined}
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
