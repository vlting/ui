import type { ComponentType, ReactNode } from 'react'
import { useState } from 'react'
import { Text, View } from 'tamagui'
import { Sidebar } from '../../components/Sidebar'
import type { SidebarBlockProps } from './_shared'
import { SidebarNavItem } from './_shared'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

export interface Sidebar08Props extends SidebarBlockProps {
  secondaryContent?: ReactNode
  onGroupSelect?: (groupIndex: number) => void
}

export function Sidebar08({
  groups,
  header,
  footer,
  secondaryContent,
  onGroupSelect,
  collapsible = 'offcanvas',
  side = 'left',
  defaultOpen = true,
  open,
  onOpenChange,
  width,
  collapsedWidth,
}: Sidebar08Props) {
  const [selectedGroup, setSelectedGroup] = useState(0)

  const handleGroupSelect = (index: number) => {
    setSelectedGroup(index)
    onGroupSelect?.(index)
  }

  const currentGroup = groups[selectedGroup]

  return (
    <Sidebar.Root
      collapsible={collapsible}
      side={side}
      variant="inset"
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      width={width}
      collapsedWidth={collapsedWidth}
    >
      {header && <Sidebar.Header>{header}</Sidebar.Header>}
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Sections</Sidebar.GroupLabel>
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              {groups.map((group, i) => (
                <Sidebar.MenuItem
                  key={`group-nav-${group.label ?? i}`}
                  active={i === selectedGroup}
                  onPress={() => handleGroupSelect(i)}
                >
                  <TextJsx
                    fontSize="$4"
                    fontFamily="$body"
                    color="$color"
                    fontWeight={i === selectedGroup ? '$3' : '$2'}
                  >
                    {group.label ?? `Section ${i + 1}`}
                  </TextJsx>
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.GroupContent>
        </Sidebar.Group>

        <Sidebar.Separator />

        {currentGroup && (
          <Sidebar.Group>
            {currentGroup.label && (
              <Sidebar.GroupLabel>{currentGroup.label}</Sidebar.GroupLabel>
            )}
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                {currentGroup.items.map((item, i) => (
                  <SidebarNavItem key={`${item.label}-${i}`} item={item} />
                ))}
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        )}

        {secondaryContent && (
          <>
            <Sidebar.Separator />
            <ViewJsx padding="$2">{secondaryContent}</ViewJsx>
          </>
        )}
      </Sidebar.Content>
      {footer && <Sidebar.Footer>{footer}</Sidebar.Footer>}
    </Sidebar.Root>
  )
}
