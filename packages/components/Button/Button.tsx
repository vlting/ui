import React from 'react'
import { VisuallyHidden } from '../../primitives'
import { styled } from '../../stl-react/src/config'

const SpinnerFrame = styled(
  'span',
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: '$spin',
  },
  'ButtonSpinner',
)

const ButtonFrame = styled(
  'button',
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '$8',
    borderRadius: '$button',
    fontFamily: '$body',
    fontWeight: '$500',
    cursor: 'pointer',
    border: 'none',
    transition:
      'background-color 150ms ease, border-color 150ms ease, color 150ms ease',
    outline: 'none',
    focused: {
      outlineWidth: '$widthBase',
      outlineStyle: 'solid',
      outlineColor: '$primary12',
      outlineOffset: '$offsetDefault',
    },
  },
  {
    variant: {
      default: {
        backgroundColor: '$primary9',
        color: '$primaryText9',
        hovered: { backgroundColor: '$primary10', color: '$primaryText10' },
        pressed: { backgroundColor: '$primary10', transform: 'scale(0.98)' },
      },
      solid: {
        backgroundColor: '$primary9',
        color: '$primaryText9',
        hovered: { backgroundColor: '$primary10', color: '$primaryText10' },
        pressed: { backgroundColor: '$primary10', transform: 'scale(0.98)' },
      },
      secondary: {
        backgroundColor: '$tertiary2',
        color: '$color',
        hovered: { backgroundColor: '$tertiary3' },
        pressed: { backgroundColor: '$tertiary3', transform: 'scale(0.98)' },
      },
      destructive: {
        backgroundColor: '$red9',
        color: '$redText9',
        hovered: { backgroundColor: '$red10', color: '$redText10' },
        pressed: { backgroundColor: '$red10', transform: 'scale(0.98)' },
      },
      outline: {
        backgroundColor: 'transparent',
        border: '$primaryMax',
        color: '$color',
        hovered: { backgroundColor: '$backgroundHover' },
        pressed: { backgroundColor: '$backgroundHover', transform: 'scale(0.98)' },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$color',
        hovered: { backgroundColor: '$backgroundHover' },
        pressed: { backgroundColor: '$backgroundHover', transform: 'scale(0.98)' },
      },
      link: {
        backgroundColor: 'transparent',
        color: '$primary9',
        paddingLeft: '$0',
        paddingRight: '$0',
        textDecoration: 'underline',
        hovered: { color: '$primary10' },
      },
    },
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
    disabled: {
      true: { opacity: '0.5', cursor: 'not-allowed', pointerEvents: 'none' },
    },
  },
  'Button',
)

type ButtonVariant =
  | 'default'
  | 'solid'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'ghost'
  | 'link'

export interface ButtonProps {
  children?: React.ReactNode
  variant?: ButtonVariant
  tone?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon'
  loading?: boolean
  disabled?: boolean
  onPress?: () => void
  asChild?: boolean
}

function Spinner() {
  return (
    <SpinnerFrame>
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
    </SpinnerFrame>
  )
}

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonProps>
>(function Button(
  { loading, children, disabled, variant = 'default', size = 'md', onPress, ...props },
  ref,
) {
  const isDisabled = disabled ?? loading ?? false

  return (
    <ButtonFrame
      ref={ref}
      type="button"
      disabled={isDisabled}
      aria-busy={loading || undefined}
      onClick={isDisabled ? undefined : onPress}
      variant={variant}
      size={size}
      {...props}
    >
      {loading ? (
        <>
          <Spinner />
          <VisuallyHidden>Loading</VisuallyHidden>
        </>
      ) : (
        children
      )}
    </ButtonFrame>
  )
})
