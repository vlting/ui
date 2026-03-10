import type { ReactNode } from 'react'
import { Sidebar } from '../../components/Sidebar'
import { Badge } from '../../primitives/Badge'
import { styled } from '../../stl-react/src/config'

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

export interface FileTreeItem {
  name: string
  icon?: ReactNode
  type: 'file' | 'folder'
  children?: FileTreeItem[]
  onPress?: () => void
  active?: boolean
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

const NavLink = styled(
  'a',
  {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    textDecoration: 'none',
    color: 'inherit',
    gap: '8px',
  },
  'SidebarNavLink',
)

// --- Helper Components ---

export function SidebarNavItem({ item }: { item: NavItem }) {
  const content = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        flex: 1,
      }}
    >
      {item.icon && (
        <div
          style={{
            width: 16,
            height: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {item.icon}
        </div>
      )}
      <span
        style={{
          fontSize: 16,
          fontFamily: 'var(--font-body)',
          color: 'var(--color)',
          fontWeight: item.active ? 500 : 400,
          flex: 1,
        }}
      >
        {item.label}
      </span>
      {item.badge != null && (
        <Badge variant="secondary" size="sm">
          <span
            style={{
              fontSize: 12,
              fontFamily: 'var(--font-body)',
              color: 'var(--color)',
            }}
          >
            {item.badge}
          </span>
        </Badge>
      )}
    </div>
  )

  if (item.href) {
    return (
      <Sidebar.MenuItem
        active={item.active}
        disabled={item.disabled}
        onPress={item.onPress}
      >
        <NavLink href={item.href}>{content}</NavLink>
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
