import React, { useCallback, useState } from 'react'
import { styled } from '../../stl-react/src/config'

const MenubarFrame = styled(
  'div',
  {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 'var(--stl-space12, 36px)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '$borderColor',
    borderRadius: '$4',
    backgroundColor: '$surface1',
    paddingLeft: 'var(--stl-space1, 2px)',
    paddingRight: 'var(--stl-space1, 2px)',
    gap: '1px', // menu item separator gap — allowed
  },
  'Menubar',
)

const MenuContentFrame = styled(
  'div',
  {
    backgroundColor: '$surface1',
    borderRadius: '$4',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '$borderColor',
    padding: 'var(--stl-space1, 2px)',
    minWidth: 'var(--stl-space-menu, 192px)',
    boxShadow: 'var(--shadowMd)',
  },
  'MenubarContent',
)

const MenuItemBtn = styled(
  'button',
  {
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    appearance: 'none',
    border: 'none',
    background: 'none',
    padding: '0px',
    margin: '0px',
    fontFamily: 'inherit',
    width: '100%',
    textAlign: 'left',
  },
  'MenubarItem',
)

const TriggerBtn = styled(
  'button',
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    appearance: 'none',
    border: 'none',
    background: 'none',
    padding: '0px',
    margin: '0px',
    fontFamily: '$body',
    cursor: 'pointer',
    paddingLeft: 'var(--stl-space3, 6px)',
    paddingRight: 'var(--stl-space3, 6px)',
    height: 'var(--stl-space9, 24px)',
    borderRadius: '$2',
    fontSize: '$16',
    fontWeight: '$500',
    color: '$color',
  },
  'MenubarTrigger',
)

const MenuItemText = styled(
  'span',
  { fontSize: '$16', fontFamily: '$body', color: '$color' },
  'MenubarItemText',
)

const ShortcutText = styled(
  'span',
  {
    fontSize: '$12',
    fontFamily: '$code',
    color: '$secondaryText12',
    marginLeft: 'var(--stl-space6, 14px)',
  },
  'MenubarShortcut',
)

const LabelText = styled(
  'span',
  { fontSize: '$12', fontWeight: '$600', color: '$secondaryText12', fontFamily: '$body' },
  'MenubarLabel',
)

const SeparatorLine = styled(
  'div',
  {
    height: '1px', // separator height — allowed
    backgroundColor: '$borderColor',
    marginTop: 'var(--stl-space1, 2px)',
    marginBottom: 'var(--stl-space1, 2px)',
    marginLeft: '-4px', // negative offset — intentional
    marginRight: '-4px', // negative offset — intentional
  },
  'MenubarSeparator',
)

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
      <MenubarFrame role="menubar">{children}</MenubarFrame>
      {activeMenu !== null && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 49 }}
          onClick={() => setActiveMenu(null)}
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
      <div style={{ position: 'relative', display: 'inline-flex' }}>{children}</div>
    </MenuContext.Provider>
  )
}

function Trigger({ children }: { children: React.ReactNode }) {
  const { activeMenu, setActiveMenu, anyOpen } = React.useContext(MenubarContext)
  const { id } = React.useContext(MenuContext)
  const isOpen = activeMenu === id

  return (
    <TriggerBtn
      type="button"
      onClick={() => setActiveMenu(isOpen ? null : id)}
      onMouseEnter={anyOpen && !isOpen ? () => setActiveMenu(id) : undefined}
      role="menuitem"
      aria-haspopup="menu"
      aria-expanded={isOpen}
      style={{ backgroundColor: isOpen ? 'var(--surface2)' : 'transparent' }}
    >
      {children}
    </TriggerBtn>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  const { activeMenu } = React.useContext(MenubarContext)
  const { id } = React.useContext(MenuContext)

  if (activeMenu !== id) return null

  return (
    <MenuContentFrame
      role="menu"
      style={{ position: 'absolute', top: '100%', left: 0, marginTop: 2, zIndex: 50 }}
    >
      {children}
    </MenuContentFrame>
  )
}

function Item({ children, onSelect, disabled, shortcut }: MenubarItemProps) {
  const { close } = React.useContext(MenuContext)

  return (
    <MenuItemBtn
      type="button"
      disabled={disabled}
      onClick={
        disabled
          ? undefined
          : () => {
              onSelect?.()
              close()
            }
      }
      role="menuitem"
      aria-disabled={disabled || undefined}
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 28,
        paddingLeft: 6,
        paddingRight: 6,
        borderRadius: 4,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <MenuItemText>{children}</MenuItemText>
      {shortcut && <ShortcutText>{shortcut}</ShortcutText>}
    </MenuItemBtn>
  )
}

function Separator() {
  return <SeparatorLine />
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ paddingLeft: 6, paddingRight: 6, paddingTop: 6, paddingBottom: 2 }}>
      <LabelText>{children}</LabelText>
    </div>
  )
}

export const Menubar = { Root, Menu, Trigger, Content, Item, Separator, Label }
