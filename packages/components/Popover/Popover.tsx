import type React from 'react'
import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import { styled } from '../../stl-react/src/config'
import { useDisclosure } from '../../stl-headless/src'

const ContentFrame = styled(
  'div',
  {
    backgroundColor: '$background',
    borderRadius: '$4',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '$borderColor',
    padding: '12px',
    zIndex: '1000',
    position: 'absolute',
  },
  'PopoverContent',
)

interface PopoverContextValue {
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement>
  contentRef: React.RefObject<HTMLDivElement>
  placement: 'top' | 'bottom' | 'left' | 'right'
  offset: number
}

const PopoverContext = createContext<PopoverContextValue | null>(null)

function usePopoverContext() {
  const ctx = useContext(PopoverContext)
  if (!ctx)
    throw new Error('Popover compound components must be used within Popover.Root')
  return ctx
}

export interface PopoverRootProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  placement?: 'top' | 'bottom' | 'left' | 'right'
  offset?: number
}

function Root({
  children,
  open,
  defaultOpen,
  onOpenChange,
  placement = 'bottom',
  offset = 4,
}: PopoverRootProps) {
  const disclosure = useDisclosure({ open, defaultOpen, onOpenChange })
  const triggerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
    if (!disclosure.isOpen) return
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if (triggerRef.current?.contains(target) || contentRef.current?.contains(target))
        return
      disclosure.onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [disclosure.isOpen, disclosure.onClose])

  // Close on Escape
  useEffect(() => {
    if (!disclosure.isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') disclosure.onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [disclosure.isOpen, disclosure.onClose])

  return (
    <PopoverContext.Provider
      value={{
        isOpen: disclosure.isOpen,
        onToggle: disclosure.onToggle,
        onClose: disclosure.onClose,
        triggerRef,
        contentRef,
        placement,
        offset,
      }}
    >
      <div style={{ position: 'relative', display: 'inline-flex' }}>{children}</div>
    </PopoverContext.Provider>
  )
}

function Trigger({ children }: { children: React.ReactNode }) {
  const { onToggle, isOpen, triggerRef } = usePopoverContext()

  return (
    <div
      ref={triggerRef as React.RefObject<HTMLDivElement>}
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      style={{ display: 'inline-flex', cursor: 'pointer' }}
    >
      {children}
    </div>
  )
}

function Anchor({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'inline-flex' }}>{children}</div>
}

const PLACEMENT_STYLES: Record<string, React.CSSProperties> = {
  top: {
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginBottom: '4px',
  },
  bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '4px' },
  left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '4px' },
  right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '4px' },
}

function Content({ children }: { children: React.ReactNode }) {
  const { isOpen, contentRef, placement } = usePopoverContext()

  if (!isOpen) return null

  return (
    <ContentFrame
      ref={contentRef}
      role="dialog"
      style={{
        boxShadow: '0 4px 12px var(--stl-maxAlpha8, rgba(0,0,0,0.15))',
        ...PLACEMENT_STYLES[placement],
      }}
    >
      {children}
    </ContentFrame>
  )
}

function Arrow() {
  return null
}

function Close({ children }: { children?: React.ReactNode }) {
  const { onClose } = usePopoverContext()
  return (
    <div onClick={onClose} style={{ cursor: 'pointer', display: 'inline-flex' }}>
      {children}
    </div>
  )
}

export const Popover = { Root, Trigger, Anchor, Content, Arrow, Close }
