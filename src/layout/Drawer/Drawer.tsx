import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Pressable, View } from 'react-native'
import { YStack, styled } from 'tamagui'

// ─── Scrim ────────────────────────────────────────────────────────────────────

const ScrimFrame = styled(YStack, {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 100,
})

// ─── Panel ────────────────────────────────────────────────────────────────────

const DrawerPanel = styled(YStack, {
  position: 'absolute',
  top: 0,
  bottom: 0,
  backgroundColor: '$background',
  borderColor: '$borderColor',
  zIndex: 101,
  overflow: 'hidden',

  variants: {
    placement: {
      left: {
        left: 0,
        borderRightWidth: 1,
        width: 320,
      },
      right: {
        right: 0,
        borderLeftWidth: 1,
        width: 320,
      },
      top: {
        top: 0,
        left: 0,
        right: 0,
        borderBottomWidth: 1,
        height: 320,
      },
      bottom: {
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: 1,
        height: 320,
      },
    },
  } as const,

  defaultVariants: {
    placement: 'left',
  },
})

// ─── Types ────────────────────────────────────────────────────────────────────

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom'

export type DrawerProps = {
  /** Whether the drawer is open */
  open?: boolean
  /** Default open state for uncontrolled mode */
  defaultOpen?: boolean
  /** Callback when open state should change */
  onOpenChange?: (open: boolean) => void
  /** Placement of the drawer */
  placement?: DrawerPlacement
  /** Accessible label for the dialog */
  accessibilityLabel?: string
  children?: React.ReactNode
  testID?: string
}

// ─── Root Component ───────────────────────────────────────────────────────────

export const Drawer = memo(function Drawer({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placement = 'left',
  accessibilityLabel = 'Drawer',
  children,
  testID,
}: DrawerProps) {
  const isControlled = openProp !== undefined
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isOpen = isControlled ? openProp : internalOpen
  const panelRef = useRef<View>(null)
  const previousFocus = useRef<Element | null>(null)

  const handleClose = useCallback(() => {
    if (!isControlled) setInternalOpen(false)
    onOpenChange?.(false)
  }, [isControlled, onOpenChange])

  // Manage focus on open/close
  useEffect(() => {
    if (isOpen) {
      // Store currently focused element
      if (typeof document !== 'undefined') {
        previousFocus.current = document.activeElement
        // Move focus to panel on next tick
        setTimeout(() => {
          const panel = panelRef.current as unknown as HTMLElement | null
          if (panel) {
            const focusable = panel.querySelector<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
            )
            if (focusable) focusable.focus()
            else panel.focus()
          }
        }, 0)
      }
    } else {
      // Return focus to trigger
      if (typeof document !== 'undefined' && previousFocus.current) {
        const el = previousFocus.current as HTMLElement
        if (typeof el.focus === 'function') el.focus()
        previousFocus.current = null
      }
    }
  }, [isOpen])

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleClose])

  if (!isOpen) return null

  return (
    <>
      <ScrimFrame
        testID="drawer-scrim"
        onPress={handleClose}
        accessible={false}
      />
      <DrawerPanel
        ref={panelRef}
        placement={placement}
        accessible
        accessibilityRole="none"
        aria-modal="true"
        aria-label={accessibilityLabel}
        role="dialog"
        tabIndex={-1}
        testID={testID}
      >
        {children}
      </DrawerPanel>
    </>
  )
})
