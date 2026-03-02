import type { ComponentType } from 'react'
import React from 'react'
import { Text, View } from 'tamagui'
import { Collapsible } from '../../components/Collapsible'
import { Sidebar } from '../../components/Sidebar'
import type { NavItem, SidebarBlockProps } from './_shared'
import { SidebarNavItem } from './_shared'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

export interface Sidebar05Props extends SidebarBlockProps {}

function CollapsibleNavItem({
  item,
  depth = 0,
}: {
  item: NavItem
  depth?: number
}) {
  if (!item.children || item.children.length === 0) {
    return (
      <ViewJsx paddingLeft={depth > 0 ? `$${depth * 2}` : undefined}>
        <SidebarNavItem item={item} />
      </ViewJsx>
    )
  }

  return (
    <Collapsible.Root defaultOpen={!!item.active}>
      <Collapsible.Trigger>
        <ViewJsx
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          paddingLeft={depth > 0 ? `$${depth * 2 + 2}` : '$2'}
          paddingRight="$2"
          paddingTop="$1.5"
          paddingBottom="$1.5"
          cursor="pointer"
          width="100%"
          borderRadius="$2"
          hoverStyle={{ backgroundColor: '$backgroundHover' }}
        >
          <ViewJsx flexDirection="row" alignItems="center" gap="$1.5" flex={1}>
            {item.icon && (
              <ViewJsx
                width="$1.5"
                height="$1.5"
                alignItems="center"
                justifyContent="center"
              >
                {item.icon}
              </ViewJsx>
            )}
            <TextJsx
              fontSize="$4"
              fontFamily="$body"
              color="$color"
              fontWeight={item.active ? '$3' : '$2'}
            >
              {item.label}
            </TextJsx>
          </ViewJsx>
          <TextJsx
            fontSize="$3"
            color="$colorSubtitle"
            style={{
              transition: 'transform 200ms ease',
            }}
          >
            ›
          </TextJsx>
        </ViewJsx>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <ViewJsx
          borderLeftWidth={1}
          borderLeftColor="$borderColor"
          marginLeft={depth > 0 ? `$${depth * 2 + 3}` : '$3'}
        >
          <Sidebar.Menu>
            {item.children.map((child, i) => (
              <CollapsibleNavItem
                key={`${child.label}-${i}`}
                item={child}
                depth={depth + 1}
              />
            ))}
          </Sidebar.Menu>
        </ViewJsx>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

export function Sidebar05({
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
}: Sidebar05Props) {
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
            <Sidebar.Group>
              {group.label && <Sidebar.GroupLabel>{group.label}</Sidebar.GroupLabel>}
              <Sidebar.GroupContent>
                <Sidebar.Menu>
                  {group.items.map((item, j) => (
                    <CollapsibleNavItem key={`${item.label}-${j}`} item={item} />
                  ))}
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
