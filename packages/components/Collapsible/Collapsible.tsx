import React, { createContext, useCallback, useContext, useId, useRef, useState } from 'react'
import { styled } from '../../stl-react/src/config'

interface CollapsibleContextValue {
  open: boolean
  toggle: () => void
  contentId: string
  triggerId: string
}

const CollapsibleContext = createContext<CollapsibleContextValue>({
  open: false,
  toggle: () => {},
  contentId: '',
  triggerId: '',
})

const CollapsibleRoot = styled("div", { width: "100%" }, "Collapsible")

const CollapsibleContentFrame = styled(
  "div",
  {
    overflow: "hidden",
    transition: "grid-template-rows 200ms ease",
    display: "grid",
  },
  "CollapsibleContent"
)

export interface CollapsibleRootProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function Root({ children, open: controlledOpen, defaultOpen = false, onOpenChange }: CollapsibleRootProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen
  const id = useId()

  const toggle = useCallback(() => {
    const next = !open
    if (!isControlled) setInternalOpen(next)
    onOpenChange?.(next)
  }, [open, isControlled, onOpenChange])

  return (
    <CollapsibleContext.Provider value={{ open, toggle, contentId: `collapsible-content-${id}`, triggerId: `collapsible-trigger-${id}` }}>
      <CollapsibleRoot data-state={open ? 'open' : 'closed'}>
        {children}
      </CollapsibleRoot>
    </CollapsibleContext.Provider>
  )
}

export interface CollapsibleTriggerProps {
  children: React.ReactNode
}

function Trigger({ children }: CollapsibleTriggerProps) {
  const { open, toggle, contentId, triggerId } = useContext(CollapsibleContext)

  return (
    <button
      type="button"
      id={triggerId}
      aria-expanded={open}
      aria-controls={contentId}
      onClick={toggle}
      style={{
        border: 'none',
        borderRadius: 0,
        padding: 0,
        backgroundColor: 'transparent',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'inherit',
        font: 'inherit',
        color: 'inherit',
      }}
    >
      {children}
    </button>
  )
}

export interface CollapsibleContentProps {
  children: React.ReactNode
}

function Content({ children }: CollapsibleContentProps) {
  const { open, contentId, triggerId } = useContext(CollapsibleContext)

  return (
    <CollapsibleContentFrame
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
    >
      <div style={{ overflow: 'hidden' }}>
        {children}
      </div>
    </CollapsibleContentFrame>
  )
}

export const Collapsible = { Root, Trigger, Content }
