import { styledHtml } from '@tamagui/web'
import type { ComponentType, ReactNode } from 'react'
import { Text, View } from 'tamagui'
import { Sidebar } from '../../components/Sidebar'
import { Badge } from '../../primitives/Badge'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

// --- Types ---

export interface NavItem {
  label: string
  icon?: ReactNode
  href?: string
  onPress?: () => void
  active?: boolean
  disabled?: boolean
  children?: NavItem[]
  badge?: string | number
}

export interface NavGroup {
  label?: string
  items: NavItem[]
  collapsible?: boolean
  defaultOpen?: boolean
}

export interface SidebarBlockProps {
  groups: NavGroup[]
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

// --- Styled Elements ---

const NavLink = styledHtml('a', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  textDecoration: 'none',
  color: 'inherit',
  gap: 8,
} as any)
const NavLinkJsx = NavLink as AnyFC

// --- Helper Components ---

export function SidebarNavItem({ item }: { item: NavItem }) {
  const content = (
    <ViewJsx flexDirection="row" alignItems="center" gap="$1.5" flex={1}>
      {item.icon && (
        <ViewJsx width="$1.5" height="$1.5" alignItems="center" justifyContent="center">
          {item.icon}
        </ViewJsx>
      )}
      <TextJsx
        fontSize="$4"
        fontFamily="$body"
        color="$color"
        fontWeight={item.active ? '$3' : '$2'}
        flex={1}
      >
        {item.label}
      </TextJsx>
      {item.badge != null && (
        <Badge variant="secondary" size="sm">
          <TextJsx fontSize="$2" fontFamily="$body" color="$color">
            {item.badge}
          </TextJsx>
        </Badge>
      )}
    </ViewJsx>
  )

  if (item.href) {
    return (
      <Sidebar.MenuItem
        active={item.active}
        disabled={item.disabled}
        onPress={item.onPress}
      >
        <NavLinkJsx href={item.href}>{content}</NavLinkJsx>
      </Sidebar.MenuItem>
    )
  }

  return (
    <Sidebar.MenuItem
      active={item.active}
      disabled={item.disabled}
      onPress={item.onPress}
    >
      {content}
    </Sidebar.MenuItem>
  )
}

export function SidebarNavGroup({ group }: { group: NavGroup }) {
  return (
    <Sidebar.Group>
      {group.label && <Sidebar.GroupLabel>{group.label}</Sidebar.GroupLabel>}
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
