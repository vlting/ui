import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'
import React, { useCallback, useRef, useState } from 'react'
import { Text, View } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

const NavTriggerBtn = styledHtml('button', {
  display: 'inline-flex',
  flexDirection: 'row',
  boxSizing: 'border-box',
  appearance: 'none',
  border: 'none',
  background: 'none',
  padding: 0,
  margin: 0,
  fontFamily: 'inherit',
  cursor: 'pointer',
  alignItems: 'center',
  focusVisibleStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },
} as any)
const NavTriggerBtnJsx = NavTriggerBtn as AnyFC

const NavLinkAnchor = styledHtml('a', {
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  textDecoration: 'none',
  color: 'inherit',
  focusVisibleStyle: {
    outlineWidth: 2,
    outlineOffset: -2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },
} as any)
const NavLinkAnchorJsx = NavLinkAnchor as AnyFC

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
      <ViewJsx
        position="relative"
        flexDirection="row"
        alignItems="center"
        role="navigation"
        aria-label="Main"
        onKeyDown={handleKeyDown}
      >
        {children}
      </ViewJsx>
      {activeItem !== null && (
        <ViewJsx
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={49}
          onPress={() => setActiveItem(null)}
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

    if (e.key === 'ArrowRight') {
      e.preventDefault()
      const next = currentIndex + 1 >= triggers.length ? 0 : currentIndex + 1
      triggers[next]?.focus()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      const prev = currentIndex - 1 < 0 ? triggers.length - 1 : currentIndex - 1
      triggers[prev]?.focus()
    } else if (e.key === 'Home') {
      e.preventDefault()
      triggers[0]?.focus()
    } else if (e.key === 'End') {
      e.preventDefault()
      triggers[triggers.length - 1]?.focus()
    }
  }, [])

  return (
    <ViewJsx
      ref={listRef}
      flexDirection="row"
      alignItems="center"
      gap={2}
      onKeyDown={handleKeyDown}
    >
      {children}
    </ViewJsx>
  )
}

function NavItem({ children, value }: NavigationMenuItemProps) {
  const [id] = useState(() => value ?? `nav-item-${++navItemId}`)
  return (
    <NavItemContext.Provider value={{ value: id }}>
      <ViewJsx position="relative" display="inline-flex">
        {children}
      </ViewJsx>
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
    <NavTriggerBtnJsx
      type="button"
      height={36}
      paddingLeft={12}
      paddingRight={12}
      borderRadius="$3"
      backgroundColor={isOpen ? '$color2' : 'transparent'}
      hoverStyle={{ backgroundColor: '$color2' }}
      onClick={() => setActiveItem(isOpen ? null : value)}
      aria-expanded={isOpen}
      onKeyDown={handleKeyDown}
    >
      <TextJsx fontSize={14} fontFamily="$body" fontWeight="500" color="$color">
        {children}
      </TextJsx>
      <TextJsx fontSize={10} color="$colorSubtitle" marginLeft={4}>
        {isOpen ? '\u25B2' : '\u25BC'}
      </TextJsx>
    </NavTriggerBtnJsx>
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

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const next = currentIndex + 1 >= links.length ? 0 : currentIndex + 1
        links[next]?.focus()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prev = currentIndex - 1 < 0 ? links.length - 1 : currentIndex - 1
        links[prev]?.focus()
      } else if (e.key === 'Escape' || e.key === 'Tab') {
        e.preventDefault()
        setActiveItem(null)
      }
    },
    [setActiveItem],
  )

  if (activeItem !== value) return null

  return (
    <ViewJsx
      ref={contentRef}
      position="absolute"
      top="100%"
      left={0}
      marginTop={4}
      zIndex={50}
      backgroundColor="$background"
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius="$5"
      padding={16}
      minWidth={400}
      style={{ boxShadow: 'var(--shadowMd)' }}
      onKeyDown={handleKeyDown}
    >
      {children}
    </ViewJsx>
  )
}

function Link({ children, href, active, onSelect }: NavigationMenuLinkProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onSelect?.()
      }
    },
    [onSelect],
  )

  return (
    <NavLinkAnchorJsx
      href={href}
      paddingLeft={12}
      paddingRight={12}
      paddingTop={8}
      paddingBottom={8}
      borderRadius="$3"
      cursor="pointer"
      backgroundColor={active ? '$color2' : 'transparent'}
      hoverStyle={{ backgroundColor: '$color2' }}
      onClick={
        onSelect
          ? (e: React.MouseEvent) => {
              e.preventDefault()
              onSelect()
            }
          : undefined
      }
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      <TextJsx
        fontSize={14}
        fontFamily="$body"
        color="$color"
        fontWeight={active ? '500' : '400'}
      >
        {children}
      </TextJsx>
    </NavLinkAnchorJsx>
  )
}

function Indicator() {
  return (
    <ViewJsx
      height={2}
      backgroundColor="$color10"
      borderRadius={9999}
      position="absolute"
      bottom={0}
      left={0}
      right={0}
    />
  )
}

function Viewport({ children }: { children?: React.ReactNode }) {
  return <ViewJsx>{children}</ViewJsx>
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
