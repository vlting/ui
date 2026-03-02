import type { ComponentType, ReactNode } from 'react'
import React from 'react'
import { Text, View } from 'tamagui'
import { Calendar } from '../../components/Calendar'
import { Collapsible } from '../../components/Collapsible'
import { Input } from '../../components/Input'
import { Sidebar } from '../../components/Sidebar'
import { Tooltip } from '../../components/Tooltip'
import type { FileTreeItem, NavGroup, NavItem } from './_shared'
import { SidebarNavGroup, SidebarNavItem } from './_shared'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC
const InputJsx = Input as AnyFC

// -- Types --

export type SidebarBlockVariant =
  | 'grouped'
  | 'collapsible'
  | 'nested'
  | 'floating'
  | 'icon-only'
  | 'file-tree'
  | 'calendar'

export interface SidebarBlockProps {
  variant: SidebarBlockVariant
  groups?: NavGroup[]
  header?: ReactNode
  footer?: ReactNode
  side?: 'left' | 'right'
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  width?: number
  collapsedWidth?: number
  searchPlaceholder?: string
  onSearchChange?: (value: string) => void
  fileTree?: FileTreeItem[]
  selectedDate?: Date
  onDateSelect?: (date: Date) => void
  calendarPosition?: 'top' | 'bottom'
}

// -- Main component --

export function SidebarBlock({
  variant,
  groups = [],
  header,
  footer,
  side = 'left',
  defaultOpen = true,
  open,
  onOpenChange,
  width,
  collapsedWidth,
  searchPlaceholder,
  onSearchChange,
  fileTree = [],
  selectedDate,
  onDateSelect,
  calendarPosition = 'top',
}: SidebarBlockProps) {
  const rootCollapsible = variant === 'icon-only' ? 'icon' : 'offcanvas'
  const rootVariant = variant === 'floating' ? 'floating' : 'sidebar'

  return (
    <Sidebar.Root
      collapsible={rootCollapsible}
      side={side}
      variant={rootVariant}
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      width={width}
      collapsedWidth={collapsedWidth}
    >
      {header && <Sidebar.Header>{header}</Sidebar.Header>}

      {variant === 'icon-only' && (
        <ViewJsx paddingHorizontal="$2" paddingTop="$1">
          <Sidebar.Trigger />
        </ViewJsx>
      )}

      {variant === 'floating' && searchPlaceholder && (
        <ViewJsx paddingHorizontal="$3" paddingTop="$2" paddingBottom="$1">
          <InputJsx
            placeholder={searchPlaceholder}
            onChange={(e: { target: { value: string } }) =>
              onSearchChange?.(e.target.value)
            }
          />
        </ViewJsx>
      )}

      <Sidebar.Content>
        {variant === 'file-tree' ? (
          <FileTreeContent tree={fileTree} />
        ) : variant === 'calendar' ? (
          <CalendarContent
            groups={groups}
            selectedDate={selectedDate}
            onDateSelect={onDateSelect}
            calendarPosition={calendarPosition}
          />
        ) : (
          <GroupsContent variant={variant} groups={groups} />
        )}
      </Sidebar.Content>

      {footer && <Sidebar.Footer>{footer}</Sidebar.Footer>}
    </Sidebar.Root>
  )
}

// -- Groups content (grouped, collapsible, nested, floating, icon-only) --

function GroupsContent({
  variant,
  groups,
}: {
  variant: SidebarBlockVariant
  groups: NavGroup[]
}) {
  return (
    <>
      {groups.map((group, i) => (
        <React.Fragment key={`group-${group.label ?? i}`}>
          {i > 0 && <Sidebar.Separator />}
          {variant === 'collapsible' ? (
            <CollapsibleGroup group={group} />
          ) : variant === 'nested' || variant === 'floating' ? (
            <NestedNavGroup group={group} />
          ) : variant === 'icon-only' ? (
            <IconOnlyGroup group={group} />
          ) : (
            <SidebarNavGroup group={group} />
          )}
        </React.Fragment>
      ))}
    </>
  )
}

// -- Collapsible group --

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
              &#9662;
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

// -- Nested nav group with recursive items --

