import type { ComponentType, ReactNode } from 'react'
import React, { useState } from 'react'
import { Text, View } from 'tamagui'
import { Sidebar } from '../../components/Sidebar'
import { Tooltip } from '../../components/Tooltip'
import type { NavItem, SidebarBlockProps } from './_shared'
import { SidebarNavItem } from './_shared'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

export interface Sidebar09Props extends SidebarBlockProps {
  /** Content displayed in the main area between primary and secondary sidebar */
  children?: ReactNode
}

function RailNavItem({
  item,
  isSelected,
  onSelect,
}: {
  item: NavItem
  isSelected: boolean
  onSelect: () => void
}) {
  if (!item.icon) return null

  return (
    <Tooltip content={item.label} side="right">
      <ViewJsx>
        <Sidebar.MenuItem active={isSelected || item.active} onPress={onSelect}>
          <ViewJsx alignItems="center" justifyContent="center" width="$1.5" height="$1.5">
            {item.icon}
          </ViewJsx>
        </Sidebar.MenuItem>
      </ViewJsx>
    </Tooltip>
  )
}

export function Sidebar09({
  groups,
  header,
  footer,
  children,
  side = 'left',
  defaultOpen = true,
  open,
  onOpenChange,
  width,
  collapsedWidth,
}: Sidebar09Props) {
  const [selectedItem, setSelectedItem] = useState<{
    groupIndex: number
    itemIndex: number
  } | null>(null)

  const selectedNavItem =
    selectedItem != null
      ? groups[selectedItem.groupIndex]?.items[selectedItem.itemIndex]
      : null
  const hasChildren = selectedNavItem?.children && selectedNavItem.children.length > 0

  return (
    <ViewJsx flexDirection="row" flex={1}>
      <Sidebar.Root
        collapsible="icon"
        side={side}
        variant="sidebar"
        defaultOpen={false}
        width={collapsedWidth ?? 56}
        collapsedWidth={collapsedWidth ?? 56}
      >
        {header && <Sidebar.Header>{header}</Sidebar.Header>}
        <Sidebar.Content>
          {groups.map((group, gi) => (
            <React.Fragment key={`rail-group-${group.label ?? gi}`}>
              {gi > 0 && <Sidebar.Separator />}
              <Sidebar.Group>
                {group.label && <Sidebar.GroupLabel>{group.label}</Sidebar.GroupLabel>}
                <Sidebar.GroupContent>
                  <Sidebar.Menu>
                    {group.items.map((item, ii) => (
                      <RailNavItem
                        key={`rail-${item.label}-${ii}`}
                        item={item}
                        isSelected={
                          selectedItem?.groupIndex === gi &&
                          selectedItem?.itemIndex === ii
                        }
                        onSelect={() => {
                          if (
                            selectedItem?.groupIndex === gi &&
                            selectedItem?.itemIndex === ii
                          ) {
                            setSelectedItem(null)
                          } else {
                            setSelectedItem({ groupIndex: gi, itemIndex: ii })
                          }
                          item.onPress?.()
                        }}
                      />
                    ))}
                  </Sidebar.Menu>
                </Sidebar.GroupContent>
              </Sidebar.Group>
            </React.Fragment>
          ))}
        </Sidebar.Content>
        {footer && <Sidebar.Footer>{footer}</Sidebar.Footer>}
      </Sidebar.Root>

      {hasChildren && selectedNavItem?.children && (
        <Sidebar.Root
          collapsible="offcanvas"
          side={side}
          variant="sidebar"
          defaultOpen={defaultOpen}
          open={open}
          onOpenChange={onOpenChange}
          width={width}
        >
          <Sidebar.Header>
            <TextJsx fontSize="$5" fontWeight="$4" fontFamily="$heading" color="$color">
              {selectedNavItem.label}
            </TextJsx>
          </Sidebar.Header>
          <Sidebar.Content>
            <Sidebar.Group>
              <Sidebar.GroupContent>
                <Sidebar.Menu>
                  {selectedNavItem.children.map((child, i) => (
                    <SidebarNavItem key={`child-${child.label}-${i}`} item={child} />
                  ))}
                </Sidebar.Menu>
              </Sidebar.GroupContent>
            </Sidebar.Group>
          </Sidebar.Content>
        </Sidebar.Root>
      )}

      {children && (
        <ViewJsx flex={1} padding="$4">
          {children}
        </ViewJsx>
      )}
    </ViewJsx>
  )
}
