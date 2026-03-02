import type { ComponentType } from 'react'
import React from 'react'
import { Text, View } from 'tamagui'
import { Sidebar } from '../../components/Sidebar'
import type { SidebarBlockProps } from './_shared'
import { SidebarNavGroup } from './_shared'

type AnyFC = ComponentType<Record<string, unknown>>
const _ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

export interface Sidebar01Props extends SidebarBlockProps {
  title?: string
}

export function Sidebar01({
  groups,
  header,
  footer,
  title,
  collapsible = 'offcanvas',
  side = 'left',
  variant = 'sidebar',
  defaultOpen = true,
  open,
  onOpenChange,
  width,
  collapsedWidth,
}: Sidebar01Props) {
  return (
    <Sidebar.Root
      collapsible={collapsible}
      side={side}
      variant={variant}
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      width={width}
      collapsedWidth={collapsedWidth}
    >
      {(header || title) && (
        <Sidebar.Header>
          {header ?? (
            <TextJsx fontSize="$5" fontWeight="$4" fontFamily="$heading" color="$color">
              {title}
            </TextJsx>
          )}
        </Sidebar.Header>
      )}
      <Sidebar.Content>
        {groups.map((group, i) => (
          <React.Fragment key={`group-${group.label ?? i}`}>
            {i > 0 && <Sidebar.Separator />}
            <SidebarNavGroup group={group} />
          </React.Fragment>
        ))}
      </Sidebar.Content>
      {footer && <Sidebar.Footer>{footer}</Sidebar.Footer>}
    </Sidebar.Root>
  )
}
