import type { ComponentType } from 'react'
import React from 'react'
import { Text, View } from 'tamagui'
import { Collapsible } from '../../components/Collapsible'
import { Sidebar } from '../../components/Sidebar'
import type { NavGroup, SidebarBlockProps } from './_shared'
import { SidebarNavItem } from './_shared'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

export interface Sidebar02Props extends SidebarBlockProps {}

function CollapsibleGroup({ group }: { group: NavGroup }) {
  if (!group.label) {
    return (
      <Sidebar.Group>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            {group.items.map((item, i) => (
              <SidebarNavItem key={`${item.label}-${i}`} item={item} />
            ))}
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>
    )
  }

  return (
    <Sidebar.Group>
      <Collapsible.Root defaultOpen={group.defaultOpen !== false}>
        <Collapsible.Trigger>
          <ViewJsx
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            paddingLeft="$2"
            paddingRight="$2"
            paddingTop="$0.75"
            paddingBottom="$0.5"
            cursor="pointer"
            width="100%"
          >
            <TextJsx
              fontSize="$2"
              fontWeight="$4"
              color="$colorSubtitle"
              fontFamily="$body"
            >
              {group.label}
            </TextJsx>
            <TextJsx fontSize="$2" color="$colorSubtitle">
              ▾
            </TextJsx>
          </ViewJsx>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              {group.items.map((item, i) => (
                <SidebarNavItem key={`${item.label}-${i}`} item={item} />
              ))}
            </Sidebar.Menu>
          </Sidebar.GroupContent>
        </Collapsible.Content>
      </Collapsible.Root>
    </Sidebar.Group>
  )
}

export function Sidebar02({
  groups,
  header,
  footer,
  collapsible = 'offcanvas',
  side = 'left',
  variant = 'sidebar',
  defaultOpen = true,
  open,
  onOpenChange,
  width,
  collapsedWidth,
}: Sidebar02Props) {
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
      {header && <Sidebar.Header>{header}</Sidebar.Header>}
      <Sidebar.Content>
        {groups.map((group, i) => (
          <React.Fragment key={`group-${group.label ?? i}`}>
            {i > 0 && <Sidebar.Separator />}
            <CollapsibleGroup group={group} />
          </React.Fragment>
        ))}
      </Sidebar.Content>
      {footer && <Sidebar.Footer>{footer}</Sidebar.Footer>}
    </Sidebar.Root>
  )
}
