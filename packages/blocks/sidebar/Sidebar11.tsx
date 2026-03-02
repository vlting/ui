import type { ComponentType, ReactNode } from 'react'
import { Text, View } from 'tamagui'
import { Collapsible } from '../../components/Collapsible'
import { Sidebar } from '../../components/Sidebar'
import type { FileTreeItem } from './_shared'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

export interface Sidebar11Props {
  tree: FileTreeItem[]
  header?: ReactNode
  footer?: ReactNode
  collapsible?: 'offcanvas' | 'icon' | 'none'
  side?: 'left' | 'right'
  variant?: 'sidebar' | 'floating' | 'inset'
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  width?: number
  collapsedWidth?: number
}

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
              ▸
            </TextJsx>
            {item.icon && (
              <ViewJsx width="$1" height="$1" alignItems="center" justifyContent="center">
                {item.icon}
              </ViewJsx>
            )}
            {!item.icon && (
              <TextJsx fontSize="$3" color="$colorSubtitle">
                📁
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
        {item.icon && (
          <ViewJsx width="$1" height="$1" alignItems="center" justifyContent="center">
            {item.icon}
          </ViewJsx>
        )}
        {!item.icon && (
          <TextJsx fontSize="$3" color="$colorSubtitle">
            📄
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

export function Sidebar11({
  tree,
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
}: Sidebar11Props) {
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
        <Sidebar.Group>
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              {tree.map((item, i) => (
                <FileTreeNode key={`${item.name}-${i}`} item={item} />
              ))}
            </Sidebar.Menu>
          </Sidebar.GroupContent>
        </Sidebar.Group>
      </Sidebar.Content>
      {footer && <Sidebar.Footer>{footer}</Sidebar.Footer>}
    </Sidebar.Root>
  )
}
