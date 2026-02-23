import type React from 'react'
import { Text, styled } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
const BreadcrumbLinkText = styled(Text, {
  fontFamily: '$body',
  fontSize: '$3',
  color: '$colorSubtitle',
  cursor: 'pointer',
  textDecorationLine: 'none',
})

// @ts-expect-error Tamagui v2 RC
const BreadcrumbPageText = styled(Text, {
  fontFamily: '$body',
  fontSize: '$3',
  fontWeight: '$3',
  color: '$color',
})

// @ts-expect-error Tamagui v2 RC
const BreadcrumbSeparatorText = styled(Text, {
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
    <nav aria-label="Breadcrumb">
      <ol style={{ display: 'flex', alignItems: 'center', listStyle: 'none', padding: 0, margin: 0, gap: 4 }}>
        {children}
      </ol>
    </nav>
  )
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {children}
    </li>
  )
}

function Link({
  children,
  href,
  onPress,
}: { children: React.ReactNode; href?: string; onPress?: () => void }) {
  return (
    <a
      href={href || '#'}
      onClick={onPress ? (e: React.MouseEvent) => { e.preventDefault(); onPress() } : undefined}
      style={{
        fontFamily: 'inherit',
        fontSize: 'inherit',
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      {/* @ts-expect-error Tamagui v2 RC */}
      <BreadcrumbLinkText>{children}</BreadcrumbLinkText>
    </a>
  )
}

function Page({ children }: { children: React.ReactNode }) {
  return (
    <span aria-current="page">
      {/* @ts-expect-error Tamagui v2 RC */}
      <BreadcrumbPageText>{children}</BreadcrumbPageText>
    </span>
  )
}

function Separator({ children = '/' }: { children?: React.ReactNode }) {
  return (
    <li role="presentation" aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>
      {/* @ts-expect-error Tamagui v2 RC */}
      <BreadcrumbSeparatorText>{children}</BreadcrumbSeparatorText>
    </li>
  )
}

export const Breadcrumb = { Root, Item, Link, Page, Separator }
