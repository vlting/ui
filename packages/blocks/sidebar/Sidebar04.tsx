import type { ComponentType } from 'react'
import React from 'react'
import { Text, View } from 'tamagui'
import { Collapsible } from '../../components/Collapsible'
import { Input } from '../../components/Input'
import { Sidebar } from '../../components/Sidebar'
import type { NavItem, SidebarBlockProps } from './_shared'
import { SidebarNavItem } from './_shared'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

export interface Sidebar04Props extends SidebarBlockProps {
  searchPlaceholder?: string
  onSearchChange?: (value: string) => void
}

function NestedNavItem({
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
          <TextJsx fontSize="$2" color="$colorSubtitle">
            ▾
          </TextJsx>
        </ViewJsx>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Sidebar.Menu>
          {item.children.map((child, i) => (
            <NestedNavItem key={`${child.label}-${i}`} item={child} depth={depth + 1} />
          ))}
        </Sidebar.Menu>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

function NestedNavGroup({
  group,
}: {
  group: { label?: string; items: NavItem[] }
}) {
  return (
    <Sidebar.Group>
      {group.label && <Sidebar.GroupLabel>{group.label}</Sidebar.GroupLabel>}
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {group.items.map((item, i) => (
            <NestedNavItem key={`${item.label}-${i}`} item={item} />
          ))}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  )
}

export function Sidebar04({
  groups,
  header,
  footer,
  searchPlaceholder,
  onSearchChange,
  collapsible = 'offcanvas',
  side = 'left',
  defaultOpen = true,
  open,
  onOpenChange,
  width,
  collapsedWidth,
}: Sidebar04Props) {
  return (
    <Sidebar.Root
      collapsible={collapsible}
      side={side}
      variant="floating"
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      width={width}
      collapsedWidth={collapsedWidth}
    >
      {header && <Sidebar.Header>{header}</Sidebar.Header>}
      {searchPlaceholder && (
        <ViewJsx paddingHorizontal="$3" paddingTop="$2" paddingBottom="$1">
          <Input
            placeholder={searchPlaceholder}
            onChange={(e: { target: { value: string } }) =>
              onSearchChange?.(e.target.value)
            }
          />
        </ViewJsx>
      )}
      <Sidebar.Content>
        {groups.map((group, i) => (
          <React.Fragment key={`group-${group.label ?? i}`}>
            {i > 0 && <Sidebar.Separator />}
            <NestedNavGroup group={group} />
          </React.Fragment>
        ))}
      </Sidebar.Content>
      {footer && <Sidebar.Footer>{footer}</Sidebar.Footer>}
    </Sidebar.Root>
  )
}
