import React, { memo, useId } from 'react'
import { Text, YStack, styled, withStaticProperties } from 'tamagui'

// ─── Frame ────────────────────────────────────────────────────────────────────

const SectionFrame = styled(YStack, {
  width: '100%',
  paddingVertical: '$4',
  gap: '$3',
})

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionTitle = memo(function SectionTitle({
  children,
  testID,
}: {
  children?: React.ReactNode
  testID?: string
}) {
  return (
    <Text
      fontSize="$5"
      fontWeight="600"
      color="$color"
      accessibilityRole="header"
      testID={testID}
    >
      {children}
    </Text>
  )
})

const SectionDescription = memo(function SectionDescription({
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

const SectionContent = styled(YStack, {
  gap: '$3',
})

const SectionDivider = styled(YStack, {
  height: 1,
  backgroundColor: '$borderColor',
  width: '100%',
})

// ─── Props ────────────────────────────────────────────────────────────────────

export type SectionProps = {
  /** Accessible label for the region landmark */
  accessibilityLabel?: string
  /** Whether to show a divider at the bottom */
  divider?: boolean
  children?: React.ReactNode
  testID?: string
  [key: string]: unknown
}

// ─── Root Component ───────────────────────────────────────────────────────────

const SectionRoot = memo(function Section({
  accessibilityLabel,
  divider = false,
  children,
  testID,
  ...rest
}: SectionProps) {
  const regionId = useId()

  return (
    <SectionFrame
      accessible
      accessibilityRole="none"
      role="region"
      aria-label={accessibilityLabel}
      aria-labelledby={accessibilityLabel ? undefined : regionId}
      testID={testID}
      {...(rest as object)}
    >
      {children}
      {divider && <SectionDivider testID="section-divider" />}
    </SectionFrame>
  )
})

// ─── Export ──────────────────────────────────────────────────────────────────

export const Section = withStaticProperties(SectionRoot, {
  Title: SectionTitle,
  Description: SectionDescription,
  Content: SectionContent,
  Divider: SectionDivider,
})