function NestedNavItem({ item, depth = 0 }: { item: NavItem; depth?: number }) {
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
            &#9662;
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

function NestedNavGroup({ group }: { group: NavGroup }) {
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

// -- Icon-only group --

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

function IconOnlyGroup({ group }: { group: NavGroup }) {
  return (
    <Sidebar.Group>
      {group.label && <Sidebar.GroupLabel>{group.label}</Sidebar.GroupLabel>}
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {group.items.map((item, i) =>
            item.icon ? (
              <IconNavItem key={`${item.label}-${i}`} item={item} />
            ) : null,
          )}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  )
}

// -- File tree content --

function FileTreeNode({ item, depth = 0 }: { item: FileTreeItem; depth?: number }) {
  const indent = depth * 12

  if (item.type === 'folder' && item.children && item.children.length > 0) {
    return (
      <Collapsible.Root defaultOpen={!!item.active}>
        <Collapsible.Trigger>
          <ViewJsx
            flexDirection="row"
            alignItems="center"
            gap="$1"
            paddingLeft={indent + 8}
            paddingRight="$2"
            paddingTop="$1"
            paddingBottom="$1"
            cursor="pointer"
            width="100%"
            borderRadius="$2"
            hoverStyle={{ backgroundColor: '$backgroundHover' }}
          >
            <TextJsx fontSize="$3" color="$colorSubtitle">
              &#9656;
            </TextJsx>
            {item.icon ? (
              <ViewJsx width="$1" height="$1" alignItems="center" justifyContent="center">
                {item.icon}
              </ViewJsx>
            ) : (
              <TextJsx fontSize="$3" color="$colorSubtitle">
                &#128193;
              </TextJsx>
            )}
            <TextJsx
              fontSize="$3"
              fontFamily="$body"
              color="$color"
              fontWeight={item.active ? '$3' : '$2'}
            >
              {item.name}
            </TextJsx>
          </ViewJsx>
        </Collapsible.Trigger>
        <Collapsible.Content>
          {item.children.map((child, i) => (
            <FileTreeNode key={`${child.name}-${i}`} item={child} depth={depth + 1} />
          ))}
        </Collapsible.Content>
      </Collapsible.Root>
    )
  }

  return (
    <Sidebar.MenuItem active={item.active} onPress={item.onPress}>
      <ViewJsx flexDirection="row" alignItems="center" gap="$1" paddingLeft={indent + 20}>
        {item.icon ? (
          <ViewJsx width="$1" height="$1" alignItems="center" justifyContent="center">
            {item.icon}
          </ViewJsx>
        ) : (
          <TextJsx fontSize="$3" color="$colorSubtitle">
            &#128196;
          </TextJsx>
        )}
        <TextJsx
          fontSize="$3"
          fontFamily="$body"
          color="$color"
          fontWeight={item.active ? '$3' : '$2'}
        >
          {item.name}
        </TextJsx>
      </ViewJsx>
    </Sidebar.MenuItem>
  )
}

function FileTreeContent({ tree }: { tree: FileTreeItem[] }) {
  return (
    <Sidebar.Group>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {tree.map((item, i) => (
            <FileTreeNode key={`${item.name}-${i}`} item={item} />
          ))}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  )
}

// -- Calendar content --

function CalendarContent({
  groups,
  selectedDate,
  onDateSelect,
  calendarPosition,
}: {
  groups: NavGroup[]
  selectedDate?: Date
  onDateSelect?: (date: Date) => void
  calendarPosition: 'top' | 'bottom'
}) {
  const calendarSection = (
    <ViewJsx padding="$2">
      <Calendar.Root mode="single" selected={selectedDate} onSelect={onDateSelect} />
    </ViewJsx>
  )

  const navSection = groups.map((group, i) => (
    <React.Fragment key={`group-${group.label ?? i}`}>
      {i > 0 && <Sidebar.Separator />}
      <SidebarNavGroup group={group} />
    </React.Fragment>
  ))

  if (calendarPosition === 'top') {
    return (
      <>
        {calendarSection}
        <Sidebar.Separator />
        {navSection}
      </>
    )
  }

  return (
    <>
      {navSection}
      <Sidebar.Separator />
      {calendarSection}
    </>
  )
}
