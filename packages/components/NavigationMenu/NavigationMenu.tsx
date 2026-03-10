import React, { useCallback, useRef, useState } from 'react'
import { styled } from '../../stl-react/src/config'

const NavTrigger = styled("button", {
  display: "inline-flex",
  alignItems: "center",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  fontFamily: "$body",
  fontWeight: "$500",
  fontSize: "$p",
  color: "$defaultBody",
  padding: "6px 12px",
  borderRadius: "$2",
  outline: "none",
  gap: "4px",
}, "NavMenuTrigger")

const NavLink = styled("a", {
  display: "flex",
  flexDirection: "column",
  textDecoration: "none",
  color: "inherit",
  padding: "6px 12px",
  borderRadius: "$2",
  outline: "none",
  fontFamily: "$body",
  fontSize: "$p",
}, "NavMenuLink")

const ContentFrame = styled("div", {
  position: "absolute",
  top: "100%",
  left: "0",
  marginTop: "4px",
  zIndex: "50",
  backgroundColor: "$background",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "$borderColor",
  borderRadius: "$4",
  padding: "8px",
  minWidth: "400px",
}, "NavMenuContent")

export interface NavigationMenuRootProps {
  children: React.ReactNode
}

export interface NavigationMenuItemProps {
  children: React.ReactNode
  value?: string
}

export interface NavigationMenuLinkProps {
  children: React.ReactNode
  href?: string
  active?: boolean
  onSelect?: () => void
}

const NavMenuContext = React.createContext<{
  activeItem: string | null
  setActiveItem: (v: string | null) => void
}>({ activeItem: null, setActiveItem: () => {} })

const NavItemContext = React.createContext<{ value: string }>({ value: '' })

let navItemId = 0

function Root({ children }: NavigationMenuRootProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape' && activeItem !== null) {
        e.preventDefault()
        setActiveItem(null)
      }
    },
    [activeItem],
  )

  return (
    <NavMenuContext.Provider value={{ activeItem, setActiveItem }}>
      <nav
        aria-label="Main"
        onKeyDown={handleKeyDown}
        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
      >
        {children}
      </nav>
      {activeItem !== null && (
        <div
          onClick={() => setActiveItem(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 49 }}
        />
      )}
    </NavMenuContext.Provider>
  )
}

function List({ children }: { children: React.ReactNode }) {
  const listRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const container = listRef.current
    if (!container) return

    const triggers = Array.from(
      container.querySelectorAll('button[aria-expanded], a'),
    ) as HTMLElement[]
    if (triggers.length === 0) return

    const currentIndex = triggers.indexOf(e.target as HTMLElement)
    if (currentIndex === -1) return

    let nextIdx: number | undefined
    if (e.key === 'ArrowRight') {
      nextIdx = currentIndex + 1 >= triggers.length ? 0 : currentIndex + 1
    } else if (e.key === 'ArrowLeft') {
      nextIdx = currentIndex - 1 < 0 ? triggers.length - 1 : currentIndex - 1
    } else if (e.key === 'Home') {
      nextIdx = 0
    } else if (e.key === 'End') {
      nextIdx = triggers.length - 1
    }

    if (nextIdx !== undefined) {
      e.preventDefault()
      triggers[nextIdx]?.focus()
    }
  }, [])

  return (
    <div
      ref={listRef}
      role="menubar"
      onKeyDown={handleKeyDown}
      style={{ display: 'flex', alignItems: 'center', gap: '2px' }}
    >
      {children}
    </div>
  )
}

function NavItem({ children, value }: NavigationMenuItemProps) {
  const [id] = useState(() => value ?? `nav-item-${++navItemId}`)
  return (
    <NavItemContext.Provider value={{ value: id }}>
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        {children}
      </div>
    </NavItemContext.Provider>
  )
}

function Trigger({ children }: { children: React.ReactNode }) {
  const { activeItem, setActiveItem } = React.useContext(NavMenuContext)
  const { value } = React.useContext(NavItemContext)
  const isOpen = activeItem === value

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setActiveItem(isOpen ? null : value)
      } else if (e.key === 'ArrowDown' && !isOpen) {
        e.preventDefault()
        setActiveItem(value)
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        setActiveItem(null)
      }
    },
    [isOpen, value, setActiveItem],
  )

  return (
    <NavTrigger
      type="button"
      onClick={() => setActiveItem(isOpen ? null : value)}
      aria-expanded={isOpen}
      onKeyDown={handleKeyDown}
      style={{ backgroundColor: isOpen ? 'var(--surface2, #f3f4f6)' : 'transparent' }}
    >
      {children}
      <span style={{ fontSize: '10px', opacity: 0.5 }}>{isOpen ? '▲' : '▼'}</span>
    </NavTrigger>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  const { activeItem, setActiveItem } = React.useContext(NavMenuContext)
  const { value } = React.useContext(NavItemContext)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const container = contentRef.current
      if (!container) return

      const links = Array.from(container.querySelectorAll('a')) as HTMLElement[]
      if (links.length === 0) return

      const currentIndex = links.indexOf(e.target as HTMLElement)
      let nextIdx: number | undefined

      if (e.key === 'ArrowDown') {
        nextIdx = currentIndex + 1 >= links.length ? 0 : currentIndex + 1
      } else if (e.key === 'ArrowUp') {
        nextIdx = currentIndex - 1 < 0 ? links.length - 1 : currentIndex - 1
      } else if (e.key === 'Home') {
        nextIdx = 0
      } else if (e.key === 'End') {
        nextIdx = links.length - 1
      } else if (e.key === 'Escape' || e.key === 'Tab') {
        e.preventDefault()
        setActiveItem(null)
        return
      }

      if (nextIdx !== undefined) {
        e.preventDefault()
        links[nextIdx]?.focus()
      }
    },
    [setActiveItem],
  )

  if (activeItem !== value) return null

  return (
    <ContentFrame
      ref={contentRef}
      onKeyDown={handleKeyDown}
      style={{ boxShadow: 'var(--stl-shadow-md, 0 4px 12px var(--stl-maxAlpha8, rgba(0,0,0,0.15)))' }}
    >
      {children}
    </ContentFrame>
  )
}

function Link({ children, href, active, onSelect }: NavigationMenuLinkProps) {
  return (
    <NavLink
      href={href}
      tabIndex={-1}
      onClick={
        onSelect
          ? (e: React.MouseEvent) => {
              e.preventDefault()
              onSelect()
            }
          : undefined
      }
      style={{
        backgroundColor: active ? 'var(--surface2, #f3f4f6)' : 'transparent',
        fontWeight: active ? 600 : 400,
      }}
    >
      {children}
    </NavLink>
  )
}

function Indicator() {
  return (
    <div style={{
      height: '2px',
      backgroundColor: 'var(--color10, #0066ff)',
      borderRadius: '9999px',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    }} />
  )
}

function Viewport({ children }: { children?: React.ReactNode }) {
  return <div>{children}</div>
}

export const NavigationMenu = {
  Root,
  List,
  Item: NavItem,
  Trigger,
  Content,
  Link,
  Indicator,
  Viewport,
}
