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
  ':pressed': { transform: 'scale(0.98)' },
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
      xs: { height: '$28', py: '$4', px: '$20', fontSize: '$buttonTiny' },
      sm: { height: '$32', py: '$8', px: '$24', fontSize: '$buttonSmall' },
      md: { height: '$36', py: '$buttonBasePy', px: '$20', fontSize: '$button' },
      lg: { height: '$40', py: '$12', px: '$32', fontSize: '$buttonLarge' },
      icon: { height: '$36', width: '$36', p: '$0', fontSize: '$button', },
    },
    pill: {
      true: { radius: '$pill' },
    },
    disabled: {
      true: { opacity: '0.5', cursor: 'not-allowed', pointerEvents: 'none' },
    },
    loading: {
      true: { cursor: 'wait', pointerEvents: 'none' },
    },
    groupPosition: options('first', 'middle', 'last', 'only'),
    groupDirection: options('horizontal', 'vertical'),
  },
  compoundVariants: [
    // ── Primary ────────────────────────────────────────
    {
      when: { theme: 'primary', variant: 'solid' },
      stl: {
        bg: '$primary9', color: '$primaryText9',
        backgroundImage: 'var(--stl-gradient-primary, none)',
        ':interact': { bg: '$primary10', color: '$primaryText10', filter: 'brightness(1.15)' },
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
        bg: '$background2', border: '$primary9', borderWidth: '$widthMin', color: '$primaryText1',
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
        backgroundImage: 'var(--stl-gradient-secondary, none)',
        ':interact': { bg: '$secondary10', color: '$secondaryText10', filter: 'brightness(1.15)' },
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
        bg: '$background2', border: '$secondary9', borderWidth: '$widthMin', color: '$secondaryText1',
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
        backgroundImage: 'var(--stl-gradient-neutral, none)',
        ':interact': { bg: '$neutral10', color: '$neutralText10', filter: 'brightness(1.15)' },
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
        bg: '$background2', border: '$neutral9', borderWidth: '$widthMin', color: '$neutralText1',
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
        bg: '$background2', border: '$error9', borderWidth: '$widthMin', color: '$errorText1',
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

    // ── Pill + icon → circle ────────────────────────────
    { when: { pill: 'true', size: 'icon' }, stl: { radius: '$round' } },

    // ── Loading overrides disabled opacity ─────────────
    { when: { disabled: 'true', loading: 'true' }, stl: { opacity: '1', cursor: 'wait' } },

    // ── Grouped: position × direction (border/radius) ─
    // Horizontal
    { when: { groupPosition: 'first', groupDirection: 'horizontal' }, stl: { radiusRight: '$rectangular' } },
    { when: { groupPosition: 'middle', groupDirection: 'horizontal' }, stl: { radius: '$rectangular', borderLeftWidth: '0' } },
    { when: { groupPosition: 'last', groupDirection: 'horizontal' }, stl: { radiusLeft: '$rectangular', borderLeftWidth: '0' } },
    // Vertical
    { when: { groupPosition: 'first', groupDirection: 'vertical' }, stl: { radiusBottom: '$rectangular' } },
    { when: { groupPosition: 'middle', groupDirection: 'vertical' }, stl: { radius: '$rectangular', borderTopWidth: '0' } },
    { when: { groupPosition: 'last', groupDirection: 'vertical' }, stl: { radiusTop: '$rectangular', borderTopWidth: '0' } },

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

    // ── Grouped: outline z-index lift on interact/focus ─
    { when: { groupPosition: 'first', variant: 'outline' }, stl: { ':interact': { position: 'relative', zIndex: 1 }, ':focus': { position: 'relative', zIndex: 1 } } },
    { when: { groupPosition: 'middle', variant: 'outline' }, stl: { ':interact': { position: 'relative', zIndex: 1 }, ':focus': { position: 'relative', zIndex: 1 } } },
    { when: { groupPosition: 'last', variant: 'outline' }, stl: { ':interact': { position: 'relative', zIndex: 1 }, ':focus': { position: 'relative', zIndex: 1 } } },
  ],
  defaultVariants: { theme: 'primary', variant: 'solid', size: 'md' },
})

export type ButtonProps = Omit<
  ComponentPropsWithRef<typeof ButtonBase>,
  'groupPosition' | 'groupDirection'
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
