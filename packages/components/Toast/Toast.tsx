import type React from 'react'
import { styled } from '../../stl-react/src/config'

const ToastFrame = styled(
  'div',
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '12px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '$4',
    minWidth: '300px',
    maxWidth: '420px',
    position: 'relative',
  },
  {
    variant: {
      default: { backgroundColor: '$background', borderColor: '$borderColor' },
      success: {
        backgroundColor: 'var(--stl-successBg, #f0fdf4)',
        borderColor: 'var(--stl-successBorder, #86efac)',
      },
      error: {
        backgroundColor: 'var(--stl-errorBg, #fef2f2)',
        borderColor: 'var(--stl-errorBorder, #fca5a5)',
      },
      warning: {
        backgroundColor: 'var(--stl-warningBg, #fffbeb)',
        borderColor: 'var(--stl-warningBorder, #fcd34d)',
      },
    },
  },
  'Toast',
)

const TitleText = styled(
  'div',
  {
    fontFamily: '$heading',
    fontWeight: '$600',
    fontSize: '$p',
    color: '$defaultHeading',
  },
  'ToastTitle',
)

const DescriptionText = styled(
  'div',
  {
    fontFamily: '$body',
    fontSize: '$14',
    color: '$tertiary7',
  },
  'ToastDescription',
)

export interface ToastRootProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'error' | 'warning'
  duration?: number
}

function Root({ children, variant = 'default' }: ToastRootProps) {
  return (
    <ToastFrame
      variant={variant}
      role="alert"
      style={{
        boxShadow:
          'var(--stl-shadow-md, 0 4px 12px var(--stl-maxAlpha8, rgba(0,0,0,0.15)))',
      }}
    >
      {children}
    </ToastFrame>
  )
}

function Title({ children }: { children: React.ReactNode }) {
  return <TitleText>{children}</TitleText>
}

function Description({ children }: { children: React.ReactNode }) {
  return <DescriptionText>{children}</DescriptionText>
}

function Action({ children, altText }: { children: React.ReactNode; altText: string }) {
  return <div aria-label={altText}>{children}</div>
}

function Close({ children }: { children?: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label="Close"
      style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '4px',
      }}
    >
      {children ?? '×'}
    </button>
  )
}

export interface ToastViewportProps {
  hotkey?: string[]
  multipleToasts?: boolean
}

function Viewport(_props: ToastViewportProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '16px',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  )
}

export interface ToastProviderProps {
  children: React.ReactNode
  swipeDirection?: 'up' | 'down' | 'left' | 'right'
  duration?: number
}

function Provider({ children }: ToastProviderProps) {
  return <>{children}</>
}

import { ImperativeToastViewport } from './toast-imperative'

function useToastController() {
  return { show: () => {}, hide: () => {} }
}
function useToastState() {
  return null
}

export const Toast = {
  Root,
  Title,
  Description,
  Action,
  Close,
  Viewport,
  Provider,
  ImperativeViewport: ImperativeToastViewport,
}
export { useToastController, useToastState }
