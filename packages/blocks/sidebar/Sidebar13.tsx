import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'
import React from 'react'
import { Text, View } from 'tamagui'
import { Button } from '../../components/Button'
import { Dialog } from '../../components/Dialog'
import type { SidebarBlockProps } from './_shared'
import { SidebarNavGroup } from './_shared'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

const Nav = styledHtml('nav', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
} as any)
const NavJsx = Nav as AnyFC

export interface Sidebar13Props
  extends Omit<
    SidebarBlockProps,
    'open' | 'onOpenChange' | 'collapsible' | 'variant' | 'side'
  > {
  triggerLabel?: string
  dialogTitle?: string
  dialogOpen?: boolean
  onDialogOpenChange?: (open: boolean) => void
}

export function Sidebar13({
  groups,
  header,
  footer,
  triggerLabel = 'Menu',
  dialogTitle = 'Navigation',
  dialogOpen,
  onDialogOpenChange,
}: Sidebar13Props) {
  return (
    <Dialog.Root open={dialogOpen} onOpenChange={onDialogOpenChange}>
      <Dialog.Trigger>
        <Button variant="outline" size="md">
          <TextJsx fontSize="$4" fontFamily="$body" color="$color">
            {triggerLabel}
          </TextJsx>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content size="lg">
        <Dialog.Header>
          <Dialog.Title>{dialogTitle}</Dialog.Title>
        </Dialog.Header>
        <NavJsx aria-label={dialogTitle}>
          {header && <ViewJsx paddingBottom="$2">{header}</ViewJsx>}
          {groups.map((group, i) => (
            <React.Fragment key={`dialog-group-${group.label ?? i}`}>
              <SidebarNavGroup group={group} />
            </React.Fragment>
          ))}
          {footer && <ViewJsx paddingTop="$2">{footer}</ViewJsx>}
        </NavJsx>
      </Dialog.Content>
    </Dialog.Root>
  )
}
