import React, { createContext, useCallback, useContext, useEffect } from 'react'
import { useControllableState } from '../../hooks/useControllableState'
import { useFocusTrap } from '../../hooks/useFocusTrap'

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface DialogContextValue {
  open: boolean | undefined
  onOpenChange: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement | null>
  contentId: string
  titleId: string
  descriptionId: string
}

const DialogContext = createContext<DialogContextValue | null>(null)

function useDialogContext() {
  const ctx = useContext(DialogContext)
  if (!ctx) throw new Error('Dialog compound components must be used within Dialog.Root')
  return ctx
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

export interface DialogRootProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function Root({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}: DialogRootProps) {
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  })
  const triggerRef = React.useRef<HTMLElement>(null)
  const id = React.useId()

  return (
    <DialogContext.Provider
      value={{
        open,
        onOpenChange: setOpen,
        triggerRef,
        contentId: `${id}-content`,
        titleId: `${id}-title`,
        descriptionId: `${id}-description`,
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Trigger
// ---------------------------------------------------------------------------

export interface DialogTriggerProps {
  children: React.ReactElement
  asChild?: boolean
}

function Trigger({ children }: DialogTriggerProps) {
  const { onOpenChange, triggerRef } = useDialogContext()
  return React.cloneElement(children, {
    ref: triggerRef,
    onClick: () => onOpenChange(true),
    'aria-haspopup': 'dialog',
  } as Record<string, unknown>)
}

// ---------------------------------------------------------------------------
// Overlay
// ---------------------------------------------------------------------------

export interface DialogOverlayProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

function Overlay({ children, ...props }: DialogOverlayProps) {
  const { open, onOpenChange } = useDialogContext()
  if (!open) return null
  return (
    <div
      {...props}
      data-state={open ? 'open' : 'closed'}
      onClick={() => onOpenChange(false)}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        ...props.style,
      }}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

export interface DialogContentProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onEscapeKeyDown?: () => void
  role?: 'dialog' | 'alertdialog'
}

function Content({ children, onEscapeKeyDown, role: roleProp = 'dialog', ...props }: DialogContentProps) {
  const { open, onOpenChange, contentId, titleId, descriptionId, triggerRef } =
    useDialogContext()
  const focusTrapRef = useFocusTrap<HTMLDivElement>(!!open)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscapeKeyDown?.()
        onOpenChange(false)
      }
    },
    [onOpenChange, onEscapeKeyDown],
  )

  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, handleKeyDown])

  // Restore focus on close
  useEffect(() => {
    if (!open && triggerRef.current) {
      triggerRef.current.focus()
    }
  }, [open, triggerRef])

  if (!open) return null

  return (
    <div
      {...props}
      ref={focusTrapRef}
      id={contentId}
      role={roleProp}
      aria-modal
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      data-state="open"
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Title, Description, Close
// ---------------------------------------------------------------------------

export interface DialogTitleProps {
  children: React.ReactNode
  className?: string
}

function Title({ children, ...props }: DialogTitleProps) {
  const { titleId } = useDialogContext()
  return (
    <h2 {...props} id={titleId}>
      {children}
    </h2>
  )
}

export interface DialogDescriptionProps {
  children: React.ReactNode
  className?: string
}

function Description({ children, ...props }: DialogDescriptionProps) {
  const { descriptionId } = useDialogContext()
  return (
    <p {...props} id={descriptionId}>
      {children}
    </p>
  )
}

export interface DialogCloseProps {
  children: React.ReactElement
}

function Close({ children }: DialogCloseProps) {
  const { onOpenChange } = useDialogContext()
  return React.cloneElement(children, {
    onClick: () => onOpenChange(false),
  } as Record<string, unknown>)
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const Dialog = {
  Root,
  Trigger,
  Overlay,
  Content,
  Title,
  Description,
  Close,
}
