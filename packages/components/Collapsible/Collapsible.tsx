import React from 'react'
import type { ComponentType } from 'react'
import { Collapsible as TamaguiCollapsible } from '@tamagui/collapsible'

// Cast for JSX usage — Tamagui v2 RC GetFinalProps bug
const TamaguiCollapsibleJsx = TamaguiCollapsible as ComponentType<Record<string, unknown>>
const TamaguiCollapsibleTriggerJsx = TamaguiCollapsible.Trigger as ComponentType<Record<string, unknown>>
const TamaguiCollapsibleContentJsx = TamaguiCollapsible.Content as ComponentType<Record<string, unknown>>

export interface CollapsibleRootProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function Root({ children, open, defaultOpen, onOpenChange }: CollapsibleRootProps) {
  return (
    <TamaguiCollapsibleJsx
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      width="100%"
    >
      {children}
    </TamaguiCollapsibleJsx>
  )
}

export interface CollapsibleTriggerProps {
  children: React.ReactNode
}

function Trigger({ children }: CollapsibleTriggerProps) {
  return (
    <TamaguiCollapsibleTriggerJsx unstyled>
      {children}
    </TamaguiCollapsibleTriggerJsx>
  )
}

export interface CollapsibleContentProps {
  children: React.ReactNode
}

function Content({ children }: CollapsibleContentProps) {
  return (
    <TamaguiCollapsibleContentJsx role="region">
      {children}
    </TamaguiCollapsibleContentJsx>
  )
}

export const Collapsible = { Root, Trigger, Content }
