import type { ReactNode } from 'react'
import { VisuallyHidden } from '../../primitives'
import { Spinner } from '../../primitives/Spinner'
import { styled, templateProps, options } from '../../stl-react/src/config'

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
    border: 'none',
    outline: 'none',
    transition:
      'background-color 150ms ease, border-color 150ms ease, color 150ms ease, transform 100ms ease',
    ':focus': {
      outlineWidth: '$widthBase',
      outlineStyle: 'solid',
      outlineColor: '$outlineColor',
      outlineOffset: '$offsetDefault',
    },
    lowMotion: {
      transition: 'none',
      ':pressed': { transform: 'none' },
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
        ':pressed': { bg: '$primary10', transform: 'scale(0.98)' },
      },
    },
    {
      when: { theme: 'primary', variant: 'subtle' },
      stl: {
        bg: '$primary3', color: '$primaryText3',
        ':interact': { bg: '$primary4', color: '$primaryText3' },
        ':pressed': { bg: '$primary4', transform: 'scale(0.98)' },
      },
    },
    {
      when: { theme: 'primary', variant: 'outline' },
      stl: {
        bg: 'transparent', borderWidth: '$widthDefault', borderStyle: '$styleDefault', borderColor: 'currentcolor', color: '$primaryText4',
        ':interact': { bg: '$primary2' },
        ':pressed': { bg: '$primary2', transform: 'scale(0.98)' },
      },
    },
    {
      when: { theme: 'primary', variant: 'ghost' },
      stl: {
        bg: 'transparent', color: '$primaryText4',
        ':interact': { bg: '$primary3' },
        ':pressed': { bg: '$primary3', transform: 'scale(0.98)' },
      },
    },
    {
      when: { theme: 'primary', variant: 'link' },
      stl: {
        bg: 'transparent', color: '$primaryText4', px: '$0', textDecoration: 'underline',
        ':interact': { color: '$primaryText10' },
        ':pressed': { color: '$primaryText10' },
      },
    },

    // ── Secondary ──────────────────────────────────────
    {
      when: { theme: 'secondary', variant: 'solid' },
      stl: {
        bg: '$secondary9', color: '$secondaryText9',
        ':interact': { bg: '$secondary10', color: '$secondaryText10' },
        ':pressed': { bg: '$secondary10', transform: 'scale(0.98)' },
      },
    },
    {
      when: { theme: 'secondary', variant: 'subtle' },
      stl: {
        bg: '$secondary3', color: '$secondaryText3',
        ':interact': { bg: '$secondary4', color: '$secondaryText4' },
        ':pressed': { bg: '$secondary4', transform: 'scale(0.98)' },
      },
    },
    {
      when: { theme: 'secondary', variant: 'outline' },
      stl: {
        bg: 'transparent', borderWidth: '$widthDefault', borderStyle: '$styleDefault', borderColor: 'currentcolor', color: '$secondaryText4',
        ':interact': { bg: '$secondary2' },
        ':pressed': { bg: '$secondary2', transform: 'scale(0.98)' },
      },
    },
    {
      when: { theme: 'secondary', variant: 'ghost' },
      stl: {
        bg: 'transparent', color: '$secondaryText4',
        ':interact': { bg: '$secondary3' },
        ':pressed': { bg: '$secondary3', transform: 'scale(0.98)' },
      },
    },
    {
      when: { theme: 'secondary', variant: 'link' },
      stl: {
        bg: 'transparent', color: '$secondaryText4', px: '$0', textDecoration: 'underline',
        ':interact': { color: '$secondaryText10' },
        ':pressed': { color: '$secondaryText10' },
      },
    },

    // ── Neutral ────────────────────────────────────────
    {
      when: { theme: 'neutral', variant: 'solid' },
      stl: {
        bg: '$tertiary9', color: '$tertiaryText9',
        ':interact': { bg: '$tertiary10', color: '$tertiaryText10' },
        ':pressed': { bg: '$tertiary10', transform: 'scale(0.98)' },
      },
    },
    {
      when: { theme: 'neutral', variant: 'subtle' },
      stl: {
        bg: '$tertiary3', color: '$tertiaryText3',
        ':interact': { bg: '$tertiary4', color: '$tertiaryText4' },
        ':pressed': { bg: '$tertiary4', transform: 'scale(0.98)' },
      },
    },
    {
      when: { theme: 'neutral', variant: 'outline' },
      stl: {
        bg: 'transparent', borderWidth: '$widthDefault', borderStyle: '$styleDefault', borderColor: 'currentcolor', color: '$tertiaryText4',
        ':interact': { bg: '$tertiary2' },
        ':pressed': { bg: '$tertiary2', transform: 'scale(0.98)' },
      },
    },
    {
      when: { theme: 'neutral', variant: 'ghost' },
      stl: {
        bg: 'transparent', color: '$tertiaryText4',
        ':interact': { bg: '$tertiary3' },
        ':pressed': { bg: '$tertiary3', transform: 'scale(0.98)' },
      },
    },
    {
      when: { theme: 'neutral', variant: 'link' },
      stl: {
        bg: 'transparent', color: '$tertiaryText4', px: '$0', textDecoration: 'underline',
        ':interact': { color: '$tertiaryText10' },
        ':pressed': { color: '$tertiaryText10' },
      },
    },

    // ── Destructive ────────────────────────────────────
    {
      when: { theme: 'destructive', variant: 'solid' },
      stl: {
        bg: '$error9', color: '$errorText9',
        ':interact': { bg: '$error10', color: '$errorText10' },
        ':pressed': { bg: '$error10', transform: 'scale(0.98)' },
      },
    },
    {
      when: { theme: 'destructive', variant: 'subtle' },
      stl: {
        bg: '$error3', color: '$errorText3',
        ':interact': { bg: '$error4', color: '$errorText4' },
        ':pressed': { bg: '$error4', transform: 'scale(0.98)' },
      },
    },
    {
      when: { theme: 'destructive', variant: 'outline' },
      stl: {
        bg: 'transparent', borderWidth: '$widthDefault', borderStyle: '$styleDefault', borderColor: 'currentcolor', color: '$errorText4',
        ':interact': { bg: '$error2' },
        ':pressed': { bg: '$error2', transform: 'scale(0.98)' },
      },
    },
    {
      when: { theme: 'destructive', variant: 'ghost' },
      stl: {
        bg: 'transparent', color: '$errorText4',
        ':interact': { bg: '$error3' },
        ':pressed': { bg: '$error3', transform: 'scale(0.98)' },
      },
    },
    {
      when: { theme: 'destructive', variant: 'link' },
      stl: {
        bg: 'transparent', color: '$errorText4', px: '$0', textDecoration: 'underline',
        ':interact': { color: '$errorText10' },
        ':pressed': { color: '$errorText10' },
      },
    },

    // ── Loading overrides disabled opacity ─────────────
    { when: { disabled: 'true', loading: 'true' }, stl: { opacity: '1', cursor: 'wait' } },
  ],
  defaultVariants: { theme: 'primary', variant: 'solid', size: 'md' },
  ...templateProps<{
    loading?: boolean
    prefix?: ReactNode
    suffix?: ReactNode
  }>('loading', 'prefix', 'suffix'),
  template: ({ children, loading, prefix, suffix }) => (
    <>
      {prefix}
      {loading ? (
        <>
          <Spinner size="sm" />
          <VisuallyHidden>Loading</VisuallyHidden>
        </>
      ) : (
        children
      )}
      {suffix}
    </>
  ),
  mapProps: (props) => ({
    ...props,
    type: 'button',
    disabled: props.disabled ?? props.loading ?? false,
    'aria-busy': props.loading || undefined,
    onClick: (props.disabled ?? props.loading) ? undefined : props.onClick,
  }),
  styleName: 'Button',
})