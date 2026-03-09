import React from 'react'
import { styled } from '../../stl-react/src/config'

const BREADCRUMB_FOCUS_STYLE_ID = 'vlt-breadcrumb-focus'
const BREADCRUMB_FOCUS_CSS = `.vlt-breadcrumb-link:focus-visible { outline: 2px solid currentColor; outline-offset: 1px; border-radius: 2px; }`

const BreadcrumbLinkText = styled(
  "span",
  {
    fontFamily: "$body",
    fontSize: "$14",
    color: "$secondaryText12",
    cursor: "pointer",
    textDecoration: "none",
  },
  "BreadcrumbLink"
)

const BreadcrumbPageText = styled(
  "span",
  {
    fontFamily: "$body",
    fontSize: "$14",
    fontWeight: "$500",
    color: "$color",
  },
  "BreadcrumbPage"
)

const BreadcrumbSeparatorText = styled(
  "span",
  {
    fontFamily: "$body",
    fontSize: "$14",
    color: "$secondaryText12",
    userSelect: "none",
  },
  "BreadcrumbSeparator"
)

export interface BreadcrumbProps {
  children: React.ReactNode
}

function Root({ children }: BreadcrumbProps) {
  React.useEffect(() => {
    if (typeof document === 'undefined') return
    if (document.getElementById(BREADCRUMB_FOCUS_STYLE_ID)) return
    const style = document.createElement('style')
    style.id = BREADCRUMB_FOCUS_STYLE_ID
    style.textContent = BREADCRUMB_FOCUS_CSS
    document.head.appendChild(style)
  }, [])

  return (
    <nav aria-label="Breadcrumb">
      <ol
        style={{
          display: 'flex',
          alignItems: 'center',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          gap: 4,
        }}
      >
        {children}
      </ol>
    </nav>
  )
}

function Item({ children }: { children: React.ReactNode }) {
  return <li style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{children}</li>
}

function Link({
  children,
  href,
  onPress,
}: { children: React.ReactNode; href?: string; onPress?: () => void }) {
  return (
    <a
      href={href || '#'}
      onClick={
        onPress
          ? (e: React.MouseEvent) => {
              e.preventDefault()
              onPress()
            }
          : undefined
      }
      className="vlt-breadcrumb-link"
      style={{
        fontFamily: 'inherit',
        fontSize: 'inherit',
        color: 'inherit',
        textDecoration: 'none',
        borderRadius: 2,
      }}
    >
      <BreadcrumbLinkText>{children}</BreadcrumbLinkText>
    </a>
  )
}

function Page({ children }: { children: React.ReactNode }) {
  return (
    <span aria-current="page">
      <BreadcrumbPageText>{children}</BreadcrumbPageText>
    </span>
  )
}

function Separator({ children = '/' }: { children?: React.ReactNode }) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <BreadcrumbSeparatorText>{children}</BreadcrumbSeparatorText>
    </li>
  )
}

export const Breadcrumb = { Root, Item, Link, Page, Separator }
