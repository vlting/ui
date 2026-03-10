import React, { createContext, useContext, useEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import { styled } from '../../stl-react/src/config'
import { useDisclosure } from '../../stl-headless/src'

const StyledOverlay = styled(
  'div',
  {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'var(--overlayBackground, rgba(0,0,0,0.5))',
    zIndex: '40',
    transition: 'opacity 200ms ease',
  },
  'SheetOverlay',
)

const StyledFrame = styled(
  'div',
  {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: 'var(--background, #fff)',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    padding: '16px',
    zIndex: '50',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 300ms ease',
  },
  'SheetFrame',
)

const StyledHandle = styled(
  'div',
  {
    width: '36px',
    height: '4px',
    borderRadius: '9999px',
    backgroundColor: 'var(--color6)',
    opacity: '0.5',
    margin: '0 auto 8px',
    cursor: 'grab',
  },
  'SheetHandle',
)

const StyledScrollView = styled(
  'div',
  {
    overflowY: 'auto',
    flex: '1',
  },
  'SheetScrollView',
)

interface SheetContextValue {
  isOpen: boolean
  onClose: () => void
}

const SheetContext = createContext<SheetContextValue>({
  isOpen: false,
  onClose: () => {},
})

export interface SheetRootProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  snapPoints?: number[]
  position?: number
  defaultPosition?: number
  modal?: boolean
  dismissOnOverlayPress?: boolean
  dismissOnSnapToBottom?: boolean
}

function Root({
  children,
  open,
  onOpenChange,
  modal = true,
  dismissOnOverlayPress = true,
}: SheetRootProps) {
  const disclosure = useDisclosure({ open, onOpenChange })

  return (
    <SheetContext.Provider
      value={{ isOpen: disclosure.isOpen, onClose: disclosure.onClose }}
    >
      {children}
    </SheetContext.Provider>
  )
}

function Overlay() {
  const { isOpen, onClose } = useContext(SheetContext)

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(<StyledOverlay onClick={onClose} />, document.body)
}

function Handle() {
  return <StyledHandle />
}

interface SheetFrameProps {
  children: React.ReactNode
}

function Frame({ children }: SheetFrameProps) {
  const { isOpen } = useContext(SheetContext)

  if (!isOpen) return null

  return createPortal(
    <StyledFrame
      role="dialog"
      aria-modal="true"
      aria-label="Sheet"
      style={{ transform: isOpen ? 'translateY(0)' : 'translateY(100%)' }}
    >
      {children}
    </StyledFrame>,
    document.body,
  )
}

function ScrollView({ children }: { children: React.ReactNode }) {
  return <StyledScrollView>{children}</StyledScrollView>
}

export const Sheet = { Root, Overlay, Handle, Frame, ScrollView }
