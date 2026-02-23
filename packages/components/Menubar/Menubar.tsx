import type { ComponentType } from 'react'
import React, { useCallback, useState } from 'react'
import { Text, View } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

export interface MenubarRootProps {
  children: React.ReactNode
}

export interface MenubarMenuProps {
  children: React.ReactNode
}

export interface MenubarItemProps {
  children: React.ReactNode
  onSelect?: () => void
  disabled?: boolean
  shortcut?: string
}

const MenubarContext = React.createContext<{
  activeMenu: string | null
  setActiveMenu: (id: string | null) => void
  anyOpen: boolean
}>({ activeMenu: null, setActiveMenu: () => {}, anyOpen: false })

const MenuContext = React.createContext<{
  id: string
  close: () => void
}>({ id: '', close: () => {} })

let menuIdCounter = 0

function Root({ children }: MenubarRootProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  return (
    <MenubarContext.Provider
      value={{ activeMenu, setActiveMenu, anyOpen: activeMenu !== null }}
    >
      <ViewJsx
        flexDirection="row"
        alignItems="center"
        height={40}
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$4"
        backgroundColor="$background"
        paddingLeft={4}
        paddingRight={4}
        gap={2}
        role="menubar"
      >
        {children}
      </ViewJsx>
      {activeMenu !== null && (
        <ViewJsx
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={49}
          onPress={() => setActiveMenu(null)}
        />
      )}
    </MenubarContext.Provider>
  )
}

function Menu({ children }: MenubarMenuProps) {
  const [id] = useState(() => `menubar-${++menuIdCounter}`)
  const { setActiveMenu } = React.useContext(MenubarContext)

  const close = useCallback(() => setActiveMenu(null), [setActiveMenu])

  return (
    <MenuContext.Provider value={{ id, close }}>
      <ViewJsx position="relative" display="inline-flex">
        {children}
      </ViewJsx>
    </MenuContext.Provider>
  )
}

function Trigger({ children }: { children: React.ReactNode }) {
  const { activeMenu, setActiveMenu, anyOpen } = React.useContext(MenubarContext)
  const { id } = React.useContext(MenuContext)
  const isOpen = activeMenu === id

  return (
    <ViewJsx
      paddingLeft={8}
      paddingRight={8}
      height={28}
      borderRadius="$2"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      backgroundColor={isOpen ? '$color2' : 'transparent'}
      hoverStyle={{ backgroundColor: '$color2' }}
      onPress={() => setActiveMenu(isOpen ? null : id)}
      onMouseEnter={anyOpen && !isOpen ? () => setActiveMenu(id) : undefined}
      role="menuitem"
      aria-haspopup="menu"
      aria-expanded={isOpen}
    >
      <TextJsx fontSize={14} fontFamily="$body" fontWeight="500" color="$color">
        {children}
      </TextJsx>
    </ViewJsx>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  const { activeMenu } = React.useContext(MenubarContext)
  const { id } = React.useContext(MenuContext)

  if (activeMenu !== id) return null

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
      borderRadius="$4"
      padding={4}
      minWidth={192}
      style={{ boxShadow: 'var(--shadowMd)' }}
      role="menu"
    >
      {children}
    </ViewJsx>
  )
}

function Item({ children, onSelect, disabled, shortcut }: MenubarItemProps) {
  const { close } = React.useContext(MenuContext)

  return (
    <ViewJsx
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      height={32}
      paddingLeft={8}
      paddingRight={8}
      borderRadius="$2"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.5 : 1}
      hoverStyle={disabled ? undefined : { backgroundColor: '$color2' }}
      onPress={
        disabled
          ? undefined
          : () => {
              onSelect?.()
              close()
            }
      }
      role="menuitem"
      aria-disabled={disabled}
    >
      <TextJsx fontSize={14} fontFamily="$body" color="$color">
        {children}
      </TextJsx>
      {shortcut && (
        <TextJsx fontSize={12} fontFamily="$mono" color="$colorSubtitle" marginLeft={24}>
          {shortcut}
        </TextJsx>
      )}
    </ViewJsx>
  )
}

function Separator() {
  return <ViewJsx height={1} backgroundColor="$borderColor" marginTop={4} marginBottom={4} marginLeft={-4} marginRight={-4} />
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <ViewJsx paddingLeft={8} paddingRight={8} paddingTop={6} paddingBottom={2}>
      <TextJsx fontSize={12} fontWeight="600" color="$colorSubtitle" fontFamily="$body">
        {children}
      </TextJsx>
    </ViewJsx>
  )
}

export const Menubar = { Root, Menu, Trigger, Content, Item, Separator, Label }
