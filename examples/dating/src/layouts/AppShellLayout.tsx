import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useMedia } from 'tamagui'
import { Text, XStack, YStack } from 'tamagui'
import {
  AppShell,
  BottomTabs,
  TopNav,
} from '@vlting/ui/layout'
import { Avatar, Button, Sheet } from '@vlting/ui/primitives'
import { CONVERSATIONS, CONNECTIONS } from '../data/mock'

// ---------------------------------------------------------------------------
// Icon shims — cast to avoid Tamagui v2 RC size-prop type bug
// ---------------------------------------------------------------------------

import {
  Heart as _Heart,
  MessageCircle as _MessageCircle,
  User as _User,
  Users as _Users,
} from '@tamagui/lucide-icons'

type IconFC = React.ComponentType<{ size?: number; color?: string; 'aria-hidden'?: boolean }>

const Heart         = _Heart as IconFC
const MessageCircle = _MessageCircle as IconFC
const User          = _User as IconFC
const Users         = _Users as IconFC

// ---------------------------------------------------------------------------
// Unread counts from mock data
// ---------------------------------------------------------------------------

const unreadMessages = CONVERSATIONS.filter(
  (c) => c.messages[c.messages.length - 1].senderId !== 'me',
).length

const unreadConnections = CONNECTIONS.filter((c) => c.unread).length

// ---------------------------------------------------------------------------
// Nav items — 4 primary destinations
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
  { path: '/',            label: 'Pod',         Icon: Users,         tabIcon: <Users size={20} />,         badge: 0 },
  { path: '/messages',    label: 'Messages',    Icon: MessageCircle, tabIcon: <MessageCircle size={20} />, badge: unreadMessages },
  { path: '/connections', label: 'Connections', Icon: Heart,         tabIcon: <Heart size={20} />,         badge: unreadConnections },
  { path: '/profile',     label: 'Profile',     Icon: User,          tabIcon: <User size={20} />,          badge: 0 },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const BRAND_PURPLE = '#7c3aed'

// Pod sub-routes that should highlight the Pod tab
const POD_ROUTES = ['/', '/icebreaker', '/quiz', '/member', '/week-review']

function isActive(itemPath: string, currentPath: string): boolean {
  if (itemPath === '/') {
    return POD_ROUTES.some((r) =>
      r === '/' ? currentPath === '/' : currentPath.startsWith(r),
    )
  }
  if (itemPath === '/profile') {
    return ['/profile', '/preferences', '/settings'].some((r) => currentPath.startsWith(r))
  }
  return currentPath.startsWith(itemPath)
}

// ---------------------------------------------------------------------------
// AppShellLayout
// ---------------------------------------------------------------------------

export function AppShellLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const media = useMedia()

  const [userSheetOpen, setUserSheetOpen] = useState(false)

  const isMobile = media.sm

  // Resolve the active tab value (pod sub-routes → '/', profile sub-routes → '/profile')
  const PROFILE_ROUTES = ['/profile', '/preferences', '/settings']
  const activeTabValue = POD_ROUTES.some((r) =>
    r === '/' ? location.pathname === '/' : location.pathname.startsWith(r),
  )
    ? '/'
    : PROFILE_ROUTES.some((r) => location.pathname.startsWith(r))
      ? '/profile'
      : NAV_ITEMS.find((n) => n.path !== '/' && location.pathname.startsWith(n.path))?.path ?? '/'

  return (
    <AppShell>
      {/* -- TopNav (desktop only) --------------------------------------- */}
      {!isMobile && (
        <AppShell.Header>
          <TopNav>
            <TopNav.Leading>
              <XStack alignItems="center" gap="$2" cursor="pointer" onPress={() => navigate('/')}>
                <Heart size={20} color={BRAND_PURPLE} aria-hidden />
                <Text style={{ fontWeight: '700', fontSize: 16, color: BRAND_PURPLE }}>
                  Crushd
                </Text>
              </XStack>
            </TopNav.Leading>

            <TopNav.Center>
              <XStack gap="$1" alignItems="center">
                {NAV_ITEMS.map((item) => {
                  const active = isActive(item.path, location.pathname)
                  return (
                    <Button
                      key={item.path}
                      variant="tertiary"
                      size="sm"
                      onPress={() => navigate(item.path)}
                      aria-current={active ? 'page' : undefined}
                      backgroundColor={active ? '$purple1' : 'transparent'}
                      borderRadius="$3"
                      paddingHorizontal="$3"
                    >
                      <YStack position="relative">
                        <Button.Icon>
                          <item.Icon size={16} color={active ? BRAND_PURPLE : '$gray9'} />
                        </Button.Icon>
                        {item.badge > 0 && (
                          <YStack
                            position="absolute"
                            top={-4}
                            right={-6}
                            minWidth={16}
                            height={16}
                            borderRadius={8}
                            backgroundColor="$red9"
                            alignItems="center"
                            justifyContent="center"
                            paddingHorizontal="$1"
                          >
                            <Text fontSize={10} fontWeight="700" color="white">
                              {item.badge}
                            </Text>
                          </YStack>
                        )}
                      </YStack>
                      <Button.Text
                        variant="tertiary"
                        style={{
                          color: active ? BRAND_PURPLE : undefined,
                          fontWeight: active ? '600' : '400',
                        }}
                      >
                        {item.label}
                      </Button.Text>
                    </Button>
                  )
                })}
              </XStack>
            </TopNav.Center>

            <TopNav.Trailing>
              <Button
                variant="tertiary"
                size="sm"
                aria-label="User menu"
                onPress={() => setUserSheetOpen(true)}
              >
                <Avatar name="Jamie Rivera" size="sm" />
              </Button>
            </TopNav.Trailing>
          </TopNav>
        </AppShell.Header>
      )}

      {/* -- Body (content only — no sidebar) ---------------------------- */}
      <AppShell.Body>
        <AppShell.Content>
          <Outlet />
        </AppShell.Content>
      </AppShell.Body>

      {/* -- Bottom tabs (mobile only) ----------------------------------- */}
      {isMobile && (
        <AppShell.Footer>
          <BottomTabs
            value={activeTabValue}
            onValueChange={(path) => navigate(path)}
            items={NAV_ITEMS.map((n) => ({
              value: n.path,
              label: n.label,
              icon: n.tabIcon,
              badge: n.badge > 0 ? n.badge : undefined,
            }))}
          />
        </AppShell.Footer>
      )}

      {/* -- User Sheet -------------------------------------------------- */}
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
