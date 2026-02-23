import type React from 'react'
import { Text, XStack, styled } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
const BreadcrumbList = styled(XStack, {
  tag: 'nav',
  alignItems: 'center',
  gap: '$1',
  flexWrap: 'wrap',
})

// @ts-expect-error Tamagui v2 RC
const BreadcrumbItemFrame = styled(XStack, {
  alignItems: 'center',
  gap: '$1',
})

// @ts-expect-error Tamagui v2 RC
const BreadcrumbLink = styled(Text, {
  fontFamily: '$body',
  fontSize: '$3',
  color: '$colorSubtitle',
  cursor: 'pointer',
  textDecorationLine: 'none',
  hoverStyle: { color: '$color', textDecorationLine: 'underline' },
  focusStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },
})

// @ts-expect-error Tamagui v2 RC
const BreadcrumbPage = styled(Text, {
  fontFamily: '$body',
  fontSize: '$3',
  fontWeight: '$3',
  color: '$color',
})

// @ts-expect-error Tamagui v2 RC
const BreadcrumbSeparator = styled(Text, {
  fontFamily: '$body',
  fontSize: '$3',
  color: '$colorSubtitle',
  userSelect: 'none',
})

export interface BreadcrumbProps {
  children: React.ReactNode
}

function Root({ children }: BreadcrumbProps) {
  return (
    // @ts-expect-error Tamagui v2 RC
    <BreadcrumbList aria-label="breadcrumb">{children}</BreadcrumbList>
  )
}

function Item({ children }: { children: React.ReactNode }) {
  // @ts-expect-error Tamagui v2 RC
  return <BreadcrumbItemFrame>{children}</BreadcrumbItemFrame>
}

function Link({
  children,
  href,
  onPress,
}: { children: React.ReactNode; href?: string; onPress?: () => void }) {
  return (
    // @ts-expect-error Tamagui v2 RC
    <BreadcrumbLink tag="a" {...(href ? { href } : {})} onPress={onPress}>
      {children}
    </BreadcrumbLink>
  )
}

function Page({ children }: { children: React.ReactNode }) {
  // @ts-expect-error Tamagui v2 RC
  return <BreadcrumbPage aria-current="page">{children}</BreadcrumbPage>
}

function Separator({ children = '/' }: { children?: React.ReactNode }) {
  // @ts-expect-error Tamagui v2 RC
  return <BreadcrumbSeparator aria-hidden>{children}</BreadcrumbSeparator>
}

export const Breadcrumb = { Root, Item, Link, Page, Separator }
