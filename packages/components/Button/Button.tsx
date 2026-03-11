import React, { createContext, useContext, useEffect } from 'react'
import { VisuallyHidden } from '../../primitives'
import { styled } from '../../stl-react/src/config'

const BUTTON_INTERACTION_STYLE_ID = 'vlt-button-interaction'
const BUTTON_INTERACTION_CSS = `
.vlt-btn:hover:not(:disabled) { filter: brightness(1.1); }
.vlt-btn:focus-visible { outline: 2px solid var(--stl-outline-primaryColorBase, currentColor); outline-offset: 2px; }
.vlt-btn:active:not(:disabled) { filter: brightness(0.95); transform: scale(0.98); }
`

const ButtonFrame = styled(
  'button',
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: '6px',
    fontFamily: 'var(--font-body)',
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',
    transition:
      'background-color 150ms ease, border-color 150ms ease, filter 150ms ease, transform 100ms ease',
    outline: 'none',
  },
  {
    variant: {
      default: {
        backgroundColor: 'var(--color10)',
        color: 'var(--color1)',
        borderWidth: '0',
      },
      solid: {
        backgroundColor: 'var(--color10)',
        color: 'var(--color1)',
        borderWidth: '0',
      },
      secondary: {
        backgroundColor: 'var(--color2)',
        color: 'var(--color)',
        borderWidth: '0',
      },
      destructive: {
        backgroundColor: 'var(--color4)',
        color: 'var(--color11)',
        borderWidth: '0',
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'var(--borderColor)',
        color: 'var(--color)',
      },
      ghost: { backgroundColor: 'transparent', color: 'var(--color)', borderWidth: '0' },
      link: {
        backgroundColor: 'transparent',
        color: 'var(--color10)',
        borderWidth: '0',
        paddingLeft: '0',
        paddingRight: '0',
        textDecoration: 'underline',
      },
    },
    size: {
      xs: {
        height: '28px',
        paddingTop: '4px',
        paddingBottom: '4px',
        paddingLeft: '8px',
        paddingRight: '8px',
        fontSize: 'var(--fontSize-1, 11px)',
      },
      sm: {
        height: '32px',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '12px',
        paddingRight: '12px',
        fontSize: 'var(--fontSize-2, 12px)',
      },
      md: {
        height: '36px',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '16px',
        paddingRight: '16px',
        fontSize: 'var(--fontSize-4, 16px)',
      },
      lg: {
        height: '40px',
        paddingTop: '12px',
        paddingBottom: '12px',
        paddingLeft: '24px',
        paddingRight: '24px',
        fontSize: 'var(--fontSize-5, 18px)',
      },
      icon: {
        height: '36px',
        width: '36px',
        padding: '0',
        fontSize: 'var(--fontSize-4, 16px)',
      },
    },
    disabled: {
      true: { opacity: '0.5', cursor: 'not-allowed', pointerEvents: 'none' },
    },
  },
  'Button',
)

const ButtonTextFrame = styled(
  'span',
  {
    fontFamily: 'var(--font-body)',
    fontWeight: '500',
  },
  {
    textVariant: {
      default: { color: 'var(--color1)' },
      solid: { color: 'var(--color1)' },
      secondary: { color: 'var(--color)' },
      destructive: { color: 'var(--color11)' },
      outline: { color: 'var(--color)' },
      ghost: { color: 'var(--color)' },
      link: { color: 'var(--color10)', textDecoration: 'underline' },
    },
    size: {
      xs: { fontSize: 'var(--fontSize-1, 11px)' },
      sm: { fontSize: 'var(--fontSize-2, 12px)' },
      md: { fontSize: 'var(--fontSize-4, 16px)' },
      lg: { fontSize: 'var(--fontSize-5, 18px)' },
    },
  },
  'ButtonText',
)

const ButtonIconFrame = styled(
  'span',
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'ButtonIcon',
)

type ButtonVariant =
  | 'default'
  | 'solid'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'ghost'
  | 'link'

const ButtonContext = createContext<{ variant: ButtonVariant }>({ variant: 'default' })

const SPINNER_COLOR_MAP: Record<ButtonVariant, string> = {
  default: 'var(--color1)',
  solid: 'var(--color1)',
  destructive: 'var(--color11)',
  secondary: 'var(--color)',
  outline: 'var(--color)',
  ghost: 'var(--color)',
  link: 'var(--color10)',
}

function ButtonText(
  props: React.HTMLAttributes<HTMLSpanElement> & { size?: 'xs' | 'sm' | 'md' | 'lg' },
) {
  const { variant } = useContext(ButtonContext)
  return <ButtonTextFrame {...props} textVariant={variant} />
}

function ButtonIcon({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <ButtonIconFrame {...props}>{children}</ButtonIconFrame>
}

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

const spinnerKeyframes = `
@keyframes vlting-spin {
  to { transform: rotate(360deg); }
}
`

function Spinner({ color }: { color: string }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: spinnerKeyframes }} />
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{ animation: 'vlting-spin 0.6s linear infinite' }}
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="2" opacity="0.25" />
        <path
          d="M14 8a6 6 0 0 0-6-6"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </>
  )
}

const ButtonBase = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonProps>
>(function ButtonBase(
  { loading, children, disabled, variant = 'default', size = 'md', onPress, ...props },
  ref,
) {
  const isDisabled = disabled ?? loading ?? false

  useEffect(() => {
    if (typeof document === 'undefined') return
    if (document.getElementById(BUTTON_INTERACTION_STYLE_ID)) return
    const el = document.createElement('style')
    el.id = BUTTON_INTERACTION_STYLE_ID
    el.textContent = BUTTON_INTERACTION_CSS
    document.head.appendChild(el)
  }, [])

  return (
    <ButtonContext.Provider value={{ variant }}>
      <ButtonFrame
        ref={ref}
        type="button"
        className="vlt-btn"
        disabled={isDisabled}
        aria-busy={loading || undefined}
        onClick={isDisabled ? undefined : onPress}
        variant={variant}
        size={size}
        {...props}
      >
        {loading ? (
          <>
            <Spinner color={SPINNER_COLOR_MAP[variant]} />
            <VisuallyHidden>Loading</VisuallyHidden>
          </>
        ) : (
          children
        )}
      </ButtonFrame>
    </ButtonContext.Provider>
  )
})

export const Button = Object.assign(ButtonBase, {
  Text: ButtonText,
  Icon: ButtonIcon,
})
