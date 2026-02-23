import React, { createContext, useContext, useId } from 'react'
import { YStack, styled } from 'tamagui'
import { useControllableState } from '../../hooks/useControllableState'

interface CollapsibleContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
  contentId: string
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null)

function useCollapsibleContext() {
  const ctx = useContext(CollapsibleContext)
  if (!ctx) throw new Error('Collapsible components must be used within Collapsible.Root')
  return ctx
}

// @ts-expect-error Tamagui v2 RC
const CollapsibleFrame = styled(YStack, {
  width: '100%',
})

export interface CollapsibleRootProps {
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
}: CollapsibleRootProps) {
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  })
  const contentId = useId()

  return (
    <CollapsibleContext.Provider value={{ open: !!open, onOpenChange: setOpen, contentId }}>
      {/* @ts-expect-error Tamagui v2 RC */}
      <CollapsibleFrame data-state={open ? 'open' : 'closed'}>
        {children}
      </CollapsibleFrame>
    </CollapsibleContext.Provider>
  )
}

export interface CollapsibleTriggerProps {
  children: React.ReactElement
  asChild?: boolean
}

function Trigger({ children }: CollapsibleTriggerProps) {
  const { open, onOpenChange, contentId } = useCollapsibleContext()
  return React.cloneElement(children, {
    onClick: () => onOpenChange(!open),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onOpenChange(!open)
      }
    },
    role: 'button',
    tabIndex: 0,
    'aria-expanded': open,
    'aria-controls': contentId,
    'data-state': open ? 'open' : 'closed',
  } as Record<string, unknown>)
}

export interface CollapsibleContentProps {
  children: React.ReactNode
}

function Content({ children }: CollapsibleContentProps) {
  const { open, contentId } = useCollapsibleContext()
  if (!open) return null

  return (
    // @ts-expect-error Tamagui v2 RC
    <YStack id={contentId} role="region" data-state="open">
      {children}
    </YStack>
  )
}

export const Collapsible = { Root, Trigger, Content }
