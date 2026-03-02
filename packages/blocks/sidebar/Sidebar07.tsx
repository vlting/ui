import type { ComponentType } from 'react'
import React from 'react'
import { Text, View } from 'tamagui'
import { Sidebar } from '../../components/Sidebar'
import { Tooltip } from '../../components/Tooltip'
import type { NavItem, SidebarBlockProps } from './_shared'
import { SidebarNavItem } from './_shared'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const _TextJsx = Text as AnyFC

export interface Sidebar07Props extends SidebarBlockProps {
  showTrigger?: boolean
}

function IconNavItem({ item }: { item: NavItem }) {
  if (!item.icon) return null

  return (
    <Tooltip content={item.label} side="right">
      <ViewJsx>
        <SidebarNavItem item={item} />
      </ViewJsx>
    </Tooltip>
  )
}

export function Sidebar07({
  groups,
  header,
  footer,
  showTrigger = true,
  side = 'left',
  variant = 'sidebar',
  defaultOpen = true,
  open,
  onOpenChange,
  width,
  collapsedWidth,
}: Sidebar07Props) {
  return (
    <Sidebar.Root
      collapsible="icon"
      side={side}
      variant={variant}
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      width={width}
      collapsedWidth={collapsedWidth}
    >
      {header && <Sidebar.Header>{header}</Sidebar.Header>}
      {showTrigger && (
        <ViewJsx paddingHorizontal="$2" paddingTop="$1">
          <Sidebar.Trigger />
        </ViewJsx>
      )}
      <Sidebar.Content>
        {groups.map((group, i) => (
          <React.Fragment key={`group-${group.label ?? i}`}>
            {i > 0 && <Sidebar.Separator />}
            <Sidebar.Group>
              {group.label && <Sidebar.GroupLabel>{group.label}</Sidebar.GroupLabel>}
              <Sidebar.GroupContent>
                <Sidebar.Menu>
                  {group.items.map((item, j) =>
                    item.icon ? (
                      <IconNavItem key={`${item.label}-${j}`} item={item} />
                    ) : null,
                  )}
                </Sidebar.Menu>
              </Sidebar.GroupContent>
            </Sidebar.Group>
          </React.Fragment>
        ))}
      </Sidebar.Content>
      {footer && <Sidebar.Footer>{footer}</Sidebar.Footer>}
    </Sidebar.Root>
  )
}
