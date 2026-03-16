import { useCallback, useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export interface UseFocusScopeProps {
  /** Whether focus containment is active */
  contain?: boolean
  /** Restore focus to previously focused element on deactivation */
  restoreFocus?: boolean
  /** Auto-focus first focusable element when activated */
  autoFocus?: boolean
}

export interface UseFocusScopeReturn {
  getScopeProps: () => {
    ref: React.RefObject<HTMLElement | null>
    onKeyDown: (e: React.KeyboardEvent) => void
  }
}

export function useFocusScope(props: UseFocusScopeProps = {}): UseFocusScopeReturn {
  const { contain = true, restoreFocus = true, autoFocus = true } = props
  const containerRef = useRef<HTMLElement>(null)
  const previousFocusRef = useRef<Element | null>(null)

  // Capture previously focused element on activation
  useEffect(() => {
    if (contain) {
      previousFocusRef.current = document.activeElement
    }
    return () => {
      if (restoreFocus && previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus()
      }
    }
  }, [contain, restoreFocus])

  // Auto-focus first focusable element when activated
  useEffect(() => {
    if (!contain || !autoFocus || !containerRef.current) return
    const focusable = containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    if (focusable.length > 0) {
      focusable[0].focus()
    }
  }, [contain, autoFocus])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!contain || e.key !== 'Tab' || !containerRef.current) return

      const focusable = containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    },
    [contain],
  )

  const getScopeProps = useCallback(
    () => ({
      ref: containerRef,
      onKeyDown: handleKeyDown,
    }),
    [handleKeyDown],
  )

  return { getScopeProps }
}
