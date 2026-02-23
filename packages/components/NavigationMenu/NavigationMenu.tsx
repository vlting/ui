import type { ComponentType } from 'react'
import React, { useState } from 'react'
import { Text, View } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

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

  return (
    <NavMenuContext.Provider value={{ activeItem, setActiveItem }}>
      <ViewJsx
        position="relative"
        flexDirection="row"
        alignItems="center"
        role="navigation"
        aria-label="Main"
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
  return (
    <ViewJsx flexDirection="row" alignItems="center" gap={2}>
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

  return (
    <ViewJsx
      flexDirection="row"
      alignItems="center"
      height={36}
      paddingLeft={12}
      paddingRight={12}
      borderRadius="$3"
      cursor="pointer"
      backgroundColor={isOpen ? '$color2' : 'transparent'}
      hoverStyle={{ backgroundColor: '$color2' }}
      onPress={() => setActiveItem(isOpen ? null : value)}
      role="button"
      aria-expanded={isOpen}
    >
      <TextJsx fontSize={14} fontFamily="$body" fontWeight="500" color="$color">
        {children}
      </TextJsx>
      <TextJsx fontSize={10} color="$colorSubtitle" marginLeft={4}>
        {isOpen ? '\u25B2' : '\u25BC'}
      </TextJsx>
    </ViewJsx>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  const { activeItem } = React.useContext(NavMenuContext)
  const { value } = React.useContext(NavItemContext)

  if (activeItem !== value) return null

  return (
    <ViewJsx
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
      style={{ boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
    >
      {children}
    </ViewJsx>
  )
}

function Link({ children, href, active, onSelect }: NavigationMenuLinkProps) {
  return (
    <ViewJsx
      paddingLeft={12}
      paddingRight={12}
      paddingTop={8}
      paddingBottom={8}
      borderRadius="$3"
      cursor="pointer"
      backgroundColor={active ? '$color2' : 'transparent'}
      hoverStyle={{ backgroundColor: '$color2' }}
      onPress={onSelect}
      role="link"
      data-href={href}
    >
      <TextJsx fontSize={14} fontFamily="$body" color="$color" fontWeight={active ? '500' : '400'}>
        {children}
      </TextJsx>
    </ViewJsx>
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
