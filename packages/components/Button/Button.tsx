import type { ReactNode } from 'react'
import { VisuallyHidden } from '../../stl-react/src/primitives/VisuallyHidden/VisuallyHidden'
import { Spinner } from '../../stl-react/src/primitives/Spinner/Spinner'
import { styled, props, options } from '../../stl-react/src/config'

const ButtonSpinner = styled('span', {
  stl: { position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' },
})

const ButtonContent = styled('span', {
  stl: { display: 'contents' },
  variants: {
    hidden: { true: { visibility: 'hidden' } },
  },
})

// ─── Button ──────────────────────────────────────────────────────────────────
export const Button = styled('button', {
  stl: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '$8',
    borderRadius: '$button',
    fontFamily: '$body',
    fontWeight: '$500',
    cursor: 'pointer',
    outline: 'none',
    ':focus': { outlineOffset: '$offsetDefault' },
    ':pressed': { transform: 'scale(0.98)' },
    lowMotion: {
      transition: 'none',
      ':pressed': { transform: 'none' },
    },
  },
  variants: {
    theme: options('primary', 'secondary', 'neutral', 'destructive'),
    variant: {
      solid: { border: 'none' },
      subtle: { border: 'none' },
      outline: {},
      ghost: { border: 'none' },
      link: { border: 'none' },
    },
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
    loading: {
      true: { cursor: 'wait', pointerEvents: 'none' },
    },
  },
  compoundVariants: [
    // ── Primary ────────────────────────────────────────
    {
      when: { theme: 'primary', variant: 'solid' },
      stl: {
        bg: '$primary9', color: '$primaryText9',
        ':interact': { bg: '$primary10', color: '$primaryText10' },
        ':focus': { outline: '$primaryMax' },
      },
    },
    {
      when: { theme: 'primary', variant: 'subtle' },
      stl: {
        bg: '$primary3', color: '$primaryText3',
        ':interact': { bg: '$primary9', color: '$primaryText9' },
        ':focus': { outline: '$primary' },
      },
    },
    {
      when: { theme: 'primary', variant: 'outline' },
      stl: {
        bg: 'transparent', border: '$primary9', color: '$primaryText1',
        ':interact': { bg: '$primary9', color: '$primaryText9', borderColor: '$primary9' },
        ':focus': { outline: '$primary' },
      },
    },
    {
      when: { theme: 'primary', variant: 'ghost' },
      stl: {
        bg: 'transparent', color: '$primaryText1',
        ':interact': { bg: '$primary9', color: '$primaryText9' },
        ':focus': { outline: '$primary' },
      },
    },
    {
      when: { theme: 'primary', variant: 'link' },
      stl: {
        bg: 'transparent', color: '$primaryText1', px: '$0', textDecoration: 'underline',
        ':interact': { bg: '$primary9', color: '$primaryText9' },
        ':focus': { outline: '$primary' },
      },
    },

    // ── Secondary ──────────────────────────────────────
    {
      when: { theme: 'secondary', variant: 'solid' },
      stl: {
        bg: '$secondary9', color: '$secondaryText9',
        ':interact': { bg: '$secondary10', color: '$secondaryText10' },
        ':focus': { outline: '$secondaryMax' },
      },
    },
    {
      when: { theme: 'secondary', variant: 'subtle' },
      stl: {
        bg: '$secondary3', color: '$secondaryText3',
        ':interact': { bg: '$secondary9', color: '$secondaryText9' },
        ':focus': { outline: '$secondary' },
      },
    },
    {
      when: { theme: 'secondary', variant: 'outline' },
      stl: {
        bg: 'transparent', border: '$secondary9', color: '$secondaryText1',
        ':interact': { bg: '$secondary9', color: '$secondaryText9', borderColor: '$secondary9' },
        ':focus': { outline: '$secondary' },
      },
    },
    {
      when: { theme: 'secondary', variant: 'ghost' },
      stl: {
        bg: 'transparent', color: '$secondaryText1',
        ':interact': { bg: '$secondary9', color: '$secondaryText9' },
        ':focus': { outline: '$secondary' },
      },
    },
    {
      when: { theme: 'secondary', variant: 'link' },
      stl: {
        bg: 'transparent', color: '$secondaryText1', px: '$0', textDecoration: 'underline',
        ':interact': { bg: '$secondary9', color: '$secondaryText9' },
        ':focus': { outline: '$secondary' },
      },
    },

    // ── Neutral ────────────────────────────────────────
    {
      when: { theme: 'neutral', variant: 'solid' },
      stl: {
        bg: '$neutral9', color: '$neutralText9',
        ':interact': { bg: '$neutral10', color: '$neutralText10' },
        ':focus': { outline: '$neutralMax' },
      },
    },
    {
      when: { theme: 'neutral', variant: 'subtle' },
      stl: {
        bg: '$neutral3', color: '$neutralText3',
        ':interact': { bg: '$neutral9', color: '$neutralText9' },
        ':focus': { outline: '$neutral' },
      },
    },
    {
      when: { theme: 'neutral', variant: 'outline' },
      stl: {
        bg: 'transparent', border: '$neutral9', color: '$neutralText1',
        ':interact': { bg: '$neutral9', color: '$neutralText9', borderColor: '$neutral9' },
        ':focus': { outline: '$neutral' },
      },
    },
    {
      when: { theme: 'neutral', variant: 'ghost' },
      stl: {
        bg: 'transparent', color: '$neutralText1',
        ':interact': { bg: '$neutral9', color: '$neutralText9' },
        ':focus': { outline: '$neutral' },
      },
    },
    {
      when: { theme: 'neutral', variant: 'link' },
      stl: {
        bg: 'transparent', color: '$neutralText1', px: '$0', textDecoration: 'underline',
        ':interact': { bg: '$neutral9', color: '$neutralText9' },
        ':focus': { outline: '$neutral' },
      },
    },

    // ── Destructive ────────────────────────────────────
    {
      when: { theme: 'destructive', variant: 'solid' },
      stl: {
        bg: '$error9', color: '$errorText9',
        ':interact': { bg: '$error10', color: '$errorText10' },
        ':focus': { outline: '$errorMax' },
      },
    },
    {
      when: { theme: 'destructive', variant: 'subtle' },
      stl: {
        bg: '$error3', color: '$errorText3',
        ':interact': { bg: '$error9', color: '$errorText9' },
        ':focus': { outline: '$error' },
      },
    },
    {
      when: { theme: 'destructive', variant: 'outline' },
      stl: {
        bg: 'transparent', border: '$error9', color: '$errorText1',
        ':interact': { bg: '$error9', color: '$errorText9', borderColor: '$error9' },
        ':focus': { outline: '$error' },
      },
    },
    {
      when: { theme: 'destructive', variant: 'ghost' },
      stl: {
        bg: 'transparent', color: '$errorText1',
        ':interact': { bg: '$error9', color: '$errorText9' },
        ':focus': { outline: '$error' },
      },
    },
    {
      when: { theme: 'destructive', variant: 'link' },
      stl: {
        bg: 'transparent', color: '$errorText1', px: '$0', textDecoration: 'underline',
        ':interact': { bg: '$error9', color: '$errorText9' },
        ':focus': { outline: '$error' },
      },
    },

    // ── Loading overrides disabled opacity ─────────────
    { when: { disabled: 'true', loading: 'true' }, stl: { opacity: '1', cursor: 'wait' } },
  ],
  defaultVariants: { theme: 'primary', variant: 'solid', size: 'md' },
  mapProps: (props) => ({
    ...props,
    type: 'button',
    disabled: props.disabled ?? props.loading ?? false,
    'aria-busy': props.loading || undefined,
    onClick: (props.disabled ?? props.loading) ? undefined : props.onClick,
  }),
  ...props<{
    loading?: boolean
    prefix?: ReactNode
    suffix?: ReactNode
  }>('loading', 'prefix', 'suffix'),
  template: ({ children, loading, prefix, suffix }) => (
    <>
      {loading && (
        <ButtonSpinner>
          <Spinner size="sm" />
          <VisuallyHidden>Loading</VisuallyHidden>
        </ButtonSpinner>
      )}
      <ButtonContent hidden={loading}>
        {prefix}
        {children}
        {suffix}
      </ButtonContent>
    </>
  ),
  styleName: 'Button',
})