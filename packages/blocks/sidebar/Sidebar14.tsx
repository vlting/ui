import type { ComponentType } from 'react'
import React from 'react'
import { Text, View } from 'tamagui'
import { Sidebar } from '../../components/Sidebar'
import type { SidebarBlockProps } from './_shared'
import { SidebarNavGroup } from './_shared'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

export interface Sidebar14Props extends SidebarBlockProps {
  title?: string
  showTrigger?: boolean
}

export function Sidebar14({
  groups,
  header,
  footer,
  title,
  showTrigger = true,
  collapsible = 'offcanvas',
  variant = 'sidebar',
  defaultOpen = true,
  open,
  onOpenChange,
  width,
  collapsedWidth,
}: Sidebar14Props) {
  return (
    <Sidebar.Root
      collapsible={collapsible}
      side="right"
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
      {showTrigger && (
        <ViewJsx paddingHorizontal="$2" paddingTop="$1">
          <Sidebar.Trigger />
        </ViewJsx>
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
