import React, { memo } from 'react'
import { Text, XStack, YStack, styled, withStaticProperties } from 'tamagui'

// ─── Frame ────────────────────────────────────────────────────────────────────

const PageHeaderFrame = styled(XStack, {
  width: '100%',
  paddingHorizontal: '$4',
  paddingVertical: '$4',
  alignItems: 'center',
  gap: '$3',
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',
  flexShrink: 0,
})

// ─── Sub-components ───────────────────────────────────────────────────────────

const PageHeaderLeading = styled(XStack, {
  alignItems: 'center',
  gap: '$2',
  flexShrink: 0,
})

const PageHeaderBody = styled(YStack, {
  flex: 1,
  gap: '$1',
})

const PageHeaderTitle = memo(function PageHeaderTitle({
  children,
  testID,
}: {
  children?: React.ReactNode
  testID?: string
}) {
  return (
    <Text
      fontSize="$6"
      fontWeight="700"
      color="$color"
      accessibilityRole="header"
      testID={testID}
    >
      {children}
    </Text>
  )
})

const PageHeaderSubtitle = memo(function PageHeaderSubtitle({
  children,
  testID,
}: {
  children?: React.ReactNode
  testID?: string
}) {
  return (
    <Text fontSize="$3" color="$colorSubtitle" testID={testID}>
      {children}
    </Text>
  )
})

const PageHeaderTrailing = styled(XStack, {
  alignItems: 'center',
  gap: '$2',
  flexShrink: 0,
})

// ─── Props ────────────────────────────────────────────────────────────────────

export type PageHeaderProps = {
  children?: React.ReactNode
  testID?: string
  [key: string]: unknown
}

// ─── Root Component ───────────────────────────────────────────────────────────

const PageHeaderRoot = memo(function PageHeader({
  children,
  testID,
  ...rest
}: PageHeaderProps) {
  return (
    <PageHeaderFrame testID={testID} {...(rest as object)}>
      {children}
    </PageHeaderFrame>
  )
})

// ─── Export ──────────────────────────────────────────────────────────────────

export const PageHeader = withStaticProperties(PageHeaderRoot, {
  Leading: PageHeaderLeading,
  Body: PageHeaderBody,
  Title: PageHeaderTitle,
  Subtitle: PageHeaderSubtitle,
  Trailing: PageHeaderTrailing,
})
