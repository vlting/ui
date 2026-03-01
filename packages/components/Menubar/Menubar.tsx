import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'
import React, { useCallback, useState } from 'react'
import { Text, View } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

const MenuTriggerBtn = styledHtml('button', {
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
  justifyContent: 'center',
  focusVisibleStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },
} as any)
const MenuTriggerBtnJsx = MenuTriggerBtn as AnyFC

const MenuItemBtn = styledHtml('button', {
  display: 'flex',
  flexDirection: 'row',
  boxSizing: 'border-box',
  appearance: 'none',
  border: 'none',
  background: 'none',
  padding: 0,
  margin: 0,
  fontFamily: 'inherit',
  width: '100%',
  textAlign: 'left',
  focusVisibleStyle: {
    backgroundColor: '$color2',
    outlineWidth: 2,
    outlineOffset: -2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },
} as any)
const MenuItemBtnJsx = MenuItemBtn as AnyFC

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
        height="$3.5"
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$4"
        backgroundColor="$background"
        paddingLeft="$0.5"
        paddingRight="$0.5"
        gap="$0.25"
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
    <MenuTriggerBtnJsx
      type="button"
      paddingLeft="$0.75"
      paddingRight="$0.75"
      height="$2"
      borderRadius="$2"
      backgroundColor={isOpen ? '$color2' : 'transparent'}
      hoverStyle={{ backgroundColor: '$color2' }}
      onClick={() => setActiveMenu(isOpen ? null : id)}
      onMouseEnter={anyOpen && !isOpen ? () => setActiveMenu(id) : undefined}
      role="menuitem"
      aria-haspopup="menu"
      aria-expanded={isOpen}
    >
      <TextJsx fontSize="$4" fontFamily="$body" fontWeight="$3" color="$color">
        {children}
      </TextJsx>
    </MenuTriggerBtnJsx>
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
      marginTop="$0.5"
      zIndex={50}
      backgroundColor="$background"
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius="$4"
      padding="$0.5"
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
    <MenuItemBtnJsx
      type="button"
      alignItems="center"
      justifyContent="space-between"
      height="$2.5"
      paddingLeft="$0.75"
      paddingRight="$0.75"
      borderRadius="$2"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.5 : 1}
      hoverStyle={disabled ? undefined : { backgroundColor: '$color2' }}
      onClick={
        disabled
          ? undefined
          : () => {
              onSelect?.()
              close()
            }
      }
      disabled={disabled}
      role="menuitem"
      aria-disabled={disabled}
    >
      <TextJsx fontSize="$4" fontFamily="$body" color="$color">
        {children}
      </TextJsx>
      {shortcut && (
        <TextJsx
          fontSize="$2"
          fontFamily="$mono"
          color="$colorSubtitle"
          marginLeft="$3.5"
        >
          {shortcut}
        </TextJsx>
      )}
    </MenuItemBtnJsx>
  )
}

function Separator() {
  return (
    <ViewJsx
      height={1}
      backgroundColor="$borderColor"
      marginTop="$0.5"
      marginBottom="$0.5"
      marginLeft={-4}
      marginRight={-4}
    />
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <ViewJsx
      paddingLeft="$0.75"
      paddingRight="$0.75"
      paddingTop={6}
      paddingBottom="$0.25"
    >
      <TextJsx fontSize="$2" fontWeight="$4" color="$colorSubtitle" fontFamily="$body">
        {children}
      </TextJsx>
    </ViewJsx>
  )
}

export const Menubar = { Root, Menu, Trigger, Content, Item, Separator, Label }
