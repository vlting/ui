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
  Bell as _Bell,
  BarChart2 as _BarChart2,
  Compass as _Compass,
  Home as _Home,
  LayoutDashboard as _LayoutDashboard,
  Menu as _Menu,
  Moon as _Moon,
  PenSquare as _PenSquare,
  Settings as _Settings,
  Sun as _Sun,
  Users as _Users,
  X as _X,
  Zap as _Zap,
} from '@tamagui/lucide-icons'

type IconFC = React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>

const Zap            = _Zap as IconFC
const Bell           = _Bell as IconFC
const Home           = _Home as IconFC
const LayoutDashboard = _LayoutDashboard as IconFC
const Users          = _Users as IconFC
const PenSquare      = _PenSquare as IconFC
const Settings       = _Settings as IconFC
const Menu           = _Menu as IconFC
const X              = _X as IconFC
const Sun            = _Sun as IconFC
const Moon           = _Moon as IconFC

// ---------------------------------------------------------------------------
// Nav items
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
  { path: '/',        label: 'Dashboard', icon: <LayoutDashboard size={16} />, tabIcon: <LayoutDashboard size={20} /> },
  { path: '/users',   label: 'Team',      icon: <Users size={16} />,           tabIcon: <Users size={20} /> },
  { path: '/compose', label: 'Compose',   icon: <PenSquare size={16} />,       tabIcon: <PenSquare size={20} /> },
  { path: '/settings',label: 'Settings',  icon: <Settings size={16} />,        tabIcon: <Settings size={20} /> },
]

const CMD_ITEMS = [
  { id: 'home',     label: 'Dashboard',       description: 'View your dashboard',      shortcut: 'G D' },
  { id: 'users',    label: 'Team Members',    description: 'Browse team',              shortcut: 'G U' },
  { id: 'compose',  label: 'Compose',         description: 'Create a post',            shortcut: 'G C' },
  { id: 'settings', label: 'Settings',        description: 'App settings',             shortcut: 'G S' },
  { id: 'onboard',  label: 'Onboarding',      description: 'Start onboarding wizard'               },
]

const CMD_PATHS: Record<string, string> = {
  home: '/', users: '/users', compose: '/compose',
  settings: '/settings', onboard: '/onboarding',
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

  // ⌘K shortcut
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
      {/* ── Top Nav ─────────────────────────────────────── */}
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
            <Zap size={20} color="#2554e8" aria-hidden />
            <Button variant="tertiary" size="sm" onPress={() => navigate('/')}>
              <Button.Text variant="tertiary" style={{ fontWeight: '700', fontSize: 16 }}>
                Volta
              </Button.Text>
            </Button>
          </TopNav.Leading>

          <TopNav.Trailing>
            {/* ⌘K trigger */}
            <Button
              variant="secondary"
              size="sm"
              aria-label="Open command palette (⌘K)"
              onPress={() => setCmdOpen(true)}
            >
              <Button.Text variant="secondary" style={{ fontSize: 13 }}>Search ⌘K</Button.Text>
            </Button>

            {/* Notification bell */}
            <Tooltip>
              <Tooltip.Trigger>
                <Button variant="tertiary" size="sm" aria-label="Notifications">
                  <Bell size={18} />
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>Notifications</Tooltip.Content>
            </Tooltip>

            {/* User avatar → opens Sheet */}
            <Button variant="tertiary" size="sm" aria-label="User menu" onPress={() => setUserSheetOpen(true)}>
              <Avatar name="Aria Chen" size="sm" />
            </Button>
          </TopNav.Trailing>
        </TopNav>
      </AppShell.Header>

      {/* ── Body (sidebar + content) ─────────────────────── */}
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

      {/* ── Bottom tabs (mobile only) ────────────────────── */}
      {isMobile && (
        <AppShell.Footer>
          <BottomTabs
            value={location.pathname}
            onValueChange={(path) => navigate(path)}
            items={NAV_ITEMS.map((n) => ({
              value: n.path,
              label: n.label,
              icon: n.tabIcon,
            }))}
          />
        </AppShell.Footer>
      )}

      {/* ── Mobile Drawer ────────────────────────────────── */}
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

      {/* ── Command Palette ───────────────────────────────── */}
      <CommandPalette
        open={cmdOpen}
        onOpenChange={setCmdOpen}
        items={CMD_ITEMS}
        placeholder="Search pages and actions…"
        onSelect={(item) => {
          const path = CMD_PATHS[item.id]
          if (path) navigate(path)
        }}
      />

      {/* ── User Sheet ───────────────────────────────────── */}
      <Sheet open={userSheetOpen} onOpenChange={setUserSheetOpen} snapPoints={[35]}>
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame padding="$4" gap="$3">
          <Avatar name="Aria Chen" size="lg" />
          <Button variant="secondary" fullWidth onPress={() => { navigate('/users/1'); setUserSheetOpen(false) }}>
            <Button.Text variant="secondary">View Profile</Button.Text>
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
        <Zap size={16} color="#2554e8" aria-hidden />
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
              backgroundColor={isActive ? '$cobalt1' : undefined}
              borderLeftWidth={isActive ? 3 : 0}
              borderLeftColor={isActive ? '$cobalt7' : 'transparent'}
            >
              <Button.Icon>{item.icon}</Button.Icon>
              <Button.Text
                variant="tertiary"
                style={{ color: isActive ? '#2554e8' : undefined, fontWeight: isActive ? '600' : '400' }}
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
