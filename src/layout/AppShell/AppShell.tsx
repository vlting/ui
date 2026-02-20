import React, { memo, useCallback, useId, useState } from 'react'
import { XStack, YStack, styled, withStaticProperties } from 'tamagui'

// ─── Frame ───────────────────────────────────────────────────────────────────

const AppShellFrame = styled(YStack, {
  flex: 1,
  height: '100%',
  width: '100%',
  overflow: 'hidden',
})

// ─── Header ──────────────────────────────────────────────────────────────────

const AppShellHeaderFrame = styled(XStack, {
  width: '100%',
  backgroundColor: '$background',
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',
  zIndex: 10,
  flexShrink: 0,
  accessible: true,
  accessibilityRole: 'header',
})

const AppShellHeader = memo(AppShellHeaderFrame)

// ─── Sidebar ─────────────────────────────────────────────────────────────────

const AppShellSidebarFrame = styled(YStack, {
  height: '100%',
  backgroundColor: '$background',
  borderRightWidth: 1,
  borderRightColor: '$borderColor',
  flexShrink: 0,
  overflow: 'hidden',
  accessible: true,
  accessibilityRole: 'navigation',
})

const AppShellSidebar = memo(AppShellSidebarFrame)

// ─── Content ─────────────────────────────────────────────────────────────────

const AppShellContentFrame = styled(YStack, {
  flex: 1,
  overflow: 'hidden',
  accessible: true,
  accessibilityRole: 'main',
})

const AppShellContent = memo(AppShellContentFrame)

// ─── Footer ──────────────────────────────────────────────────────────────────

const AppShellFooterFrame = styled(YStack, {
  width: '100%',
  backgroundColor: '$background',
  borderTopWidth: 1,
  borderTopColor: '$borderColor',
  flexShrink: 0,
  accessible: true,
  accessibilityRole: 'none',
})

const AppShellFooter = memo(AppShellFooterFrame)

// ─── Body (sidebar + content row) ────────────────────────────────────────────

const AppShellBody = styled(XStack, {
  flex: 1,
  overflow: 'hidden',
})

// ─── Props ───────────────────────────────────────────────────────────────────

export type AppShellProps = {
  /** Controlled: whether the sidebar overlay is open (mobile) */
  sidebarOpen?: boolean
  /** Callback when sidebar open state should change */
  onSidebarChange?: (open: boolean) => void
  /** Default open state for uncontrolled mode */
  defaultSidebarOpen?: boolean
  children?: React.ReactNode
  testID?: string
}

// ─── Root Component ──────────────────────────────────────────────────────────

function AppShellRoot({
  sidebarOpen: sidebarOpenProp,
  onSidebarChange,
  defaultSidebarOpen = false,
  children,
  testID,
}: AppShellProps) {
  const [internalOpen, setInternalOpen] = useState(defaultSidebarOpen)
  const isControlled = sidebarOpenProp !== undefined
  const sidebarOpen = isControlled ? sidebarOpenProp : internalOpen
  const _id = useId()

  const handleSidebarChange = useCallback(
    (open: boolean) => {
      if (!isControlled) setInternalOpen(open)
      onSidebarChange?.(open)
    },
    [isControlled, onSidebarChange],
  )

  // Expose toggle via context so header can control it
  void sidebarOpen
  void handleSidebarChange
  void _id

  return (
    <AppShellFrame testID={testID}>
      {children}
    </AppShellFrame>
  )
}

// ─── Export ──────────────────────────────────────────────────────────────────

export const AppShell = withStaticProperties(AppShellRoot, {
  Header: AppShellHeader,
  Sidebar: AppShellSidebar,
  Content: AppShellContent,
  Footer: AppShellFooter,
  Body: AppShellBody,
})
