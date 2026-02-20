import React, { memo } from 'react'
import { Text, XStack, YStack, styled } from 'tamagui'

// ─── Sidebar Frame ────────────────────────────────────────────────────────────

const SidebarFrame = styled(YStack, {
  height: '100%',
  backgroundColor: '$background',
  borderRightWidth: 1,
  borderRightColor: '$borderColor',
  flexShrink: 0,
  overflow: 'hidden',

  variants: {
    collapsed: {
      true: {
        width: 56,
      },
      false: {
        width: 240,
      },
    },
  } as const,

  defaultVariants: {
    collapsed: false,
  },
})

// ─── Sub-components ──────────────────────────────────────────────────────────

const SidebarHeader = styled(XStack, {
  paddingHorizontal: '$3',
  paddingVertical: '$3',
  alignItems: 'center',
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',
  flexShrink: 0,
})

const SidebarBody = styled(YStack, {
  flex: 1,
  overflow: 'hidden',
  paddingVertical: '$2',
})

const SidebarFooter = styled(XStack, {
  paddingHorizontal: '$3',
  paddingVertical: '$3',
  alignItems: 'center',
  borderTopWidth: 1,
  borderTopColor: '$borderColor',
  flexShrink: 0,
})

const SidebarItem = styled(XStack, {
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  alignItems: 'center',
  gap: '$2',
  borderRadius: '$2',
  cursor: 'pointer',

  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },

  focusStyle: {
    outlineColor: '$outlineColor',
    outlineWidth: 2,
    outlineStyle: 'solid',
  },

  variants: {
    active: {
      true: {
        backgroundColor: '$backgroundPress',
      },
    },
  } as const,
})

// ─── Props ───────────────────────────────────────────────────────────────────

export type SidebarProps = {
  /** Whether the sidebar is in icon-only collapsed mode */
  collapsed?: boolean
  /** Accessible label for the nav landmark */
  accessibilityLabel?: string
  children?: React.ReactNode
  testID?: string
  [key: string]: unknown
}

// ─── Root Component ──────────────────────────────────────────────────────────

const SidebarRoot = memo(function Sidebar({
  collapsed = false,
  accessibilityLabel = 'Primary navigation',
  children,
  testID,
  ...rest
}: SidebarProps) {
  return (
    <SidebarFrame
      collapsed={collapsed}
      accessible
      accessibilityRole="navigation"
      aria-label={accessibilityLabel}
      testID={testID}
      {...(rest as object)}
    >
      {children}
    </SidebarFrame>
  )
})

// ─── Export ──────────────────────────────────────────────────────────────────

export const Sidebar = Object.assign(SidebarRoot, {
  Header: SidebarHeader,
  Body: SidebarBody,
  Footer: SidebarFooter,
  Item: SidebarItem,
})
