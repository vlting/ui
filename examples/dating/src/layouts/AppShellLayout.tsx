import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useMedia } from 'tamagui'
import {
  AppShell,
  BottomTabs,
  CommandPalette,
  Drawer,
  Sidebar,
  TopNav,
} from '@vlting/ui/layout'
import { Avatar, Button, Sheet, Switch, Tooltip } from '@vlting/ui/primitives'
import { ThemeContext } from '../main'

// ---------------------------------------------------------------------------
// Icon shims — cast to avoid Tamagui v2 RC size-prop type bug
// ---------------------------------------------------------------------------

import {
  Heart as _Heart,
  Home as _Home,
  Menu as _Menu,
  MessageCircle as _MessageCircle,
  Moon as _Moon,
  Settings as _Settings,
  SlidersHorizontal as _SlidersHorizontal,
  Sun as _Sun,
  User as _User,
  Users as _Users,
  X as _X,
} from '@tamagui/lucide-icons'

type IconFC = React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>

const Heart             = _Heart as IconFC
const Home              = _Home as IconFC
const Menu              = _Menu as IconFC
const MessageCircle     = _MessageCircle as IconFC
const Moon              = _Moon as IconFC
const Settings          = _Settings as IconFC
const SlidersHorizontal = _SlidersHorizontal as IconFC
const Sun               = _Sun as IconFC
const User              = _User as IconFC
const Users             = _Users as IconFC
const X                 = _X as IconFC

// ---------------------------------------------------------------------------
// Nav items
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
  { path: '/',            label: 'Home',        icon: <Home size={16} />,              tabIcon: <Home size={20} /> },
  { path: '/pod',         label: 'My Pod',      icon: <Users size={16} />,             tabIcon: <Users size={20} /> },
  { path: '/messages',    label: 'Messages',    icon: <MessageCircle size={16} />,     tabIcon: <MessageCircle size={20} /> },
  { path: '/connections', label: 'Connections', icon: <Heart size={16} />,             tabIcon: <Heart size={20} /> },
  { path: '/profile',     label: 'Profile',     icon: <User size={16} />,              tabIcon: <User size={20} /> },
  { path: '/preferences', label: 'Preferences', icon: <SlidersHorizontal size={16} />, tabIcon: <SlidersHorizontal size={20} /> },
  { path: '/settings',    label: 'Settings',    icon: <Settings size={16} />,          tabIcon: <Settings size={20} /> },
]

const BOTTOM_TAB_ITEMS = NAV_ITEMS.filter((n) =>
  ['/', '/pod', '/messages', '/connections', '/profile'].includes(n.path),
)

const CMD_ITEMS = [
  { id: 'home',        label: 'Home',        description: 'Go to your feed',             shortcut: 'G H' },
  { id: 'pod',         label: 'My Pod',      description: 'Browse your pod members',     shortcut: 'G P' },
  { id: 'messages',    label: 'Messages',    description: 'View conversations',          shortcut: 'G M' },
  { id: 'connections', label: 'Connections', description: 'See your connections',        shortcut: 'G C' },
  { id: 'profile',     label: 'Profile',     description: 'View your profile',           shortcut: 'G R' },
  { id: 'preferences', label: 'Preferences', description: 'Adjust matching preferences', shortcut: 'G E' },
  { id: 'settings',    label: 'Settings',    description: 'App settings',                shortcut: 'G S' },
]

const CMD_PATHS: Record<string, string> = {
  home: '/', pod: '/pod', messages: '/messages',
  connections: '/connections', profile: '/profile',
  preferences: '/preferences', settings: '/settings',
}

// ---------------------------------------------------------------------------
// AppShellLayout
// ---------------------------------------------------------------------------

