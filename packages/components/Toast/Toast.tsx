import {
  type ComponentPropsWithRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { styled } from '../../stl-react/src/config'
import { Portal } from '../../stl-react/src/primitives/Portal/Portal'
import { useImperativeToasts, toast as toastApi } from './toast-imperative'
import type { ToastData, ToastVariant } from './toast-imperative'

// ─── Styled Elements ─────────────────────────────────────────────────────────

const StyledRoot = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '$12',
  bg: '$surface1',
  radius: '$4',
  boxShadow: '$lg',
  p: '$16',
  borderWidth: '$widthMin',
  borderStyle: '$styleDefault',
  borderColor: '$neutralMin',
  width: '100%',
  maxWidth: '420px',
  fontFamily: '$body',
}, {
  name: 'Toast',
  variants: {
    theme: {
      neutral: {},
      success: { borderLeftWidth: '4px', borderLeftStyle: 'solid', borderLeftColor: '$grass9' },
      error: { borderLeftWidth: '4px', borderLeftStyle: 'solid', borderLeftColor: '$tomato9' },
      warning: { borderLeftWidth: '4px', borderLeftStyle: 'solid', borderLeftColor: '$amber9' },
      info: { borderLeftWidth: '4px', borderLeftStyle: 'solid', borderLeftColor: '$iris9' },
    },
  },
  defaultVariants: { theme: 'neutral' },
})

const StyledTitle = styled('h5', {
  fontWeight: '$600',
  fontSize: '$p',
  m: '$0',
}, { name: 'ToastTitle' })

const StyledDescription = styled('p', {
  fontSize: '$small',
  color: '$neutral9',
  m: '$0',
  mt: '$2',
}, { name: 'ToastDescription' })

const StyledAction = styled('button', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  px: '$12',
  py: '$4',
  fontSize: '$small',
  fontFamily: '$body',
  fontWeight: '$500',
  color: '$primaryText3',
  bg: 'transparent',
  border: '$primaryMin',
  borderRadius: '$field',
  cursor: 'pointer',
  flexShrink: '0',
  ':interact': { bg: '$primary3' },
}, { name: 'ToastAction' })

const StyledClose = styled('button', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '$24',
  height: '$24',
  p: '$0',
  bg: 'transparent',
  border: 'none',
  borderRadius: '$field',
  cursor: 'pointer',
  color: '$neutral9',
  flexShrink: '0',
  ':interact': { bg: '$neutral3' },
}, { name: 'ToastClose' })

const StyledContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: '1',
  minWidth: '0',
}, { name: 'ToastContent' })

// ─── Position styles ─────────────────────────────────────────────────────────

export type ToasterPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

const POSITION_STL: Record<ToasterPosition, Record<string, string>> = {
  'top-left': { top: '$16', left: '$16', alignItems: 'flex-start' },
  'top-center': { top: '$16', left: '50%', transform: 'translateX(-50%)', alignItems: 'center' },
  'top-right': { top: '$16', right: '$16', alignItems: 'flex-end' },
  'bottom-left': { bottom: '$16', left: '$16', alignItems: 'flex-start' },
  'bottom-center': { bottom: '$16', left: '50%', transform: 'translateX(-50%)', alignItems: 'center' },
  'bottom-right': { bottom: '$16', right: '$16', alignItems: 'flex-end' },
}

const StyledViewport = styled('div', {
  position: 'fixed',
  zIndex: '100',
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',
  pointerEvents: 'none',
}, { name: 'Toaster' })

const StyledToastWrapper = styled('div', {
  pointerEvents: 'auto',
}, { name: 'ToastWrapper' })

// ─── Close icon ──────────────────────────────────────────────────────────────

const CloseIcon = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 10.5858L16.9497 5.63604L18.364 7.05025L13.4142 12L18.364 16.9497L16.9497 18.364L12 13.4142L7.05025 18.364L5.63604 16.9497L10.5858 12L5.63604 7.05025L7.05025 5.63604L12 10.5858Z" />
  </svg>
)

// ─── Compound Components ─────────────────────────────────────────────────────

type RootProps = ComponentPropsWithRef<typeof StyledRoot> & {
  theme?: ToastVariant
}

const Root = forwardRef<HTMLDivElement, RootProps>((props, ref) => (
  <StyledRoot ref={ref} role="status" {...props} />
))
Root.displayName = 'Toast.Root'

const Title = forwardRef<HTMLHeadingElement, ComponentPropsWithRef<typeof StyledTitle>>((props, ref) => (
  <StyledTitle ref={ref} {...props} />
))
Title.displayName = 'Toast.Title'

const Description = forwardRef<HTMLParagraphElement, ComponentPropsWithRef<typeof StyledDescription>>((props, ref) => (
  <StyledDescription ref={ref} {...props} />
))
Description.displayName = 'Toast.Description'

const Action = forwardRef<HTMLButtonElement, ComponentPropsWithRef<typeof StyledAction>>((props, ref) => (
  <StyledAction ref={ref} type="button" {...props} />
))
Action.displayName = 'Toast.Action'

type CloseProps = ComponentPropsWithRef<typeof StyledClose> & {
  onClose?: () => void
}

const Close = forwardRef<HTMLButtonElement, CloseProps>(({ onClose, onClick, ...props }, ref) => (
  <StyledClose
    ref={ref}
    type="button"
    aria-label="Dismiss"
    onClick={(e) => {
      onClick?.(e)
      onClose?.()
    }}
    {...props}
  >
    {props.children ?? <CloseIcon />}
  </StyledClose>
))
Close.displayName = 'Toast.Close'

// ─── Single toast renderer ───────────────────────────────────────────────────

function ToastItem({
  data,
  onDismiss,
}: {
  data: ToastData
  onDismiss: (id: string) => void
}) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)
  const remainingRef = useRef(data.duration)
  const startRef = useRef(Date.now())

  const startTimer = useCallback(() => {
    startRef.current = Date.now()
    timerRef.current = setTimeout(() => onDismiss(data.id), remainingRef.current)
  }, [data.id, onDismiss])

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
      remainingRef.current -= Date.now() - startRef.current
    }
  }, [])

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [startTimer])

  return (
    <StyledToastWrapper
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
    >
      <Root theme={data.variant}>
        <StyledContent>
          <Title>{data.title}</Title>
          {data.description && <Description>{data.description}</Description>}
          {data.action && (
            <Action
              onClick={data.action.onClick}
              stl={{ mt: '$8' }}
            >
              {data.action.label}
            </Action>
          )}
        </StyledContent>
        <Close onClose={() => onDismiss(data.id)} />
      </Root>
    </StyledToastWrapper>
  )
}

// ─── Toaster ─────────────────────────────────────────────────────────────────

export interface ToasterProps {
  position?: ToasterPosition
}

export function Toaster({ position = 'bottom-right' }: ToasterProps) {
  const toasts = useImperativeToasts()
  const posStl = POSITION_STL[position]

  const handleDismiss = useCallback((id: string) => {
    toastApi.dismiss(id)
  }, [])

  if (toasts.length === 0) return null

  return (
    <Portal>
      <StyledViewport
        aria-live="polite"
        aria-label="Notifications"
        stl={posStl}
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} data={t} onDismiss={handleDismiss} />
        ))}
      </StyledViewport>
    </Portal>
  )
}

// ─── Export ──────────────────────────────────────────────────────────────────

export const Toast = { Root, Title, Description, Action, Close }

export type ToastRootProps = RootProps
export type ToastViewportProps = ToasterProps
export type ToastProviderProps = Record<string, never>

// Stubs for backward compat (no-op)
export const useToastController = () => ({})
export const useToastState = () => ({})
