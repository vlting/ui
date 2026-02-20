import React, { memo } from 'react'
import { XStack, styled, withStaticProperties } from 'tamagui'

// ─── Frames ───────────────────────────────────────────────────────────────────

const TopNavFrame = styled(XStack, {
  width: '100%',
  height: 56,
  backgroundColor: '$background',
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',
  alignItems: 'center',
  paddingHorizontal: '$4',
  flexShrink: 0,
  zIndex: 10,
})

const TopNavLeading = styled(XStack, {
  alignItems: 'center',
  gap: '$2',
  flexShrink: 0,
})

const TopNavCenter = styled(XStack, {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2',
})

const TopNavTrailing = styled(XStack, {
  alignItems: 'center',
  gap: '$2',
  flexShrink: 0,
})

// ─── Props ───────────────────────────────────────────────────────────────────

export type TopNavProps = {
  /** Accessible label for the banner region */
  accessibilityLabel?: string
  children?: React.ReactNode
  testID?: string
  [key: string]: unknown
}

// ─── Root Component ──────────────────────────────────────────────────────────

const TopNavRoot = memo(function TopNav({
  accessibilityLabel = 'Main navigation',
  children,
  testID,
  ...rest
}: TopNavProps) {
  return (
    <TopNavFrame
      accessible
      accessibilityRole="header"
      aria-label={accessibilityLabel}
      testID={testID}
      {...(rest as object)}
    >
      {children}
    </TopNavFrame>
  )
})

// ─── Export ──────────────────────────────────────────────────────────────────

export const TopNav = withStaticProperties(TopNavRoot, {
  Leading: TopNavLeading,
  Center: TopNavCenter,
  Trailing: TopNavTrailing,
})
