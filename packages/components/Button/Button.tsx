import { type ComponentPropsWithRef, type ReactNode, forwardRef } from 'react'
import { VisuallyHidden } from '../../stl-react/src/primitives/VisuallyHidden/VisuallyHidden'
import { Spinner } from '../../stl-react/src/primitives/Spinner/Spinner'
import { styled, options } from '../../stl-react/src/config'

const ButtonSpinner = styled('span', { position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' })

const ButtonContent = styled('span', { display: 'contents' }, {
  name: 'ButtonContent',
  variants: {
    hidden: { true: { visibility: 'hidden', } },
  },
})

// ─── Button ──────────────────────────────────────────────────────────────────

const ButtonBase = styled('button', {
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
  ':pressed': { transform: '$pressScale' },
  lowMotion: {
    transition: 'none',
    ':pressed': { transform: 'none' },
  },
}, {
  name: 'Button',
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
      sm: { height: '$28', py: '$4', px: '$8', fontSize: '$buttonTiny', minWidth: '$64' },
      md: { height: '$32', py: '$8', px: '$12', fontSize: '$buttonSmall', minWidth: '$80' },
      lg: { height: '$36', py: '$buttonBasePy', px: '$16', fontSize: '$button', minWidth: '$96' },
      xl: { height: '$40', py: '$12', px: '$20', fontSize: '$buttonLarge', minWidth: '$120' },
      icon: { height: '$36', width: '$36', p: '$0', fontSize: '$button', minWidth: '$0' },
    },
    square: {
      true: { px: '$0', justifyContent: 'center', minWidth: '$0' },
    },
    pill: {
      true: { radius: '$pill' },
    },
    disabled: {
      true: { opacity: '$disabledOpacity', cursor: 'not-allowed', pointerEvents: 'none' },
    },
    loading: {
      true: { cursor: 'wait', pointerEvents: 'none' },
    },
    groupPosition: options('first', 'middle', 'last', 'only'),
    groupDirection: options('horizontal', 'vertical'),
    pressed: { true: {} },
  },
  compoundVariants: [
    // ── Primary ────────────────────────────────────────
    {
      when: { theme: 'primary', variant: 'solid' },
      stl: {
        bg: '$primary9', color: '$primaryText9',
        backgroundImage: '$gradientPrimary',
        ':interact': { bg: '$primary10', color: '$primaryText10', backgroundImage: 'none' },
        ':focus': { outline: '$primaryMax' },
      },
    },
    {
      when: { theme: 'primary', variant: 'subtle' },
      stl: {
        bg: '$primary4', color: '$primaryText4',
        ':interact': { bg: '$primary9', color: '$primaryText9' },
        ':focus': { outline: '$primary' },
      },
    },
    {
      when: { theme: 'primary', variant: 'outline' },
      stl: {
        bg: '$minAlpha2', border: '$primaryMin', color: '$primaryText1',
        ':interact': { bg: '$primary9', color: '$primaryText9', border: '$primary' },
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
        bg: 'transparent', color: '$primaryText1', textDecoration: '$underlineDefault',
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
        bg: '$secondary4', color: '$secondaryText4',
        ':interact': { bg: '$secondary9', color: '$secondaryText9' },
        ':focus': { outline: '$secondary' },
      },
    },
    {
      when: { theme: 'secondary', variant: 'outline' },
      stl: {
        bg: '$minAlpha2', border: '$secondaryMin', color: '$secondaryText1',
        ':interact': { bg: '$secondary9', color: '$secondaryText9', border: '$secondary' },
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
        bg: 'transparent', color: '$secondaryText1', textDecoration: '$underlineDefault',
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
        bg: '$neutral4', color: '$neutralText4',
        ':interact': { bg: '$neutral9', color: '$neutralText9' },
        ':focus': { outline: '$neutral' },
      },
    },
    {
      when: { theme: 'neutral', variant: 'outline' },
      stl: {
        bg: '$minAlpha2', border: '$neutralMin', color: '$neutralText1',
        ':interact': { bg: '$neutral9', color: '$neutralText9', border: '$neutral' },
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
        bg: 'transparent', color: '$neutralText1', textDecoration: '$underlineDefault',
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
        bg: '$error4', color: '$errorText4',
        ':interact': { bg: '$error9', color: '$errorText9' },
        ':focus': { outline: '$error' },
      },
    },
    {
      when: { theme: 'destructive', variant: 'outline' },
      stl: {
        bg: '$minAlpha2', border: '$errorLow', color: '$errorText1',
        ':interact': { bg: '$error9', color: '$errorText9', border: '$error' },
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
        bg: 'transparent', color: '$errorText1', textDecoration: '$underlineDefault',
        ':interact': { bg: '$error9', color: '$errorText9' },
        ':focus': { outline: '$error' },
      },
    },

    // ── Pill + icon → circle ────────────────────────────
    { when: { pill: 'true', square: 'true' }, stl: { radius: '$round' } },

    // ── Ghost/link: no minWidth (overrides size) ─────
    ...(['ghost', 'link'] as const).flatMap(v =>
      (['sm', 'md', 'lg', 'xl', 'icon'] as const).map(s =>
        ({ when: { variant: v, size: s }, stl: { minWidth: '$0' } }),
      ),
    ),

    // ── Square: width = height per size ───────────────
    { when: { square: 'true', size: 'sm' }, stl: { width: '$28' } },
    { when: { square: 'true', size: 'md' }, stl: { width: '$32' } },
    { when: { square: 'true', size: 'lg' }, stl: { width: '$36' } },
    { when: { square: 'true', size: 'xl' }, stl: { width: '$40' } },
    { when: { square: 'true', size: 'icon' }, stl: { width: '$36' } },

    // ── Loading overrides disabled opacity ─────────────
    { when: { disabled: 'true', loading: 'true' }, stl: { opacity: '$fullOpacity', cursor: 'wait' } },

    // ── Pressed state (toggle active) ──────────────────
    // Primary
    { when: { pressed: 'true', theme: 'primary', variant: 'solid' }, stl: { bg: '$primary10', color: '$primary1Text0' } },
    { when: { pressed: 'true', theme: 'primary', variant: 'subtle' }, stl: { bg: '$primary5', color: '$primaryText5' } },
    { when: { pressed: 'true', theme: 'primary', variant: 'outline' }, stl: { bg: '$primary4', color: '$primaryText4' } },
    { when: { pressed: 'true', theme: 'primary', variant: 'ghost' }, stl: { bg: '$primary4', color: '$primaryText4' } },
    // Secondary
    { when: { pressed: 'true', theme: 'secondary', variant: 'solid' }, stl: { bg: '$secondary10', color: '$secondary1Text0' } },
    { when: { pressed: 'true', theme: 'secondary', variant: 'subtle' }, stl: { bg: '$secondary5', color: '$secondaryText5' } },
    { when: { pressed: 'true', theme: 'secondary', variant: 'outline' }, stl: { bg: '$secondary4', color: '$secondaryText4' } },
    { when: { pressed: 'true', theme: 'secondary', variant: 'ghost' }, stl: { bg: '$secondary4', color: '$secondaryText4' } },
    // Neutral
    { when: { pressed: 'true', theme: 'neutral', variant: 'solid' }, stl: { bg: '$neutral10', color: '$neutral1Text0' } },
    { when: { pressed: 'true', theme: 'neutral', variant: 'subtle' }, stl: { bg: '$neutral5', color: '$neutralText5' } },
    { when: { pressed: 'true', theme: 'neutral', variant: 'outline' }, stl: { bg: '$neutral4', color: '$neutralText4' } },
    { when: { pressed: 'true', theme: 'neutral', variant: 'ghost' }, stl: { bg: '$neutral4', color: '$neutralText4' } },
    // Destructive
    { when: { pressed: 'true', theme: 'destructive', variant: 'solid' }, stl: { bg: '$error10', color: '$error1Text0' } },
    { when: { pressed: 'true', theme: 'destructive', variant: 'subtle' }, stl: { bg: '$error5', color: '$errorText5' } },
    { when: { pressed: 'true', theme: 'destructive', variant: 'outline' }, stl: { bg: '$error4', color: '$errorText4' } },
    { when: { pressed: 'true', theme: 'destructive', variant: 'ghost' }, stl: { bg: '$error4', color: '$errorText4' } },

    // ── Grouped: position × direction (border/radius) ─
    // Horizontal
    { when: { groupPosition: 'first', groupDirection: 'horizontal' }, stl: { radiusLeft: '$buttonGrouped', radiusRight: '$rectangular' } },
    { when: { groupPosition: 'middle', groupDirection: 'horizontal' }, stl: { radius: '$rectangular', borderLeftWidth: '$width0' } },
    { when: { groupPosition: 'last', groupDirection: 'horizontal' }, stl: { radiusRight: '$buttonGrouped', radiusLeft: '$rectangular', borderLeftWidth: '$width0' } },
    // Vertical
    { when: { groupPosition: 'first', groupDirection: 'vertical' }, stl: { radiusTop: '$buttonGrouped', radiusBottom: '$rectangular' } },
    { when: { groupPosition: 'middle', groupDirection: 'vertical' }, stl: { radius: '$rectangular', borderTopWidth: '$width0' } },
    { when: { groupPosition: 'last', groupDirection: 'vertical' }, stl: { radiusBottom: '$buttonGrouped', radiusTop: '$rectangular', borderTopWidth: '$width0' } },

    // ── Grouped: borderless variant spacing (solid/subtle/ghost get small gap) ─
    // Horizontal
    { when: { groupPosition: 'middle', groupDirection: 'horizontal', variant: 'solid' }, stl: { ml: '$1' } },
    { when: { groupPosition: 'last', groupDirection: 'horizontal', variant: 'solid' }, stl: { ml: '$1' } },
    { when: { groupPosition: 'middle', groupDirection: 'horizontal', variant: 'subtle' }, stl: { ml: '$1' } },
    { when: { groupPosition: 'last', groupDirection: 'horizontal', variant: 'subtle' }, stl: { ml: '$1' } },
    { when: { groupPosition: 'middle', groupDirection: 'horizontal', variant: 'ghost' }, stl: { ml: '$1' } },
    { when: { groupPosition: 'last', groupDirection: 'horizontal', variant: 'ghost' }, stl: { ml: '$1' } },
    // Vertical
    { when: { groupPosition: 'middle', groupDirection: 'vertical', variant: 'solid' }, stl: { mt: '$1' } },
    { when: { groupPosition: 'last', groupDirection: 'vertical', variant: 'solid' }, stl: { mt: '$1' } },
    { when: { groupPosition: 'middle', groupDirection: 'vertical', variant: 'subtle' }, stl: { mt: '$1' } },
    { when: { groupPosition: 'last', groupDirection: 'vertical', variant: 'subtle' }, stl: { mt: '$1' } },
    { when: { groupPosition: 'middle', groupDirection: 'vertical', variant: 'ghost' }, stl: { mt: '$1' } },
    { when: { groupPosition: 'last', groupDirection: 'vertical', variant: 'ghost' }, stl: { mt: '$1' } },

    // ── Grouped: suppress press scale (prevents gaps between joined buttons) ─
    { when: { groupPosition: 'first' }, stl: { ':pressed': { transform: 'none' } } },
    { when: { groupPosition: 'middle' }, stl: { ':pressed': { transform: 'none' } } },
    { when: { groupPosition: 'last' }, stl: { ':pressed': { transform: 'none' } } },

    // ── Pill + grouped: keep pill radius on exposed side ─
    // Horizontal
    { when: { pill: 'true', groupPosition: 'first', groupDirection: 'horizontal' }, stl: { radiusLeft: '$buttonGrouped' } },
    { when: { pill: 'true', groupPosition: 'last', groupDirection: 'horizontal' }, stl: { radiusRight: '$buttonGrouped' } },
    // Vertical
    { when: { pill: 'true', groupPosition: 'first', groupDirection: 'vertical' }, stl: { radiusTop: '$buttonGrouped' } },
    { when: { pill: 'true', groupPosition: 'last', groupDirection: 'vertical' }, stl: { radiusBottom: '$buttonGrouped' } },

  ],
  defaultVariants: { theme: 'primary', variant: 'solid', size: 'md' },
})

export type ButtonProps = Omit<
  ComponentPropsWithRef<typeof ButtonBase>,
  'groupPosition' | 'groupDirection' | 'pressed'
> & {
  loading?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, prefix, suffix, children, disabled, onClick, ...rest }, ref) => (
    <ButtonBase
      ref={ref}
      type="button"
      disabled={disabled ?? loading ?? false}
      loading={loading}
      aria-busy={loading || undefined}
      onClick={(disabled ?? loading) ? undefined : onClick}
      {...rest}
    >
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
    </ButtonBase>
  ),
)
Button.displayName = 'Button'