export function AppShellLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, setTheme } = useContext(ThemeContext)
  const media = useMedia()

  const [drawerOpen, setDrawerOpen]       = useState(false)
  const [cmdOpen, setCmdOpen]             = useState(false)
  const [userSheetOpen, setUserSheetOpen] = useState(false)

  // Cmd+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdOpen((o) => !o)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const isMobile = media.sm

  return (
    <AppShell>
      {/* -- Top Nav --------------------------------------------------- */}
      <AppShell.Header>
        <TopNav>
          <TopNav.Leading>
            {isMobile && (
              <Button
                variant="tertiary"
                size="sm"
                aria-label="Open navigation menu"
                onPress={() => setDrawerOpen(true)}
              >
                <Menu size={20} />
              </Button>
            )}
            <Heart size={20} color="#7c3aed" aria-hidden />
            <Button variant="tertiary" size="sm" onPress={() => navigate('/')}>
              <Button.Text variant="tertiary" style={{ fontWeight: '700', fontSize: 16 }}>
                Crushd
              </Button.Text>
            </Button>
          </TopNav.Leading>

          <TopNav.Trailing>
            {/* Cmd+K trigger */}
            <Button
              variant="secondary"
              size="sm"
              aria-label="Open command palette (Cmd+K)"
              onPress={() => setCmdOpen(true)}
            >
              <Button.Text variant="secondary" style={{ fontSize: 13 }}>Search Cmd+K</Button.Text>
            </Button>

            {/* User avatar -> opens Sheet */}
            <Button variant="tertiary" size="sm" aria-label="User menu" onPress={() => setUserSheetOpen(true)}>
              <Avatar name="Jamie Rivera" size="sm" />
            </Button>
          </TopNav.Trailing>
        </TopNav>
      </AppShell.Header>

      {/* -- Body (sidebar + content) ---------------------------------- */}
      <AppShell.Body>
        {/* Sidebar — hidden on mobile */}
        {!isMobile && (
          <AppShell.Sidebar>
            <SidebarNav
              currentPath={location.pathname}
              theme={theme}
              onThemeToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              onNavigate={(path) => navigate(path)}
            />
          </AppShell.Sidebar>
        )}

        {/* Main content */}
        <AppShell.Content>
          <Outlet />
        </AppShell.Content>
      </AppShell.Body>

      {/* -- Bottom tabs (mobile only) --------------------------------- */}
      {isMobile && (
        <AppShell.Footer>
          <BottomTabs
            value={location.pathname}
            onValueChange={(path) => navigate(path)}
            items={BOTTOM_TAB_ITEMS.map((n) => ({
              value: n.path,
              label: n.label,
              icon: n.tabIcon,
            }))}
          />
        </AppShell.Footer>
      )}

      {/* -- Mobile Drawer --------------------------------------------- */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} placement="left">
        <Button
          variant="tertiary"
          size="sm"
          aria-label="Close menu"
          onPress={() => setDrawerOpen(false)}
          style={{ margin: 8 }}
        >
          <X size={20} />
        </Button>
        <SidebarNav
          currentPath={location.pathname}
          theme={theme}
          onThemeToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          onNavigate={(path) => { navigate(path); setDrawerOpen(false) }}
        />
      </Drawer>

      {/* -- Command Palette ------------------------------------------- */}
      <CommandPalette
        open={cmdOpen}
        onOpenChange={setCmdOpen}
        items={CMD_ITEMS}
        placeholder="Search pages and actions..."
        onSelect={(item) => {
          const path = CMD_PATHS[item.id]
          if (path) navigate(path)
        }}
      />

      {/* -- User Sheet ------------------------------------------------ */}
      <Sheet open={userSheetOpen} onOpenChange={setUserSheetOpen} snapPoints={[35]}>
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame padding="$4" gap="$3">
          <Avatar name="Jamie Rivera" size="lg" />
          <Button variant="secondary" fullWidth onPress={() => { navigate('/profile'); setUserSheetOpen(false) }}>
            <Button.Text variant="secondary">View Profile</Button.Text>
          </Button>
          <Button variant="secondary" fullWidth onPress={() => { navigate('/preferences'); setUserSheetOpen(false) }}>
            <Button.Text variant="secondary">Preferences</Button.Text>
          </Button>
          <Button variant="secondary" fullWidth onPress={() => { navigate('/settings'); setUserSheetOpen(false) }}>
            <Button.Text variant="secondary">Settings</Button.Text>
          </Button>
          <Button variant="destructive" fullWidth onPress={() => setUserSheetOpen(false)}>
            <Button.Text>Sign Out</Button.Text>
          </Button>
        </Sheet.Frame>
      </Sheet>
    </AppShell>
  )
}

// ---------------------------------------------------------------------------
// SidebarNav — shared between desktop Sidebar and mobile Drawer
// ---------------------------------------------------------------------------

interface SidebarNavProps {
  currentPath: string
  theme: 'light' | 'dark'
  onThemeToggle: () => void
  onNavigate: (path: string) => void
}

function SidebarNav({ currentPath, theme, onThemeToggle, onNavigate }: SidebarNavProps) {
  return (
    <Sidebar>
      <Sidebar.Header>
        <Heart size={16} color="#7c3aed" aria-hidden />
      </Sidebar.Header>

      <Sidebar.Body>
        {NAV_ITEMS.map((item) => {
          const isActive = item.path === '/'
            ? currentPath === '/'
            : currentPath.startsWith(item.path)
          return (
            <Sidebar.Item
              key={item.path}
              active={isActive}
              onPress={() => onNavigate(item.path)}
              accessible
              role="link"
              aria-current={isActive ? 'page' : undefined}
              backgroundColor={isActive ? '$purple1' : undefined}
              borderLeftWidth={isActive ? 3 : 0}
              borderLeftColor={isActive ? '$purple7' : 'transparent'}
            >
              <Button.Icon>{item.icon}</Button.Icon>
              <Button.Text
                variant="tertiary"
                style={{ color: isActive ? '#7c3aed' : undefined, fontWeight: isActive ? '600' : '400' }}
              >
                {item.label}
              </Button.Text>
            </Sidebar.Item>
          )
        })}
      </Sidebar.Body>

      <Sidebar.Footer>
        <Switch.Row>
          <Switch.LabelGroup>
            <Switch.Label>{theme === 'light' ? 'Light' : 'Dark'} mode</Switch.Label>
          </Switch.LabelGroup>
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={onThemeToggle}
            aria-label="Toggle dark mode"
          >
            <Switch.Thumb />
          </Switch>
          {theme === 'light' ? <Sun size={14} aria-hidden /> : <Moon size={14} aria-hidden />}
        </Switch.Row>
      </Sidebar.Footer>
    </Sidebar>
  )
}
